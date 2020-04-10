import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import Documents from './documents/Documents';
import Calendar from './calendar/Calendar';
import Invoices from './invoices/Invoices';
import Tasks from './tasks/Tasks';
import { Icon, Button } from 'semantic-ui-react';
import faker from 'Faker';
import firebase from 'firebase/app';
class ProjectDetail extends Component {
    state = {
        document: 0,
        calendar:0,
        invoice:0,
        task:0
    }
    getCurrentProject() {
        if(this.props.projects){
            var result = this.props.projects.filter(obj => {
                return obj.id === this.props.match.params.project_id
              })
            
            return result[0];
        }
    } 
 
    handleClickDocument = () => {
        this.setState({
            document: 1,
            calendar:0,
            invoice:0,
            task:0
        })
    }
    handleClickCalendar = () => {
        this.setState({
            document: 0,
            calendar:1,
            invoice:0,
            task:0
        })
    }
    handleClickInvoice = () => {
        this.setState({
            document: 0,
            calendar:0,
            invoice:1,
            task:0
        })
    }
    handleClickTask = () => {
        this.setState({
            document: 0,
            calendar:0,
            invoice:0,
            task:1
        })
    }
    /*
    handleCreateSample = () => {
        //var faker = require('faker');
        const cp = this.getCurrentProject();
        const firestore = firebase.firestore();
        if(cp){
            firestore.collection('documents').add({
                name: faker.lorem.word(),
                type: faker.system.commonFileType(),
                link: 'https://www.google.com/drive/',
                projectID: cp.id,
                clientID: cp.clientId,
                authorFirstName: 'faker',
                authorLastName: 'faker',
                authorID: this.props.auth.uid,
                createdAt: new Date()
            })
            firestore.collection('calendar').add({
                name: faker.lorem.word(),
                type: faker.system.commonFileType(),
                link: 'https://www.google.com/calendar/',
                projectID: cp.id,
                clientID: cp.clientId,
                authorFirstName: 'faker',
                authorLastName: 'faker',
                authorID: this.props.auth.uid,
                createdAt: new Date()
            })
            firestore.collection('invoices').add({
                title: faker.lorem.word(),
                invoiceNo: faker.random.number(),
                orderedBy: faker.name.firstName() + ' ' + faker.name.lastName(),
                projectID: cp.id,
                clientID: cp.clientId,
                authorFirstName: 'faker',
                authorLastName: 'faker',
                authorID: this.props.auth.uid,
                createdAt: new Date()
            })
            firestore.collection('tasks').add({
                title: faker.lorem.word(),
                orderedBy: faker.name.firstName() + ' ' + faker.name.lastName(),
                projectID: cp.id,
                clientID: cp.clientId,
                authorFirstName: 'faker',
                authorLastName: 'faker',
                authorID: this.props.auth.uid,
                createdAt: new Date()
            })
        }
    }
*/
    render() {
        
        var result = this.getCurrentProject();

        if(result) {
            const path = '/client/'+result.clientId+'/projects/'+result.id;
            const prev = '/client/'+result.clientId+'/projects/';
            return (
                <div className="dashboard container" style={{paddingTop:50, minWidth:1000, minHeight:1200}}>
                    <nav className="nav-extended grey lighten-1" style={{background: 'linear-gradient(-90deg, #424242, #9e9e9e)'}}>
                        <div className="col grey" style={{paddingLeft: 10, background: 'linear-gradient(-90deg, #424242, #9e9e9e)'}}>
                            <a href="/client" className="breadcrumb">Clients</a>
                            <a href={prev} className="breadcrumb">
                                {
                                    result ? 
                                    result.clientFirstName+
                                    ' '+result.clientLastName+
                                    '\'s Projects'
                                    :
                                    'loading client details...'
                                } 
                            </a>
                            <a href="#!" className="breadcrumb">
                                {
                                    result ? 
                                    result.title+' Details'
                                    :
                                    'loading client details...'
                                } 
                            </a>
    
                        </div>
                        <div className="nav-wrapper" >

                            {/*<ul style={{paddingLeft:10}}>
                                <li><Button color='orange' onClick={this.handleCreateSample}>Magic button</Button></li>
                            </ul>*/}
                        </div>
                    </nav>


                    <div style={{border: '0px solid black', minHeight:600}}>
                        <div className="row">
                            <div className="col s1" style={{borderLeft: '1px solid black', borderBottom:'1px solid black', borderTop:'1px solid black', minHeight:600}}>
                                <button className="row center" style={
                                                                        this.state.document === 1 ?
                                                                        {border: '0px solid black', float: 'right', backgroundColor:'white', minHeight:100}
                                                                        :
                                                                        {border: '0px solid black', float: 'right', minHeight:100}
                                                                    } onClick={this.handleClickDocument}>
                                    <Link to={path+'/documents'}>
                                        <Icon name="folder outline" size="huge" />
                                        <p>Documents</p>
                                    </Link>
                                    
                                    
                                </button>
                                <div className="row center" style={
                                                                        this.state.calendar === 1 ?
                                                                        {border: '0px solid black', float: 'right', backgroundColor:'white', minHeight:100}
                                                                        :
                                                                        {border: '0px solid black', float: 'right', minHeight:100}
                                                                    } onClick={this.handleClickCalendar}>
                                    <Link to={path+'/calendar'} >
                                        <Icon name="calendar outline" size="huge" />
                                        <p>Calendar</p>
                                        
                                    </Link>
                                    
                                </div>
                                <div className="row center" style={
                                                                        this.state.invoice === 1 ?
                                                                        {border: '0px solid black', float: 'right', backgroundColor:'white', minHeight:100}
                                                                        :
                                                                        {border: '0px solid black', float: 'right', minHeight:100}
                                                                    } onClick={this.handleClickInvoice}>
                                    <Link to={path+'/invoices'} >
                                        <Icon name="file alternate outline" size="huge" />
                                        <p>Invoices</p>
                                        
                                    </Link>
                                    
                                </div>
                                <div className="row center" style={
                                                                        this.state.task === 1 ?
                                                                        {border: '0px solid black', float: 'right', backgroundColor:'white', minHeight:100}
                                                                        :
                                                                        {border: '0px solid black', float: 'right', minHeight:100}
                                                                    } onClick={this.handleClickTask}>
                                    <Link to={path+'/tasks'} >
                                        <Icon name="tasks" size="huge" />
                                        <p>Tasks</p>
                                    </Link>
                                    
                                </div>
                            </div>
                            
                            <div className="col s11" style={{border: '0px solid black', borderTop:'1px solid black',borderBottom:'1px solid black',borderRight:'1px solid black',minHeight:600, backgroundColor:'white'}}>
                                
                                
                                <div className="row" style={{border:'0px solid red'}}>
                                    {this.props.location.pathname.includes('documents') && <Documents />}
                                </div>
                                        
                                        {this.props.location.pathname.includes('calendar') && <Calendar />}
                                        {this.props.location.pathname.includes('invoices') && <Invoices />}
                                        {this.props.location.pathname.includes('tasks') && <Tasks />}
                                    
                                    
                                    
                                            
                                    
                                    
                            
                                

                            </div>
                            
                            
                        </div>
                    </div>

                </div>
                    
    
    
                
            )
    
        }else {
            return (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            )
        }
        
        
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