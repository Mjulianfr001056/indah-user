<template>
  <!-- <ul>
      <li><button @click="layout = 'notebookActive'">Notebook</button></li>
      <li><button @click="layout = 'dataActive'">Data</button></li>
  </ul> -->
  
  <!-- <v-card>
    <v-tabs bg-color="#428DD1" center-active>
      <v-tab><button @click="layout = 'notebookActive'">Notebook</button></v-tab>
      <v-tab><button @click="layout = 'dataActive'">Data</button></v-tab>
    </v-tabs>
  </v-card>
  <div v-if="layout === 'notebookActive'"> <notebook/> </div>
  <div v-if="layout === 'dataActive'"><dataNotebook/></div> -->
  <v-card color="basil" >
    <v-tabs v-model="tab" bg-color="#428DD1" color="white" grow class="vcard">
      <v-tab v-for="item in items" :key="item" :value="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item v-for="item in items" :key="item" :value="item">
        <v-card flat>
          <v-card-text :value="notebook"><notebook/> <dataNotebook/></v-card-text>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import notebook from "../components/notebookPage.vue"
import dataNotebook from "../components/dataPage.vue"
export default {
name: 'App',
components: {
  notebook, dataNotebook
},
data(){
  return{
      layout: 'notebookActive',
      tab: 'Notebook',
      items: ['Notebook', 'Data'],
  }
}
}
</script>

<style scoped>
.vcard{
  /* max-width: 300px; */
  margin-left: 45px;
}
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
li button{
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