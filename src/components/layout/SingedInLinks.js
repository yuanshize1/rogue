import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    //<li><NavLink to='/delete'>Delete Project</NavLink></li>
    //<li><NavLink to='/create'>Create Project</NavLink></li>
    return(
        <ul className="right">
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li>
                <NavLink to='/' className='btn'>
                    {props.profile.initials}
                </NavLink>
            </li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
 
export default connect(null, mapDispatchToProps)(SignedInLinks)