import React, {useEffect} from 'react';
import {makeStyles} from "@mui/styles";
import {useSelector, useDispatch} from "react-redux";
import {getContacts} from "../../store/actions";
import {Backdrop, CircularProgress, Grid} from "@mui/material";

import Contact from "../../components/Contact/Contact";

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

    useEffect(() => {
        (async () => {
            await dispatch(getContacts());
        })();
    }, [dispatch]);

    return (
        <>
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