import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import ClientSummary from './ClientSummary'

class ClientList extends Component {
    state = {
        chosenClients: []
    }
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (id) { 
        var clientArr = [...this.state.chosenClients]

        if(clientArr.includes(id)){
            const index = clientArr.indexOf(id);
            if(index > -1) {
                clientArr.splice(index, 1);
            }
        }else{
            clientArr.push(id);
        }
        
        this.setState({
            chosenClients: clientArr
        })

        this.props.onChange(clientArr);
        
    }
    render() {
        var obj = this.props.clients;
        if (obj) {
            if (this.props.sortBy == 1) {
                obj.sort((a, b) => a.firstName.localeCompare(b.firstName));
            }
            if (this.props.sortBy == 2) {
                obj.sort((a, b) => b.firstName.localeCompare(a.firstName));
            }
            if (this.props.sortBy == 3) {
                obj.sort((a, b) => a.role.localeCompare(b.role));
            }
            if (this.props.sortBy == 4) {
                obj.sort((a, b) => b.role.localeCompare(a.role));
            }
        }
        return (
            <tbody>
                {obj && obj.map(client => {
                    return (
                        <tr key={client.id}>
                        <td>
                            <label>
                                <input 
                                    //name="chosenClients" 
                                    type="checkbox"
                                    onChange={() => this.handleChange(client.id)}
                                />
                                <span>&nbsp;</span>
                            </label>
                        </td>
                        
                        <ClientSummary client={client} />
                        </tr>
                    )
                })}
                
                
            </tbody>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        clients: state.firestore.ordered.clients,
        auth: state.firebase.auth
    }
}
export default withRouter(compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'clients', orderBy: ['firstName', 'desc']}
    ])
)(ClientList))
