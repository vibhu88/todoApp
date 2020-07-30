import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styles from '../styles/styles.css';
import About from '../components/about';
import HomePage from '../components/HomePage';

const useStyles = makeStyles((theme) => ({
    drawerPaper: { width: 'inherit' },
    link:        { textDecoration: 'none',
                   color: theme.palette.text.primary}
}))

function SideBar() {
    const classes = useStyles();
    return (
        <Router className="sideBar-div">
            <div>
                <Drawer className="drawer"
                        variant="persistent"
                        anchor="left"
                        open={true}
                        elevation={4}
                        classes= {{ paper: classes.drawerPaper}}
                >
                    <List>
                        <Link to="/" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon />
                                    <ListItemText primary="Home" /> 
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                        <Link to="/about" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <InfoIcon />
                                    <ListItemText primary="About" /> 
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <Switch>
                    <Route exact path='/' /> 
                    <Route exact path='/about' exact component ={About} />
                </Switch>
            </div>
        </Router>
    )
}

export default SideBar