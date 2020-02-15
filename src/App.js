import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectTable from './components/projects/ProjectTable'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject'
import CreateClient from './components/clients/CreateClient'
import EditClient from './components/clients/EditClient';
import EditProject from './components/projects/EditProject';
import ProjectDetails from './components/projectdetails/ProjectDetail';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/client/:id/projects' component={ProjectTable} />
          <Route path='/editclient/:id' component={EditClient} />
          <Route path='/client/:client_id/editproject/:project_id' component={EditProject} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/createclient' component={CreateClient} />
          <Route path='/:id/createproject' component={CreateProject} />
          <Route path='/client/:client_id/projects/:project_id' component={ProjectDetails} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;