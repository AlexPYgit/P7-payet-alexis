<template>
  
  <div>
    <img alt="Vue logo" style="height : 200px; "  src="../assets/icon.png">
    <Welcome /> <h1>" {{ this.$store.state.user.user.name }} "</h1>
    <w-card v-if="user.admin == true">
      <w-flex class="column">
        <w-flex>
          <w-button  @click="getUsers()" class="button" > récupère les users  </w-button>
        </w-flex>
        <w-card  v-for="(user, index ) in users" :key="user">
          <w-flex>
           
            <w-card>
              <p class="my4"> nom du compte: " <span class="title3"> {{ user.name }}</span> "</p>
              <br>
              <span> email du compte: "{{ user.email }}"" </span>
            </w-card>
              <w-flex justify-start>
                <w-button @click="deleteAccount(user.id, remove(index))"  class="button ma5" > suprimer son compte   </w-button>
              </w-flex>
          </w-flex>
        </w-card>
      </w-flex>
    <br>
      <div>
        
      </div>
    </w-card>
    <br>
    <w-button @click="logOut()" class="button ma3" > déconnexion  </w-button>
  </div>

    <!-- Affichage des sujuets -->
  <w-flex justify-center >
    <w-card class="xs10">
      <h1>Sujet en cours</h1>
      <div v-for="subjectList in subjectLists" :key="subjectList">
      <w-transition-fade>
        <w-button class="ma4 pa4" bg-color="secondary" outline md text lg  round  @click="readSubject(subjectList)"> {{ subjectList.title }}  </w-button>
      </w-transition-fade>
      </div>
    </w-card>
  </w-flex>
  
  <!-- création de sujet -->

  <h1 class="mt4"> <strong>Créer ton sujet</strong> </h1>

  <br>
  <br>
  <w-flex justify-center class="ma4">
    <w-card class="xs10">
      <w-flex justify-center>
        <w-card class="xs4">
          <label for="titleSubject"> Titre de votre sujet </label>
        </w-card>
      </w-flex>
      <w-input  v-model="title" id="titleSubject" type="text" contour  shadow >Titre </w-input>
      <w-textarea v-model="post" type="text" for="contentSubject"  class = "mt4"  contour  shadow > contenu du sujet </w-textarea>
      <br>
      <w-button @click="createSubject(),getAllSubject()" class="button" > envoyer   </w-button>
    </w-card>
  </w-flex>
<w-flex justify-start>
   <w-button @click="deleteAccount(user.user.id)"  class="button ma5" > suprimer son compte   </w-button>
</w-flex>

</template>


<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'
import { mapState } from 'vuex';

export default {
  name: 'Home',

  data : function(){
    return {
      title: '',
      post: '',
    }
  },
  components: {
     Welcome
  },
  methods:{
    readSubject(Subject){
      this.$store.dispatch('readSubject',Subject)
      this.$router.push('/subject')
    },

    createSubject(){
      this.$store.dispatch('createSubject', {
        title : this.title,
        post : this.post,
      })
    },

    getAllSubject (){
    this.$store.dispatch('getAllSubject')
     .then( response => { console.log(response)} );
     return
    },

    getUsers (){
      this.$store.dispatch('getUsers')
    },

    logOut: function (){
        const self = this;
        this.$store.dispatch('logOut').then( () => {
          console.log({message :'déconnecté'})
          self.$router.push('/')
        }).catch (error => {
          console.log(error)
        });
      },

      deleteAccount (userId){
        const self = this;
        this.$store.dispatch('deleteAccount', userId)
        .then( ()=> {
           this.storageUser = JSON.parse(localStorage.getItem('user'))
          if(this.storageUser.user.admin !== true){
            self.$router.push('/')}
            this.users.sort()
          })
        .catch (error=> {console.log(error)});
      },
      remove(index){
        this.users.splice(index, 1)
      }
  },

  computed: {
    ...mapState({
     user: 'user',
     users:'users',
     subjectLists : 'subjectLists',
     State:'state',
    }),
  },

}


</script>
