import React, { Component } from 'react'
import { Header, Icon, Menu, Sidebar, Dropdown } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { Route, Link, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import firebase from 'firebase/app'
class Tasks extends Component {
    //auth.isLoaded waiting for Auth Ready so the links don't flash
    constructor(props) {
        super(props);
        this.AddtoFirestore = this.AddtoFirestore.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          projectID: "",
          taskDescription: "",
          taskDueDate: firebase.firestore.Timestamp.fromDate(new Date()),
          taskID: "",
          taskName: "",
          taskType: "",
          userID: ""
        };
      }
    
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      AddtoFirestore() {
        const firestore = firebase.firestore();
        firestore
          .collection("Task")
          .add({
            projectID: this.state.projectID,
            taskDescription: this.state.taskDescription,
            taskDueDate: this.state.taskDueDate,
            taskID: this.state.taskID,
            taskName: this.state.taskName,
            taskType: this.state.taskType,
            userID: this.state.userID
          })
          .then(function(docRef) {
            console.log("Document written with ID:", docRef);
          })
          .catch(function(error) {
            console.log("Error andd document:", error);
          });
      }
    render() {
    
        let labelOutput;
        if (this.state.registrationStatus == "Success") {
          labelOutput = <label> Successfully add new task to the Drive</label>;
        } else {
          labelOutput = <label>{this.state.registrationStatus}</label>;
        }
        return (
          <div id="Taskadd-div" class="main-div">
            <input
              value={this.state.taskDescription}
              onChange={this.handleChange}
              type="text"
              name="taskDescription"
              placeholder="taskDescription"
              id="taskDescription-field"
            />
    
            <input
              value={this.state.taskName}
              onChange={this.handleChange}
              type="text"
              name="taskName"
              placeholder="taskName"
              id="taskName-field"
            />
    
            <input
              value={this.state.taskType}
              onChange={this.handleChange}
              type="text"
              name="taskType"
              placeholder="taskType"
              id="taskType-field"
            />
            {labelOutput}
            <button onClick={this.AddtoFirestore}>Add task to task list</button>
          </div>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}
export default withRouter(compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects', orderBy: ['title']}
    ])
)(Tasks))