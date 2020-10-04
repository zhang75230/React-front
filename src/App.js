import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect, } from 'react-router-dom';
import HomePage from './containers/HomePage-ctn';
import AboutPage from './components/AboutPage';
import AccountPage from './containers/AccountPage-ctn';
import Signup from './containers/Signup-ctn';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
