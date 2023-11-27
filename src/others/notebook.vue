<template>
    <Navbar />
  <div class="fitur">
    <a>Notebook</a>
    <a>Data</a>
    <a>Output</a>
  </div>

  
  <div class="statistik">
    <a>Statistik Deskriptif</a>
    <a>Statistik Inferensia</a>
  </div>

  <div class="deskriptif">
    <a>Tabel</a>
    <a>Bar Chart</a>
    <a>Pie Chart</a>
    <a>Area Chart</a>
    <a>Line Chart</a>
    <a>Scatter Chart</a>
  </div>

  <!-- <div class="tampil">
    <p class="left">Tampilkan: </p>
    <div class="select">
      <select class="custom-select" id="inlineFormCustomSelect">
        <option selected></option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
    <p class="baris ">baris</p>
  </div>

    <div class="input-group">
  <div class="form-outline">
    <input type="search" id="form1" class="form-control" />
    <label class="form-label" for="form1">Search</label>
  </div>
  <button type="button" class="btn btn-primary">
    <i class="fas fa-search"></i>
  </button>
</div> -->

    <div class="dropdown">
      <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Column
      </button>
      <ul class="dropdown-menu" style="border-radius: 0;">
        <li><span class="dropdown-item-text">Kolom Data</span></li>
        <li><a class="dropdown-item" href="#">Column 1</a></li>
        <li><a class="dropdown-item" href="#">Column 2</a></li>
        <li><a class="dropdown-item" href="#">Column 3</a></li>
      </ul>

      <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Sort
      </button>
      <ul class="dropdown-menu" style="border-radius: 0;">
        <li><span class="dropdown-item-text">Dropdown item text</span></li>
        <li><a class="dropdown-item" href="#">Ascending</a></li>
        <li><a class="dropdown-item" href="#">Descending</a></li>
      </ul>

      <button class="bg-white">Stripped Table</button>
      <button class="bg-white">Highlight Row</button>

      <div class="tambahan">
        <a>Unduh Output</a>
        <a>Tambahkan Data</a>
      </div>
  </div>
<div>
</div>

<v-card
    flat
    title="Nutrition"
  >
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
      ></v-text-field>
    </template>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import Navbar from '@/components/navbar.vue'
export default {
  components: {
    Navbar
  },
    data () {
      return {
        search: '',
        headers: [
          {
            align: 'start',
            key: 'name',
            sortable: false,
            title: 'Dessert (100g serving)',
          },
          { key: 'calories', title: 'Calories' },
          { key: 'fat', title: 'Fat (g)' },
          { key: 'carbs', title: 'Carbs (g)' },
          { key: 'protein', title: 'Protein (g)' },
          { key: 'iron', title: 'Iron (%)' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: 1,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: 1,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: 7,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: 8,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: 16,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: 0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: 2,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: 45,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: 22,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: 6,
          },
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: 1,
          },
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: 1,
          }
        ],
      }
    },
  }
</script>

<style scoped>
 .fitur {
    padding: 40px 30px 10px 40px;
    background-color: #428DD1;
 }

 .fitur a {
    padding: 20px 50px 10px 10px;
    font-weight: 600;
    color: white;
 }

 .fitur a:hover {
    color: #428DD1;
    background-color: white;
    padding-right: 10px;
    margin: 20px 50px 0 10px;
 }
 .statistik, .deskriptif, .tambahan {
    padding: 5px 10px 7px 10px;
    background-color: #17A3B4;
    margin: 20px 0 10px 30px;
    display: inline-block;
    overflow: hidden;
 }

 .tambahan{
  float: right;
  padding-right: 0;
  margin-right: 30px;
 }

 .statistik a, .deskriptif a, .tambahan a{
    font-size: 12px;
    font-weight: 600;
    font-style: inter;
    padding-right: 20px;  
    color: white;
 }

 .statistik a:hover, .deskriptif a:hover, .tambahan a:hover {
    background-color: #138083;
    padding: 10px 5px 8px 5px;
 }

 .dropdown{
    padding-left: 30px;
    margin-bottom: 20px;
 }

 button {
    margin-right: 30px;
    background-color: #138083;
    padding: 5px 10px 7px 10px;
 }

 .kolom {
    background-color: #428DD1;
 }

 .left {
  padding-left: 30px;
 }
 .select {
    border: 1px solid black;
    margin: 8px;
    padding-top: 0;
    display: inline;
 }

 .tampil {
  display: flex;
 }

 table {
  border: solid 1px #FCF7F7;
  margin: 30px;
  background-color: #FCF7F7;
 }

 thead {
  background-color: #428DD1;
 }

 th, td {
  border-bottom: 1px solid #918A8A;
  color: white;
  padding: 5px 100px 5px 10px;
 }

 td {
  padding-bottom: 50px;
  color: black;
  padding: 20px;
 }

 p {
  color: #076F3D;
  padding: 30px;
 }
</style>