import React from 'react';
import { Route, Link } from 'react-router-dom';

import UserLogin from './components/UserLogin';
import UserSignUp from './components/UserSignUp';
import PlantForm from './components/PlantForm';

import './App.css';
import styled from 'styled-components';

const Button = styled.button`
    padding: 6px 10px;
    margin: 5px;
    background-color: green;
    border-radius: 3px;
    color: white;
`;

function App() {
  return (
    <div className="App">
      <Link to="/">
        <Button>Home</Button>
      </Link>

      <Link to="/UserLogin">
        <Button>LogIn</Button>
      </Link>

      <Link to="/UserSignUp">
        <Button>Sign Up</Button>
      </Link>
      
      <Link to="/PlantForm">
        <Button>Add your plant!</Button>
      </Link>
      
      {/* Route exact path="/" components={Home} /> */}
      <Route path="/UserLogin" component={UserLogin} />
      <Route path="/UserSignUp" component={UserSignUp} />
      <Route path="/PlantForm" component={PlantForm} />

    </div>
  );
}

export default App;
