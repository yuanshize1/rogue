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

        titleError: '',
        statusError: '',
        streetAddressError: '',
        cityAddressError: '',
        stateAddressError: '',
        zipCodeError: '',

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
    validate = () => {
        let titleError= '';
        let statusError= '';
        let streetAddressError= '';
        let cityAddressError= '';
        let stateAddressError= '';
        let zipCodeError= '';


        if (!this.state.title) {
            titleError = 'Title cannot be blank'
        }

        if (this.state.status == 'choose') {
            statusError = 'must select status'
        }

        if (!this.state.status) {
            statusError = 'must select status'
        }

        if (!this.state.streetAddress) {
            streetAddressError = 'Street Address cannot be blank'
        }

        if (!this.state.cityAddress) {
            cityAddressError = 'City cannot be blank'
        }

        if (!this.state.stateAddress) {
            stateAddressError = 'State cannot be blank'
        }

        if (!this.state.zipCode) {
            zipCodeError = 'zip code cannot be blank'
        }

        if (this.state.zipCode.length != 5) {
            zipCodeError = 'invalid zip code'
        }

        /*
        if (!(!this.state.zipCode.match("^[0-9 ]*$"))) {
            zipCodeError = 'zip code can only have numbers in the US'
        }
        */
        //setting state with object, awesome js syntax
        if (titleError || statusError || streetAddressError || cityAddressError || stateAddressError || zipCodeError) {
            this.setState({ titleError, statusError, streetAddressError, cityAddressError, stateAddressError, zipCodeError });
            return false;
        }

        return true;

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            const link = {
                pathname:'/client/'+this.props.match.params.id+'/projects'
            }
            this.props.createProject(this.state)
            this.props.history.push(link)
        }


    }

    handleCancel = (e) => {
        e.preventDefault();
        const link = {
            pathname:'/client/'+this.props.match.params.id+'/projects'
        }
        this.props.history.push(link)
    }

    render() {
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="container">
                <form className="white">
                    <h5 className="grey-text">
                        Create Project
                    </h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange}/>
                        {this.state.titleError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.titleError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <select className="browser-default" id="status" onChange={this.handleChange} defaultValue="0" >
                            <option value="0" disabled>Choose a Status</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                        </select>
                        {this.state.statusError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.statusError}
                            </div>
                        ) : null}
                    </div>

                    <div className="input-field">
                        <label htmlFor="title">Street address</label>
                        <input type="text" id="streetAddress" onChange={this.handleChange}/>
                        {this.state.streetAddressError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.streetAddressError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Apartment/Unit No.</label>
                        <input type="text" id="unitNumber" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">City</label>
                        <input type="text" id="cityAddress" onChange={this.handleChange}/>
                        {this.state.cityAddressError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.cityAddressError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">State</label>
                        <input type="text" id="stateAddress" onChange={this.handleChange}/>
                        {this.state.stateAddressError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.stateAddressError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">ZIP code</label>
                        <input type="text" id="zipCode" onChange={this.handleChange}/>
                        {this.state.zipCodeError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.zipCodeError}
                            </div>
                        ) : null}
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
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
