import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectTable from './components/projects/ProjectTable'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject'
import DeleteProject from './components/projects/DeleteProject'
import CreateClient from './components/clients/CreateClient'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/client/:id/projects' component={ProjectTable} />

          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/createclient' component={CreateClient} />

          <Route path='/:id/createproject' component={CreateProject} />
          <Route path='/deleteproject' component={DeleteProject} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
