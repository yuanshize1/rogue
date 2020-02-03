import React from 'react'
import ProjectSummary from './ProjectSummary'


const ProjectList = ({projects, cid}) => {
   
    return (

        <tbody>
            
            {projects && projects.map(project => {
                if (project.cid == cid) {
                    return (
                        <ProjectSummary project={project}  key={project.id} />
                    )
                }

            })}
        </tbody>
    )
}

export default ProjectList