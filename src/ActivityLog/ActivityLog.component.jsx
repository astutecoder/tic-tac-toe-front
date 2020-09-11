import React from 'react'
import moment from 'moment'
import { ListGroup } from 'react-bootstrap'
import { connect } from 'react-redux'

import './activity.styles.css'

const ActivityLog = (props) => {
    return (
        <div>
            <h5>Activity Log</h5>
            <hr /><ListGroup className="activity-log">
                {props.activities.activities.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1).map((activity, idx) => (
                    <ListGroup.Item key={idx}>
                        {`[${moment(activity.timestamp).format("YYYY-MM-DD hh:mm:ss")}] ${activity.action}`}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

const mapStateToProps = state => ({
    activities: state.activities
})
export default connect(mapStateToProps)(ActivityLog)
