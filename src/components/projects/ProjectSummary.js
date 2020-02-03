import React from 'react'
import { Link } from 'react-router-dom'

const ProjectSummary = ({project}) => {
    //<td>Posted by {project.authorFirstName} {project.authorLastName}</td>
    //<td>{moment(project.createdAt.toDate()).calendar()}</td>
    return (
        <tr>
            <td>
                <label>
                    <input type="checkbox" />
                    <span>&nbsp;</span>
                </label>
            </td>
            <td>{project.title}</td>
            <td>{project.status}</td>
            <td>
                {project.streetAddress}
                &nbsp;
                {project.unitNumber}
                &nbsp;
                {project.cityAddress}
                ,&nbsp;
                {project.stateAddress}
                &nbsp;
                {project.zipCode}
            </td>
            <td>
                <Link to={'/client/:id/project/' + project.id} key={project.id}>link</Link>
            </td>
        </tr>

    )
}

export default ProjectSummary