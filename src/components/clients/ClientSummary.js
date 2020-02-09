import React from 'react'
//import moment from 'moment'
import { Link } from 'react-router-dom'

const ClientSummary = ({client}) => {
    //<td>Posted by {project.authorFirstName} {project.authorLastName}</td>
    //<td>{moment(project.createdAt.toDate()).calendar()}</td>

        return (
            <>

                <td>
                    {client.firstName}
                    &nbsp;
                    {client.lastName}
                </td>
                <td>{client.role}</td>
                <td>{client.email}</td>
                <td>{client.primaryContact}</td>
                <td>{client.secondaryContact}</td>
                <td>
                    <Link to={'/client/' + client.id + '/projects'} key={client.id}>link</Link>
                </td>
            </>
    
        )
    
}

export default ClientSummary