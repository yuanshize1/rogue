import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table-v6'

class Dashboard extends Component {
    state = {
        selectedClientId: '',
        selectedClientFirstName: '',
        selectedClientLastName: '',
        selected: -1
    }
    
    handleCreate = () => {
        this.props.history.push('/createclient')
    }

    handleDelete = () => {
        const firestore = firebase.firestore();
        if(this.state.selectedClientId){
            //console.log(this.state)
            if (window.confirm('Are you sure you wish to delete the following client?   '+ this.state.selectedClientFirstName+' '+this.state.selectedClientLastName)) {
                firestore.collection('clients').doc(this.state.selectedClientId).delete();
            }
        } else {
            alert("Select at least one client by checking the box to delete!");
        }
    }

    handleEdit = () => {
        //console.log(this.props)

        if(this.state.selectedClientId){
            const link = {
                pathname:'/editclient/' + this.state.selectedClientId
            }
            this.props.history.push(link)
        } else {
            alert("Select at least one client by checking the box to edit!");
        }
    }
    render(){
        const columns = [
            {   
                id: 'col1',
                Header: 'Name',
                accessor: d => d.firstName+' '+d.lastName
            }, {
                id: 'col2',
                Header: 'Role',
                width: 100,
                accessor: 'role'
            }, {
                id: 'col3',
                Header: 'email',
                accessor: 'email'
            }, {
                id: 'col4',
                Header: 'Phone No.',
                accessor: 'primaryContact'
            }, {
                id: 'col5',
                Header: 'Addl. Contact',
                accessor: 'secondaryContact'
            }, {
                id: 'col6',
                Header: 'Projects',
                width: 100,
                Cell: (row) => (
                        
                        <div>
                            <Link to={'/client/'+row.original.id+'/projects/'}>Projects</Link>
                        </div>
                    )
            }
        ]
        const { clients, auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="dashboard container">
                <nav className="nav-extended grey">
                    <div className="container">
                        <h5 className="center">
                            Clients
                        </h5>
                        <ul className="tabs tabs-transparent">
                            <li><button onClick={this.handleCreate} >Create</button></li>
                            <li><button onClick={this.handleDelete} >Delete</button></li>
                            <li><button onClick={this.handleEdit} >Edit</button></li>
                        </ul>
                    </div>
                </nav>
                <ReactTable
                    data={clients}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    getTdProps={(state, rowInfo, column, instance) => {
                        if (typeof rowInfo !== "undefined") {
                            return {
                                onClick: (e, handleOriginal) => {
                                    //console.log(rowInfo.original)
                                    this.setState({
                                        selectedClientId: rowInfo.original.id,
                                        selectedClientFirstName: rowInfo.original.firstName,
                                        selectedClientLastName: rowInfo.original.lastName,
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
                                        selectedClientId: '',
                                        selectedClientFirstName: '',
                                        selectedClientLastName: '',
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