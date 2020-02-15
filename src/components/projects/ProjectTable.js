import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
class ProjectTable extends Component {
    state = {
        selectedProjectId: '',
        selectedProjectTitle: '',
        selected: -1
    }
    
    getCurrentClient() {
        let cc = {};
        const cid = this.props.match.params.id;
        if(this.props.clients){
            this.props.clients.forEach(element => {
                if (element.id == cid){
                    cc = element;
                }   
            })
            return cc;
        }
        
    } 
    handleCreate = () => {
        const cc = this.getCurrentClient();
        if(cc){
            const link = {
                pathname:'/' + this.props.match.params.id + '/createproject',
                clientfirstname:cc.firstName,
                clientlastname:cc.lastName
            }
            this.props.history.push(link)
        }
    }

    handleDelete = () => {
        const firestore = firebase.firestore();
        //console.log(this.state)
        if(this.state.selectedProjectId){
            if (window.confirm('Are you sure you wish to delete the following projects?   '+ this.state.selectedProjectTitle)) {
                firestore.collection('projects').doc(this.state.selectedProjectId).delete();
            }
        } else {
            alert("Select at least one project by checking the box to delete!");
        }
    }

    handleEdit = () => {
        const cc = this.getCurrentClient();
        if(cc){
            const link = {
                pathname:'/client/' + this.props.match.params.id + '/editproject/' + this.state.selectedProjectId,
                clientfirstname:cc.firstName,
                clientlastname:cc.lastName
            }
            this.props.history.push(link)
        }
    }

    render(){
        const columns = [
            {   
                id: 'col1',
                Header: 'Title',
                accessor: 'title' // String-based value accessors!
            }, {
                id: 'col2',
                Header: 'Status',
                width: 100,
                accessor: 'status'
            }, {
                id: 'col3',
                Header: 'Address',
                accessor: d => d.unitNumber+' '+d.streetAddress+', '+d.cityAddress+', '+d.stateAddress+' '+d.zipCode
            }, {
                id: 'col4',
                Header: '',
                width: 100,
                Cell: (row) => (
                        
                        <div>
                            
                            <Link to={'/client/'+this.props.match.params.id+'/projects/'+row.original.id}>Details</Link>
                        </div>
                    )
            }
        ]
        const cc = this.getCurrentClient();
        const { projects, auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        const cid = this.props.match.params.id;
        
        if(projects){
            var result = projects.filter(obj => {
                return obj.clientId === cid;
              })
        } 
        //console.log(result)
        return (
            <div className="container">
                <nav className="nav-extended grey">
                    <div className="container">
                        <h5 className="center">
                            {
                                cc ?
                                cc.firstName+' '+cc.lastName+' \'s Projects'
                                :
                                'loading projects...'

                            }
                        </h5>
                        <ul className="tabs tabs-transparent">
                            <li><button onClick={this.handleCreate} >Create</button></li>
                            <li><button onClick={this.handleDelete} >Delete</button></li>
                            <li><button onClick={this.handleEdit} >Edit</button></li>
                        </ul>
                    </div>
                </nav>
                <ReactTable
                    data={result}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    getTdProps={(state, rowInfo, column, instance) => {
                        if (typeof rowInfo !== "undefined") {
                            return {
                                onClick: (e, handleOriginal) => {
                                    this.setState({
                                        selectedProjectId: rowInfo.original.id,
                                        selectedProjectTitle: rowInfo.original.title,
                                        selected: rowInfo.index
                                    });
                                    if (handleOriginal) {
                                        handleOriginal()
                                    }
                                },
                                style: {
                                    background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                }
                            };
                        }
                        else {
                            return {
                                onClick: (e, handleOriginal) => {
                                    this.setState({
                                        selectedProjectId: '',
                                        selectedProjectTitle: '',
                                        selected: -1
                                    });
                                    if (handleOriginal) {
                                        handleOriginal()
                                    }
                                },
                                style: {
                                    background: 'white',
                                    color: 'black'
                                },
                            }
                        }
                    }}
                />  

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    
    /*let currentClient = '';
    console.log(state);
    state.firestore.ordered.clients&&state.firestore.ordered.clients.forEach(client => {
        
    });*/
    return {
        //projects: state.project.projects
        clients: state.firestore.ordered.clients,
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth

    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects', orderBy: ['createdAt', 'desc']},
        {collection: 'clients', orderBy: ['createdAt', 'desc']}
    ])
)(ProjectTable)