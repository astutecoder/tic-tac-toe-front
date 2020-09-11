import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Container, Col, Navbar } from 'react-bootstrap';
import { Switch, Route, withRouter } from 'react-router-dom';

import ActivityLog from './ActivityLog/ActivityLog.component';
import HomeScreen from './HomeScreen/HomeScreen.component';
import GameScreen from './GameScreen/GameScreen.component';

import logo from './logo.svg';
import './App.css';

import { store_session_activity } from './store/activity/actions'

const App = (props) => {
  const _handleLogoClick = async () => {
    await props.store_session_activity({ sessionId: props.activities.sessionId, action: `Home page opened` })
    props.history.push('/')
  }
  return (
    <Container fluid>
      <Row>
        <Col xs={12} className="p-0 mb-5">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand onClick={_handleLogoClick} style={{cursor: "pointer"}}>
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
                Tick-Tack-Toe
              </Navbar.Brand>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col md={8} className="d-flex justify-content-center align-items-center right-seperator">
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/play" component={GameScreen} />
          </Switch>
        </Col>
        <Col md={4}>
            <ActivityLog />
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = state => ({
  activities: state.activities,
})

const mapDispatchToProps = dispatch => ({
  store_session_activity: (activity) => dispatch(store_session_activity(activity)),
})
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
