import React from "react";
import { Route, Link } from "react-router-dom";

import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";
import PlantForm from "./components/PlantForm";

import "./App.css";
import "./index.css";


function App() {
  return (
    <div className="App">
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/UserLogin">
        <button>LogIn</button>
      </Link>

      <Link to="/UserSignUp">
        <button>Sign Up</button>
      </Link>

      <Link to="/PlantForm">
        <button>Add your plant!</button>
      </Link>

      {/* Route exact path="/" components={Home} /> */}
      <Route path="/UserLogin" component={UserLogin} />
      <Route path="/UserSignUp" component={UserSignUp} />
      <Route path="/PlantForm" component={PlantForm} />
    </div>
  );
}

export default App;
