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

        temptitle: '1',
        tempstatus: '1',
        tempstreetAddress: '1',
        tempcityAddress: '1',
        tempstateAddress: '1',
        tempzipCode: '1',

        titleError: '',
        statusError: '',
        streetAddressError: '',
        cityAddressError: '',
        stateAddressError: '',
        zipCodeError: '',

        cid: this.props.match.params.project_id
    }
    handleChange = (e) => {
        let tempState = 'temp'+e.target.id;

        this.setState({
            [e.target.id]: e.target.value,
            [tempState]: ''
        })
    }

    validate = () => {
        let titleError= '';
        let statusError= '';
        let streetAddressError= '';
        let cityAddressError= '';
        let stateAddressError= '';
        let zipCodeError= '';

        if (!this.state.title && !this.state.temptitle) {
            titleError = 'Title cannot be blank'
        }

        if (this.state.status == 'choose' && !this.state.tempstatus) {
            statusError = 'must select status'
        }

        if (!this.state.status && !this.state.tempstatus) {
            statusError = 'must select status'
        }

        if (!this.state.streetAddress && !this.state.tempstreetAddress) {
            streetAddressError = 'Street Address cannot be blank'
        }

        if (!this.state.cityAddress && !this.state.tempcityAddress) {
            cityAddressError = 'City cannot be blank'
        }

        if (!this.state.stateAddress && !this.state.tempstateAddress) {
            stateAddressError = 'State cannot be blank'
        }

        if (!this.state.zipCode && !this.state.tempzipCode) {
            zipCodeError = 'zip code cannot be blank'
        }

        if (this.state.zipCode.length != 5 && !this.state.tempzipCode) {
            zipCodeError = 'invalid zip code'
        }

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
            this.props.editProject(this.state, this.props.match.params.project_id);
            const cid=this.props.match.params.client_id;
            this.props.history.push('/client/'+cid+'/projects');
        }
        
    }

    handleCancel = (e) => {
        e.preventDefault();
        const cid=this.props.match.params.client_id;
        this.props.history.push('/client/'+cid+'/projects')
    }

    render() {
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        let tempProject = {}
        
        
        this.props.projects.forEach(project => {
            if(project.id == this.props.match.params.project_id) {
                tempProject=project
            }
        })
        
        return (
            <div className="container">
                <form className="white">
                    <h5 className="grey-text">
                        Editing Project {tempProject.title}
                    </h5>
                    <div className="input-field">
                        <p htmlFor="title">Title</p>
                        <input type="text" id="title" onChange={this.handleChange} defaultValue={tempProject.title}/>
                        {this.state.titleError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.titleError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <select className="browser-default" id="status" onChange={this.handleChange} defaultValue={tempProject.status} >
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
                        <p htmlFor="title">Street address</p>
                        <input type="text" id="streetAddress" onChange={this.handleChange} defaultValue={tempProject.streetAddress} />
                        {this.state.streetAddressError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.streetAddressError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <p htmlFor="title">Apartment/Unit No.</p>
                        <input type="text" id="unitNumber" onChange={this.handleChange} defaultValue={tempProject.unitNumber} />
                    </div>
                    <div className="input-field">
                        <p htmlFor="title">City</p>
                        <input type="text" id="cityAddress" onChange={this.handleChange} defaultValue={tempProject.cityAddress} />
                        {this.state.cityAddressError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.cityAddressError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <p htmlFor="title">State</p>
                        <input type="text" id="stateAddress" onChange={this.handleChange} defaultValue={tempProject.stateAddress} />
                        {this.state.stateAddressError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.stateAddressError}
                            </div>
                        ) : null}
                    </div>
                    <div className="input-field">
                        <p htmlFor="title">ZIP code</p>
                        <input type="text" id="zipCode" onChange={this.handleChange} defaultValue={tempProject.zipCode} />
                        {this.state.zipCodeError ? (
                            <div style={{fontSize:12, color: "red"}}>
                                {this.state.zipCodeError}
                            </div>
                        ) : null}
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
