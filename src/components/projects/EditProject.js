import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class EditProject extends Component {
    state = {
        title: '',
        status: '',
        streetAddress: '',
        unitNumber: '',
        cityAddress: '',
        stateAddress: '',
        zipCode: '',
        cid: this.props.match.params.id,
        content: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.editProject(this.state, this.props.match.params.id)
        this.props.history.push('/')
    }

    render() {
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        let tempProject = {}
        console.log(this.props);
        
        this.props.projects.forEach(project => {
            if(project.id == this.props.match.params.id) {
                tempProject=project
            }
        })
        
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text">
                        Edit Project {tempProject.title}
                    </h5>
                    <div className="input-field">
                        <label htmlFor="title">Name</label>
                        <input type="text" id="title" onChange={this.handleChange} defaultValue={tempProject.title}/>
                    </div>
                    <label>Status</label>
                    <select className="browser-default" id="status" onChange={this.handleChange} defaultValue={tempProject.status} >
                        <option value="0" disabled>Choose a Status</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <div className="input-field">
                        <label htmlFor="title">Street address</label>
                        <input type="text" id="streetAddress" onChange={this.handleChange} defaultValue={tempProject.streetAddress} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Apartment/Unit No.</label>
                        <input type="text" id="unitNumber" onChange={this.handleChange} defaultValue={tempProject.unitNumber} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">City</label>
                        <input type="text" id="cityAddress" onChange={this.handleChange} defaultValue={tempProject.cityAddress} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">State</label>
                        <input type="text" id="stateAddress" onChange={this.handleChange} defaultValue={tempProject.stateAddress} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">ZIP code</label>
                        <input type="text" id="zipCode" onChange={this.handleChange} defaultValue={tempProject.zipCode} />
                    </div>
                    <div className="input-field">
                        <button className="btn">Create</button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editProject: (project, id) => dispatch(editProject(project, id))
    }
}

export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'projects', orderBy: ['title', 'desc']}
    ])
)(EditProject))
