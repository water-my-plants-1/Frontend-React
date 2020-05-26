import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";
import styled from 'styled-components';

const Button = styled.button`
    padding: 6px 10px;
    margin: 5px;
    background-color: green;
    border-radius: 3px;
    color: white;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    max-width: 300px;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    align-item: flex-start;
    margin: 15px 0;

`;

const formSchema = yup.object().shape({
    plantName: yup.string().required("Name is a required field"),
    plantSpecies: yup.string().required("Must include why you'd like to join"),
    wateringSchedule: yup.string()
  });

const PlantForm = () =>{


    const [errorState, setErrorState] = useState({
        plantName: "",
        plantSpecies:"",
        wateringSchedule:""        
    });
    const [formState, setFormState] = useState({
        plantName: "",
        plantSpecies:"",
        wateringSchedule:""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
          setButtonDisabled(!valid);
        });
      }, [formState]);
    const validate = e => {
        let value =
          e.target.type === "checkbox" ? e.target.checked : e.target.value;
        yup
          .reach(formSchema, e.target.name)
          .validate(value)
          .then(valid => {
            setErrorState({
              ...errorState,
              [e.target.name]: ""
            });
          })
          .catch(err => {
            setErrorState({
              ...errorState,
              [e.target.name]: err.errors[0]
            });
          });
      };

      const inputChange = e => {
        e.persist();
        // console.log("input changed!", e.target.value, e.target.checked);
        validate(e);
        let value =
          e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({ ...formState, [e.target.name]: value });
      };

    const formSubmit = e => {
    e.preventDefault();
    console.log("form submitted!");
    axios
        .post("https://water-my-plants-backend-vw.herokuapp.com/user/plant", formState)
        .then(response => console.log(response))
        .catch(err => console.log(err));
    };

    return(

        <div>
            <h2>Let's add your plants</h2>
            <Form onSubmit={formSubmit}>
                <Label htmlFor="plantName">
                    Plant Name
                    <input 
                        type="text"
                        name="plantName"
                        id="plantName"
                        value={formState.plantName}
                        onChange={inputChange}
                    />
                </Label>
                <Label htmlFor="plantSpecies">
                    Plant Species
                    <input 
                        type="text"
                        name="plantSpecies"
                        id="plantSpecies"
                        value={formState.plantSpecies}
                        onChange={inputChange}
                    />
                </Label>
                <Label htmlFor="wateringSchedule">
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
                </Label>
                <Button  disabled={buttonDisabled}>Submit</Button>
                

            </Form>

        </div>
    );
};

export default PlantForm;