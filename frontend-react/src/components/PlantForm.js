import React, { useState, useEffect } from "react";
import * as yup from "yup";

import "../index.css";
import { axiosWithAuth } from '../Unit3-React-Folder/utils/axiosWithAuth';

const formSchema = yup.object().shape({
  nickname: yup.string().required("Plant name is a required field"),
  species: yup.string().required("Plant species is a required field"),
  h2oFrequency: yup.string(),
});

const PlantForm = (props) => {
  const [errorState, setErrorState] = useState({
    nickname: "",
    species: "",
    h2oFrequency: "",
  });
  const [formState, setFormState] = useState({
    nickname: "",
    species: "",
    h2oFrequency: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);
  
  const validate = (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    // console.log("input changed!", e.target.value, e.target.checked);
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
        .post("https://water-my-plants-backend-vw.herokuapp.com/user", formState)
        .then(response => {
          props.history.push("/PlantList");
        })
        .catch(err => console.log(err));
    };

  return (
    <div>
      <h2>Let's add your plants</h2>
      <form onSubmit={formSubmit}>
        <label htmlFor="nickname">
          Plant Name
          <input
            type="text"
            name="nickname"
            id="nickname"
            value={formState.nickname}
            onChange={inputChange}
            placeholder="Plant Name"
          />
          {errorState.nickname.length > 0 ? <p id="error">{errorState.nickname}</p>: null}
        </label>
        <label htmlFor="species">
          Plant Species
          <input
            type="text"
            name="species"
            id="species"
            value={formState.species}
            onChange={inputChange}
            placeholder="Plant Species"
          />
          {errorState.species.length > 0 ? <p id="error">{errorState.species}</p>: null}
        </label>
        <label htmlFor="h2oFrequency">
          Watering Schedule
          <select
            name="h2oFrequency"
            id="h2oFrequency"
            value={formState.h2oFrequency}
            onChange={inputChange}
          >
            <option value="">-Please Select One-</option>
            <option value="1">Once a day</option>
            <option value="2">Twice a day</option>
            <option value="3">Three times a day</option>
            <option value="4">Four times a day</option>
          </select>
        </label>
        <button disabled={buttonDisabled}>Submit</button>
      </form>
    </div>
  );
};

export default PlantForm;
