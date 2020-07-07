import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router';
import { IPage } from '../models/IPage';
import Loader from '../components/shared/Loader';
import HistoryList from '../components/histories/HistoryList';
import HistoryDiffView from '../components/histories/HistoryDiffView';
import { IHistory } from '../models/IHistory';
import PageService from '../services/PageService';

type Mode = "diff" | "list";
interface IParam {
    slug: string;
    mode: Mode;
}

interface IHistoryProps {

}

interface IHistoryState {
    mode?: Mode;
    slug?: string;
    currentPage?: IPage;
    currentHistory?: IHistory;
    isLoading: boolean;
}

type IProps = RouteComponentProps<{}> & IHistoryProps;
class History extends React.Component<IProps, IHistoryState> {
    constructor(props) {
        super(props);
        this.state = {isLoading: true};
    }

    componentDidMount(){
        const params = this.props.match.params as IParam;
        if(params) {
            if(params.slug) this.setState({...this.state, slug: params.slug});
            if(params.mode) this.setState({...this.state, mode: params.mode});
            
            const slug = params.slug;
            console.log(slug);
            console.log(params.mode);
            PageService.getPageBySlug(slug).then((result) => {
                console.log(result);
                this.setState({...this.state, slug: slug, currentPage: result, isLoading:false});
            }).catch((error) => console.log(error));
        }
    }
    handleDiffButtonClick = (history: IHistory) => {
        this.props.history.push(`/histories/${this.state.currentPage.urlFriendlyName}/diff`);
        this.setState({...this.state, currentHistory: history, mode: 'diff'});
    }
    handleDiffViewClose = () => {
        this.props.history.push(`/histories/${this.state.currentPage.urlFriendlyName}/list`);
        this.setState({...this.state, mode: 'list', currentHistory: null});
    }
    renderDetail = (mode: Mode) => {
        if(mode == "diff") {
            return (
                <HistoryDiffView onClose={this.handleDiffViewClose} currentPage={this.state.currentPage} currentHistory={this.state.currentHistory} />
            );
        }
        else {
              return (<HistoryList currentPage={this.state.currentPage} onDiffButtonClick={this.handleDiffButtonClick} />)
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

export default withRouter(History) as any;