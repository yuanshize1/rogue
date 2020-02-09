import React, { Component } from 'react'
//import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import ClientList from '../clients/ClientList'
import ClientLinks from '../layout/ClientLinks'

class Dashboard extends Component {
    state = {
        chosenClients: []
    }

    constructor(props) {
        super(props);
        this.handleListChange = this.handleListChange.bind(this);
    }
    
    handleListChange (clientArr) { 
        this.setState({
            chosenClients: clientArr
        })
        
    }

    render(){
        
        const { clients, auth } = this.props;
        //console.log(clients);
        
        if(!auth.uid) return <Redirect to='/signin' />
        return (
            <>
            <nav className="nav-extended grey">
                <div className="container">
                    <h5 className="center">Clients</h5>
                    <ClientLinks chosenClients={this.state.chosenClients} />  
                </div>
            </nav>
            <div className="dashboard container">
                <table className="highlight">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Name(A-Z)</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Primary Phone</th>
                            <th>Add. Contacts</th>
                            <th>Projects</th>
                        </tr>
                    </thead>
                    <ClientList clients={clients} onChange={this.handleListChange} />
                </table>
            
            </div>
            </>
        )
    }
}
/*
const mapStateToProps = (state) => {
    console.log(state);
    return {
        //projects: state.project.projects
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth

    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects', orderBy: ['createdAt', 'desc']}
    ])
)(Dashboard)
*/
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
        {collection: 'clients', orderBy: ['firstName', 'desc']}
    ])
)(Dashboard)