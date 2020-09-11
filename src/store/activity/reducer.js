import {
    GET_SESSION_ACTIVITY,
    STORE_ACTIVITY,
    SET_SESSION_ID,
} from "./types";

const initialState = {
    sessionId: "",
    activities: [],
};

const activityReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION_ID:
            return { ...state, sessionId: action.payload };
        
        case GET_SESSION_ACTIVITY:
            return { ...state, activities: action.payload };
        
        case STORE_ACTIVITY:
            return {
                ...state,
                activities: [...state.activities, action.payload],
            };

        default:
            return state;
    }
};

export default activityReducer;
