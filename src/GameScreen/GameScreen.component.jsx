import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from "redux";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import { Row, Col } from 'react-bootstrap';

import GameOverScreen from "../GameOverScreen/GameOverScreen.component";

import { store_session_activity, set_session_id, get_session_activity } from "../store/activity/actions";
import {
    set_player_one_boxes,
    set_player_two_boxes,
    set_disabled_boxes,
    show_gameover_screen,
    set_winner,
    set_current_player,
    reset_game,
} from "../store/game/actions";

import './gameScreen.styles.css';

class GameScreen extends Component {
    winCombination = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // row combinations
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // column combinations
        [1, 5, 9], [3, 5, 7] // diagonal combinations
    ]

    async componentDidMount() {
        if (this.props.activities.sessionId === '') {
            await this.props.set_session_id(uuid())
        }
        this.props.get_session_activity(this.props.activities.sessionId)
    }

    _handleClick = async (boxNumber) => {
        const { playerOneBoxes, playerTwoBoxes, disabledBoxes, isPlayerOneActive } = this.props.gamePlay;
        if (disabledBoxes.includes(boxNumber)) {
            return;
        }

        if (isPlayerOneActive) {
            await this.props.set_player_one_boxes([...playerOneBoxes, boxNumber])
            await this.props.store_session_activity({ sessionId: this.props.activities.sessionId, action: `Player One selects box ${boxNumber}` })
        } else {
            await this.props.set_player_two_boxes([...playerTwoBoxes, boxNumber])
            await this.props.store_session_activity({ sessionId: this.props.activities.sessionId, action: `Player Two selects box ${boxNumber}` })
        }

        await this.props.set_current_player(!isPlayerOneActive)
        await this.props.set_disabled_boxes([...disabledBoxes, boxNumber])
        this._checkWin();
    }

    _checkWin = async () => {
        const { playerOneBoxes, playerTwoBoxes, disabledBoxes, isPlayerOneActive } = this.props.gamePlay;
        const lastPlayer = !isPlayerOneActive ? 'Player One' : 'Player Two';

        if (disabledBoxes.length < 5) {
            return;
        }

        let hasWinningCombination = false;
        for (const combination of this.winCombination) {
            const result = combination.every(box => {
                if (isPlayerOneActive) {
                    return playerTwoBoxes.includes(box)
                } else {
                    return playerOneBoxes.includes(box)
                }
            })
            if (result) {
                hasWinningCombination = true;
                break;
            }
        }

        if (hasWinningCombination) {
            await this.props.set_winner(lastPlayer)
            await this.props.store_session_activity({ sessionId: this.props.activities.sessionId, action: `${lastPlayer} has won!` })
            this.props.show_gameover_screen(true)
        } else {
            this._checkGameOver();
        }
    }

    _checkGameOver = async () => {
        const { disabledBoxes } = this.props.gamePlay;
        if (disabledBoxes.length === 9) {
            await this.props.store_session_activity({ sessionId: this.props.activities.sessionId, action: `Match Tie!` })
            this.props.show_gameover_screen(true);
        }
    }

    _restartGame = async () => {
        await this.props.store_session_activity({ sessionId: this.props.activities.sessionId, action: `GAME RESTARTED` })
        this.props.reset_game();
    }

    _goToHomeScreen = async () => {
        await this.props.store_session_activity({ sessionId: this.props.activities.sessionId, action: `QUIT GAME` })
        this.props.reset_game();
        this.props.history.push('/')
    }

    render() {
        const { playerOneBoxes, playerTwoBoxes, isPlayerOneActive } = this.props.gamePlay;
        const currentPlayer = isPlayerOneActive ? 'Player 1' : 'Player 2';
        return (
            <React.Fragment>
                <Row>
                    <Col xs={12} className="text-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <span>Turn: <strong className="text-danger">{currentPlayer}</strong></span>
                            <small>Player 1: X    //   Player 2: O</small>
                        </div>
                        <hr />
                    </Col>
                    <Col xs={12}>
                        <div className="box__container">
                            {[...Array(9).keys()].map((item, idx) => {
                                let boxOwnerClass = '';
                                if (playerOneBoxes.includes(idx + 1)) boxOwnerClass = 'player-one-box';
                                if (playerTwoBoxes.includes(idx + 1)) boxOwnerClass = 'player-two-box';
                                return (
                                    <div
                                        key={idx}
                                        className={`box__single box-${idx + 1} ${boxOwnerClass}`}
                                        onClick={this._handleClick.bind(this, idx + 1)}
                                    >
                                    </div>
                                )
                            })}
                        </div>
                    </Col>
                </Row>

                <GameOverScreen onRestart={this._restartGame} onGameHome={this._goToHomeScreen} />

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    gamePlay: state.gamePlay,
    activities: state.activities
})

const mapDispatchToProps = dispatch => ({
    set_player_one_boxes: (boxes) => dispatch(set_player_one_boxes(boxes)),
    set_player_two_boxes: (boxes) => dispatch(set_player_two_boxes(boxes)),
    set_disabled_boxes: (boxes) => dispatch(set_disabled_boxes(boxes)),
    set_winner: (name) => dispatch(set_winner(name)),
    set_current_player: (boolVal) => dispatch(set_current_player(boolVal)),

    store_session_activity: (sessionId) => dispatch(store_session_activity(sessionId)),
    get_session_activity: (sessionId) => dispatch(get_session_activity(sessionId)),
    set_session_id: (sessionId) => dispatch(set_session_id(sessionId)),

    show_gameover_screen: (boolVal) => dispatch(show_gameover_screen(boolVal)),
    reset_game: () => dispatch(reset_game()),
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(GameScreen);
