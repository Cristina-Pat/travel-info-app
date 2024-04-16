import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

import authService from '../services/auth.service.js';
import validationService from "./utils/validation.helpers";

const Login = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [email, setUserEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(``);

    let navigate = useNavigate();

    const onChangeUserEmail = e => {
        const newUserEmail = e.target.value;
        setUserEmail(newUserEmail);
    }

    const onChangePassword = e => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    }

    const handleLogin = async e => {
        e.preventDefault();

        setMessage(``);
        setLoading(true);


        //if (checkBtn.current.context._errors.length === 0) {
            const login = await authService.login(email, password);
            if (localStorage.getItem("user")) {
                navigate(`/ `);
            }
            else {
                console.dir(login);
                setMessage(login.error);
                setLoading(false);
            }
        /*}
        else {
            setLoading(false);
        }*/
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />

                <form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={onChangeUserEmail}
                            validations={[validationService.required]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[validationService.required]}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-login btn-primary btn-block" disabled={loading} type="submit">
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>
                    <div className="form-group form-check">
                        <p><a href="#" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Change your password</a></p>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;