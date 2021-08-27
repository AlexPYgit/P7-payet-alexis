import { createStore } from 'vuex'
const axios = require('axios');

const instance = axios.create({
  baseURL:`http://localhost:3000/api/`,
});

let user =localStorage.getItem('user');
if(!user){
  user = { token: ''}
}else{
  user = JSON.parse(user);
  instance.defaults.headers.common['Authorization'] = user.token;
}


export default createStore({
  state: {
    userInfos :{},
    user: user,
    users: [],

    subjectLists : [],
    oneSubject: {},
    contentSubject: {},
    comentBySubject:[],
   
  },
  getters:{

    userInfos(state){
      return state.userInfos;
    },
    users(state){
      return state.users;
    },
    user (state){
      return state.user;
    },

    comentBySubject(state){
      return state.comentBySubject;
    }
  

  },
  mutations: {

        // SECTION MUTATIONS USER //

    USER(state, user){
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },

    USER_INFOS (state, userInfos){
      state.userInfos = userInfos;
     },

     LOG_OUT(state){
      state.userInfos = {};
      state.user = {};
      state.users = [];
      state.subjectLists = [];
      state.oneSubjetc = {};
      localStorage.removeItem('user');
      localStorage.removeItem('storageSubject');
     },

     GET_USERS (state, users){
       state.users = users;
     },

     // END SECTION USER //


    // SECTION MUTATIONS POST //

     SUBJECT_LISTS(state, subjectLists){
       state.subjectLists = subjectLists;
     },

     ONE_SUBJECT(state, oneSubject){
       state.oneSubject = oneSubject;
     },

    //  SECTION COMENT

    COMENT_BY_SUBJECT(state, comentBySubject){
      state.comentBySubject = comentBySubject;
    },

  },
  actions: {

    // SECTION ACTION USER //

    logOut: ({ commit }) => {
      commit('LOG_OUT'),
      localStorage.removeItem('user');
    },

    // fonction pour l'adimn 
    getUsers: ( { commit }) => {
      instance.get('/users/getAllUser')
    .then( (response) => { 
      const users = response.data;
      commit('GET_USERS', users);
    }).catch( (error) => { console.log(error)})
  },

    login: ({ commit },userInfos) => {
      console.log(userInfos)
       instance.post('/users/login',userInfos)
      .then( (response) => {
        commit('USER_INFOS', response.data.user);
        const user = response.data;
        commit('USER', user);
        console.og(user);
      }).catch((error) => {console.log(error)})
    },

    createAccount : ({commit}, userInfos) => {
      instance.post('/users/signup', userInfos)
      .then( (response) => {
        commit('USER', response.data);
      }).catch( (error) => { console.log(error)});
    },

    deleteAccount: ( {commit}, userId)=> {
      instance.delete(`/users/accounts/${userId}`)
      commit;
    },

    // END SECTION USER //


    // SECTION POST //

    getAllSubject: ( {commit}) => {
      instance.get('/post/')
      .then( (response) => {
        const subjectLists = response.data;
        commit('SUBJECT_LISTS', subjectLists);
      }).catch( (error) => { console.log(error)} );
    },

    createSubject: ( {commit},contentSubject ) => {
      commit;
      instance.post('/post/post',contentSubject)},

    readSubject:( {commit}, Subject)=> {
      localStorage.setItem('storageSubject', JSON.stringify(Subject))
      commit('ONE_SUBJECT',Subject)
    },

    deleteSubject: ( {commit}, infoDeleteSubject) => {
      commit;
      const subjecId = infoDeleteSubject.subjecId
      const userId = infoDeleteSubject.userId
      instance.delete(`/post/${subjecId}`,{userId:`${userId}`})
    },

    // SECTION COMENT

    getAllComentBySubject:( {commit},subjectId)=>{
      instance.get(`/comment/allComment/post/${subjectId}`)
      .then((response) => {
        commit('COMENT_BY_SUBJECT', response.data)
      }).catch(error => console.log(error));
    },

    sendComment:({commit},infoCreateComment)=>{
      commit;
      const idSubject = infoCreateComment.idSubject;
      const content = infoCreateComment.content;
      instance.post(`/comment/comment/${idSubject}`,{content:`${content}`});
    },

    deleteComment: ( {commit}, commentId) => {
      commit;
      instance.delete(`/comment/${commentId}`)
    }
  
  },
})
