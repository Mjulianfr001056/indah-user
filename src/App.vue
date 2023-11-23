<template>
  <div class="container">
    <navbar/> 
    <router-view/>
  </div>
</template>

<script>
import navbar from "@/components/navbar.vue"
import 'material-design-icons-iconfont/dist/material-design-icons.css'
export default {
  name: 'App',
  components: {
    navbar
  }
}
</script>

<style>

</style>