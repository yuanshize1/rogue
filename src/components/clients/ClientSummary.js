import React from 'react'
import { Link } from 'react-router-dom'
import ProjectTable from '../projects/ProjectTable'
const ClientSummary = ({client}) => {
    //<td>Posted by {project.authorFirstName} {project.authorLastName}</td>
    //<td>{moment(project.createdAt.toDate()).calendar()}</td>
        const link = {
            pathname:'/client/' + client.id + '/projects',
            clientfirstname:client.firstName,
            clientlastname:client.lastName
        }
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
                    
                    <Link 
                        to={link} 
                        key={client.id} 
                    >
                        link
                    </Link>
                </td>
            </>
    
        )
    
}

export default ClientSummary