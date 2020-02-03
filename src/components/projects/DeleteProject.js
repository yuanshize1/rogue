import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from "react-redux-firebase";
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteProject } from '../../store/actions/projectActions'

const handleClick = (e, prop) => {
    e.preventDefault()
    deleteProject(prop)
    console.log(prop)
}

const ProjectDetails = (props) => {
    const { auth, project } = props;
    if (!auth.uid) return <Redirect to='/signin' />
    if (project) {
        return (
        <div className="container section project-details">
            <button onClick={(e) => handleClick(e, props.id)}>Delete</button>
        </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading...</p>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
        project: project,
        id: id,
        auth: state.firebase.auth
    }
}
const matchDispatchToProps = (dispatch) => {
    return {
        deleteProject: (id) => dispatch(deleteProject(id))
    }
}

export default compose(
    connect(mapStateToProps, matchDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails)