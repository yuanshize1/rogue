import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table-v6'
import { Icon, Select } from 'semantic-ui-react'
import { Button, Step } from 'semantic-ui-react'
import _ from 'lodash'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import ReactSearchBox from 'react-search-box'



class Dashboard extends Component {
    state = {
        result: []
    };

    handleResultSelect = (e, { result }) => this.setState({ value: result.id })

    getSource = () => {
        let source = [];
        let client = {};
        if(this.props.clients){
            this.props.clients.forEach(element => {
                client.id = element.id;
                client.name = element.firstName+' '+element.lastName;
                client.username = element.username;
                source.push(client);
                client = {};
            });
        }

        return source;
    }

    handleSearchChange = (e) => {
        let result = [];
        let resource = this.props.clients;
        //console.log(e)
        if(resource.length > 1) {
            resource.forEach(element => {
                if(element.username.includes(e.target.value))
                    result.push(element)
            });
            this.setState({
                result: result
            })
        }

    }
    
    handleSearch = (e) => {
        e.preventDefault();
        
        console.log(e.target.value)

    }

    handleCreate = () => {
        this.props.history.push('/createclient')
    }

    handleView = () => {
        this.props.history.push('/client')
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
                Header: 'Projects',
                width: 75,
                Cell: (row) => (
                        
                        <div>
                            <Link to={'/client/'+row.original.id+'/projects/'}>
                                <Icon name='arrow circle right' size='big' />
                            </Link>
                        </div>
                    )
            }
        ]
        const { clients, auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        const { isLoading, value, results } = this.state;
        const source = this.getSource();
        return (
            <div className="dashboard container" style={{paddingTop:50}}>                   
                <Button color='green' onClick={this.handleCreate} ><Icon name='add' size='small'/>Create a new Client</Button>
                <Button color='green' onClick={this.handleView} ><Icon name='users' size='small'/>View All Clients</Button>
                <h1>Search client</h1>
                
                
                {
                    source.length===0 ? <h1>loading</h1>
                    :
                    <form className="white">
                        <input
                            type="text" 
                            id="searchbar"
                            onChange={(e) => {this.handleSearchChange(e)}}
                        />
                        <div className="input-field">
                            <button className="btn" onClick={(e) => {this.handleSearch(e)}}>Search</button>
                        </div>
                    </form>
                    
                }
                {
                    this.state.result.length > 0 ? 
                    <ReactTable
                        data={this.state.result}
                        columns={columns}
                        defaultPageSize={20}
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
                                        
                                        background: rowInfo.index === this.state.selected ? '#80cbc4' : '',
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
                    :
                    <h1>no result</h1>
                
                }
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
        {collection: 'clients'}
    ])
)(Dashboard)