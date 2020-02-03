import React from 'react'
import ClientSummary from './ClientSummary'


const ClientList = ({clients}) => {
    return (
        <tbody>
            {clients && clients.map(client => {
                return (
                    <ClientSummary client={client}  key={client.id} />
                )
            })}
        </tbody>
    )
}

export default ClientList