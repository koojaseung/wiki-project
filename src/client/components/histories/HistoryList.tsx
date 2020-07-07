import React, { Component, useState, useEffect } from 'react'
import { IHistory } from '../../models/IHistory';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from '@material-ui/core';
import { IPage } from '../../models/IPage';
import { useHistory } from 'react-router';
import Loader from '../shared/Loader';
import HistoryService from '../../services/HistoryService';

interface IProps {
    onDiffButtonClick?: (history: IHistory) => void;
    currentPage?: IPage;
}

interface IState {
    histories: IHistory[];
}

const HistoryList: React.FC<IProps> = (props) => {
    const history = useHistory();
    const [historyList, setHistoryList] = useState([] as IHistory[]);
    const [isLoading, setIsLoading] = useState(true);
    const handleDiffListClick = (history: IHistory) => {
        if(props.onDiffButtonClick) props.onDiffButtonClick(history);
    }
    
    useEffect(() => {
        HistoryService.getHistories(props.currentPage.id)
        .then((result) => {
            setHistoryList(result);
            setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, [])

    return (
        <>
        <Loader show={isLoading} />
        {!isLoading && (<div className="history-list-continaer">
            
            <div className="history-list-content">
                {historyList && (
                     <TableContainer component={Paper}>
                     <Table className="table" aria-label="history diff table">
                       <TableHead>
                         <TableRow>
                           <TableCell>Change Description</TableCell>
                           <TableCell align="left">Edited At</TableCell>
                           <TableCell align="left">Diff</TableCell>
                           
                         </TableRow>
                       </TableHead>
                       <TableBody>
                         {historyList.sort((a, b) => b.id - a.id).map((row) => (
                           <TableRow key={row.id}>
                             <TableCell component="th" scope="row">
                               {row.decription}
                             </TableCell>
                             <TableCell align="left">{row.createdOn}</TableCell>
                         <TableCell align="left">{row.lastHistoryId != null && <Link onClick={(e: React.MouseEvent) => { handleDiffListClick(row); }}>Diff</Link>}</TableCell>
                             
                           </TableRow>
                         ))}
                       </TableBody>
                     </Table>
                   </TableContainer>
                )}
                {historyList == null || historyList.length == 0 &&(
                    <div>No Result</div>
                )}
            </div>
        </div>)}
        </>
    )
}

export default HistoryList;
