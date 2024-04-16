import axios from "axios";

const API_URL = `http://localhost:4127`;

const register = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            username,
            password,
            email
        });
        const data = await response.data;

        return data;
    }
    catch (error) {
        return { error: error.response.data.message };
    }
};

const login = async (userEmail, userPassword) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email: userEmail,
            password: userPassword,
        });
        const data = await response.data;
        
        console.log(data);
        if (data.accessToken) {
            localStorage.setItem(`user`, JSON.stringify(response.data));
        }

        return data;
    }
    catch (error) {
        return { error: error.response.data.message };
    }
};

const changePassword = async (userPassword) => {
    try {
        const user = getUser();
        if(user) {
            const response = await axios.post(`${API_URL}/changepassword`, {
                accessToken: user.accessToken,
                password: userPassword,
            });
            const data = await response.data;
        }
    }
    catch (error) {
        return { error: error.response.data.message };
    }
}

const logout = () => {
    localStorage.removeItem(`user`);
};

const getUser = () => {
    return JSON.parse(localStorage.getItem(`user`));
};

const authService = {
    register,
    login,
    logout,
    getUser,
    changePassword,
};

export default authService;