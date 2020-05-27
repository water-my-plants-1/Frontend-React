import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

import "../index.css";

const formSchema = yup.object().shape({
  plantName: yup.string().required("Plant name is a required field"),
  plantSpecies: yup.string().required("Plant species is a required field"),
  wateringSchedule: yup.string(),
});

const PlantForm = (props) => {
  const [errorState, setErrorState] = useState({
    plantName: "",
    plantSpecies: "",
    wateringSchedule: "",
  });
  const [formState, setFormState] = useState({
    plantName: "",
    plantSpecies: "",
    wateringSchedule: "",
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
      plantName: "",
      plantSpecies: "",
      wateringSchedule: "",
    })

    console.log("form submitted!");
    axios
        // .post("https://water-my-plants-backend-vw.herokuapp.com/user/plant", formState)
        .post("https://reqres.in/api/users", formState)
        .then(response => {
          console.log(response.data);
          //update display plants state
          props.newPlant(response.data);
          props.history.push("/PlantList");
        })
        .catch(err => console.log(err));
    };

  return (
    <div>
      <h2>Let's add your plants</h2>
      <form onSubmit={formSubmit}>
        <label htmlFor="plantName">
          Plant Name
          <input
            type="text"
            name="plantName"
            id="plantName"
            value={formState.plantName}
            onChange={inputChange}
            placeholder="Plant Name"
          />
          {errorState.plantName.length > 0 ? <p id="error">{errorState.plantName}</p>: null}
        </label>
        <label htmlFor="plantSpecies">
          Plant Species
          <input
            type="text"
            name="plantSpecies"
            id="plantSpecies"
            value={formState.plantSpecies}
            onChange={inputChange}
            placeholder="Plant Species"
          />
          {errorState.plantSpecies.length > 0 ? <p id="error">{errorState.plantSpecies}</p>: null}
        </label>
        <label htmlFor="wateringSchedule">
          Watering Schedule
          <select
            name="wateringSchedule"
            id="wateringSchedule"
            value={formState.wateringSchedule}
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
