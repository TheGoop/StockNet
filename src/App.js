import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Home, Substock, Post, SubmitPost, EditPost} from './pages';
import SigninPage from './pages/signin';
import AccountPage from './pages/account';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={SigninPage} exact />
        <Route path="/account" component={AccountPage} exact />
        <Route exact path='/:ticker' component={Substock} />
        <Route exact path='/:ticker/submit' component={SubmitPost} />
        {/* Note it is critical that submit is above, otherwise will read submit as a postID */}
        <Route exact path='/:ticker/:postID' component={Post} />
        <Route exact path='/:ticker/:postID/edit' component={EditPost} />
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </Router>
  );
}

export default App;
