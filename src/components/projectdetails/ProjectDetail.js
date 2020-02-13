import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import Toolbar from './Toolbar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Documents from './Documents'
import Invoices from './Invoices'
import Tasks from './Tasks'
class ProjectDetail extends Component {
    render() {
        console.log(this.props)
        const path = this.props.location.pathname;
        /*
        this.props.projects && this.props.projects.forEach(project => {
            if(project.id == this.props.match.params.id){
                    const projectTitle = project.title;
                    const clientFirstName = project.clientFirstName;
                    const clientLastName = project.clientLastName;
                    const clientId = project.clientId;
            }
                
        });*/
        return (
            <BrowserRouter>
                <div>
                    <h1>clients ->  {this.props.location.project.clientFirstName} </h1>
                    <Toolbar path={path}/>
                    <Switch>
                        <Route path='/client/:id/projects/:id/documents' component={Documents} />
                        <Route path='/client/:id/projects/:id/invoices' component={Invoices} />
                        <Route path='/client/:id/projects/:id/tasks' component={Tasks} />
                    </Switch>
                </div>
            </BrowserRouter>

            
        )

    }
}
const mapStateToProps = (state) => {
    console.log(state)
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
)(ProjectDetail))