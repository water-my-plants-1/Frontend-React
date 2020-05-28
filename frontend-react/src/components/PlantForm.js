import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

import "../index.css";

const formSchema = yup.object().shape({
  nickname: yup.string().required("Plant name is a required field"),
  species: yup.string().required("Plant species is a required field"),
  H2oFrequency: yup.string(),
});

const PlantForm = () => {
  const [errorState, setErrorState] = useState({
    nickname: "",
    species: "",
    H2oFrequency: "",
  });
  const [formState, setFormState] = useState({
    nickname: "",
    species: "",
    H2oFrequency: "",
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
    setFormState({
      nickname: "",
      species: "",
      H2oFrequency: "",
    })

    console.log("form submitted!");
    axios
        .post("https://water-my-plants-backend-vw.herokuapp.com/user", formState)
        // .post("https://reqres.in/api/users", formState)
        .then(response => {
          console.log(response.data);
          //update display plants state
          // props.newPlant(response.data);
          // props.history.push("/PlantList");
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
        <label htmlFor="H2oFrequency">
          Watering Schedule
          <select
            name="H2oFrequency"
            id="H2oFrequency"
            value={formState.H2oFrequency}
            onChange={inputChange}
          >
            <option value="">-Please Select One-</option>
            <option value="Once a day">Once a day</option>
            <option value="Twice a day">Twice a day</option>
            <option value="Three times a day">Three times a day</option>
            <option value="Every other day">Every other day</option>
            <option value="Every two days">Every two days</option>
            <option value="Every three days">Every three days</option>
            <option value="Every four days">Every four days</option>
            <option value="Every five days">Every five days</option>
            <option value="Every six days">Every six days</option>
            <option value="Once a week">Once a week</option>
            <option value="Once every two weeks">Once every two weeks</option>
          </select>
        </label>
        <button disabled={buttonDisabled}>Submit</button>
      </form>
    </div>
  );
};

export default PlantForm;
