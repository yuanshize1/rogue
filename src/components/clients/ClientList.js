import React, { Component } from 'react'
import ClientSummary from './ClientSummary'


//const ClientList = ({clients}) => {
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
        return (
            <tbody>
                {this.props.clients && this.props.clients.map(client => {
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

export default ClientList