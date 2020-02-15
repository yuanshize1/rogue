import React, { Component } from 'react'
import { Header, Icon, Menu, Sidebar, Dropdown } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { Route, Link, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import firebase from 'firebase/app'
import genUID from "./util/idGenerator";

class Clendar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.AddtoFireStore = this.AddtoFireStore.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          calanderID: "",
          calanderLink: "",
          calanderName: "",
          ProjectID: ""
        };
      }
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      AddtoFireStore() {
        const firestore = firebase.firestore();
        firestore
          .collection("Calender")
          .add({
            calanderID: genUID(),
            calanderLink: this.state.calanderLink,
            calanderName: this.state.calanderName,
            ProjectID: this.state.ProjectID
          })
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef);
          })
          .catch(function(error) {
            console.log("Error adding document: ", error);
          });
      }
    //auth.isLoaded waiting for Auth Ready so the links don't flash
    render() {
        let labelOutPut;
    if (this.state.registrationStatus === "Success") {
      labelOutPut = (
        <label>Successfully andd new file to the firestoreDB</label>
      );
    } else {
      labelOutPut = <label>{this.state.registrationStatus}</label>;
    }
    return (
      <div id="CalanderAdd-div" className="main-div">
        <h>File Add</h>
        {/* calanderLink input */}
        <input
          value={this.state.calanderLink}
          onChange={this.handleChange}
          type="text"
          name="calanderLink"
          placeholder="link to the document"
          id="calanderLink-field"
        />
        {/* calanderName input */}
        <input
          value={this.state.calanderName}
          onChange={this.handleChange}
          type="text"
          name="calanderName"
          placeholder="link to the document"
          id="calanderName-field"
        />
        {labelOutPut}
        <button onClick={this.AddtoFireStore}>Add To file list</button>
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
)(Clendar))