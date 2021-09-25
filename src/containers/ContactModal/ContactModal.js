import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Box, Button, CircularProgress, Grid, Modal, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';

import {removeContact, removeContactFromState} from "../../store/actions";

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
    const history = useHistory();

    const dispatch = useDispatch();
    const modalOpen = useSelector(state => state.showModal);
    const loading = useSelector(state => state.loading);
    const contacts = useSelector(state => state.contacts);

    if (!props.contactId) {
        return null;
    }

    const contact = contacts[props.contactId];

    const handleRemove = async (id) => {
        dispatch(removeContactFromState(id));
        await dispatch(removeContact(id));
        props.close();
    };

    const handleEdit = (id) => {
        history.push(`/edit/${id}`);
    };

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={props.close}
            >
                <Box sx={style}>
                    <Grid container direction="row">
                        <Button
                            onClick={props.close}
                            className={classes.btnClose}
                        >
                            <b>X</b>
                        </Button>
                    </Grid>
                    <Grid container direction="row" className={classes.item}>
                        <Grid item className={classes.imageWrapper}>
                            <img src={contact?.photo} alt={contact?.name} className={classes.image} />
                        </Grid>
                        <Grid container direction="column" spacing={2}>

                            <Grid item className={classes.info}>
                                <Typography variant="h5">
                                    {contact?.name}
                                </Typography>
                                <Grid container direction="row">
                                    <PhoneIphoneIcon />
                                    <Typography variant="subtitle1">{contact?.phone}</Typography>
                                </Grid>
                                <Grid container direction="row">
                                    <EmailIcon />
                                    <Typography variant="subtitle1">{contact?.email}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        variant="outlined"
                        className={classes.btn}
                        onClick={() => handleEdit(props.contactId)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemove(props.contactId)}
                        className={classes.btn}
                    >
                        Delete
                    </Button>
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