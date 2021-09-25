import {
    ADD_CONTACT_FAILURE,
    ADD_CONTACT_REQUEST,
    ADD_CONTACT_SUCCESS,
    EDIT_CONTACT_FAILURE,
    EDIT_CONTACT_REQUEST,
    EDIT_CONTACT_SUCCESS,
    GET_CONTACT_BY_ID_FAILURE,
    GET_CONTACT_BY_ID_REQUEST,
    GET_CONTACT_BY_ID_SUCCESS,
} from "./actions";

const initialState = {
    contacts: '',
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT_REQUEST:
            return {...state, loading: true};
        case ADD_CONTACT_SUCCESS:
            return {...state, loading: false};
        case ADD_CONTACT_FAILURE:
            return {...state, loading: false, error: action.payload};
        case EDIT_CONTACT_REQUEST:
            return {...state, loading: true};
        case EDIT_CONTACT_SUCCESS:
            return {...state, loading: false};
        case EDIT_CONTACT_FAILURE:
            return {...state, loading: false, error: action.payload};
        case GET_CONTACT_BY_ID_REQUEST:
            return {...state, loading: true};
        case GET_CONTACT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                contacts: {
                    ...state.contacts,
                    [action.payload.id]: action.payload.contact
                }};
        case GET_CONTACT_BY_ID_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default reducer;