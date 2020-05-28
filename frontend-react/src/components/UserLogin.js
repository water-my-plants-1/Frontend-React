import React, { useState, useEffect } from "react";
// import axios from "axios";
import * as yup from "yup";
import "../index.css";

import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../Unit3-React-Folder/utils/axiosWithAuth';

//Form schema outside of function scope
const formSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Name must be at least two characters")
    .required("Must include a name."),

  password: yup
    .string()
    .min(6, "Passwords must be at least 6 characters long.")
    .required("Password is Required"),

  // required isn't required for checkboxes.
});

// Define form elements: email, password and terms/conditions

const UserLogin = () => {
  const [post, setPost] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // Create state for the form values. We will want to update state later on, but for now... empty strings!
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  // State for the error messages
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();
  // subtmit handler, axios call goes here within this function scope
  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    axiosWithAuth()
        .post('https://water-my-plants-backend-vw.herokuapp.com/login', formState)
        .then((res) => {
            localStorage.setItem('token', res.data.payload);
            history.push('/home-page'); 
            setPost(res.data);
            console.log("Results", res);
            setPost([...post, res.data]); //which to use?
            setFormState({
                name: "",
                email: "",
                password: "",
                terms: ""
              });
        })
        .catch(err => {
          console.log(err.res);
        })
    // axios
    //   .post("https://water-my-plants-backend-vw.herokuapp.com/Login", formState)
    //   .then((res) => {
    //     setPost(res.data);
    //     console.log("Results", res);
    //     // setPost([...post, res.data]); which to use?
    //     // setFormState({
    //     //     name: "",
    //     //     email: "",
    //     //     password: "",
    //     //     terms: ""
    //     // });
    //   })
    //   .catch((err) => console.log(err.res));
  };

  // change handler
  const inputChange = (e) => {
    e.persist();
    validate(e);
    console.log("Input changed", e.target.value);

    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
    console.log("what is this", value);
  };

  // useEffect
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  // validate
  const validate = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    yup
      .reach(formSchema, e.target.name)
      .validate(value)

      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })

      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });

    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="userDiv">
      <h1>User LogIn</h1>
      <form onSubmit={formSubmit}>
        <label htmlFor="username">
          Username
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={formState.username}
            onChange={inputChange}
          />
        </label>
        {errors.username.length > 0 ? (
          <p className="error">{errors.username}</p>
        ) : null}

        <label htmlFor="passwordInput">
          Password
          <input
            id="passwordInput"
            type="password"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={inputChange}
          />
        </label>
        {errors.password.length > 6 ? (
          <p className="error">{errors.email}</p>
        ) : null}

        <button type="submit" data-cy="submit" disabled={buttonDisabled}>
          Login!
        </button>

      </form>
    </div>
  );
};

export default UserLogin;
