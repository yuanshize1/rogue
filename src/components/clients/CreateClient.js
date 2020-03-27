import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createClient } from '../../store/actions/clientActions'
import { Redirect } from 'react-router-dom'

class CreateClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        role: '',
        email: '',
        primaryContact: '',
        secondaryContact: '',
        username: '',

        firstNameError: '',
        lastNameError: '',
        roleError: '',
        emailError: '',
        primaryContactError: '',
        usernameError: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    validate = () => {
        let firstNameError= '';
        let lastNameError= '';
        let emailError='';
        let roleError='';
        let primaryContactError='';
        let usernameError='';
        if (!this.state.firstName) {
            firstNameError = 'Firstname cannot be blank'
        }

        if (!this.state.lastName) {
            lastNameError = 'Lastname cannot be blank'
        }

        if (!this.state.username) {
            usernameError = 'username cannot be blank'
        }

        if (this.state.role == 'choose') {
            roleError = 'must select role'
        }

        if (!this.state.role) {
            roleError = 'must select role'
        }

        if (!this.state.email.includes('@')) {
            emailError = 'invalid email';
        }

        if (!this.state.email.includes('.')) {
            emailError = 'invalid email';
        }

        if (!this.state.primaryContact) {
            primaryContactError = 'primary contact cannot be blank'
        }
        //setting state with object, awesome js syntax
        if (emailError || firstNameError || lastNameError || roleError || primaryContactError || usernameError) {
            this.setState({ emailError, firstNameError, lastNameError, roleError, primaryContactError, usernameError });
            return false;
        }

        return true;

    }
    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            this.props.createClient(this.state)
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
        return (
            <div className="container">
                <form className="white">
                    <h5 className="grey-text">
                        Create Client
                    </h5>
                    <div className="input-field">
                        <label htmlFor="title">First name</label>
                        <input type="text" id="firstName" onChange={this.handleChange}/>
                        {this.state.firstNameError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.firstNameError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Last name</label>
                        <input type="text" id="lastName" onChange={this.handleChange}/>
                        {this.state.lastNameError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.lastNameError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">username</label>
                        <input type="text" id="username" onChange={this.handleChange}/>
                        {this.state.usernameError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.usernameError}
                            </div>
                        ) : null}
                    </div>
                    <div>
                        <select className="browser-default" id="role" onChange={this.handleChange} defaultValue="choose">
                            <option value="choose" disabled>Choose a role</option>
                            <option value="engineer">Engineer</option>
                            <option value="manager">Manager</option>
                        </select>
                        {this.state.roleError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.roleError}
                            </div>
                        ) : null}
                    </div>

                    <div className="input-field">
                        <label htmlFor="email">email</label>
                        <input type="text" id="email" onChange={this.handleChange}/>
                        {this.state.emailError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.emailError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Primary phone number</label>
                        <input type="text" id="primaryContact" onChange={this.handleChange}/>
                        {this.state.primaryContactError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.primaryContactError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Secondary Contact</label>
                        <input type="text" id="secondaryContact" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn" onClick={this.handleSubmit}>Create</button>
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
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createClient: (client) => dispatch(createClient(client))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClient)
