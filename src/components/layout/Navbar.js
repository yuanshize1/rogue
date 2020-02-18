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
        <nav className="nav-extended" style={{padding: '35px', background: 'linear-gradient(-90deg, teal, white)', minWidth:999}}>
    
            <div className="nav-wrapper">
                <Link to='/client' className="brand-logo" style={{color: '#00695c'}}>
                    <img src="https://static1.squarespace.com/static/5c1e749eaf20965d2a57556a/t/5c1e83714fa51a05053da701/1580156414739/?format=1500w" width="80" height="80" />
                    GR Design Admin Portal
                </Link>
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