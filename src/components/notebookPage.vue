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
              <v-container class="radio-button-list">
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
              <span class="text-h5">Statistik Deskriptif</span>
            </v-card-title>
            <v-card-text>
              <v-container class="radio-button-list">
                <v-row required>
                  <v-col cols="12" sm="6" required>
                    <v-select v-model="selectedColumns" :items=headersArray label="Kolom" required multiple></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" required>
                    <v-autocomplete v-model="selectedDescriptiveStats" :items="['Summary', 'Correlation']"
                      label="Deskriptif" multiple required></v-autocomplete>
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
        <!-- Tombol untuk membuka dialog pertama -->
        <v-btn color="#43A047" v-bind="props" @click="openDialog(2)">Statistik Inferensia</v-btn>
        <!-- Dialog Pertama: Memilih Uji Statistik -->
        <v-dialog v-model="dialog2" width="600">
          <v-card>
            <v-card-title>
              <span class="text-h5">Pilih Uji Statistik Inferensia</span>
            </v-card-title>
            <v-card-text>
              <v-container class="radio-button-list">
                <v-radio-group v-model="selectedTest" column>
                  <v-radio v-for="test in availableInfentialStats" :key="test" :label="test" :value="test"></v-radio>
                </v-radio-group>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="blue-darken-1" @click="tutupDialogInferensia">
                Tutup
              </v-btn>
              <v-btn color="blue-darken-1" @click="openDialogKolomInferensia">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Dialog Kedua: Memilih Kolom -->
        <v-dialog v-model="dialogKolomInferensia" width="600">
          <v-card>
            <v-card-title>
              <span class="text-h5">Pilih Kolom</span>
            </v-card-title>
            <v-card-text>
              <v-checkbox class="checkbox-kolom" v-for="kolom in headersArray" :key="kolom" v-model="selectedColumns"
                :label="kolom" :value="kolom" required multiple></v-checkbox>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="blue-darken-1" variant="text" @click="tutupDialogInferensia">
                Tutup
              </v-btn>
              <!-- Tambahkan logika simpan jika diperlukan -->
              <v-btn color="blue-darken-1" variant="text" @click="pilihInferensia">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <div class="ma pa">
      <div class="visualisasi-data">
        <!-- Tombol untuk membuka dialog pertama -->
        <v-btn color="#43A047" v-bind="props" @click="openDialog(3)">Visualisasi Data</v-btn>
        <!-- Dialog Pertama: Memilih Chart -->
        <v-dialog v-model="dialog3" width="600">
          <v-card>
            <v-card-title>
              <span class="text-h5">Pilih Chart</span>
            </v-card-title>
            <v-card-text>
              <v-checkbox v-model="selectedCharts" class="checkbox-kolom" v-for="chart in availableChart" :key="chart"
                :label="chart" :value="chart"></v-checkbox>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="blue-darken-1" variant="text" @click="tutupDialogVisualisasi">
                Tutup
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="openDialogKolomVisualisasi">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Dialog Kedua: Memilih Kolom -->
        <v-dialog v-model="dialogKolomVisualisasi" width="600">
          <v-card>
            <v-card-title>
              <span class="text-h5">Pilih Kolom</span>
            </v-card-title>
            <v-card-text>
              <v-checkbox class="checkbox-kolom" v-for="kolom in headersArray" :key="kolom" v-model="selectedColumns"
                :label="kolom" :value="kolom" required multiple></v-checkbox>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="blue-darken-1" variant="text" @click="tutupDialogVisualisasi">
                Tutup
              </v-btn>
              <!-- Tambahkan logika simpan jika diperlukan -->
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
      <v-sheet class="ma-2 pa-2 me-auto">
        <p>Hasil</p>
      </v-sheet>
      <v-sheet class="ma-2 pa-2"><v-btn color="#43A047">
          Unduh
        </v-btn></v-sheet>
    </v-sheet>

    <v-app class="box-output">
      <v-container>
        <v-sheet :height="max - content" width="102%" border rounded class="box-hasil">

          <!-- Komponen Deskriptif -->
          <template v-for="(component, index) in descriptiveComponent">
            <component :key="index" :is="component" :passedDescriptive="descriptiveTobePassed"
              v-if="descriptiveTobePassed" />
          </template>

          <!-- Komponen Inferensia -->
          <component :is="inferenceComponent" :passedInference="inferenceTobePassed" v-if="inferenceTobePassed" />

          <!-- Komponen Visualisasi -->
          <template v-for="(chartComponent, index) in visualComponents">
            <component :key="index" :is="chartComponent" :passedData="dataTobePassed" v-if="dataTobePassed" />
          </template>
        </v-sheet>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';
import BarChartComponent from './BarChartComponent.vue';
import ScatterPlotComponent from './ScatterPlotComponent.vue';
import PieChartComponent from './PieChartComponent.vue';
import LineChartComponent from './LineChartComponent.vue';
import AnovaInferenceComponent from './AnovaInferenceComponent.vue';
import SummaryDescriptiveComponent from './SummaryDescriptiveComponent.vue';
import CorrelationDescriptiveComponent from './CorrelationDescriptiveComponent.vue';

export default {
  components: {
    BarChartComponent,
    ScatterPlotComponent,
    PieChartComponent,
    LineChartComponent,
    AnovaInferenceComponent,
    SummaryDescriptiveComponent,
    CorrelationDescriptiveComponent
  },

  data() {
    return {
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialogKolomInferensia: false,
      dialogKolomVisualisasi: false,
      dialogm1: '',
      tambahDataDialog: false,
      search: '',
      headersArray: [],
      dataHeaders: [],
      dataContents: [],
      katalogData: [],
      selectedColumns: null,
      selectedDescriptiveStats: [],
      selectedTest: [],
      selectedCharts: [],
      summaryEntity: [],
      availableInfentialStats: ['Paired t-test', 'Unpaired t-test', 'One Way Anova', 'Wilcoxon Rank Test', 'Mann Whitney U-test', 'Kruskal Wallis Test'],
      availableChart: ['Bar Chart', 'Pie Chart', 'Line Chart', 'Scatter Plot'],
      idDataTerpilih: null,
      visualComponents: [],
      chartComponents: ['BarChartComponent', 'ScatterPlotComponent', 'PieChartComponent', 'LineChartComponent'],
      dataTobePassed: null,
      descriptiveComponent: [],
      inferenceComponent: null,
      descriptiveTobePassed: null,
      inferenceTobePassed: null,
    }
  },
  methods: {
    tutupDialog() {
      this.tambahDataDialog = false;
      this.dialog1 = false;
      this.selectedColumns = [];
      this.selectedDescriptiveStats = [];
      this.selectedCharts = [];
      this.selectedTest = [];
    },

    simpanDataDialog() {
      this.$emit('tableIdChanged', this.idDataTerpilih);
      const headers = {
        'ngrok-skip-browser-warning': 'true'
      }
      this.tutupDialog();
      axios.get('https://9b13-110-138-125-213.ngrok-free.app/api/v1/data/' + this.idDataTerpilih, { headers })
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


      this.descriptiveTobePassed = {
        'ngrok-skip-browser-warning': 'true',
        tableId: this.idDataTerpilih,
        columnNames: this.selectedColumns,
      }

      this.selectedDescriptiveStats.forEach((stat) => {
        switch (stat) {
          case "Summary":
            this.descriptiveComponent.push("SummaryDescriptiveComponent");
            break;
          case "Correlation":
            this.descriptiveComponent.push("CorrelationDescriptiveComponent");
            break;
          default:
            break;
        }
      });

      this.selectedColumns = [];
      this.selectedDescriptiveStats = [];
    },
    tutupDialogInferensia() {
      this.dialog2 = false;
      this.dialogKolomInferensia = false;
      this.selectedTest = [];
      this.selectedColumns = [];
    },
    tutupDialogVisualisasi() {
      this.dialog3 = false;
      this.dialogKolomVisualisasi = false;
      this.selectedCharts = [];
      this.selectedColumns = [];
    },
    pilihInferensia() {
      // Memeriksa apakah Kolom sudah diisi
      if (!this.selectedColumns || this.selectedColumns.length === 0) {
        this.tampilkanAlert('Anda Belum Memilih Kolom');
        return;
      }

      this.inferenceTobePassed = {
        'ngrok-skip-browser-warning': 'true',
        tableId: this.idDataTerpilih,
        columnNames: this.selectedColumns,
        inferenceMethod: this.selectedTest
      }

      switch (this.selectedTest) {
        // case "Paired t-test":
        //   this.inferenceComponent.push("PairedTTestComponent");
        //   break;
        // case "Unpaired t-test":
        //   this.inferenceComponent.push("UnpairedTTestComponent");
        //   break;
        case "One Way Anova":
          this.inferenceComponent = AnovaInferenceComponent
          break;
        // case "Wilcoxon Rank Test":
        //   this.inferenceComponent.push("WilcoxonRankTestComponent");
        //   break;
        // case "Mann Whitney U-test":
        //   this.inferenceComponent.push("MannWhitneyUtestComponent");
        //   break;
        // case "Kruskal Wallis Test":
        //   this.inferenceComponent.push("KruskalWallisTestComponent");
        //   break;
        default:
          break;
      }


      this.selectedTest = [];
      this.selectedColumns = [];
      this.dialogKolomInferensia = false
    },
    pilihVisualisasi() {
      this.dialog3 = false
      // Memeriksa apakah v-col sudah diisi
      if (!this.selectedColumns || this.selectedColumns.length === 0) {
        this.tampilkanAlert('Anda Belum Memilih Kolom');
        return;
      }


      const headers = {
        'ngrok-skip-browser-warning': 'true',
        tableName: this.idDataTerpilih,
        columnNames: this.selectedColumns
      }

      axios.get('https://9b13-110-138-125-213.ngrok-free.app/api/v1/data/' + this.idDataTerpilih, { headers })
        .then(response => {
          const headers = response.data.entity.headers

          const contents = response.data.entity.contents.map(jsonString => JSON.parse(jsonString));

          this.dataTobePassed = {
            headers: headers,
            contents: contents
          }
        })
        .catch(error => {
          console.log(error);
        });


      this.visualComponents = [];

      this.selectedCharts.forEach((chart) => {
        switch (chart) {
          case 'Bar Chart':
            this.visualComponents.push("BarChartComponent");
            break;
          case 'Pie Chart':
            this.visualComponents.push("PieChartComponent");
            break;
          case 'Line Chart':
            this.visualComponents.push("LineChartComponent");
            break;
          case 'Scatter Plot':
            this.visualComponents.push("ScatterPlotComponent");
            break;
          default:
            break;
        }
      });

      this.selectedCharts = [];
      this.selectedColumns = [];
      this.dialogKolomVisualisasi = false;
    },
    openDialog(dialogNumber) {
      // Buka dialog sesuai dengan nomor dialog yang diberikan
      this[`dialog${dialogNumber}`] = true;
    },
    openDialogKolomInferensia() {
      // Pastikan telah memilih uji statistik sebelum membuka dialog kolom
      if (!this.selectedTest || this.selectedTest.length === 0) {
        this.tampilkanAlert('Anda Belum Memilih Jenis Pengujian');
        return;
      }
      this.dialog2 = false;
      this.dialogKolomInferensia = true;
    },
    openDialogKolomVisualisasi() {
      // Pastikan telah memilih uji statistik sebelum membuka dialog kolom
      if (!this.selectedCharts || this.selectedCharts.length === 0) {
        this.tampilkanAlert('Anda Belum Memilih Visualisasi');
        return;
      }
      this.dialog3 = false;
      this.dialogKolomVisualisasi = true;
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

    axios.post('https://9b13-110-138-125-213.ngrok-free.app/api/v1/data', katalogDataRequest)
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

.checkbox-kolom {
  max-height: 30px;
}

.radio-button-list {
  padding: 0px;
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

/* .box-output{
  margin-left: 2%;
} */
</style>
