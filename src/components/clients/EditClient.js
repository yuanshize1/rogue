import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editClient } from '../../store/actions/clientActions';
import { Redirect } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class EditClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        role: '',
        email: '',
        primaryContact: '',
        secondaryContact: '',

        tempfirstName: '1',
        templastName: '1',
        temprole: '1',
        tempemail: '1',
        tempprimaryContact: '1',

        firstNameError: '',
        lastNameError: '',
        roleError: '',
        emailError: '',
        primaryContactError: ''
    }
    handleChange = (e) => {
        let tempState = 'temp'+e.target.id;

        this.setState({
            [e.target.id]: e.target.value,
            [tempState]: ''
        })
    }

    validate = () => {
        let firstNameError= '';
        let lastNameError= '';
        let emailError='';
        let roleError='';
        let primaryContactError='';

        if (!this.state.firstName && !this.state.tempfirstName) {
            firstNameError = 'Firstname cannot be blank'
        }

        if (!this.state.lastName && !this.state.templastName) {
            lastNameError = 'Lastname cannot be blank'
        }

        if (this.state.role == 'choose' && !this.state.temprole) {
            roleError = 'must select role'
        }

        if (!this.state.role && !this.state.temprole) {
            roleError = 'must select role'
        }

        if (!this.state.email.includes('@') && !this.state.tempemail) {
            emailError = 'invalid email';
        }

        if (!this.state.email.includes('.') && !this.state.tempemail) {
            emailError = 'invalid email';
        }

        if (!this.state.primaryContact && !this.state.tempprimaryContact) {
            primaryContactError = 'primary contact cannot be blank'
        }
        //setting state with object, awesome js syntax
        if (emailError || firstNameError || lastNameError || roleError || primaryContactError) {
            this.setState({ emailError, firstNameError, lastNameError, roleError, primaryContactError });
            return false;
        }

        return true;

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            this.props.editClient(this.state, this.props.match.params.id)
            this.props.history.push('/client')
        }
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push('/client')
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
                <form className="white">
                    <h5 className="grey-text">
                        Editing Client Info: {tempClient.firstName+' '+tempClient.lastName}
                    </h5>
                    <div className="input-field">
                        <p className="grey-text">First name</p>
                        <input type="text" id="firstName" onChange={this.handleChange} defaultValue={tempClient.firstName} />
                        {this.state.firstNameError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.firstNameError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <p className="grey-text">Last name</p>
                        <input type="text" id="lastName" onChange={this.handleChange} defaultValue={tempClient.lastName} />
                        {this.state.lastNameError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.lastNameError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <select className="browser-default" id="role" onChange={this.handleChange} defaultValue={tempClient.role} >
                            <option value="" disabled>Choose a role</option>
                            <option value="engineer">Engineer</option>
                            <option value="manager">Manager</option>
                            {this.state.roleError ? (
                                <div style={{fontSize:12, color: "red"}}>
                                    {this.state.roleError}
                                </div>
                            ) : null}
                        </select>
                    </div>
                    <div className="input-field">
                        <p className="grey-text">email</p>
                        <input type="text" id="email" onChange={this.handleChange} defaultValue={tempClient.email} />
                        {this.state.emailError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.emailError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <p className="grey-text">Primary phone number</p>
                        <input type="text" id="primaryContact" onChange={this.handleChange} defaultValue={tempClient.primaryContact} />
                        {this.state.primaryContactError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.primaryContactError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <p className="grey-text">Seconday Contact</p>
                        <input type="text" id="secondaryContact" onChange={this.handleChange} defaultValue={tempClient.secondaryContact} />
                    </div>
                    <div className="input-field">
                        <button className="btn" onClick={this.handleSubmit}>Edit</button>
                    </div>
                    <div className="input-field">
                        <button className="btn" onClick={this.handleCancel}>Cancel</button>
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
