import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import { v4 as uuid } from "uuid";

import { reset_game } from '../store/game/actions';
import {
    set_session_id,
    get_session_activity,
    store_session_activity,
} from "../store/activity/actions";

const HomeScreen = (props) => {
    useEffect(() => {
        if (props.activities.sessionId === '') {
            props.set_session_id(uuid())
        }
    }, [])

    const isGameOn = () => props.gamePlay.disabledBoxes.length > 0;

    const _handleResumeGame = async () => {
        await props.store_session_activity({ sessionId: props.activities.sessionId, action: `Game resumed` })
        props.history.push('/play')
    }

    const _handleNewGame = async () => {
        await props.store_session_activity(_prepareNewGameActivityData())

        props.reset_game()
        props.history.push('/play')
    }

    const _prepareNewGameActivityData = () => ({
        sessionId: props.activities.sessionId,
        action: "NEW GAME STARTED",
    })

    return (
        <Row>
            <Col sm={12} className="mb-5">
                {isGameOn() &&
                    <Button size="lg" variant="primary" onClick={_handleResumeGame} className="mr-5">Resume Game</Button>
                }
                <Button size="lg" variant="danger" onClick={_handleNewGame}>New Game 111</Button>
            </Col>
        </Row>
    )
}

const mapStateToProps = state => ({
    gamePlay: state.gamePlay,
    activities: state.activities,
})

const mapDispatchToProps = dispatch => ({
    reset_game: () => dispatch(reset_game()),
    set_session_id: (sessionId) => dispatch(set_session_id(sessionId)),
    get_session_activity: (sessionId) => dispatch(get_session_activity(sessionId)),
    store_session_activity: (activity) => dispatch(store_session_activity(activity)),
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(HomeScreen);
