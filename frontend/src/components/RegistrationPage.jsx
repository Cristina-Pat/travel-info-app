import React, { useState, useRef } from 'react';
import validationService from "./utils/validation.helpers.jsx";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import authService from '../services/auth.service.js';
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
    const form = useRef();
    const [username, setUsername] = useState(``);
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const navigate = useNavigate();

    const handleRegister = async e => {
        e.preventDefault();
        console.log('register!');
        console.log('username ', username);
        console.log('email ', email);
        console.log('password ', password);

        const register = await authService.register(username, email, password);
        if(register.email){
            navigate(`/login`);
        }

    }

    const onChangeUsername = e => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = e => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = e => {
        const password = e.target.value;
        setPassword(password);
    };

    return (
    <div className="col-md-12">
        <div className="card card-container">
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
            />
            <h3>Registration form</h3>
            <form ref={form}>
                <div className="form-group">
                    <label htmlFor="InputName">Name</label>
                    <input 
                        name="username" 
                        type="text" 
                        className="form-control" 
                        id="inputName" 
                        placeholder="Enter name"                         
                        onChange={onChangeUsername}
                        validations={[validationService.required, validationService.validateUsername]}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input 
                        name="useremail" 
                        type="email" 
                        className="form-control" 
                        id="inputEmail1"
                        placeholder="Enter email"
                        onChange={onChangeEmail}
                        validations={[validationService.required, validationService.validateEmail]} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword">Password</label>
                    <input 
                        name="userpass" 
                        type="password" 
                        className="form-control" 
                        id="inputPassword1" 
                        placeholder="Password" 
                        onChange={onChangePassword}
                        validations={[validationService.required, validationService.validatePassword]}/>
                </div>
                <button onClick={handleRegister} className="btn btn-registration btn-primary btn-block">Sign Up</button>
            </form>
        </div>
    </div>
    )
}

export default RegistrationPage;