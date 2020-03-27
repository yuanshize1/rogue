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
import faker from 'faker'

class Dashboard extends Component {
    state = {
        selectedClientId: '',
        selectedClientFirstName: '',
        selectedClientLastName: '',
        selected: -1,
        searching: '',
        result: this.props.clients
    }

    handleSearchChange = (e) => {
        let result = [];
        let resource = this.props.clients;

        this.setState({
            searching: e.target.value
        })
        if(resource.length > 1) {
            resource.forEach(element => {
                if(element.firstName.includes(e.target.value) || element.lastName.includes(e.target.value) || element.username.includes(e.target.value) || element.email.includes(e.target.value))
                    result.push(element)
            });
            this.setState({
                result: result
            }) 
        }

    }

    handleCreate = () => {
        this.props.history.push('/createclient')
    }
/*
    handleCreateSample = () => {
        const firestore = firebase.firestore();
        firestore.collection('clients').add({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username:faker.internet.userName(),
            role: 'engineer',
            email: faker.internet.email(),
            primaryContact: faker.phone.phoneNumber(),
            secondaryContact: faker.phone.phoneNumber(),
            authorID: this.props.auth.uid,
            createdAt: new Date()
        })
    }
*/
    handleDelete = () => {
        const firestore = firebase.firestore();
        if(this.state.selectedClientId){
            if (window.confirm('Are you sure you wish to delete the following client?   '+ this.state.selectedClientFirstName+' '+this.state.selectedClientLastName)) {
                firestore.collection('clients').doc(this.state.selectedClientId).delete();
                this.setState({
                    selectedClientId: '',
                    selectedClientFirstName: '',
                    selectedClientLastName: '',
                    selected: -1
                })
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
                Header: 'Add. Contact',
                accessor: 'secondaryContact'
            }, {
                id: 'col6',
                Header: '',
                width: 100,
                Cell: (row) => (
                        
                        <div>
                            <Link to={'/client/'+row.original.id+'/projects/'} >
                                <Button animated style={{backgroundColor: '#fafafa'}}>
                                    <Button.Content visible >Projects</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>
                            
                            </Link>
                        </div>
                    )
            }
        ]
        const { clients, auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="dashboard container" style={{paddingTop:50, minWidth:1000, minHeight:1200}}>
                
   

                        
                <nav className="nav-extended grey lighten-1" style={{background: 'linear-gradient(-90deg, #424242, #9e9e9e)'}}>
                    <div className="col grey" style={{paddingLeft: 10, background: 'linear-gradient(-90deg, #424242, #9e9e9e)'}}>
                        <a href="#!" className="breadcrumb">Clients</a>
                    </div>
                    <div className="nav-wrapper" >
                        <ul style={{paddingLeft:10}}>
                            <li><Button color='green' onClick={this.handleCreate} ><Icon name='add' size='small'/>Create</Button></li>
                            {/*<li><Button color='orange' onClick={this.handleCreateSample}>Create a random Client</Button></li>*/}
                            <li>
                                {
                                    this.state.selected === -1 ? 
                                    <Button disabled ><Icon name='delete' size='small'/>Delete</Button>
                                    :
                                    <Button color='red' onClick={this.handleDelete} ><Icon name='delete' size='small'/>Delete</Button>
                                }
                            </li>   
                            <li> 
                                {
                                    this.state.selected === -1 ? 
                                    <Button disabled ><Icon name='edit' size='small'/>Edit</Button>
                                    :
                                    <Button color='blue' onClick={this.handleEdit} ><Icon name='edit' size='small'/>Edit</Button>
                                }
                            </li>

                            <li className="right" style={{paddingRight: 20}}>
                                {
                                    
                                    this.props.clients && this.props.clients.length > 0 ? 
                                    
                                    <input
                                        style={{background: 'white', paddingLeft: 10}}
                                        type="text" 
                                        id="searchbar"
                                        placeholder="search..."
                                        onChange={(e) => {this.handleSearchChange(e)}}
                                    />
                                
                                    
                                    :
                                    <p>Create a Client to search</p>
                                    
                                }
                            </li>
                        </ul>

                    </div>
                </nav>
            
                
                <ReactTable
                    data={
                        this.state.searching ? this.state.result : this.props.clients
                    }
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    getTdProps={(state, rowInfo, column, instance) => {
                        if (typeof rowInfo !== "undefined") {
                            return {
                                onClick: (e, handleOriginal) => {
                                    
                                    if  (this.state.selected === -1 || (this.state.selected !== -1 && this.state.selectedClientId !== rowInfo.original.id)){
                                        this.setState({
                                            selectedClientId: rowInfo.original.id,
                                            selectedClientFirstName: rowInfo.original.firstName,
                                            selectedClientLastName: rowInfo.original.lastName,
                                            selected: rowInfo.index
                                        })
                                    } else {
                                        this.setState({
                                            selectedClientId: '',
                                            selectedClientFirstName: '',
                                            selectedClientLastName: '',
                                            selected: -1
                                        })
                                    }
                                    
                                    if (handleOriginal) {
                                        handleOriginal()
                                    }
                                },
                                style: {
                                    
                                    background: rowInfo.index === this.state.selected ? '#b2dfdb' : '',
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
        {collection: 'clients', orderBy: ['createdAt', 'desc']}
    ])
)(Dashboard)