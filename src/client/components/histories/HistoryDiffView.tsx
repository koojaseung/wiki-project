import React, { Component, useEffect, useState } from 'react'
import { IPage } from '../../models/IPage';
import { Grid, Button } from '@material-ui/core';
import ReactDiffViewer from 'react-diff-viewer';
import { IHistory } from '../../models/IHistory';
import HistoryService from '../../services/HistoryService';
import Loader from '../shared/Loader';
import { Link } from 'react-router-dom';

interface IProps {
    currentPage: IPage;
    currentHistory: IHistory;
    onClose?: () => void;
}

const HistoryDiffView: React.FC<IProps> = (props) => {
    const [prevHistory, setPrevHistory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true);
        HistoryService.getHistory(props.currentHistory.lastHistoryId).then((result) => {
            console.log(result);
            setPrevHistory(result);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleClick = () => {
        if(props.onClose) props.onClose();
    }
    const renderDiff = () => {
        if(isLoading) return (<></>);
        return (<div className="history-view-continaer">
            <div>
                <Grid container>
                    <Grid sm={8} item>
                        <h1>{props.currentPage.name}</h1>
                    </Grid>
                    <Grid sm={4} item className="align-right">
                    <Button onClick={handleClick} color="primary">Go back</Button>
                    <Link to={`/pages/${props.currentPage.urlFriendlyName.trim()}/view`}>Go to page</Link>
                    </Grid>
                </Grid>
            </div>
            <div className="history-diff-view-content">
                <ReactDiffViewer oldValue={prevHistory.content} newValue={props.currentHistory.content} splitView={true} />
            </div>
        </div>);
    }
    return (
        <>
        <Loader show={isLoading}></Loader>
        { renderDiff() }
        </>
    )
}

export default HistoryDiffView;