import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"

import Header from './Header/Header'
import SlideShow from './SlideShow/SlideShow'
import RegisterForm from './RegisterForm/RegisterForm'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/mamaProject">
            <Header></Header>
            <p>something new</p>
          </Route>
          <Route path="/">
            <Header></Header>
            <SlideShow></SlideShow>
            <RegisterForm></RegisterForm>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
