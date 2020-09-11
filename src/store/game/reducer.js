import {
    SET_PLAYER_ONE_BOXES,
    SET_PLAYER_TWO_BOXES,
    SET_DISABLED_BOXES,
    SET_SHOW_GAMEOVER_SCREEN,
    SET_WINNER,
    SET_CURRENT_PLAYER,
    RESET_GAME,
} from "./types";

const initialState = {
    isPlayerOneActive: true,
    playerOneBoxes: [],
    playerTwoBoxes: [],
    disabledBoxes: [],
    showWinScreen: false,
    showGameOverScreen: false,
    winner: '',
}

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAYER_ONE_BOXES:
            return { ...state, playerOneBoxes: action.payload };
        
        case SET_PLAYER_TWO_BOXES:
            return { ...state, playerTwoBoxes: action.payload };
        
        case SET_DISABLED_BOXES:
            return { ...state, disabledBoxes: action.payload };
        
        case SET_SHOW_GAMEOVER_SCREEN:
            return { ...state, showGameOverScreen: action.payload };
        
        case SET_WINNER:
            return { ...state, winner: action.payload };
        
        case SET_CURRENT_PLAYER:
            return { ...state, isPlayerOneActive: action.payload };
                
        case RESET_GAME:
            return initialState;                
                
        default:
            return state;
    }
}
export default gameReducer;