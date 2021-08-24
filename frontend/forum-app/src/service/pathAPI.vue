import axios from "../service/axios";

export default {
    
    login(data) {
        return axios().post("users/login", data);
    },

}