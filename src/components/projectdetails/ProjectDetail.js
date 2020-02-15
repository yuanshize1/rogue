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
import Calendar from './Calendar'
class ProjectDetail extends Component {
    render() {
        if(this.props.projects){
            var result = this.props.projects.filter(obj => {
                return obj.id === this.props.match.params.project_id
              })
        }
        //if(result) console.log(result)
        const path = '/client/'+this.props.match.params.project_id+'/projects/'+this.props.match.params.project_id;
        return (
            <div className="container">
                <nav className="nav-extended grey">
                    <div className="container">
                        <h5>clients ->  
                            {result ? 
                            result[0].clientFirstName+
                            ' '+result[0].clientLastName+
                            ' -> '+result[0].title
                            :
                            'loading client details...'} 
                        
                        </h5>
                    </div>
                </nav>
                <BrowserRouter>
                    <div>
                        <Toolbar path={path} />
                        <Switch>
                            <Route path={path+'/documents'} component={Documents} />
                            <Route path={path+'/invoices'} component={Invoices} />
                            <Route path={path+'/calendar'} component={Calendar} />
                            <Route path={path+'/tasks'} component={Tasks} />
                        </Switch>
                    </div>
                </BrowserRouter>

            </div>


            
        )

    }
}
const mapStateToProps = (state) => {
    //console.log(state)
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