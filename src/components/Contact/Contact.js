import React from 'react';
import {Grid, Paper, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(theme => ({
    item: {
        padding: "10px",
        marginBottom: "20px",
        alignItems: "center",
    },
    image: {
        width: "auto",
        height: "150px",
        display: "block",
    },
    imageWrapper: {
        width: "200px",
    },
    name: {
        paddingLeft: "20px",
    },
}));

const Contact = (props) => {
    const classes = useStyles();

    return (
        <Paper>
            <Grid container direction="row" className={classes.item}>
                <Grid item className={classes.imageWrapper}>
                    <img src={props.image} className={classes.image} />
                </Grid>
                <Grid item className={classes.name}>
                    <Typography variant="subtitle1">{props.name}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Contact;