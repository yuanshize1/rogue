import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import { Icon, Select, Dropdown, Button, Step, Header, Modal, Popup, Image, Input, Form} from 'semantic-ui-react'
import { createProject } from '../../store/actions/projectActions'
import faker from 'faker'
import _ from 'lodash'

class ProjectTable extends Component {
    state = {
        openCreate: false,
        openEdit: false,
        openDelete: false,
        selected: [],
        searching: '',
        result: [],
        displayCount: 10,


        title: '',
        status: '',
        streetAddress: '',
        unitNumber: '',
        cityAddress: '',
        stateAddress: '',
        zipCode: '',
        description: '',

        titleError: '',
        statusError: '',
        streetAddressError: '',
        cityAddressError: '',
        stateAddressError: '',
        zipCodeError: '',
        
        clientId: this.props.location.state ? this.props.location.state.id : '',
        clientFirstName: this.props.location.state ? this.props.location.state.firstName : '',
        clientLastName: this.props.location.state ? this.props.location.state.lastName : ''
    }
    
    validate = () => {
        let titleError= '';
        let statusError= '';
        let streetAddressError= '';
        let cityAddressError= '';
        let stateAddressError= '';
        let zipCodeError= '';


        if (!this.state.title) {
            titleError = 'Title cannot be blank'
        }

        if (this.state.status == 'choose') {
            statusError = 'must select status'
        }

        if (!this.state.status) {
            statusError = 'must select status'
        }

        if (!this.state.streetAddress) {
            streetAddressError = 'Street Address cannot be blank'
        }

        if (!this.state.cityAddress) {
            cityAddressError = 'City cannot be blank'
        }

        if (!this.state.stateAddress) {
            stateAddressError = 'State cannot be blank'
        }

        if (!this.state.zipCode) {
            zipCodeError = 'zip code cannot be blank'
        }

        if (this.state.zipCode.length != 5) {
            zipCodeError = 'invalid zip code'
        }

        /*
        if (!(!this.state.zipCode.match("^[0-9 ]*$"))) {
            zipCodeError = 'zip code can only have numbers in the US'
        }
        */
        //setting state with object, awesome js syntax
        if (titleError || statusError || streetAddressError || cityAddressError || stateAddressError || zipCodeError) {
            this.setState({ titleError, statusError, streetAddressError, cityAddressError, stateAddressError, zipCodeError });
            return false;
        }

        return true;

    }

    getCurrentClient() {
        let cc = { id:'', firstName: '', lastName: ''};
        //console.log(this.props.location);
        if(this.props.location.state){
            const cid = this.props.location.state.id;
            if(cc) {
                cc['id'] = cid;
                cc['firstName'] = this.props.location.state.firstName;
                cc['lastName'] = this.props.location.state.lastName;
            }
        }
        
        
        return cc;
    } 

    getIndex(id) {
        let array = [...this.state.selected];
        return array.findIndex(obj => obj.id === id);
    }

    handleSearchChange = (e) => {
        let result = [];
        let projects = this.props.projects;
        const cc = this.getCurrentClient();

        this.setState({
            searching: e.target.value
        })
        //console.log(cc);
        if(projects){
            
            let resource = cc.id ? projects.filter(obj => {
                return obj.clientId === cc.id;
                }) : projects;
            
            

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

    openCreate = () => {this.setState({ openCreate: true })}
    openEdit = () => {this.setState({ openEdit: true })}
    openDelete = () => this.setState({ openDelete: true })

    closeCreate = () => this.setState({ openCreate: false })
    closeEdit = () => this.setState({ openEdit: false })
    closeDelete = () => this.setState({ openDelete: false })

    handleClose = () => this.setState({ modalOpen: false })

    handleChange = (e) => {
        console.log(e.target.id)
        console.log(e.target)
        console.log(e.target.text)
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleDisplayCountChange=(e,{value})=>this.setState({displayCount:value})
    handleStatusChange=(e,{value})=>this.setState({status:value})
    handleStateChange=(e,{value})=>this.setState({stateAddress:value})

    handleCreate = () => {
        console.log(this.props.location.state);
        
        //const isValid = this.validate();
        //if (isValid) {
            this.props.createProject(this.state)
            this.setState({ openCreate: false })
        //}
        /*
        if(cc.id){
            const link = {
                pathname:'/' + this.props.match.params.id + '/createproject',
                clientfirstname:cc.firstName,
                clientlastname:cc.lastName
            }
            this.props.history.push(link)
        }*/

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
        if(this.state.selected.length > 0){
            this.state.selected.forEach(element => {
                firestore.collection('projects').doc(element.id).delete();
            });
            
            this.setState({
                selected: [],
                openDelete: false
            })
            
        } else {
            alert("Select at least one project by checking the box to delete!");
        }
    }

    handleEdit = () => {
        const cc = this.getCurrentClient();
        console.log(cc.id);
        if(cc.id){
            const link = {
                pathname:'/client/' + this.props.match.params.id + '/editproject/' + this.state.selected[0].id,
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
                accessor: 'status',
            }, {
                id: 'col3',
                Header: 'Address',
                accessor: d => d.unitNumber+' '+d.streetAddress+', '+d.cityAddress+', '+d.stateAddress+' '+d.zipCode
            }, {
                id: 'col4',
                Header: '',
                width: 100,
                Cell: (row) => (
                    <Link to={'/project/'+row.original.id}>
                        <Button animated style={{backgroundColor: '#fafafa'}}>
                            <Button.Content visible>Details</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button>
                    
                    </Link>   
                )
            }
        ]
        const statusOptions = [
            {
                key: 'New',
                text: 'New',
                value: 'New',
            },
            {
                key: 'Started',
                text: 'Started',
                value: 'Started',
            },
            {
                key: 'Completed',
                text: 'Completed',
                value: 'Completed',
            },
            {
                key: 'Closed',
                text: 'Closed',
                value: 'Closed',
            }
        ]
        const countOptions = [
            {
                key: '5',
                text: '5',
                value: '5',
            },
            {
                key: '10',
                text: '10',
                value: '10',
            },
            {
                key: '30',
                text: '30',
                value: '30',
            },
            {
                key: '50',
                text: '50',
                value: '50',
            },
            {
                key: '100',
                text: '100',
                value: '100',
            },

        ]
        const addressDefinitions = faker.definitions.address
        const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
        key: addressDefinitions.state_abbr[index],
        text: state,
        value: addressDefinitions.state_abbr[index],
        }))
        let cc = this.getCurrentClient();
        const { projects, auth } = this.props;
        if(auth.isLoaded && !auth.uid) return <Redirect to='/signin' />
        const cid = this.props.match.params.id;
        const { selectedValue } = this.state;

        if(projects){
            if(cid) {
                var result = projects.filter(obj => {
                    return obj.clientId === cid;
                })
            } else {
                var result = projects;
            }
            
        } 
        const items = this.state.selected.map(function(item){
            return <li>{item.title}</li>;
        });
        //console.log(this.state.displayCount);
        return (
            <div className="dashboard container" style={{minWidth:1000, minHeight:1200}}>
                
                <nav className="nav-extended grey lighten-1" style={{background: 'linear-gradient(-90deg, #424242, #9e9e9e)'}}>
                    {
                        cid ?
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
                        :
                        <div className="col grey" style={{paddingLeft: 10, background: 'linear-gradient(-90deg, #424242, #9e9e9e)'}}>
                            <a href="#!" className="breadcrumb">All Projects</a>
                        </div>
                    }
                    
                    <div className="nav-wrapper" >
                        <ul style={{paddingLeft:10}}>
                            <li>
                                <Modal 
                                    trigger={<Button color='green' onClick={this.openCreate} ><Icon name='add' size='small'/>Create</Button>} 
                                    closeIcon={{ style: { top: '1rem', right: '1rem' }, color: 'grey', name: 'close' }}
                                    closeOnEscape={false}
                                    closeOnDimmerClick={false}
                                    onClose={this.closeCreate}
                                    centered={false}
                                    open={this.state.openCreate}
                                    style={{padding: '8px'}}
                                    
                                >
                                    <Header><Icon name='edit' size='small'/>Creating Project{cid ? " for Client: "+cc.firstName+" "+cc.lastName : null}</Header>
                                    <Modal.Content scrolling> 
                                        <Modal.Description>
                                            <Form>
                                                {
                                                    cid ? 
                                                    <Form.Group>
                                                        <Form.Input required disabled control={Input} label='Customer ID' placeholder='Customer ID' defaultValue={cid} width={6}/>
                                                        <Form.Input required disabled control={Input} label='Customer firstname' placeholder='Customer firstname' defaultValue={cc.firstName} width={5}/>
                                                        <Form.Input required disabled control={Input} label='Customer lastname' placeholder='Customer lastname' defaultValue={cc.lastName} width={5}/>

                                                    </Form.Group>
                                                    :
                                                    <Form.Group>
                                                        <Form.Input required control={Input} label='Customer ID' placeholder='Customer ID' id='clientID'width={6} onChange={this.handleChange}/>
                                                        <Form.Input required control={Input} label='Customer firstname' placeholder='Customer firstname' id='clientFirstName' width={5} onChange={this.handleChange}/>
                                                        <Form.Input required control={Input} label='Customer lastname' placeholder='Customer lastname' id='clientLastName' width={5} onChange={this.handleChange}/>

                                                    </Form.Group>

                                                }
                                                <Form.Group>
                                                    <Form.Input required control={Input} label='Title' placeholder='Project Title' width={12} id='title' onChange={this.handleChange}/>
                                                    <Form.Select
                                                        required
                                                        style={{padding: '24px'}}
                                                        options={statusOptions}
                                                        label='Status'
                                                        placeholder='Status'
                                                        width={4}
                                                        value={selectedValue}
                                                        onChange={this.handleStatusChange}
                                                    />
                                                </Form.Group>
                                                <Form.Input required control={Input} label='Street Address' placeholder='Street Address' width={16} id="streetAddress" onChange={this.handleChange}/>
                                                <Form.Group>
                                                    <Form.Input control={Input} label='Apartment/Unit No.' placeholder='Apartment/Unit No.' width={4} id="unitNumber" onChange={this.handleChange}/>
                                                    <Form.Input required control={Input} label='City' placeholder='City' width={4} id="cityAddress" onChange={this.handleChange}/>
                                                    <Form.Input
                                                        required
                                                        style={{padding: '24px'}}
                                                        control={Select}
                                                        options={stateOptions}
                                                        label='State'
                                                        placeholder='State'
                                                        width={4}
                                                        id="stateAddress"
                                                        onChange={this.handleStateChange}
                                                    />
                                                    <Form.Input required control={Input} label='Zip Code' placeholder='Zip Code' width={4} id="zipCode" onChange={this.handleChange}/>
                                                </Form.Group>
                                                <Form.TextArea label='Description' placeholder='Project Description...' id="description" onChange={this.handleChange}/>

                                            </Form>
                                        </Modal.Description>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button color='grey' onClick={this.closeCreate}>
                                            <Icon name='remove' /> Cancel
                                        </Button>
                                        <Button color='blue' onClick={this.handleCreate}>
                                            Create <Icon name='chevron right' />
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                            </li>
                            {/*<li><Button color='orange' onClick={this.handleCreateSample}>Create a random Client</Button></li>*/}
                            <li>
                                {
                                    this.state.selected.length <= 0 ? 
                                    <div data-tooltip="Please select at least one project to delete" data-position="top center">
                                        <Button disabled><Icon name='trash' size='small'/>Delete</Button>
                                    </div>
                                    :
                                    <Modal 
                                        trigger={<Button onClick={this.openDelete} color='red'> <Icon name='trash' size='small'/>Delete</Button>} 
                                        open={this.state.openDelete}
                                        onClose={this.closeDelete}
                                        basic 
                                        size='small'
                                        closeIcon
                                    >
                                        <Header icon='trash' content='Delete Project' />
                                        <Modal.Content>
                                            <p>Please confirm you wish to delete the following projects:</p>
                                            <ul>{items}</ul>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='green' onClick={this.closeDelete}>
                                                <Icon name='remove' /> Cancel
                                            </Button>
                                            <Button color='red' onClick={this.handleDelete}>
                                                <Icon name='trash' /> Delete
                                            </Button>
                                        </Modal.Actions>
                                    </Modal>
                                }
                            </li>   
                            <li> 
                                {
                                    this.state.selected.length !== 1 ? 
                                    <div data-tooltip="Please select only one project to edit" data-position="top center">
                                        <Button disabled ><Icon name='edit' size='small'/>Edit</Button>
                                    </div>
                                    :
                                    <Modal 
                                        trigger={<Button color='blue' onClick={this.openEdit}><Icon name='edit' size='small'/>Edit</Button>} 
                                        closeIcon={{ style: { top: '1rem', right: '1rem' }, color: 'grey', name: 'close' }}
                                        closeOnEscape={false}
                                        closeOnDimmerClick={false}
                                        onClose={this.closeEdit}
                                        centered={false}
                                        open={this.state.openEdit}
                                        
                                    >
                                        <Header><Icon name='edit' size='small'/>Editing Project {this.state.selected[0].title}</Header>
                                        <Modal.Content scrolling> 
                                            <Modal.Description>
                                                <Form>
                                                    <Form.Group>
                                                        <Form.Input required control={Input} label='Title' placeholder='Project Title' width={12} />
                                                        <Form.Input
                                                            required
                                                            style={{padding: '24px'}}
                                                            control={Select}
                                                            options={statusOptions}
                                                            label='Status'
                                                            placeholder='Status'
                                                            width={4}
                                                        />
                                                    </Form.Group>
                                                    <Form.Input required control={Input} label='Street Address' placeholder='Street Address' width={16} />
                                                    <Form.Group>
                                                        <Form.Input control={Input} label='Apartment/Unit No.' placeholder='Apartment/Unit No.' width={4} />
                                                        <Form.Input required control={Input} label='City' placeholder='City' width={4} />
                                                        <Form.Input
                                                            required
                                                            style={{padding: '24px'}}
                                                            control={Select}
                                                            options={statusOptions}
                                                            label='State'
                                                            placeholder='State'
                                                            width={4}
                                                        />
                                                        <Form.Input required control={Input} label='Zip Code' placeholder='Zip Code' width={4} />
                                                    </Form.Group>
                                                    <Form.TextArea label='Description' placeholder='Project Description...' />

                                                </Form>
                                            </Modal.Description>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='grey' onClick={this.closeEdit}>
                                                <Icon name='remove' /> Cancel
                                            </Button>
                                            <Button color='blue' onClick={this.handleEdit}>
                                                Proceed <Icon name='chevron right' />
                                            </Button>
                                        </Modal.Actions>
                                    </Modal>
                                    
                                }
                            </li>
                            
                            <li className="right" style={{paddingRight: 20}}>
                    
                                    
                                    <Popup
                                        trigger={
                                        <input
                                            style={{background: 'white', paddingLeft: 10, borderRadius:'8px'}}
                                            type="text" 
                                            id="searchbar"
                                            placeholder="search..."
                                            onChange={(e) => {this.handleSearchChange(e)}}
                                        />}
                                        
                                        header='Search for projects'
                                        content='You may search by project title'
                                        on='hover'
                                        
                                    />
                                    
                                
                                    
                        
                                    
                        
                            </li>
                            <li className="right" style={{paddingRight: 20}}>
                                    Entries per page:&nbsp;
                                    <Dropdown compact selection text={this.state.displayCount} options={countOptions} onChange={this.handleDisplayCountChange} />                              
                            </li>

                        </ul>
                        
                    </div>
                </nav>
                {console.log(this.state.displayCount)}
                <ReactTable
                    data={
                        this.state.searching ? this.state.result : result
                    }
                    
                    columns={columns}
                    
                    pageSize={parseInt(this.state.displayCount)}
                    className="-striped -highlight"
                    getTdProps={(state, rowInfo, column, instance) => {
                        if (typeof rowInfo !== "undefined") {
                            return {
                                onClick: (e, handleOriginal) => {
                                    //console.log(rowInfo.original);
                                    let i = this.getIndex(rowInfo.original.id);
                                    if ( i === -1) {
                                        this.setState({
                                            selected: [...this.state.selected, 
                                                        rowInfo.original
                                            ]
                                        })
                                    } else {
                                        let array = [...this.state.selected];
                                        array.splice(i, 1);
                                        this.setState({selected: array});
                                    }
                                
                                    if (handleOriginal) {
                                        handleOriginal()
                                    }                           
                                },
                                style: {
                                    background: this.getIndex(rowInfo.original.id) === -1 ?  '' : '#b2dfdb',
                                    color: this.getIndex(rowInfo.original.id) === -1 ? 'black' : 'white'
                                }                        
                            };
                        }
                        else {
                            return {
                                onClick: (e, handleOriginal) => {
                                    this.setState({
                                        selected: []
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
        //clients: state.firestore.ordered.clients,
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'projects', orderBy: ['createdAt', 'desc']},
        //{collection: 'clients', orderBy: ['createdAt', 'desc']}
    ])
)(ProjectTable)