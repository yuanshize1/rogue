import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SingedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
    const { auth, profile } = props;
    //console.log(auth);
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
   
    //auth.isLoaded waiting for Auth Ready so the links don't flash
    return(
        <nav className="nav-extended grey">
            <div className="nav-wrapper teal lighten-3">
                <Link to='/' className="brand-logo">GoingRogue</Link>
                <div className="container">
                    { auth.isLoaded && links }  
                </div>
            </div>
        </nav>

    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps)(Navbar)