import React, { Component } from 'react'
import { withRouter, RouteComponentProps, Redirect } from 'react-router';
import { IPage } from '../models/IPage';
import Loader from '../components/shared/Loader';
import HistoryList from '../components/histories/HistoryList';
import HistoryDiffView from '../components/histories/HistoryDiffView';
import { IHistory } from '../models/IHistory';
import PageService from '../services/PageService';
import { Grid, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

interface IParam {
    keyword: string;
}

interface ISearchState {
    keyword?: string;
    searchedPages?: IPage[];
    isLoading: boolean;
}
interface ISearchProps {
    
}

type IProps = RouteComponentProps<{}> & ISearchProps;
class Search extends React.Component<IProps, ISearchState> {
    unlisten: any;
    constructor(props) {
        super(props);
        this.state = {isLoading: true};
    }

    componentDidMount(){
        const params = this.props.match.params as IParam;
        if(params) {
            if(params.keyword) this.setState({...this.state, keyword: params.keyword, isLoading:false});
            
            PageService.searchPage(params.keyword).then((result) => {
                this.setState({...this.state, searchedPages: result, isLoading:false});
            }).catch((error) => console.log(error));
        }

        this.unlisten = this.props.history.listen((location, action) => {
            let segments = location.pathname.split('/');
            const keyword = segments[segments.length - 1];
            
            if(keyword) this.setState({...this.state, keyword: params.keyword, isLoading:true});
            
            PageService.searchPage(keyword).then((result) => {
                this.setState({...this.state, searchedPages: result, isLoading:false});
            }).catch((error) => console.log(error));
        });
    }
    componentWillUnmount(){
        this.unlisten();
    }
    render() {
        const { keyword, searchedPages, isLoading} = this.state;
        
        if(!keyword) {
            <Redirect to="/"></Redirect>
        }
        return (
            <React.Fragment>
                <Loader show={isLoading} />
                {!isLoading && searchedPages && (
                    <>
                        <Grid container>
                            <Grid sm={8} item>
                                <h1>{keyword} Search Results: {searchedPages.length}</h1>
                            </Grid>
                            <Grid sm={4} item className="align-right">

                            </Grid>
                        </Grid>
                        <Grid container>
                            <TableContainer component={Paper}>
                                <Table className="table" aria-label="history diff table">
                                <TableHead>
                                    <TableRow>
                                    <TableCell>Page Name</TableCell>
                                    <TableCell align="left">Content</TableCell>
                                    <TableCell align="left">Link</TableCell>
                                    
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchedPages.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                        {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.content}</TableCell>
                                        <TableCell align="left"><Link to={`/pages/${row.urlFriendlyName}/view`}>Link</Link></TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </>
                )}
            </React.Fragment>
        )
    }
}

export default withRouter(Search) as any;