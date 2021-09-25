import React, {useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import {useSelector, useDispatch} from "react-redux";
import {Backdrop, CircularProgress, Grid} from "@mui/material";

import {getContacts, setModalOpen} from "../../store/actions";
import Contact from "../../components/Contact/Contact";
import ContactModal from "../ContactModal/ContactModal";

const useStyles = makeStyles(theme => ({
    root: {
        padding: "20px",
    },
}));

const Contacts = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts);
    const loading = useSelector(state => state.loading);

    const [modalContact, setModalContact] = useState(null)

    useEffect(() => {
        (async () => {
            await dispatch(getContacts());
        })();
    }, [dispatch]);

    const handleClickContact = (id) => {
        setModalContact(id);
        dispatch(setModalOpen(true));
    };

    const handleCloseModal = () => {
        dispatch(setModalOpen(false));
        setModalContact(null);
    };

    return (
        <>
            <ContactModal contactId={modalContact} close={handleCloseModal} />
            {loading
                ?
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                :
                Object.keys(contacts).length > 0
                    ?
                    <Grid container direction="column" className={classes.root}>
                        {Object.keys(contacts).map(key => {
                            return <Grid item key={key}>
                                <Contact
                                    id={key}
                                    name={contacts[key].name}
                                    image={contacts[key].photo}
                                    onClick={() => handleClickContact(key)}
                                />
                            </Grid>
                        })}
                    </Grid>
                    :
                    null
            }
        </>
    );
};

export default Contacts;