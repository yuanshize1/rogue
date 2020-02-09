import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import { connect } from 'react-redux'
import { firestoreConnect } from "react-redux-firebase";
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'


class DeleteClient extends Component {
    handleDelete = () => {
        const firestore = firebase.firestore();
        if (this.props.chosenClients.length){
            this.props.chosenClients.forEach(element => {

                console.log(element);
                firestore.collection('clients').doc(element).delete();
            });
            
        } else {
            console.log("nothing to delete")
        }
            
        //firestore.collection('clients').add
    }
    render () {
        return (
                <button>Delete</button>
            )
    }


}

export default DeleteClient