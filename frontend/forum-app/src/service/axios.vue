
import axios from "axios";
import store from "../store/index";

export default instance () =>{
    return axios.create({
        baseURL:`http://localhost:3000/api/`,

        headers: {
            Authorization: `hello`,
        }
    });
};