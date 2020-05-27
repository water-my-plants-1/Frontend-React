import React, {useState} from "react";
import { Route, Link } from "react-router-dom";

import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";
import PlantForm from "./components/PlantForm";
import PlantList from "./components/PlantList";

import "./App.css";
import "./index.css";


function App() {

  const [plantList, setPlantList] = useState([]);

  const addPlant = plant => {
    setPlantList([...plantList, plant]);
  };

  

  return (
    <div className="App">
      <Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/UserLogin">
        <button>LogIn</button>
      </Link>

      <Link to="/Register">
        <button>Sign Up</button>
      </Link>

      <Link to="/PlantForm">
        <button>Add your plant!</button>
      </Link>

      <Link to="/PlantList">
        <button>Your Plants</button>
      </Link>

      {/* Route exact path="/" components={Home} /> */}
      <Route path="/UserLogin" component={UserLogin} />
      <Route path="/Register" component={UserSignUp} />
      <Route path="/PlantForm" render={props => (<PlantForm {...props} newPlant={addPlant}/>)} />
      <Route path="/PlantList" render={props => (<PlantList {...props} plantList={plantList}/>)} />

      {/* render={props => (<DisplayPlants {...props} addPlant={addPlant} />)} */}
    </div>
  );
}

export default App;
