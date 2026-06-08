import axios from "axios";
import { getErrorMessage } from "../Error/getErrorMessage";



export const userLogin = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASLE_URL}/auth/login`, { email, password });
        const token = response?.data?.data?.accessToken;
        return {
            success: true,
            message: 'Login in successfully!',
            token
        }
    }
    catch (err) {
        const message = getErrorMessage(err)
        console.log(message)
        return {
            success: false,
            message
        }
    }

};