import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from './utils/axiosWithAuth';

const Login = (props) => {
    const [login, setLogin] = useState({
        username:'',
        password:''
    })

    const history = useHistory();

    const handleChange = e => {
        e.preventDefault();
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('INSERT LOGIN ENDPOINT HERE', login)
        .then((res) => {
            localStorage.setItem('token', res.data.payload);
            history.push('INSERT MAIN PAGE HERE')
        })
        .catch(err => {
            console.log(err);
            alert('Username or Password is incorrect')
        })
    }

    return (
        <div>
            ADD UNIT 2 REACT FORMS HERE ?????
        </div>
    )
}