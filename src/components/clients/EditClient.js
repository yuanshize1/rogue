import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editClient } from '../../store/actions/clientActions'
import { Redirect } from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class EditClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        role: '',
        email: '',
        primaryContact: '',
        secondaryContact: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editClient(this.state, this.props.match.params.id)
        this.props.history.push('/')
    }

    render() {
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        let tempClient = {}
        this.props.clients.forEach(client => {
            if(client.id == this.props.match.params.id) {
                tempClient=client
            }
        })
        
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text">
                        Edit {tempClient.firstName+' '+tempClient.lastName}
                    </h5>
                    <div className="input-field">
                        <label htmlFor="title">First name</label>
                        <input type="text" id="firstName" onChange={this.handleChange} defaultValue={tempClient.firstName} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Last name</label>
                        <input type="text" id="lastName" onChange={this.handleChange} defaultValue={tempClient.lastName} />
                    </div>
                    <select className="browser-default" id="role" onChange={this.handleChange} defaultValue={tempClient.role} >
                        <option value="" disabled selected>Choose a role</option>
                        <option value="engineer">Engineer</option>
                        <option value="manager">Manager</option>
                    </select>
                    <div className="input-field">
                        <label htmlFor="email">email</label>
                        <input type="text" id="email" onChange={this.handleChange} defaultValue={tempClient.email} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Primary phone number</label>
                        <input type="text" id="primaryContact" onChange={this.handleChange} defaultValue={tempClient.primaryContact} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Secondary Contacy</label>
                        <input type="text" id="secondaryContact" onChange={this.handleChange} defaultValue={tempClient.secondaryContact} />
                    </div>
                    <div className="input-field">
                        <button className="btn">Edit</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        clients: state.firestore.ordered.clients,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editClient: (client, id) => dispatch(editClient(client, id))
    }
}

export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'clients', orderBy: ['firstName', 'desc']}
    ])
)(EditClient))
