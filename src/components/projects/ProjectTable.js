import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import { Icon, Select, Breadcrumb } from 'semantic-ui-react'
import { Button, Step } from 'semantic-ui-react'
import faker from 'Faker'

class ProjectTable extends Component {
    state = {
        selectedProjectId: '',
        selectedProjectTitle: '',
        selected: -1,
        searching: '',
        result: []
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

    handleSearchChange = (e) => {
        let result = [];
        let projects = this.props.projects;
        const cc = this.getCurrentClient();

        this.setState({
            searching: e.target.value
        })

        if(projects){
            let resource = projects.filter(obj => {
                return obj.clientId === cc.id;
              })

            if(resource.length > 1) {
                resource.forEach(element => {
                    if(element.title.includes(e.target.value) )
                        result.push(element)
                });
                this.setState({
                    result: result
                })
            }
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
/*
    handleCreateSample = () => {
        const cc = this.getCurrentClient();
        const firestore = firebase.firestore();
        if(cc){
            firestore.collection('projects').add({
                title: faker.lorem.word(),
                status: 'ongoing',
                streetAddress: faker.address.streetAddress(),
                unitNumber: faker.random.alphaNumeric(),
                cityAddress: faker.address.city(),
                stateAddress: faker.address.stateAbbr(),
                zipCode: faker.address.zipCode(),
                clientId: cc.id,
                clientFirstName: cc.firstName,
                clientLastName: cc.lastName,
                authorFirstName: 'faker',
                authorLastName: 'faker',
                authorID: this.props.auth.uid,
                createdAt: new Date()
            })
        }
    }
*/
    handleDelete = () => {
        const firestore = firebase.firestore();
        if(this.state.selectedProjectId){
            if (window.confirm('Are you sure you wish to delete the following projects?   '+ this.state.selectedProjectTitle)) {
                firestore.collection('projects').doc(this.state.selectedProjectId).delete();
                this.setState({
                    selectedProjectId: '',
                    selectedProjectTitle: '',
                    selected: -1
                })
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
        //console.log(this.props)
    
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
                            
                            <Link to={'/client/'+this.props.match.params.id+'/projects/'+row.original.id+'/'}>
                                <Button animated style={{backgroundColor: '#fafafa'}}>
                                    <Button.Content visible>Details</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>
                            
                            </Link>
                        </div>
                    )
            }
        ]

        let cc = this.getCurrentClient();
        const { projects, auth } = this.props;
        if(auth.isLoaded && !auth.uid) return <Redirect to='/signin' />
        const cid = this.props.match.params.id;

        if(projects){
            var result = projects.filter(obj => {
                return obj.clientId === cid;
              })
        } 
        //console.log(result)
        return (
            <div className="dashboard container" style={{paddingTop:50, minWidth:1000, minHeight:1200}}>
                
                <nav className="nav-extended grey lighten-1" style={{background: 'linear-gradient(-90deg, #424242, #9e9e9e)'}}>
                    <div className="col grey" style={{paddingLeft: 10, background: 'linear-gradient(-90deg, #424242, #9e9e9e)'}}>
                        <a href="/client" className="breadcrumb">Clients</a>
                        <a href="#!" className="breadcrumb">
                            {
                                cc ?
                                cc.firstName+' '+cc.lastName+'\'s Projects'
                                :
                                <div className="progress">
                                    <div className="indeterminate"></div>
                                </div>
                            }
                        </a>
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
                                    
                                    this.props.projects && this.props.projects.length > 0 ? 
                                    
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
                        this.state.searching ? this.state.result : result
                    }
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    getTdProps={(state, rowInfo, column, instance) => {
                        if (typeof rowInfo !== "undefined") {
                            return {
                                onClick: (e, handleOriginal) => {
                                    if  (this.state.selected === -1 || (this.state.selected !== -1 && this.state.selectedProjectId !== rowInfo.original.id)){
                                        this.setState({
                                            selectedProjectId: rowInfo.original.id,
                                            selectedProjectTitle: rowInfo.original.title,
                                            selected: rowInfo.index
                                        })
                                    } else {
                                        this.setState({
                                            selectedProjectId: '',
                                            selectedProjectTitle: '',
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