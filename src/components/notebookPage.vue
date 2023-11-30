<template>
  <v-sheet class="d-flex">
    <div class="ma pa me-auto">
      <div class="tambah-data">
        <v-dialog v-model="tambahDataDialog" scrollable width="auto">
          <template v-slot:activator="{ props }">
            <v-btn color="#43A047" v-bind="props"> Tambahkan Data </v-btn>
          </template>
          <v-card width="900px">
            <v-card-title>Pilih Data</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px">
              <v-container>
                <v-radio-group v-model="idDataTerpilih">
                  <v-radio v-for="pilihan in katalogData" :key="pilihan.id" :label="pilihan.judul" :value="pilihan.id">
                  </v-radio>
                </v-radio-group>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-end">
              <v-btn color="blue-darken-1" variant="text" @click="tutupDialog">
                Tutup
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="simpanDataDialog">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <div class="ma pa">
      <div class="analisis-deskriptif">
        <v-dialog v-model="dialog1" width="1024">
          <template v-slot:activator="{ props }">
            <v-btn color="#43A047" v-bind="props" @click="openDialog(1)">Statistik Deskriptif</v-btn>
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
                    <v-select :items="['Kolom 1', 'Kolom 2', 'Kolom 3', 'Kolom 4']" label="Kolom" required></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      :items="['Rata-rata', 'Median', 'Modus', 'Simpangan Baku', 'Varians', 'Jangkauan', 'Jangkauan Antar Kuartil', 'Simpangan', 'Simpangan Rata-rata']"
                      label="Deskriptif" multiple></v-autocomplete>
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
      </div>
    </div>

    <div class="ma pa">
      <div class="analisis-inferensia">
        <v-dialog v-model="dialog2" width="1024">
          <template v-slot:activator="{ props }">
            <!-- <div class="button-container"> -->
            <v-btn color="#43A047" v-bind="props" @click="openDialog(2)"> Statistik Inferensia </v-btn>
            <!-- </div> -->
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
                    <v-select :items="['Kolom 1', 'Kolom 2', 'Kolom 3', 'Kolom 4']" label="Kolom" required></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      :items="['Paired t-test', 'Unpaired t-test', 'Korelasi Pearson', 'One Way Anova', 'Wilcoxon Rank Test', 'Mann Whitney U-test', 'Korelasi Spearman', 'Kruskal Wallis Test']"
                      label="Uji Statistik" multiple></v-autocomplete>
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
      </div>
    </div>

    <div class="ma pa">
      <div class="visualisasi-data">
        <v-dialog v-model="dialog3" width="1024">
          <template v-slot:activator="{ props }">
            <!-- <div class="button-container"> -->
            <v-btn color="#43A047" v-bind="props" @click="openDialog(3)"> Visualisasi Data </v-btn>
            <!-- </div> -->
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
                    <v-select :items="['Kolom 1', 'Kolom 2', 'Kolom 3', 'Kolom 4']" label="Kolom" multiple></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete :items="['Bar Chart', 'Pie Chart', 'Line Chart', 'Scatter Plot']" label="Chart"
                      multiple></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="tutupDialog">
                Tutup
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="simpanDataDialog">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-sheet>
  <div class="table">
    <v-card flat title="Notebook">
      <template v-slot:text>
        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
          hide-details></v-text-field>
      </template>

      <v-data-table :headers="dataHeaders" :items="dataContents" :search="search"></v-data-table>
    </v-card>
  </div>

  <div class="hasil">
    <p>
      Hasil
    </p>
    <v-app>
      <v-container>
        <v-sheet :height="600" color="blue-lighten-4" border rounded class="box-hasil"></v-sheet>
      </v-container>
    </v-app>
  </div>
  <div class="kanan">
    <div class="deskriptif">
      <a><img width="14" height="14" src="https://img.icons8.com/material-two-tone/14/000000/download--v1.png"
          alt="download--v1">Unduh Output</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {

      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialogm1: '',
      tambahDataDialog: false,
      search: '',
      dataHeaders: [],
      dataContents: [],
      katalogData: [],
      idDataTerpilih: null
    }
  },
  methods: {
    tutupDialog() {
      this.tambahDataDialog = false;
      this.dialog1 = false;
      this.dialog2 = false;
      this.dialog3 = false;
    },
    simpanDataDialog() {
      this.tutupDialog();
      console.log('id data terpilih: ' + this.idDataTerpilih);
      axios.get('http://localhost:8080/api/v1/data/' + this.idDataTerpilih)
        .then(response => {
          const headers = response.data.entity.headers;

          const mappedHeaders = headers.map((key) => {
            return { key, title: key};
          });

          const contents = response.data.entity.contents.map(jsonString => JSON.parse(jsonString));
          this.dataHeaders = mappedHeaders;
          this.dataContents = contents;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    openDialog(dialogNumber) {
      // Buka dialog sesuai dengan nomor dialog yang diberikan
      this[`dialog${dialogNumber}`] = true;
    },
    closeDialog(dialogNumber) {
      // Tutup dialog sesuai dengan nomor dialog yang diberikan
      this[`dialog${dialogNumber}`] = false;
    },
  },
  mounted() {

    const katalogDataRequest = {
      tableName: 'katalog_data',
      columnNames: ['id', 'judul']
    };

    axios.post('http://localhost:8080/api/v1/data', katalogDataRequest)
      .then(response => {
        const parsedData = response.data.entity.map(jsonString => JSON.parse(jsonString));
        const sortedData = parsedData.sort((a, b) => {
          const titleA = a.judul.toLowerCase();
          const titleB = b.judul.toLowerCase();

          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;
        });
        this.katalogData = sortedData;
      })
      .catch(error => {
        console.error('Error fetching katalog data:', error);
      });
  }
}
</script>

<style scoped>
.d-flex {
  margin-left: 2%;
  margin-top: 20px;
  margin-right: 2%;
}

.analisis-deskriptif,
.analisis-inferensia,
.visualisasi-data {
  margin-left: 5%;
}

.statistik,
.deskriptif {
  padding: 5px 10px 7px 10px;
  background-color: #17A3B4;
  margin: 20px 0 10px 30px;
  display: inline-block;
}

.deskriptif a {
  font-size: 12px;
  font-weight: 600;
  font-style: inter;
  padding-right: 20px;
  color: white;
}

.deskriptif a:hover {
  background-color: #138083;
  padding: 8px 20px 10px 7px;
}

/* .tambah-data{
    margin-left: 3%;
  } */

.table {
  margin: 20px;
  margin-left: 25px;
  align-content: center;
}

td {
  border-bottom: 1px #918A8A;
}

.hasil {
  margin-left: 2%;
}

.hasil p {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 2rem;
}

div.hasil div.v-application.v-theme--light.v-layout.v-layout--full-height.v-locale--is-ltr div.v-application__wrap div.v-container.v-locale--is-ltr {
  margin: 0px;
  padding-left: 0px;
}
</style>
