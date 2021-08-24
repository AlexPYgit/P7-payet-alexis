<template>
<w-app>
  <div id="nav">
    <router-link to="/">testLogin</router-link> |
    <w-button @click="logOut()" class="button m3" > déconnexion  </w-button> | 
    <router-link  to="home" class="button m3" > Reour sur mon compte  </router-link>
  </div>
  <router-view/>
  </w-app>
</template>


<script>
export default {
  methods:{
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
