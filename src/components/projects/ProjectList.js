import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import ProjectSummary from './ProjectSummary'

class ProjectList extends Component {
    state = {
        chosenProjects: []
    }
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (id) { 
        var projectArr = [...this.state.chosenProjects]

        if(projectArr.includes(id)){
            const index = projectArr.indexOf(id);
            if(index > -1) {
                projectArr.splice(index, 1);
            }
        }else{
            projectArr.push(id);
        }
        
        this.setState({
            chosenProjects: projectArr
        })

        this.props.onChange(projectArr);
        
    }

    getObj () {
        var projects = this.props.projects;
        var obj=[];
        //console.table(projects)
        
        {projects && projects.map(project => {
            if (project.clientId == this.props.match.params.id) {
                    obj.push(project)
            }

        })}

        if (obj) {
            if (this.props.sortBy == 1) {
                obj.sort((a, b) => a.title.localeCompare(b.title));
            }
            if (this.props.sortBy == 2) {
                obj.sort((a, b) => b.title.localeCompare(a.title));
            }
            if (this.props.sortBy == 3) {
                obj.sort((a, b) => a.status.localeCompare(b.status));
            }
            if (this.props.sortBy == 4) {
                obj.sort((a, b) => b.status.localeCompare(a.status));
            }
        }
        let pp = obj.filter( (ele, ind) => ind === obj.findIndex( elem => elem.id === ele.id && elem.clientId === ele.clientId))

        return pp;
    }
    render() {
        

        return (
            <tbody>
                {this.getObj() && this.getObj().map((project, index) => {
                    return (
                        <tr key={index}>
                        <td>
                            <label>
                                <input 
                                    //name="chosenClients" 
                                    type="checkbox"
                                    onChange={() => this.handleChange(project.id)}
                                />
                                <span>&nbsp;</span>
                            </label>
                        </td>
                        
                        <ProjectSummary project={project} />
                        </tr>
                    )
                })}
                
                
            </tbody>
        )
    }
/*
    return (

        <tbody>
            
            {projects && projects.map(project => {
                if (project.clientId == clientId) {
                    return (
                        <ProjectSummary project={project}  key={project.id} />
                    )
                }

            })}
        </tbody>
    )*/
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}
export default withRouter(compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects', orderBy: ['title']}
    ])
)(ProjectList))