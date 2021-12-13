// import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Navbar} from './components/navbar'
import { NavRoutes } from './routes';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <NavRoutes/>
      </Router>
    </div>
  );
}

export default App;
