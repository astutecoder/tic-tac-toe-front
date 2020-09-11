import React from 'react'
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

const GameOverScreen = (props) => {
    const {showGameOverScreen, winner} = props.gamePlay;
    return (
        <Modal centered show={showGameOverScreen} backdrop="static">
            <Modal.Header>
                <Modal.Title>{!!winner ? "Congrats" : "Tie"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { winner !== '' ?
                    <p>
                        <strong>
                            <em>{props.gamePlay.winner.toUpperCase()}</em>
                        </strong>{" "}
                        has won the game :)
                    </p>
                    :
                    <p>Nobody could defeat each other. :P</p>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.onRestart}>Restart</Button>
                <Button variant="warning" onClick={props.onGameHome}>Go to Home</Button>
            </Modal.Footer>
        </Modal>
    );
}

const mapStateToProps = state => ({
    gamePlay: state.gamePlay
})
export default connect(mapStateToProps)(GameOverScreen);