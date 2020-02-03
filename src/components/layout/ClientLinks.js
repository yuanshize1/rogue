import React from 'react'
import { NavLink } from 'react-router-dom'

const ClientLinks = () => {
    return(
        <ul className="tabs tabs-transparent">
            <li><NavLink to='/createclient'>Create</NavLink></li>
            <li><NavLink to='/deleteclient'>Delete</NavLink></li>
            <li>Sort</li>
            <li><NavLink to='/editclient'>Edit</NavLink></li>
        </ul>
    )
}


export default ClientLinks