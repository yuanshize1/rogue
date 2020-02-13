import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'

class CreateProject extends Component {
    state = {
        title: '',
        status: '',
        streetAddress: '',
        unitNumber: '',
        cityAddress: '',
        stateAddress: '',
        zipCode: '',
        clientId: this.props.match.params.id,
        clientFirstName: this.props.location.clientfirstname,
        clientLastName: this.props.location.clientlastname,
        content: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const fname = this.props.location.clientfirstname;
        const lname = this.props.location.clientlastname;
        this.setState({
            clientId: this.props.match.params.id,
            clientFirstName: fname,
            clientLastName: lname
        })
        const link = {
            pathname:'/client/'+this.props.match.params.id+'/projects',
            clientfirstname:fname,
            clientlastname:lname
        }
        //console.log(this.props);
        /*
        console.log(this.props);
        this.props.clients && this.props.clients.forEach(client => {
            if(client.id==this.props.match.params.id)
                this.setState({
                    clientFistName:client.firstName,
                    clientLastName:client.lastName
                })
        });
        */
        this.props.createProject(this.state)
        this.props.history.push(link)
    }
    render() {

        //console.log(this.props)
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text">
                        Create Project
                    </h5>
                    <div className="input-field">
                        <label htmlFor="title">Name</label>
                        <input type="text" id="title" onChange={this.handleChange}/>
                    </div>
                    <label>Status</label>
                    <select className="browser-default" id="status" onChange={this.handleChange} defaultValue="0" >
                        <option value="0" disabled>Choose a Status</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <div className="input-field">
                        <label htmlFor="title">Street address</label>
                        <input type="text" id="streetAddress" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Apartment/Unit No.</label>
                        <input type="text" id="unitNumber" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">City</label>
                        <input type="text" id="cityAddress" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">State</label>
                        <input type="text" id="stateAddress" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">ZIP code</label>
                        <input type="text" id="zipCode" onChange={this.handleChange}/>
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
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
