<template>
  <div class="home">
    <img alt="Vue logo" style="height : 200px; "  src="../assets/icon.png">
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
     Login
  }
}
</script>
