import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {Home, Substock, Post, SubmitPost, EditPost, Page404} from './pages';
import SigninPage from './pages/signin';
import FormValidationPage from './pages/form'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={SigninPage} exact />
        <Route path="/sign-up" component={FormValidationPage} exact />
        <Route exact path='/:ticker' component={Substock} />
        <Route exact path='/:ticker/submit' component={SubmitPost} />
        {/* Note it is critical that submit is above, otherwise will read submit as a postID */}
        <Route exact path='/:ticker/:postID' component={Post} />
        <Route exact path='/:ticker/:postID/edit' component={EditPost} />
        <Route path="*" component={Page404}/>
      </Switch>
    </Router>
  );
}

export default App;
