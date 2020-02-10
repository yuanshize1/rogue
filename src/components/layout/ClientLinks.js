import React, { Component } from 'react'
import firebase from 'firebase/app'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class ClientLinks extends Component {
    state = {
        sortBy: 0
    }

    constructor(props) {
        super(props);
        this.handleSort = this.handleSort.bind(this);
    }

    handleCreate = () => {
        this.props.history.push('/createclient')
    }
    
    handleDelete = () => {
        const firestore = firebase.firestore();
        let cnames = [];
        this.props.chosenClients.forEach(chosenClient => {
            this.props.clients.forEach(client => {
                if(client.id == chosenClient) {
                    cnames.push('   '+client.firstName+' '+client.lastName)
                }
            })
        });
        
        if (this.props.chosenClients.length){
            if (window.confirm('Are you sure you wish to delete the following clients?   '+cnames.toString())) {
                this.props.chosenClients.forEach(element => {
                    firestore.collection('clients').doc(element).delete();
                });
            }
            
        } else {
            alert("Select at least one client by checking the box to delete!");
        }
        
    }

    handleEdit = () => {
        const cid = this.props.chosenClients[0];
        if (this.props.chosenClients.length > 1) {
            alert("Edit 1 client at a time")
        } else if (this.props.chosenClients.length < 1) {
            alert("Select at least one client by checking the box to edit!")
        } else {
            this.props.history.push('/editclient/'+cid)
        }
    }

    handleSort = (e) => {
        let sortBy = e.target.value;
        this.setState({
            sortBy: sortBy
        })
        this.props.onChange(sortBy);
        

    }
    render () {
        return(
            <ul className="tabs tabs-transparent">
                <li><button onClick={this.handleCreate} >Create</button></li>
                <li><button onClick={this.handleDelete} >Delete</button></li>
                <li>
                    <select className="browser-default" id="sort" onChange={this.handleSort} defaultValue="0">
                        <option value="0" disabled >Sort by</option>
                        <option value="1">Name (A-Z)</option>
                        <option value="2">Name (Z-A)</option>
                        <option value="3">Role (Engineer)</option>
                        <option value="4">Role (Manager)</option>
                    </select>
                </li>
                <li><button onClick={this.handleEdit} >Edit</button></li>
            </ul>
        )
    }

}

const mapStateToProps = (state) => {
    //console.log(state);
    return {
        //projects: state.project.projects
        clients: state.firestore.ordered.clients,
        auth: state.firebase.auth

    }
}
export default withRouter(compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'clients', orderBy: ['firstName', 'desc']}
    ])
)(ClientLinks))