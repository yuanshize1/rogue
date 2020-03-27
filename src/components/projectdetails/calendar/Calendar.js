import React, { Component } from 'react'
import { Segment, Dimmer, Loader, Image, Icon } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { Route, Link, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import ReactTable from 'react-table-v6'
import { Grid, Card } from 'semantic-ui-react';

class Documents extends Component {
    getCurrentCalendar() {
        var result = [];
        
        if(this.props.calendar){
            this.props.calendar.forEach(element => {
                if (element.projectID === this.props.match.params.project_id)
                    result.push(element)
            });
            
            return result;
        }
    } 
    render() {
        //const { documents, auth } = this.props;
        var result = this.getCurrentCalendar();
        

        return (
            <div >
                    {result && result.map(item => {
                        return (
                            <a href={item.link} key={item.id} style={{float: 'left'}}>
                                <Icon name="calendar alternate" size="huge" />
                                <p>{item.name}</p>
                            </a>
                            
                        )
                                    
                                    
                                
                    })}
           
            </div>
        
        )
      }

}

const mapStateToProps = (state) => {
    return {
        calendar: state.firestore.ordered.calendar,
        auth: state.firebase.auth
    }
}
export default withRouter(compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'calendar'}
    ])
)(Documents))