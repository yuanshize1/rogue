import React from 'react'
import { NavLink } from 'react-router-dom'

const ProjectLinks = ({cid}) => {
    return(
        <ul className="tabs tabs-transparent">
            {console.log(cid)}
            <li><NavLink to={'/'+cid+'/createproject'}>Create</NavLink></li>
            <li><NavLink to='/deleteproject'>Delete</NavLink></li>
            <li>Sort</li>
            <li><NavLink to='/editproject'>Edit</NavLink></li>
        </ul>
    )
}


export default ProjectLinks