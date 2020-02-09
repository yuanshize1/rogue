import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import {withRouter} from 'react-router-dom'

class ClientLinks extends Component {
    
    handleCreate = () => {
        this.props.history.push('/createclient')
    }
    /*
    async getClients () {
        const firestore = firebase.firestore();
        this.props.chosenClients.forEach(element => {
            let getDoc = firestore.collection('clients').doc(element).get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        console.log('Document data:', doc.data());
                        this.setState({clientNames: (doc.data().firstName+' '+doc.data().lastName)});
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
                    //this.setState({clientNames: (doc.data().firstName+' '+doc.data().lastName)});
        });
       
    }
    */
    
   handleDelete = () => {
        const firestore = firebase.firestore();
        const cid = this.props.chosenClients.toString();
        if (this.props.chosenClients.length){
            if (window.confirm('Are you sure you wish to delete this item?'+cid)) {
                this.props.chosenClients.forEach(element => {
                    firestore.collection('clients').doc(element).delete();
                });
            }
            
        } else {
            alert("nothing to delete");
        }
    }

    handleEdit = () => {
        const cid = this.props.chosenClients[0];
        if (this.props.chosenClients.length > 1) {
            alert("can only edit 1 client at a time")
        } else {
            this.props.history.push('/editclient/'+cid)
            /*
            this.props.chosenClients.forEach(element => {
                firestore.collection('clients').doc(element).update({firstName: 'testingedit'});
                
            });*/
            //this.props.history.push('/createclient')
        }
    }
    render () {

        //console.log(this.props.chosenClients);
        return(
            <ul className="tabs tabs-transparent">
                <li><button onClick={this.handleCreate} >Create</button></li>
                <li><button onClick={this.handleDelete} >Delete</button></li>
                <li>Sort</li>
                <li><button onClick={this.handleEdit} >Edit</button></li>
            </ul>
        )
    }

}


export default withRouter(ClientLinks)