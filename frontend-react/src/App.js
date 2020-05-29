import React,{useState, useEffect} from "react";
import { Route, Link, BrowserRouter} from "react-router-dom";

import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";
import PlantForm from "./components/PlantForm";
import PlantList from "./components/PlantList";

//unit3 react
import PrivateRoute from './Unit3-React-Folder/PrivateRoute';
import HomePage from './Unit3-React-Folder/components/home-page';
//unit3 react ^^^^

import "./App.css";
import "./index.css";


function App() {

  const [isLoginState, setIsLoginState] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setIsLoginState(true);
    }
  }, [isLoginState])

  const signout = () => {
    console.log("signoutworking")
    window.localStorage.removeItem("token")
    setIsLoginState(false);
  };

  return (
    <BrowserRouter>
    
      <div className="App">
        <div className="app-container">
            <Link to="/">
              <button>Home</button>
            </Link>
            
            {/* goal is to link marketing page to about link once the website is deployed by melissa or others */}
            {/* <Link to="/">
              <button>About</button> 
            </Link> */}

          { isLoginState ? 
              <>
                <Link to="/PlantForm">
                  <button>Add your plant!</button>
                </Link>
        
                <Link to="/PlantList">
                  <button>Your Plants</button>
                </Link>
                <button onClick= {signout}>Sign Out</button>
              </> : 
              <>
                <Link to="/UserLogin">
                  <button>Login</button>
                </Link>
                <Link to="/Register">
                  <button className="button7">Sign Up</button>
                </Link>
              </>
          }
            <div className="route-paths">
              <Route exact path="/" component={Home} />
              <PrivateRoute path='/home-page' component={HomePage} />
              {/* <Route path="/UserLogin" component={UserLogin} /> */}
              <Route path="/UserLogin" render={(props) => <UserLogin {...props} setLogin={setIsLoginState} />} />
              <Route path="/Register" component={UserSignUp} />
              <Route path="/UserProfile" component={UserProfile} />
              <Route path="/PlantList" component={PlantList} />
              <Route path="/PlantForm" component={PlantForm} />
            </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
