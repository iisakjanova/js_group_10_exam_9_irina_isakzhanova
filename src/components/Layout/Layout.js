import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import {AppBar, Button, Grid, Toolbar, Typography} from "@mui/material";

const useStyles = makeStyles(theme => ({
    pageLink: {
        display: "inline-block",
        '& a': {
            color: 'inherit',
            textDecoration: 'none',
        },
    },
    appBar: {
        zIndex: 1,
    },
    toolbarInner: {
        justifyContent: "space-between"
    },
}));

const Layout = ({children}) => {
    const history = useHistory();
    const classes = useStyles();

    const handleAddClick = () => {
        history.push('/add');
    };

    return (
        <>
            <AppBar position="fixed" color="default" className={classes.appBar}>
                <Toolbar>
                    <Grid container direction="row" className={classes.toolbarInner}>
                        <Grid item>
                            <Typography variant="h6" className={classes.pageLink}>
                                <Link to="/">Contacts</Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button type="button" variant="outlined" onClick={handleAddClick}>Add new contact</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar />
            {children}
        </>
    );
};

export default Layout;