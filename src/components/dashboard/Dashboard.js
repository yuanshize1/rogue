import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table-v6'
import { Icon, Select, Breadcrumb } from 'semantic-ui-react'
import { Button, Step } from 'semantic-ui-react'
import faker from 'Faker'

class Dashboard extends Component {

    render() {
        return (
            <div className="dashboard container" style={{paddingTop:50, minWidth:1000, minHeight:1200}}>
                <h1>Dashboard</h1>
            </div>
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
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'clients', orderBy: ['createdAt', 'desc']}
    ])
)(Dashboard)