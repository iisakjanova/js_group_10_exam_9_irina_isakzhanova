import React from 'react';
import {useSelector} from "react-redux";
import {Box, Button, CircularProgress, Grid, Modal, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};

const useStyles = makeStyles(theme => ({
    item: {
        flexWrap: "nowrap !important",
        marginBottom: "20px",
    },
    image: {
        width: "auto",
        height: "100px",
        display: "block",
    },
    imageWrapper: {
        width: "150px",
    },
    info: {
        paddingLeft: "20px",
    },
    btnClose: {
        marginLeft: "auto !important",
    },
    btn: {
        marginRight: "10px !important",
    },
}));

const ContactModal = (props) => {
    const classes = useStyles();

    const modalOpen = useSelector(state => state.showModal);
    const loading = useSelector(state => state.loading);
    const contacts = useSelector(state => state.contacts);

    if (!props.contactId) {
        return null;
    }

    const contact = contacts[props.contactId];

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={props.close}
            >
                <Box sx={style}>
                    <Grid container direction="row">
                        <Button onClick={props.close} className={classes.btnClose}><b>X</b></Button>
                    </Grid>
                    <Grid container direction="row" className={classes.item}>
                        <Grid item className={classes.imageWrapper}>
                            <img src={contact.photo} className={classes.image} />
                        </Grid>
                        <Grid container direction="column" spacing={2}>

                            <Grid item className={classes.info}>
                                <Typography variant="h4">
                                    {contact.name}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Phone: {contact.phone}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Email: {contact.email}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button variant="outlined" className={classes.btn}>Edit</Button>
                    <Button variant="outlined" className={classes.btn}>Delete</Button>
                    {loading
                        ?
                        <CircularProgress />
                        :
                        null
                    }
                </Box>
            </Modal>
        </>
    );
};

export default ContactModal;