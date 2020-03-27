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
    getCurrentDocuments() {
        var result = [];
        
        if(this.props.documents){
            this.props.documents.forEach(element => {
                if (element.projectID === this.props.match.params.project_id)
                    result.push(element)
            });
            
            return result;
        }
    } 
    render() {
        //const { documents, auth } = this.props;
        var result = this.getCurrentDocuments();
        

        return (
            <div >
                    {result && result.map(item => {
                        return (
                            <a href={item.link} key={item.id} style={{float: 'left'}}>
                                <Icon name="folder" size="huge" />
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
        documents: state.firestore.ordered.documents,
        auth: state.firebase.auth
    }
}
export default withRouter(compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'documents'}
    ])
)(Documents))