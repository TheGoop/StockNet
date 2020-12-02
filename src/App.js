import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {Home, Substock, Post, SubmitPost, EditPost, Page404} from './pages';
import SigninPage from './pages/signin';
import AccountPage from './pages/account';
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/404" component={Page404} exact/>
        <Route path="/signin" component={SigninPage} exact />
        <Route path="/account" component={AccountPage} exact />
        <Route exact path='/:ticker' component={Substock} />
        <Route exact path='/:ticker/submit' component={SubmitPost} />
        {/* Note it is critical that submit is above, otherwise will read submit as a postID */}
        <Route exact path='/:ticker/:postID' component={Post} />
        <Route exact path='/:ticker/:postID/edit' component={EditPost} />
        <Redirect from="*" to="/404"/>
      </Switch>
    </Router>
  );
}

export default App;
