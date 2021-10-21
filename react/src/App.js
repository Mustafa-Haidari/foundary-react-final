import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route } from "react-router-dom"

import Navbar from "./components/navbar.component"

import ClientList from "./components/clients.component"
import CreateClient from "./components/create-client.component"
import EditClient from "./components/edit-client.component"

import Employees from "./components/employees.component"
import CreateEmployees from "./components/create-employees.component"
import EditEmployees from "./components/edit-employees.component"

import Engagements from "./components/engagements.component"
import CreateEngagement from "./components/create-engagements.component"
import EditEngagement from "./components/edit-engagements.component"

function App() {
  return (
    <div className="foundary_container">

        <Router>
          <Navbar />
          <br/>
            <Route path="/clients" exact component={ClientList} />
            <Route path="/clients/create" component={CreateClient} />
            <Route path="/clients/edit/:id" component={EditClient} />

            <Route path="/employees" exact component={Employees} />
            <Route path="/employees/create" component={CreateEmployees} />
            <Route path="/employees/edit/:id" component={EditEmployees} />

            <Route path="/engagements" exact component={Engagements} />
            <Route path="/engagements/create" component={CreateEngagement} />
            <Route path="/engagements/edit/:id" component={EditEngagement} />

    </Router>

      
    </div>
  );
}

export default App;
