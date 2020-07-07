import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router';
import PageView from "../components/pages/PageView";
import PageEdit from "../components/pages/PageEdit";
import { IPage } from '../models/IPage';
import PageService from '../services/PageService';
import Loader from '../components/shared/Loader';
type Mode = "edit" | "view";

interface IParam {
    slug: string;
    mode: Mode;
}

interface IPageProps {

}

interface IPageState {
    mode?: Mode;
    slug?: string;
    currentPage?: IPage;
    isLoading: boolean;
    isNew: boolean;
}

type IProps = RouteComponentProps<{}> & IPageProps;
class Page extends React.Component<IProps, IPageState> {
    constructor(props) {
        super(props);
        this.state = {mode: "view", currentPage: null, isLoading: true, isNew:false};
        
    }

    loadData = () => {
        const params = this.props.match.params as IParam;
        if(params && (params.mode || params.slug)) {
            if(params.mode) this.setState({...this.state, mode: params.mode});
            if(params.slug) {
                const slug = params.slug;
                PageService.getPageBySlug(slug).then((result) => {
                    console.log(result);
                    if (result) {this.setState({...this.state, slug: slug, currentPage: result, isLoading:false});}
                    else {
                        const currentPage = {name: slug.replace(/-/g, ' '), urlFriendlyName:slug, content: ''};
                        this.setState({...this.state, mode: "view", currentPage: currentPage, isLoading: false, isNew:true});
                    }
                    
                }).catch((error) => console.log(error));
                
            }
        }
        else {
            PageService.getPage(1).then((result) => {
                this.setState({...this.state, slug: result.urlFriendlyName, currentPage: result, isLoading:false});
            });
        }
    }

    componentDidMount(){
        this.loadData();
    }
    
    handleEdit = () => {
        let currentPage = this.state.currentPage;
        console.log(currentPage);
        if(!currentPage) currentPage = {name: this.state.slug.replace(/-/g, ' '), urlFriendlyName:this.state.slug, content: ''};
        this.setState({...this.state, mode: "edit", currentPage: currentPage, isLoading: false});
        console.log(currentPage);
        this.props.history.push(`/pages/${currentPage.urlFriendlyName}/edit`);
    }
    handleCancel = (updatePage:boolean, page:IPage) => {
        this.setState({...this.state, mode: "view", isLoading:updatePage});
        if(updatePage) {
            PageService.getPage(page.id).then((result) => {
                this.setState({...this.state, slug: result.urlFriendlyName, currentPage: result, isLoading:false, isNew: false});
            });
        }
        this.props.history.push(`/pages/${this.state.currentPage.urlFriendlyName}`);
    }
    renderDetail = (mode: Mode) => {
        if(mode == "edit") {
            return (
                <PageEdit onCancel={this.handleCancel} isNew={this.state.isNew} slug={this.state.slug} currentPage={this.state.currentPage} />
            );
        }
        else {
            return (
                <PageView onEdit={this.handleEdit} slug={this.state.slug} isNew={this.state.isNew} currentPage={this.state.currentPage} />
            );
        }
    }
    render() {
        const { mode, slug} = this.state;
        return (
            <React.Fragment>
                <Loader show={this.state.isLoading} />
                {!this.state.isLoading && this.renderDetail(mode)}
            </React.Fragment>
        )
    }
}

export default withRouter(Page) as any;