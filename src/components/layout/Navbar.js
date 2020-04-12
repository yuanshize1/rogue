import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SingedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import NavMenu from './NavMenu'
import { Header, Icon, Container, Segment } from 'semantic-ui-react'
import Background from '../../img/gradient-background.jpg';

const Navbar = (props) => {
    const { auth, profile } = props;
    //console.log(auth);
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
   
    //auth.isLoaded waiting for Auth Ready so the links don't flash
    return(
            
            <Segment clearing style={{paddingLeft: '60px', paddingRight: '60px', paddingTop: '30px', background: 'linear-gradient(-90deg, teal, white)', minWidth:999}}>
                
                { auth.isLoaded && links } 
                
                <Header as='h1' floated='left' deviding>
                    <Link to='/' className="brand-logo" style={{color: 'black'}}>
                        <img src="https://static1.squarespace.com/static/5c1e749eaf20965d2a57556a/t/5c1e83714fa51a05053da701/1580156414739/?format=1500w" width="100" height="100" />
                        <Header.Content style={{marginLeft: '30px'}}>
                            <br />
                            Going Rogue Design
                            <Header.Subheader>Administration Portal</Header.Subheader>
                        </Header.Content>
                    </Link>
                </Header>
                <br />
                <br />
                <NavMenu />
            </Segment>
            
    
                
                
            
        
        

    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps)(Navbar)