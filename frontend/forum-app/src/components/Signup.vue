<template>
    <h1>Inscription</h1>
   <form >
    <div>
        <label for="name">Nom : </label>
        <input v-model="name" type="text"  placeholder="Votre mot de passe" id="name" name="name" required=true>
        <br>
        <br>
        <label for="email">Email : </label>
        <input v-model="email" type="email" placeholder="Votre compte email"  id="email" name="email" required=true>
        <br>
        <br>
        <label for="password">Password : </label>
        <input type="text"  placeholder="Votre mot de passe" id="password" name="password" required=true>
    </div>
    <br>
    <br>
     <div class="form-row">
      <v-btn v-on:click.prevent="signup" class="button" >
        <span >Créer mon compte</span>
      </v-btn>
    </div>
</form>
</template>

<script>
    export default {
        name: 'Signup',
        data() {
            return {
                name : "",
                email: "",
                password: "",
                error: null,
                message: null,
            };
        },
        computed: {
            inputEmpty: function (){
                 if (this.email != "" && this.prenom != "" && this.nom != "" && this.password != "") {
                return true;
                } else {
                return false;
                }
            },
        },
        methods: { 
           createAccount: function (){
               console.log(this.email, this.name, this.password)
               
           } 
        },

    }
</script>
