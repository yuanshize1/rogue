import React, { Component } from 'react'
import { Header, Icon, Menu, Sidebar, Dropdown } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { Route, Link, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class Toolbar extends Component {
    state = {
        path:this.props.location.pathname
    }
    //auth.isLoaded waiting for Auth Ready so the links don't flash
    render() {
        //console.log(this.props);

        

        return(
            <div>
                <Helmet>
                    <title>CMS</title>
                </Helmet>
    
                <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
                    <Link to={this.state.path+'/documents'}>
                        <Menu.Item name="Documents">
                            <Icon name="home" />
                            Documents
                        </Menu.Item>
                    </Link>
                    <a
                        target="_blank"
                        href="https://calendar.google.com/calendar/r"
                        rel="noopener noreferrer"
                    >
                        <Menu.Item name="Your-Calender">
                            <Icon name="calendar outline" />
                            Calender
                        </Menu.Item>
                    </a>
                    <Link to={this.state.path+'/invoices'}>
                        <Menu.Item name="Invoices">
                            <Icon name="home" />
                            Invoices
                        </Menu.Item>
                    </Link>
                    <Link to={this.state.path+'/tasks'}>
                        <Menu.Item name="Tasks">
                            <Icon name="home" />
                            Tasks
                        </Menu.Item>
                    </Link>
                </Sidebar>
    
            </div>
        )
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
)(Toolbar))