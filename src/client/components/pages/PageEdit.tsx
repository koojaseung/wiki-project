import React, { Component, FormEvent } from 'react'
import { IPage } from '../../models/IPage';
import { Link, Grid, Button, Typography } from '@material-ui/core';
import PageService from '../../services/PageService';
import { Redirect } from 'react-router-dom';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import ImageUploader from "react-images-upload";
import 'react-markdown-editor-lite/lib/index.css';

interface IProps {
    slug: string;
    currentPage: IPage;
    isNew: boolean;
    onCancel: (updatePage: boolean, currentPage?: IPage) => void;
}

interface IState {
    markdownText?: string;
    textValue?: string;
    pageName?: string;
}


export default class PageEdit extends React.Component<IProps, IState>  {
    constructor(props) {
        super(props);
        this.state = {markdownText: "", textValue:"", pageName: ""};
    }
    componentDidMount(){
        this.setState({...this.state, markdownText: this.props.currentPage.content, textValue: this.props.currentPage.content, pageName: this.props.currentPage.name});
    }
    handleEditorChange = ({html, text}) => {
        console.log('handleEditorChange', html, text);
        this.setState({...this.state, markdownText: text, textValue: text});
    }
    parseEmptyLink = (text: string) => {
        // let reg = /((\[)(\w+|\s+|[^\[\]\(\)])+(\])(\(\))*)[^\(]/g;
        // console.log(text.matchAll(reg));

        return text;
    }
    handleSave = async (e) => {
        e.preventDefault();
        
        let returnPage: IPage | undefined;
        const parsedText = this.parseEmptyLink(this.state.markdownText);
        
        if(!this.props.isNew) {
            
            const page = JSON.parse(JSON.stringify(this.props.currentPage));
            page.name = e.target.pageName.value;
            page.content = parsedText;
            page.desc = e.target.pageDesc.value;
            returnPage = await PageService.updatePage(page);
        }
        else {
            const page: IPage = {
                name: e.target.pageName.value,
                content: parsedText,
                desc: e.target.pageDesc.value
            }
            returnPage = await PageService.createPage(page);
        }
        if(this.props.onCancel) {
            this.props.onCancel(true, returnPage);
        }
    }
    
    onDrop = (pictureFiles, pictureDataURLs) => {
        var formData = new FormData();
        
        console.log(pictureDataURLs);
        pictureFiles.map((x) => {
            formData.append('upload-image', x as File, x.name);
        });
        PageService.uploadImages(formData).then((result) => {
            let content = this.props.currentPage.content;
            console.log(result);
            result.map(x => {
                content = content + `\r\n ![${x.name}](${x.path})`;
            });
            console.log(content);
            this.setState({...this.state, markdownText: content, textValue: content});
        });
        pictureFiles = [];
    }
    handleCancel = (e: React.MouseEvent) => {
        if(this.props.onCancel) this.props.onCancel(false);
    }
    handlePageNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, pageName: e.currentTarget.value});
    }
    render() {
        const mdParser = new MarkdownIt();
        return (
            <>
            <form noValidate autoComplete="off" onSubmit={this.handleSave}>
                <div className="page-view-continaer">
                    <Grid container>
                        <Grid sm={8} item>
                            <h1>{this.props.currentPage.name}</h1>
                        </Grid>
                        <Grid sm={4} item className="align-right">
                            <Button type="submit"  variant="contained" color="primary">
                                Save
                            </Button>
                            <Link onClick={this.handleCancel}>Cancel</Link>
                        </Grid>
                    </Grid>
                    <div className="page-view-content">
                        <Grid container>
                            <Grid container>
                                <Grid item sm={3}>
                                Title:
                                </Grid>
                                <Grid item sm={8}>
                                <input name="pageName" type="text" value={this.state.pageName} onChange={this.handlePageNameChange}></input>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item sm={3}>
                                Description:
                                </Grid>
                                <Grid item sm={8}>
                                    <input name="pageDesc" type="text" placeholder="Please add a description"></input>
                                </Grid>
                            </Grid>
                            <Grid item sm={12}>
                            <MdEditor value={this.state.markdownText} style={{ height: "500px" }} 
                                renderHTML={(text) => mdParser.render(text)} onChange={this.handleEditorChange} />
                            </Grid>
                        </Grid>
                    </div>
                    
                </div>
            </form>
            <div>
                <ImageUploader
                    withIcon={true}
                    buttonText="Choose images"
                    onChange={this.onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                />
            </div>
            </>
        )
    }
}
