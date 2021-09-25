import axiosApi from "../axiosApi";

export const SET_MODAL_OPEN = 'SET_MODAL_OPEN';

export const ADD_CONTACT_REQUEST = 'ADD_CONTACT_REQUEST';
export const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS';
export const ADD_CONTACT_FAILURE = 'ADD_CONTACT_FAILURE';

export const EDIT_CONTACT_REQUEST = 'EDIT_CONTACT_REQUEST';
export const EDIT_CONTACT_SUCCESS = 'EDIT_CONTACT_SUCCESS';
export const EDIT_CONTACT_FAILURE = 'EDIT_CONTACT_FAILURE';

export const GET_CONTACTS_REQUEST = 'GET_CONTACTS_REQUEST';
export const GET_CONTACTS_SUCCESS = 'GET_CONTACTS_SUCCESS';
export const GET_CONTACTS_FAILURE = 'GET_CONTACTS_FAILURE';

export const GET_CONTACT_BY_ID_REQUEST = 'GET_CONTACT_BY_ID_REQUEST';
export const GET_CONTACT_BY_ID_SUCCESS = 'GET_CONTACT_BY_ID_SUCCESS';
export const GET_CONTACT_BY_ID_FAILURE = 'GET_CONTACT_BY_ID_FAILURE';

export const setModalOpen = isOpen => ({type: SET_MODAL_OPEN, payload: isOpen});

export const addContactRequest = () => ({type: ADD_CONTACT_REQUEST});
export const addContactSuccess = () => ({type: ADD_CONTACT_SUCCESS});
export const addContactFailure = error => ({type: ADD_CONTACT_FAILURE, payload: error});

export const editContactRequest = () => ({type: EDIT_CONTACT_REQUEST});
export const editContactSuccess = () => ({type: EDIT_CONTACT_SUCCESS});
export const editContactFailure = error => ({type: EDIT_CONTACT_FAILURE, payload: error});

export const getContactsRequest = () => ({type: GET_CONTACTS_REQUEST});
export const getContactsSuccess = contacts => ({type: GET_CONTACTS_SUCCESS, payload: contacts});
export const getContactsFailure = error => ({type: GET_CONTACT_BY_ID_FAILURE, payload: error});

export const getContactByIdRequest = () => ({type: GET_CONTACT_BY_ID_REQUEST});
export const getContactByIdSuccess = (id, contact) => ({type: GET_CONTACT_BY_ID_SUCCESS, payload: {id, contact}});
export const getContactByIdFailure = error => ({type: GET_CONTACT_BY_ID_FAILURE, payload: error});

export const addContact = (data) => {
    return async dispatch => {
        try {
            dispatch(addContactRequest());
            await axiosApi.post('/contacts.json', data);
            dispatch(addContactSuccess());
        } catch (error) {
            dispatch(addContactFailure(error));
        }
    };
};

export const editContact = (data, id) => {
    return async dispatch => {
        try {
            dispatch(editContactRequest());
            await axiosApi.put(`/contacts/${id}.json`, data);
            dispatch(editContactSuccess());
        } catch (error) {
            dispatch(editContactFailure(error));
        }
    };
};

export const getContacts = () => {
    return async dispatch => {
        try {
            dispatch(getContactsRequest());
            const response = await axiosApi.get('/contacts.json');
            dispatch(getContactsSuccess(response.data));
        } catch (error) {
            dispatch(getContactsFailure(error));
        }
    };
};

export const getContactById = (id) => {
    return async dispatch => {
        try {
            dispatch(getContactByIdRequest());
            const response = await axiosApi.get(`/contacts/${id}.json`);
            dispatch(getContactByIdSuccess(id, response.data));
        } catch (error) {
            dispatch(getContactByIdFailure(error));
        }
    };
};
