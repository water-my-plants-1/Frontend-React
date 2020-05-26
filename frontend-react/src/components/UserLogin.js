import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";
import styled from 'styled-components';


//styling 

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

//Form schema outside of function scope
const formSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Name must be at least two characters")
      .required("Must include a name."),
    email: yup
      .string()
      .email("Must be a valid email address.")
      .required("Must include email address."),
    password: yup
      .string()
      .min(6, "Passwords must be at least 6 characters long.")
      .required("Password is Required"),
    terms: yup
      .boolean()
      .oneOf([true], "You must accept Terms and Conditions")
      // required isn't required for checkboxes.
  });


// Define form elements: email, password and terms/conditions

const UserLogin = () => {
    
        const [post, setPost] = useState({});
        const [buttonDisabled, setButtonDisabled] = useState(true);
        // Create state for the form values. We will want to update state later on, but for now... empty strings!
        const [formState, setFormState] = useState({
            name: "",
            email: "",
            password: "",
            terms: ""
        });

        // State for the error messages
        const [errors, setErrors] = useState({
            name: "",
            email: "",
            password: "",
            terms: ""
        });

    // subtmit handler, axios call goes here within this function scope
        const formSubmit = e => {
            e.preventDefault();
            console.log("Submitted");
            
            axios
                .post('https://reqres.in/api/users/', formState)
                .then(res => {
                    console.log('axios post request', res);
                    console.log('axios post request', res.data);
                    setPost(res.data);
                    // setPost([...post, res.data]);
                    setFormState({
                        name: "",
                        email: "",
                        password: "",
                        terms: ""
                    });
                })
                .catch( err => console.log(err.res));
        };

        // change handler
        const inputChange = e => {
            e.persist();
            validate(e);
            console.log("Input changed", e.target.value); 
                //could I put value here instead as seen in validate below?
                    // const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        };
        
        // useEffect
        useEffect(() => {
            formSchema.isValid(formState).then(valid => {
                setButtonDisabled(!valid);
            });
        }, [formState]);

        // validate
        const validate = e => {
            const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
            
            yup
            .reach(formSchema, e.target.name)
            .validate(value)
            
            .then(valid => {
                setErrors({
                ...errors,
                [e.target.name]: ""
                });
            })
            
            .catch(err => {
                setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
                });
            });

            setFormState({
            ...formState,
            [e.target.name]: e.target.value
            });
    };

  return (
        <Form onSubmit={formSubmit}>
            <Label htmlFor="name">
                Name
                <input 
                    id="name" 
                    type="name" 
                    name="name" 
                    placeholder="Name"
                    value={formState.name}
                    onChange={inputChange}
                />
            </Label>
                {errors.name.length > 0 ? (<p className="error">{errors.name}</p>) : null}

            <Label htmlFor="emailInput">
                Email
                <input 
                    id="emailInput" 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    value={formState.email}
                    onChange={inputChange}
                />
            </Label>
                {errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}

            <Label htmlFor="passwordInput">
                Password
                <input 
                    id="passwordInput" 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    value={formState.password}
                    onChange={inputChange} 
                />
            </Label>
                {errors.password.length > 6 ? (<p className="error">{errors.email}</p>) : null}

            <Label htmlFor="termsInput">
                Do you agree to the terms and conditions?
                <input 
                    id="termsInput" 
                    type="checkbox" 
                    name="terms"
                    checked={formState.termsInput}
                    onChange={inputChange} 
                />
            </Label>

            <Button type="submit" data-cy="submit" disabled={buttonDisabled}>Sign up!</Button>
            
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </Form>
  );
}

export default UserLogin;