import React from 'react';
import { Route, Link } from 'react-router-dom';

import PlantForm from './components/PlantForm';
import UserLogin from './components/UserLogin';

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
        <Button>Login</Button>
      </Link>
      
      <Link to="/PlantForm">
        <Button>Add your plant!</Button>
      </Link>
      
      <Route path="/PlantForm" component={PlantForm} />
      <Route path="/UserLogin" component={UserLogin} />
    </div>
  );
}

export default App;
