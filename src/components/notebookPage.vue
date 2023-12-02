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
              <span class="text-h5">Pilih kolom</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row required>
                  <v-col cols="12" sm="6" required>
                    <v-select v-model="selectedColumns" :items=headersArray label="Kolom" required multiple></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" required>
                    <v-autocomplete v-model="selectedDescriptiveStats" :items="['Summary', 'Correlation']" label="Deskriptif" multiple required></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="tutupDialog">
                Tutup
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="pilihDeskriptif">
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
            <v-btn color="#43A047" v-bind="props" @click="openDialog(2)"> Statistik Inferensia </v-btn>
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
                    <v-autocomplete :items=availableInfentialStats label="Uji Statistik" multiple required></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select :items=headersArray label="Kolom" required></v-select>
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
            <v-btn color="#43A047" v-bind="props" @click="openDialog(3)"> Visualisasi Data </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h4">Pilih Visualisasi</span>
              <br>
              <span class="text-h5">Pilih Data</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row required>
                  <v-col cols="12" sm="6" required>
                    <v-select v-model="selectedColumns" :items=headersArray label="Kolom" multiple required></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" required>
                    <v-autocomplete v-model="selectedCharts" :items="['Bar Chart', 'Pie Chart', 'Line Chart', 'Scatter Plot']" label="Chart" multiple required></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="tutupDialog">
                Tutup
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="pilihVisualisasi">
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
    <v-sheet class="d-flex mb-6">
      <v-sheet class="ma-2 pa-2 me-auto"><p>Hasil</p></v-sheet>
      <v-sheet class="ma-2 pa-2"><v-btn color="#43A047">
        Unduh
      </v-btn></v-sheet>
    </v-sheet>

    <v-app class="box-output">
      <v-container>
        <v-sheet :height="600" width="102%" color="blue-lighten-4" border rounded class="box-hasil">
          <!-- <template v-if="visualObject && visualObject.length > 0">
            {{ visualObject }}
          </template> -->
          <!-- <BarChartComponent /> -->
          <!-- <ScatterPlotComponent /> -->
          <!-- <PieChartComponent /> -->
          <LineChartComponent />
        </v-sheet>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';
// import BarChartComponent from './BarChartComponent.vue';
// import ScatterPlotComponent from './ScatterPlotComponent.vue';
// import PieChartComponent from './PieChartComponent.vue';
import LineChartComponent from './LineChartComponent.vue';

export default {
  components: {
    // BarChartComponent,
    // ScatterPlotComponent,
    // PieChartComponent,
    LineChartComponent,
  },

  data() {
    return {

      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialogm1: '',
      tambahDataDialog: false,
      search: '',
      headersArray: [],
      dataHeaders: [],
      dataContents: [],
      katalogData: [],
      selectedColumns: [],
      selectedDescriptiveStats: [],
      selectedCharts: [],
      summaryEntity: [],
      availableInfentialStats: ['Paired t-test', 'Unpaired t-test', 'One Way Anova', 'Wilcoxon Rank Test', 'Mann Whitney U-test', 'Kruskal Wallis Test'],
      idDataTerpilih: null,
      visualObject: [],
    }
  },
  methods: {
    tutupDialog() {
      this.tambahDataDialog = false;
      this.dialog1 = false;
      this.dialog2 = false;
      this.dialog3 = false;
      this.selectedColumns = [];
      this.selectedDescriptiveStats = [];
      this.selectedCharts = [];
    },
    simpanDataDialog() {
      this.$emit('tableIdChanged', this.idDataTerpilih);
      const headers = {
        'ngrok-skip-browser-warning': 'true'
      }
      this.tutupDialog();
      axios.get(' https://3067-110-138-125-213.ngrok-free.app/api/v1/data/' + this.idDataTerpilih, { headers })
        .then(response => {
          this.headersArray = response.data.entity.headers;

          const mappedHeaders = this.headersArray.map((key) => {
            return { key, title: key };
          });

          const contents = response.data.entity.contents.map(jsonString => JSON.parse(jsonString));
          this.dataHeaders = mappedHeaders;
          this.dataContents = contents;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
        this.selectedColumns = [];
        this.selectedDescriptiveStats = [];
        this.selectedCharts = [];
    },
    pilihDeskriptif() {
      this.dialog1 = false
      // Memeriksa apakah v-col sudah diisi
      if (!this.selectedColumns || this.selectedColumns.length === 0) {
        this.tampilkanAlert('Anda Belum Memilih Kolom');
        return;
      }

      // Memeriksa apakah v-autocomplete sudah diisi
      if (!this.selectedDescriptiveStats || this.selectedDescriptiveStats.length === 0) {
        this.tampilkanAlert('Anda Belum Memilih Deskriptif');
        return;
      }

      this.selectedColumns = [];
      this.selectedDescriptiveStats = [];    

      const descriptiveRequest = {
        'ngrok-skip-browser-warning': 'true',
        tableId: this.idDataTerpilih,
        columnNames: this.selectedColumns,
        descriptiveMethods: this.selectedDescriptiveStats
      }

      axios.post(' https://3067-110-138-125-213.ngrok-free.app/api/v1/desc', descriptiveRequest)
        .then(response => {
          const tmp = response.data.entity;

          Object.entries(tmp).forEach(([key, value]) => {
            switch (key) {
              case "Summary":
                this.visualObject.push(JSON.parse(value));
                break;
              case "Correlation":
                this.visualObject.push(value);
                break;
              default:
                break;
            }
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    pilihVisualisasi() {
      this.dialog1 = false
      // Memeriksa apakah v-col sudah diisi
      if (!this.selectedColumns || this.selectedColumns.length === 0) {
        this.tampilkanAlert('Anda Belum Memilih Kolom');
        return;
      }

      // Memeriksa apakah v-autocomplete sudah diisi
      if (!this.selectedCharts || this.selectedCharts.length === 0) {
        this.tampilkanAlert('Anda Belum Memilih Visualisasi');
        return;
      }
      this.selectedColumns = [];
      this.selectedCharts = [];
    },
    openDialog(dialogNumber) {
      // Buka dialog sesuai dengan nomor dialog yang diberikan
      this[`dialog${dialogNumber}`] = true;
    },
    closeDialog(dialogNumber) {
      // Tutup dialog sesuai dengan nomor dialog yang diberikan
      this[`dialog${dialogNumber}`] = false;
    },
    tampilkanAlert(pesan) {
      // Metode untuk menampilkan alert
      alert(pesan);
    },
  },
  mounted() {
    const katalogDataRequest = {
      'ngrok-skip-browser-warning': 'true',
      tableName: 'katalog_data',
      columnNames: ['id', 'judul']
    }

    axios.post(' https://3067-110-138-125-213.ngrok-free.app/api/v1/data', katalogDataRequest)
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

.analisis-deskriptif, .analisis-inferensia, .visualisasi-data {
  margin-left: 5%;
}

.table {
  margin: 20px;
  margin-left: 25px;
  align-content: center;
}

td {
  border-bottom: 1px #918A8A;
}

.hasil {
  margin-right: 2%;
  margin-bottom: 0px;
}

.hasil p {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 2rem;
}

.box-output{
  margin-left: 2%;
}
</style>
