<template>
    <ul>
        <li><button @click="layout = 'notebookActive'">Notebook</button></li>
        <li><button @click="layout = 'dataActive'">Data</button></li>
    </ul>
    <div v-if="layout === 'notebookActive'"> <notebook/> </div>
    <div v-if="layout === 'dataActive'"><dataNotebook/></div>
</template>

<script>
import notebook from "../pages/notebookPage.vue"
import dataNotebook from "../views/dataPage.vue"
export default {
  name: 'App',
  components: {
    notebook, dataNotebook
  },
  data(){
    return{
        status: true,
        layout: 'notebookActive'
    }
  }
}
</script>

<style scoped>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #428DD1;

}
li{
    float: left;
}
li a{
    font-weight: 900;
    font-size: 16px;
    display: block;
    color: white;
    text-align: center;
    padding: 10px 20px;
    text-decoration: none;
}
li a:hover:not(.active){
    background-color: cornflowerblue;
}
.active{
    background-color: white;
    color: #428DD1;
}

</style>