import React, { Component } from 'react'
import { IPage } from '../../models/IPage';

import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import htmlParser from 'react-markdown/plugins/html-parser';
import getSlug from 'speakingurl'
import PageService from '../../services/PageService';
import 'react-markdown-editor-lite/lib/index.css';


interface IProps {
    slug: string;
    currentPage: IPage;
    isNew: boolean;
    
    onEdit: () => void;
    
}

interface IState {
    allPages: string[];
}
const parseHtml = htmlParser({
    isValidNode: node => node.type !== 'script',
    processingInstructions: [/* ... */]
  })

export default class PageView extends React.Component<IProps, IState>  {
    constructor(props) {
        super(props);
        this.state = {allPages: []};
    }

    handleEdidtPage = (e: React.MouseEvent) => {
        if(this.props.onEdit) this.props.onEdit();
        
    }
    componentDidUpdate(){
        document.querySelectorAll('a[href=""]').forEach(x => {
            let curr = x as HTMLAnchorElement;
            curr.href = `/pages/${getSlug(curr.innerText)}`;
            if(this.state.allPages.filter(y => y.toLowerCase().trim() == curr.innerText.toLowerCase().trim()).length == 0) {
                curr.style.color = 'red';
                curr.style.fontWeight = 'bold';
            }
        });
    }
    componentDidMount(){
        PageService.getPageAll().then(result => {
            const names = result.map(x => x.name);
            this.setState({...this.state, allPages:names});
        });
        // document.querySelectorAll('a[href=""]').forEach(x => {
        //     let curr = x as HTMLAnchorElement;
        //     curr.href = `/pages/${getSlug(curr.innerText)}`;
        //     curr.style.color = 'red';
        // });
    }
    render() {
        return (
            <>
            {(<div className="page-view-continaer">
                <div>
                    <Grid container>
                        <Grid sm={8} item>
                            <h1>{(this.props.currentPage && this.props.currentPage.name) || this.props.slug}</h1>
                        </Grid>
                        <Grid sm={4} item className="align-right">
                            <Button onClick={this.handleEdidtPage} color="primary">Edit Page</Button>
                            {!this.props.isNew && <Link to={`/histories/${this.props.slug.trim()}/list`} color="primary">View History</Link>}
                        </Grid>
                    </Grid>
                </div>
                <div className="page-view-content">
                    {this.props.currentPage != null && <ReactMarkdown className="markdown-body"  
                        
                        escapeHtml={false}
                        astPlugins={[parseHtml]}
                    >{this.props.currentPage.content}</ReactMarkdown>}
                    {this.props.isNew &&(
                        <div className="page-view-notfound">
                            This page doesn't exist yet.
                        </div>
                    )}
                </div>
            </div>)}
            </>
        )
    }
}
