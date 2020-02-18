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
import { format } from 'date-fns'

class Invoices extends Component {
  getCurrentInvoices() {
      var result = [];
      
      if(this.props.invoices){
          this.props.invoices.forEach(element => {
              if (element.projectID === this.props.match.params.project_id)
                  result.push(element)
          });
          
          return result;
      }
  } 
  render() {
      
      var result = this.getCurrentInvoices();
      
      if (result) {
        var timestr = result[0].createdAt.toDate().toString().substr(4,12);
        //console.log(timestr)
        //console.log(format(result[0].createdAt, 'MMMM Do, YYYY H:mma'))
        return (
          <table className="highlight">
            <thead>
              <tr>
                  <th>Invoice No.</th>
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
                      <td>{element.invoiceNo}</td>
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
        invoices: state.firestore.ordered.invoices,
        auth: state.firebase.auth
    }
}
export default withRouter(compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'invoices'}
    ])
)(Invoices))