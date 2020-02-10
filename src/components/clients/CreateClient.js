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
        secondaryContact: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state)
        this.props.createClient(this.state)
        this.props.history.push('/')
    }
    render() {
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text">
                        Create Client
                    </h5>
                    <div className="input-field">
                        <label htmlFor="title">First name</label>
                        <input type="text" id="firstName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Last name</label>
                        <input type="text" id="lastName" onChange={this.handleChange}/>
                    </div>
                    <select className="browser-default" id="role" onChange={this.handleChange} defaultValue="choose">
                        <option value="choose" disabled>Choose a role</option>
                        <option value="engineer">Engineer</option>
                        <option value="manager">Manager</option>
                    </select>
                    <div className="input-field">
                        <label htmlFor="email">email</label>
                        <input type="text" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Primary phone number</label>
                        <input type="text" id="primaryContact" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Secondary Contacy</label>
                        <input type="text" id="secondaryContact" onChange={this.handleChange}/>
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
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createClient: (client) => dispatch(createClient(client))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClient)
