<template>
<w-card>
<!-- card Inscription -->
  <div class="card">
    <h1 class="card__title" >Inscription</h1>
    <div class="form-row">
      <w-input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail"/>
    </div>
    <div class="form-row" >
      <w-input v-model="name" class="form-row__input" type="text" placeholder="Nom"/>
    </div>
    <div class="form-row">
      <w-input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe"/>
    </div>
    
    
    <div class="form-row">
      <w-button @click="createAccount()" class="button">
        <span>Créer mon compte</span>
      </w-button>
    </div>
  </div>

<!-- carte connexion -->
  <div class="card">
    <h1 class="card__title" >Connexion</h1>
  
    <div class="form-row">
      <w-input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail"/>
    </div>
    
    <div class="form-row">
      <w-input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe"/>
    </div>
    
    
    <div class="form-row">
      <w-button @click="login()" class="button" > connexion  </w-button>
    </div>
      <w-button @click="logOut()" class="button" > déconnexion  </w-button>
  </div>
  </w-card>
</template>

<script>

import { mapState } from 'vuex';


export default {
  computed: {
    ...mapState([
      'State',
    ])
  },

  name: 'Login',
  data: function () {
    return  {
      email: '',
      name: '',
      password: '',
    }
  },
  
  methods: {
    login: function () {
      const self = this;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      }).then( () => {
        self.$router.push('/home');
      }).catch((error) => {
        return console.log(error)
      }) 
    },
    createAccount: function () {
      const self = this;
      this.$store.dispatch('createAccount', {
        name: this.name,
        email: this.email,
        password: this.password,
      }).then( () => {
        self.$router.push('/home')
      }).catch( (error) => { 
        console.log(error);
      });
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
    
    
  }
}
</script>

<style scoped>
  .form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
  }

  .form-row__input {
    padding:8px;
    border: none;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
  }

  .form-row__input::placeholder {
    color:#aaaaaa;
  }

</style>>
