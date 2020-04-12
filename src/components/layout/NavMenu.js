import React, { Component } from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class NavMenu extends Component {

    render() {
        //console.log(window.location.pathname); 
        return (
            <List style={{marginLeft: '100px'}} selection horizontal as='h2'>
                <List.Item as={ Link } to='/'><p style={{color: 'black', padding: '20px', fontSize: '16px'}}>Home</p></List.Item>
                <List.Item as={ Link } to='/client'><p style={{color: 'black', padding: '20px', fontSize: '16px'}}>Customers</p></List.Item>
                <List.Item as={ Link } to='/project'><p style={{color: 'black', padding: '20px', fontSize: '16px'}}>Projects</p></List.Item>
            </List>
        
            
            
        )
    }
}
