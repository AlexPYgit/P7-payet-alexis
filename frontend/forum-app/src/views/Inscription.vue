<template>
  <div class="home">
    <img alt="Vue logo" style="height : 200px; "  src="../assets/icon.png">
    <Signup/>
  </div>
</template>

<script>
// @ is an alias to /src
import Signup from '@/components/Signup.vue'

export default {
  name: 'Inscription',
  components: {
     Signup
  }
}
</script>

