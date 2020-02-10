import React, { Component } from 'react'
import firebase from 'firebase/app'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class ProjectLinks extends Component {
    state = {
        sortBy: 0
    }

    constructor(props) {
        super(props);
        this.handleSort = this.handleSort.bind(this);
    }
    handleCreate = () => {
        let cid=this.props.match.params.id;
        this.props.history.push('/'+cid+'/createproject')
    }
    
    handleDelete = () => {
        const firestore = firebase.firestore();
        let pnames = [];
    
        this.props.chosenProjects.forEach(chosenProject => {
            this.props.projects.forEach(project => {
                if(project.id == chosenProject) {
                    pnames.push(project.title)
                }
            })
        });
        if (this.props.chosenProjects.length){
            if (window.confirm('Are you sure you wish to delete the following projects?   '+pnames.toString())) {
                this.props.chosenProjects.forEach(element => {
                    firestore.collection('projects').doc(element).delete();
                });
            }
        
        } else {
            alert("Select at least one client by checking the box to delete!");
        }
        
    }

    handleEdit = () => {
        const pid = this.props.chosenProjects[0];
        if (this.props.chosenProjects.length > 1) {
            alert("Edit 1 project at a time")
        } else if (this.props.chosenProjects.length < 1) {
            alert("Select at least one project by checking the box to edit!")
        } else {
            this.props.history.push('/editproject/'+pid)
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
                        <option value="3">Status (Completed)</option>
                        <option value="4">Status (Ongoing)</option>
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
        projects: state.firestore.ordered.projects,
        //clients: state.firestore.ordered.clients,
        auth: state.firebase.auth

    }
}
export default withRouter(compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects', orderBy: ['title', 'desc']}
    ])
)(ProjectLinks))