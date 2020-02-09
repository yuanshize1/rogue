import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editClient } from '../../store/actions/clientActions'
import { Redirect } from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import firebase from 'firebase/app'

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
        //console.log(this.props)
        this.props.editClient(this.state, this.props.match.params.id)
        this.props.history.push('/')
    }
/*
    getClient = () => {
        const firestore = firebase.firestore();
        const cid = this.props.match.params.id;
        let getDoc = firestore.collection('clients').doc(cid).get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    //console.log('Document data:', doc.data());
                    this.setState({
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        role: doc.data().role,
                        email: doc.data().email,
                        primaryContact: doc.data().primaryContact,
                        secondaryContact: doc.data().secondaryContact
                    });
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });

    }
*/
    render() {
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        //this.getClient();
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text">
                        Edit Client
                    </h5>
                    <div className="input-field">
                        <label htmlFor="title">{this.state.firstName}</label>
                        <input type="text" id="firstName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Last name</label>
                        <input type="text" id="lastName" onChange={this.handleChange} />
                    </div>
                    <select className="browser-default" id="role" onChange={this.handleChange}>
                        <option value="" disabled selected>Choose a role</option>
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
                        <button className="btn">Edit</button>
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
        editClient: (client, id) => dispatch(editClient(client, id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditClient))
