import React, { Component } from 'react'
import { Header, Icon, Menu, Sidebar, Dropdown } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { Route, Link, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import firebase from 'firebase/app'
import ReactTable from 'react-table-v6'
class Tasks extends Component {
  getCurrentTasks() {
      var result = [];
      
      if(this.props.tasks){
          this.props.tasks.forEach(element => {
              if (element.projectID === this.props.match.params.project_id)
                  result.push(element)
          });
          
          return result;
      }
  } 
  render() {
      console.log(this.props)
      var result = this.getCurrentTasks();
      
      if (result && result.length > 0) {
        return (
          <table className="highlight">
            <thead>
              <tr>
                  
                  <th>Title</th>
                  <th>Ordered By</th>
                  <th>Date Placed</th>
              </tr>
            </thead>
    
            <tbody>
              {
                result && result.map(element => {
                  return (
                    <tr key={element.id}>
                      <td>{element.title}</td>
                      <td>{element.orderedBy}</td>
                      <td>{element.createdAt.toDate().toString().substr(4,12)}</td>
                      
                    </tr>
                  )
                })
              }
              
            </tbody>
        </table>
      
        )
      }else{
        return (
          <div className="progress">
              <div className="indeterminate"></div>
          </div>
        )
      }
      
    }
}


const mapStateToProps = (state) => {
    return {
        tasks: state.firestore.ordered.tasks,
        auth: state.firebase.auth
    }
}
export default withRouter(compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'tasks'}
    ])
)(Tasks))