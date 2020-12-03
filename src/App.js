import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import SigninPage from './pages/signin';
import AccountPage from './pages/account';
import FormValidationPage from './pages/Form'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/sign-up" component={FormValidationPage} exact />
        <Route path="/signin" component={SigninPage} exact />
        <Route path="/account" component={AccountPage} exact />
      </Switch>
    </Router>
  );
}

export default App;
