import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { Button, Dropdown, List } from 'semantic-ui-react'

const SignedInLinks = (props) => {
    //<li><NavLink to='/delete'>Delete Project</NavLink></li>
    //<li><NavLink to='/create'>Create Project</NavLink></li>
    let name = props.profile.firstName + " " + props.profile.lastName;
    return(
        <List floated='right' selection horizontal>
            <br />
            <br />
            
            <List.Item onClick={props.signOut}><p style={{color: 'black', padding: '20px'}}>Sign out</p></List.Item>
            <List.Item>
                <Button circular>{props.profile.initials}</Button>
            </List.Item>
        </List>
        
        
        
    
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
 
export default connect(null, mapDispatchToProps)(SignedInLinks)