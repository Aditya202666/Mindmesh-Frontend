import axiosInstance from "../../config/axiosConfig"
import { handleError } from "../utils/handleError"


const checkUsername = async(username)=>{
    try {
        const res = await axiosInstance.post('/user/username', username)
        return res.data

    } catch (error) {
       return handleError(error, false)
    }
}


export {checkUsername}