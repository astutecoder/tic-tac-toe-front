import {
    SET_PLAYER_ONE_BOXES,
    SET_PLAYER_TWO_BOXES,
    SET_DISABLED_BOXES,
    SET_SHOW_GAMEOVER_SCREEN,
    SET_WINNER,
    SET_CURRENT_PLAYER,
    RESET_GAME,
} from "./types";

export const set_player_one_boxes = (boxArray) => ({
    type: SET_PLAYER_ONE_BOXES,
    payload: boxArray
})

export const set_player_two_boxes = (boxArray) => ({
    type: SET_PLAYER_TWO_BOXES,
    payload: boxArray
})

export const set_disabled_boxes = (boxArray) => ({
    type: SET_DISABLED_BOXES,
    payload: boxArray
})

export const show_gameover_screen = (boolVal) => ({
type: SET_SHOW_GAMEOVER_SCREEN,
    payload: boolVal
})

export const set_winner = (winnerName) => ({
    type: SET_WINNER,
    payload: winnerName
})

export const set_current_player = (boolVal) => ({
    type: SET_CURRENT_PLAYER,
    payload: boolVal
})

export const reset_game = () => ({
    type: RESET_GAME
})