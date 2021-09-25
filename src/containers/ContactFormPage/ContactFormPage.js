import React from 'react';
import {Grid, Paper, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

import ContactForm from "../ContactForm/ContactForm";

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: "20px",
        paddingBottom: "20px",
    },
    paper: {
        padding: "20px",
    },
}));

const ContactFormPage = ({match}) => {
    const classes = useStyles();
    const id = match.params.id;

    return (
        <Grid container direction="column" spacing={2} className={classes.root}>
            <Grid item>
                <Typography variant="h5">{id ? 'Edit contact' : 'Add new contact'}</Typography>
            </Grid>
            <Grid item>
                <Paper className={classes.paper}>
                    <ContactForm id={id}/>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ContactFormPage;