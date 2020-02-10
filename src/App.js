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
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/client/:id/projects' component={ProjectTable} />
          <Route path='/editclient/:id' component={EditClient} />
          <Route path='/editproject/:id' component={EditProject} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/createclient' component={CreateClient} />
          <Route path='/:id/createproject' component={CreateProject} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;