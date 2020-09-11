import axios from "axios";
import {
    GET_SESSION_ACTIVITY,
    STORE_ACTIVITY,
    SET_SESSION_ID,
} from "./types";

const BASE_URL = 'http://localhost:4567'

export const set_session_id = session_id => ({
    type: SET_SESSION_ID,
    payload: session_id
})

export const get_session_activity = (session_id) => (dispatch) => {
    const url = `${BASE_URL}/activity/${session_id}`

    axios.get(url).then(({ data: { status, data } }) => {
        if (!status) {
            return dispatch({ type: GET_SESSION_ACTIVITY, payload: [] })
        }

        return dispatch({ type: GET_SESSION_ACTIVITY, payload: data })
    });
};

export const store_session_activity = (payload) => (dispatch) => {
    const url = `${BASE_URL}/activity/create`

    axios.post(url, payload).then(({ data: { status, data } }) => {
        if (!status) {
            return;
        }

        return dispatch({ type: STORE_ACTIVITY, payload: data })
    });
};
