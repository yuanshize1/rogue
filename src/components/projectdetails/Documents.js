import React, { Component } from 'react'
import { Header, Icon, Menu, Sidebar, Dropdown } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { Route, Link, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import FilesTable from "./filesTable";
import DeleteButton from "./deleteButton";
import AddFile from "./fileAdd";

class Documents extends Component {
    state = {
        userAddFile: false,
        deletionList: []
    };
    
    toggle = () => {
    this.setState({ userAddFile: !this.state.userAddFile });
    };

    handleCheck = id => {
    let currentSate = [...this.state.deletionList];
    // if the id is not on delete list then add it
    if (this.state.deletionList.indexOf(id) < 0) {
        currentSate.push(id);
        this.setState({ deletionList: currentSate });
    } else {
        // if already exist then just delete it once the box unchecked
        let index = this.state.deletionList.indexOf(id);
        currentSate.splice(index, 1);
        this.setState({ deletionList: currentSate });
    }
    // console.log(this.state.deletionList);
    };
    //auth.isLoaded waiting for Auth Ready so the links don't flash
    render() {
    
        return(
            <div>
                {this.state.userAddFile ? (
                    <div>
                        <AddFile />
                    </div>
                ) : (
                    <div>
                        <FilesTable clickToDelete={id => this.handleCheck(id)} />
                        <DeleteButton deleteList={this.state.deletionList} />
                    </div>
                )}
                <button onClick={this.toggle}>Add File</button>
    
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}
export default withRouter(compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects', orderBy: ['title']}
    ])
)(Documents))