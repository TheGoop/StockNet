import React from 'react'
import Stock from './Stock.js'
import Post from './Post.js'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Top bar included here */}
          <Route exact path='/' render={() => <h1>Home page</h1>} />
          <Route exact path='/:ticker' component={Stock} />
          {/* When only inputting stock */}

          <Route exact path='/:ticker/:postID' component={Post} />
          {/* Usually comment accessible from stock page -> comments, but you can directly put in url */}
          <Route render={() => <h1>404: page not found</h1>} />
        </Switch>
      </Router>
    </div>
  )
}

//Use nested routes to display grandchild routes (the specific posts on a stockpage)

export default App;
