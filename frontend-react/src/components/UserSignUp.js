import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import "../index.css";

//Form schema outside of function scope
// I would prefer to have all errors show up until they have been fixed for each input as you go along
const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least two characters")
    .required("Must include a name."),
  username: yup
    .string()
    .min(2, "Name must be at least two characters")
    .required("Must include a name."),
  password: yup
    .string()
    .min(6, "Passwords must be at least 6 characters long.")
    .matches(/[a-z]/, 'At least one lowercase character required.')
    .matches(/[A-Z]/, 'At least one uppercase character required.')
    .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'At least 1 number or special character is required (@,!,#, etc).')
    .required("Password is Required"),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  phone_number: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required('A phone number is required'),
  terms: yup
    .boolean().oneOf([true], "You must accept Terms and Conditions"),
  // required isn't required for checkboxes.
});

// Define form elements: email, password and terms/conditions

const UserSignUp = () => {
  // Create state for the form values. We will want to update state later on, but for now... empty strings!
  const [formState, setFormState] = useState({
    name: "",
    username: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    terms: "",
  });

  // State for the error messages
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    terms: "",
  });

  const [post, setPost] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // subtmit handler, axios call goes here within this function scope
  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");

    axios
      .post(
        "https://water-my-plants-backend-vw.herokuapp.com/Register",
        formState
      )
      .then((res) => {
        console.log("axios post request", res.data);
        setPost(res.data);
        // setPost([...post, res.data]);
        setFormState({
          name: "",
          username: "",
          password: "",
          confirm_password: "",
          phone_number: "",
          terms: "",
        });
      })
      .catch((err) => console.log(err.res));
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
      <h1>User Sign-Up</h1>

      <form onSubmit={formSubmit}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            value={formState.name}
            onChange={inputChange}
          />
        </label>
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}

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
          <p className="error">{errors.password}</p>
        ) : null}

        <label htmlFor="confirm_password">
          Confirm Password
          <input
            id="confirm_password"
            type="password"
            name="confirm_password"
            placeholder="Password"
            value={formState.confirm_password}
            onChange={inputChange}
          />
        </label>
        {/* error for confirm passworc ? */}

        <label htmlFor="phone_number">
          Phone Number
          <input
            id="phone_number"
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formState.phone_number}
            onChange={inputChange}
          />
        </label>
        {/* error for phone number? */}

        <label htmlFor="termsInput">
          Do you agree to the terms and conditions?
          <input
            id="termsInput"
            type="checkbox"
            name="terms"
            checked={formState.termsInput}
            onChange={inputChange}
          />
        </label>

        <button type="submit" data-cy="submit" disabled={buttonDisabled}>
          Register!
        </button>
      </form>
    </div>
  );
};

export default UserSignUp;
