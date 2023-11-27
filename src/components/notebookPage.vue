<template>
  <div class="analisis-deskriptif">
    <v-row justify="start">
    <v-dialog v-model="dialog1" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props" @click="openDialog(1)">Statistik Deskriptif</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h4">Statistik Deskriptif</span>
          <br>
          <span class="text-h5">Pilih Data</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Kolom 1', 'Kolom 2', 'Kolom 3', 'Kolom 4']"
                  label="Kolom"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="['Rata-rata', 'Median', 'Modus', 'Simpangan Baku', 'Varians', 'Jangkauan', 'Jangkauan Antar Kuartil', 'Simpangan', 'Simpangan Rata-rata']"
                  label="Chart"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog1 = false">
            Tutup
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog1 = false">
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    </div>

  <div class="inferensia">
      <v-row justify="center">
    <v-dialog v-model="dialog2" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props" @click="openDialog(2)"> Statistik Inferensia </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Statistik Inferensia</span>
          <br>
          <span class="text-h6">Pilih Data</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Kolom 1', 'Kolom 2', 'Kolom 3', 'Kolom 4']"
                  label="Kolom"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="['Paired t-test', 'Unpaired t-test', 'Korelasi Pearson', 'One Way Anova', 'Wilcoxon Rank Test', 'Mann Whitney U-test', 'Korelasi Spearman', 'Kruskal Wallis Test']"
                  label="Chart"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog2 = false">
            Tutup
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog2 = false">
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    </div>

    <div class="Chart">
      <v-row justify="end">
    <v-dialog v-model="dialog3" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props" @click="openDialog(3)"> Visualisasi Data </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h4">Pilih Visualisasi</span>
          <br>
          <span class="text-h5">Pilih Data</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Kolom 1', 'Kolom 2', 'Kolom 3', 'Kolom 4']"
                  label="Kolom"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="['Bar Chart', 'Pie Chart', 'Area Chart', 'Line Chart', 'Scatter Plot']"
                  label="Chart"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog3 = false">
            Tutup
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog3 = false">
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    </div>

  <div class="deskriptif">
    <a><img width="14" height="14" src="https://img.icons8.com/material-two-tone/14/000000/download--v1.png" alt="download--v1">Unduh Output</a>
    <button @click="views = 'PopUp'"><a><img width="14" height="14" src="https://img.icons8.com/small/14/insert-table.png" alt="insert-table"/>Tambahkan Data</a></button>
  </div>

    <div class="dropdown">
      <button>Stripped Table</button>
      <button>Highlight Row</button>
    </div>

<div class="table">
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
</div>
<div class="output">
  <v-app>
    <v-container>
      <v-sheet :height="400" :width="900" color="blue-lighten-4" border rounded></v-sheet>
    </v-container>
  </v-app>
</div>
</template>

<script>
export default {
data() {
  return {
    
    dialog1: false,
    dialog2: false,
    dialog3: false,
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
            name: 'KA',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: 6,
          },
        ],
  }
},
methods: {
      openDialog(dialogNumber) {
        // Buka dialog sesuai dengan nomor dialog yang diberikan
        this[`dialog${dialogNumber}`] = true;
      },
      closeDialog(dialogNumber) {
      // Tutup dialog sesuai dengan nomor dialog yang diberikan
      this[`dialog${dialogNumber}`] = false;
    },
  }
}

</script>

<style scoped>

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

 .statistik, .deskriptif {
    padding: 5px 10px 7px 10px;
    background-color: #17A3B4;
    margin: 20px 0 10px 30px;
    display: inline-block;
 }

 .statistik a, .deskriptif a{
    font-size: 12px;
    font-weight: 600;
    font-style: inter;
    padding-right: 20px;  
    color: white;
 }

 .statistik a:hover, .deskriptif a:hover {
    background-color: #138083;
    padding: 10px 5px 8px 5px;
 }

 p, .dropdown{
    padding-left: 30px;
    margin-bottom: 20px;
 }

 button {
    margin-right: 30px;
 }

 .kolom {
    background-color: #428DD1;
    padding: 0;
 }

 .tampil {
    border: 1px solid black;
    padding: 1px;
    display: inline-block;
 }

 .table {
    margin: 20px;
    margin-left: 25px;
    align-content: center;
 }
 td {
    border-bottom: 1px #918A8A;
 }
</style>
