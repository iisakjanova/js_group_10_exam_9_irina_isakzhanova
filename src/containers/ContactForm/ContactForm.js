import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";
import {Backdrop, Button, CircularProgress, Grid, TextField, Typography} from "@mui/material";

import {addContact, editContact, getContactById} from "../../store/actions";

const useStyles = makeStyles(theme => ({
    btn: {
        marginRight: "10px !important",
    },
    img: {
        width: "100px",
        height: "auto"
    }
}));

const initialState =  {
    name: '',
    phone: '',
    email: '',
    photo: '',
};

const defaultPhoto = 'https://icon-library.com/images/no-photo-icon/no-photo-icon-0.jpg';

const ContactForm = ({id}) => {
    const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch();
    const reduxContact = useSelector(state => state.contacts[id]);
    const loading = useSelector(state => state.loading);

    const [contact, setContact] = useState(reduxContact || initialState);

    useEffect(() => {
        (async () => {
            if (id) {
                await dispatch(getContactById(id));
            }
        })();
    }, [dispatch, id]);

    useEffect(() => {
        setContact(reduxContact || initialState)
    }, [reduxContact]);

    const handleInputChange = e => {
        const {name, value} = e.target;
        setContact(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        if (id) {
            await dispatch(editContact({...contact}, id));
        } else {
            await dispatch(addContact({...contact}));
        }

        history.goBack();
    };

    const handleFormCancel = () => {
        history.goBack();
    };

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
                <Grid container
                      direction="column"
                      spacing={2}
                      component="form"
                      onSubmit={handleFormSubmit}
                >
                    <Grid item>
                        <TextField
                            required
                            label="Name"
                            name="name"
                            value={contact.name}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            multiline
                            label="Phone"
                            name="phone"
                            value={contact.phone}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            multiline
                            label="Email"
                            name="email"
                            value={contact.email}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            multiline
                            label="Photo"
                            name="photo"
                            value={contact.photo}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">Photo preview</Typography>
                        <img src={contact.photo || defaultPhoto} alt={'incorrect url'} className={classes.img}/>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                            className={classes.btn}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            type="button"
                            onClick={handleFormCancel}
                            className={classes.btn}
                        >
                            Back to contacts
                        </Button>
                    </Grid>
                </Grid>
            }
        </>
    );
};

export default ContactForm;