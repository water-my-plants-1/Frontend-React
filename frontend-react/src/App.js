import React from "react";
import { Route, Link, BrowserRouter} from "react-router-dom";

import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";
import PlantForm from "./components/PlantForm";

//unit3 react
import PrivateRoute from './Unit3-React-Folder/PrivateRoute';
import HomePage from './Unit3-React-Folder/components/home-page';
//unit3 react ^^^^

import "./App.css";
import "./index.css";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">
          <button>Home</button>
        </Link>

        <Link to="/Login">
          <button>Login</button>
        </Link>

        <Link to="/Register">
          <button>Sign Up</button>
        </Link>

        <Link to="/PlantForm">
          <button>Add your plant!</button>
        </Link>

        {/* Route exact path="/" components={Home} /> */}
        <Route path="/Login" component={UserLogin} />
        <PrivateRoute path='/home-page' component={HomePage} />
        <Route path="/Register" component={UserSignUp} />
        <Route path="/PlantForm" component={PlantForm} />
      </div>
    </BrowserRouter>
  );
}

export default App;
