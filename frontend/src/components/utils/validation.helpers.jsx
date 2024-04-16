import React from 'react';
import { isEmail } from 'validator';

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validateEmail = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const validateUsername = value => {
    if (value.length < 5 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 5 and 20 characters.
            </div>
        );
    }
};

const validatePassword = value => {
    if (value.length < 8 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 8 and 40 characters.
            </div>
        );
    }
};

const validationService = {
    required,
    validateEmail,
    validateUsername,
    validatePassword,
};

export default validationService;