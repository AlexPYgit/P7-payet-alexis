<template>
    <h1>Connexion</h1>
   <form action="/ma-page-de-traitement" method="post">
    <div>
        <label for="name">Email : </label>
        <input type="text" placeholder="Votre compte email"  id="name" name="user_name">
        <br>
        <br>
        <label for="name">Password : </label>
        <input type="text"  placeholder="Votre mot de passe" id="name" name="user_name">
    </div>
</form>
</template>

<script>
    export default {
        name: 'Login',

    }
</script>

