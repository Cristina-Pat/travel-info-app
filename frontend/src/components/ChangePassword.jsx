import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service.js';

const ChangePassword = () => {
    const [password, setPassword] = useState(``);
    const [confirmPassword, setConfirmPassword] = useState(``);
    const [message, setMessage] = useState(``);

    const form = useRef();

    const onChangePassword = e => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    }

    const onChangeConfirmPassword = e => {
        const newPassword = e.target.value;
        setConfirmPassword(newPassword);
    }

    const handleChangePassword = async e => {
        setMessage(``);

        e.preventDefault();
        if(password == confirmPassword) {
            await authService.changePassword(password);
            setMessage(`Password changed`);
        } else {
            setMessage(`Passwords don't match`);
        }
    }


    return (
        <div className="col-md-12">
            <div className="card card-container">
                <h3 className="card-title text-center">Reset password</h3>

                <div className="card-text">
                    <form onSubmit={handleChangePassword} ref={form}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Use the form below to change your password. Your password cannot be the same as your username.</label>
                        </div>
                        <label>New Password</label>
                        <div className="form-group pass_show">
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="New Password"
                                value={password}
                                onChange={onChangePassword} />
                        </div>
                        <label>Confirm Password</label>
                        <div className="form-group pass_show">
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={onChangeConfirmPassword} />
                        </div>

                        <button type="submit" className="btn btn-change-pass btn-primary btn-block">Send password reset email</button>
                        

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
        </div>
    );
}

export default ChangePassword;

//<input type="email" class="form-control form-control-sm mt-2" placeholder="Enter your email address" />