import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
  baseURL: 'localhost:3000/users/api/'
});

export default createStore({
  state: {
  },
  getters:{

  },
  mutations: {
  },
  actions: {
    createAccount: ({commit},  userInfos) => {
      commit;
      instance.post('/signup', userInfos)
      .then(function (response){
        console.log(response);
      })
      .catch( function (error) {
        console.log(error)
      })
    }
  },
  modules: {
  }
})
