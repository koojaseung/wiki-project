import React, { Component, useState } from 'react'
import { AppBar, Grid, InputBase, Link } from '@material-ui/core';
import Globals from '../../Globals';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import getSlug from 'speakingurl';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

interface IProps {

}

interface IState {
    keyword?: string;
}
const Header: React.FC<IProps> = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const [keyword, setKeyword] = useState(null);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if(e.keyCode == 13) {
            const keyword = e.currentTarget.value;
            history.push('/search/' + getSlug(keyword));
            setKeyword({keyword: keyword});
        }
    }
    
    return (
        <div className={`header`}>
            <AppBar position="static">
                <Grid container className="fixed-header">
                    <Grid sm={9} item  className="left">
                        <Link className="logo-link" href="/">{Globals.siteName}</Link>
                    </Grid>
                    <Grid sm={3} item className="right" style={{padding:14}}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                            <SearchIcon />
                            </div>
                            <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onKeyDown={handleKeyDown}
                            inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>

                    </Grid>
                </Grid>

            </AppBar>
        </div>
    );
    
}

export default Header;