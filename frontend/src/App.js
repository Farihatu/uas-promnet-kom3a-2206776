import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPatientComponent from './components/ListPatientComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreatePatientComponent from './components/CreatePatientComponent';
import ViewPatientComponent from './components/ViewPatientComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListPatientComponent}></Route>
            <Route path="/patients" component={ListPatientComponent}></Route>
            <Route path="/add-patient/:id" component={CreatePatientComponent}></Route>
            <Route path="/view-patient/:id" component={ViewPatientComponent}></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
