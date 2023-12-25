<template>
  <v-sheet class="d-flex">
    <div class="ma pa me-auto">
      <div class="tambah-data">
        <v-btn color="#43A047" @click="bukaDialog('tambahData')"> Tambahkan Data </v-btn>
        <v-dialog v-model="tambahDataDialog" scrollable width="auto">
          <v-card width="900px" style="padding:10px">
            <v-card-title>Pilih Data</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px">
              <v-container class="radio-button-list">
                <v-alert v-model="showError" closable title="Terjadi error!" text="Silakan pilih salah satu data!"
                  type="error" variant="tonal"></v-alert>
                <br>
                <div v-if="onLoading" style="text-align: center;">
                  <v-progress-circular color="green" indeterminate size="62"></v-progress-circular>
                </div>
                <v-radio-group v-model="idDataTerpilih">
                  <v-radio v-for="pilihan in katalogData" :key="pilihan.id" :label="pilihan.judul" :value="pilihan.id"
                    :class="{ 'text-granted': pilihan.status === 'GRANTED', 'text-prohibited': pilihan.status === 'PROHIBITED' }">
                  </v-radio>
                </v-radio-group>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-end">
              <v-btn color="blue-grey-lighten-1" variant="text" @click="tutupDialog('tambahData')">
                Tutup
              </v-btn>
              <v-btn color="green-darken-1" variant="tonal" @click="validasiAkses">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="requestDataDialog" width="auto">
          <v-card width="900px" style="padding:10px">
            <v-card-title>Gagal membuka!</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px">
              <p>Anda belum memiliki akses ke data ini!</p>
              <p>Apakah anda ingin mengajukan permintaan penggunaan data sekarang?</p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-end">
              <v-btn color="blue-grey-lighten-1" variant="text" @click="tutupDialog('requestData')">
                Tutup
              </v-btn>
              <v-btn color="green-darken-1" variant="tonal" @click="ajukanAkses">
                Ajukan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="confirmDataDialog" width="auto">
          <v-card width="900px" style="padding:10px">
            <v-card-title>Sukses!</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px">
              <p>Data berhasil diajukan!</p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-end">
              <v-btn color="blue-grey-lighten-1" variant="tonal" @click="tutupDialog('confirmData')">
                Tutup
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <div class="ma pa">
      <div class="analisis-deskriptif">
        <v-btn color="#43A047" @click="bukaDialog('deskriptif')">Statistik Deskriptif</v-btn>
        <v-dialog v-model="deskriptifDialog" width="1024">
          <v-card style="padding:10px">
            <v-card-title>
              <span class="text-h5">Statistik Deskriptif</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container class="radio-button-list">
                <v-alert v-model="showError" closable title="Terjadi error!"
                  text="Silakan lengkapi kolom berikut sebelum melakukan analisis" type="error" variant="tonal"></v-alert>
                <br>
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
              <v-btn color="blue-grey-lighten-1" variant="text" @click="tutupDialog('deskriptif')">
                Tutup
              </v-btn>
              <v-btn color="green-darken-1" variant="tonal" @click="pilihDeskriptif">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <div class="ma pa">
      <div class="analisis-inferensia">
        <v-btn color="#43A047" @click="bukaDialog('inferensia')">Statistik Inferensia</v-btn>
        <v-dialog v-model="inferensiaDialog" width="600">
          <v-card style="padding:10px">
            <v-card-title>
              <span class="text-h5">Pilih Uji Statistik Inferensia</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container class="dropdown-container">
                <v-select v-model="selectedInferential" :items="availableInfentialStats"
                  label="Pilih uji statistik inferensia"></v-select>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="blue-grey-lighten-1" @click="tutupDialog('inferensia')">
                Tutup
              </v-btn>
              <v-btn variant="tonal" color="blue-darken-1" @click="navigasiInferensia">
                Lanjut
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="anovaDialog" width="600">
          <v-card style="padding:10px">
            <v-card-title>
              <span class="text-h5">Pilih Kolom</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-alert v-model="showError" closable title="Terjadi error!"
                text="Silakan lengkapi kolom sebelum melakukan analisis!" type="error" variant="tonal"></v-alert>
              <br>
              <v-container class="dropdown-container">
                <v-select v-model="selectedColumns" :items="headersArray" label="Kolom" multiple></v-select>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="blue-grey-lighten-1" @click="alihDialog('anova', 'inferensia')">
                Balik
              </v-btn>
              <v-btn color="green-darken-1" variant="tonal" @click="pilihInferensia">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="pairedTTestDialog" width="600">
          <v-card style="padding:10px">
            <v-card-title>
              <span class="text-h5">Pilih Kolom</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-alert v-model="showError" closable title="Terjadi error!"
                text="Gagal melakukan perhitungan, pastikan kolom telah terisi dan tidak sama" type="error"
                variant="tonal"></v-alert>
              <br>
              <v-container class="dropdown-container">
                <v-row required>
                  <v-col cols="12" sm="6" required>
                    <v-select v-model="sampelPertama" :items=headersArray label="Sampel 1" required></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" required>
                    <v-select v-model="sampelKedua" :items=headersArray label="Sampel 2" required></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="blue-grey-lighten-1" @click="alihDialog('pairedTTest', 'inferensia')">
                Balik
              </v-btn>
              <v-btn color="green-darken-1" variant="tonal" @click="pilihInferensia">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="tTestDialog" width="600">
          <v-card style="padding:10px">
            <v-card-title>
              <span class="text-h5">Pilih Kolom</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-alert v-model="showError" closable title="Terjadi error!"
                text="Gagal melakukan perhitungan, pastikan telah memilih sampel dan xbar numerik" type="error"
                variant="tonal"></v-alert>
              <br>
              <v-container class="dropdown-container">
                <v-col required>
                  <v-select v-model="sampelPertama" :items=headersArray label="Kolom Sampel" required></v-select>
                  <v-select v-model="alternative" :items="['LESS', 'GREATER', 'TWO_SIDED']" label="Alternatif"
                    required></v-select>
                  <v-text-field v-model="xbar" label="Nilai xbar" required></v-text-field>
                </v-col>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="blue-grey-lighten-1" @click="alihDialog('tTest', 'inferensia')">
                Balik
              </v-btn>
              <v-btn color="green-darken-1" variant="tonal" @click="pilihInferensia">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="wilcoxonDialog" width="600">
          <v-card style="padding:10px">
            <v-card-title>
              <span class="text-h5">Pilih Kolom</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-alert v-model="showError" closable title="Terjadi error!"
                text="Gagal melakukan perhitungan, pastikan kolom telah terisi dan tidak sama" type="error"
                variant="tonal"></v-alert>
              <br>
              <v-container class="dropdown-container">
                <v-row required>
                  <v-col cols="12" sm="6" required>
                    <v-select v-model="sampelPertama" :items=headersArray label="Sampel 1" required></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" required>
                    <v-select v-model="sampelKedua" :items=headersArray label="Sampel 2" required></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="blue-grey-lighten-1" @click="alihDialog('wilcoxon', 'inferensia')">
                Balik
              </v-btn>
              <v-btn color="green-darken-1" variant="tonal" @click="pilihInferensia">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="mannWhitneyDialog" width="600">
          <v-card style="padding:10px">
            <v-card-title>
              <span class="text-h5">Pilih Kolom</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-alert v-model="showError" closable title="Terjadi error!"
                text="Gagal melakukan perhitungan, pastikan kolom telah terisi dan tidak sama" type="error"
                variant="tonal"></v-alert>
              <br>
              <v-container class="dropdown-container">
                <v-row required>
                  <v-col cols="12" sm="6" required>
                    <v-select v-model="sampelPertama" :items=headersArray label="Sampel 1" required></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" required>
                    <v-select v-model="sampelKedua" :items=headersArray label="Sampel 2" required></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="blue-grey-lighten-1" @click="alihDialog('mannWhitney', 'inferensia')">
                Balik
              </v-btn>
              <v-btn color="green-darken-1" variant="tonal" @click="pilihInferensia">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <div class="ma pa">
      <div class="visualisasi-data">
        <v-btn color="#43A047" @click="bukaDialog('visualisasi')">Visualisasi Data</v-btn>
        <v-dialog v-model="visualisasiDialog" width="600">
          <v-card style="padding: 10px;">
            <v-card-title>
              <span class="text-h5">Pilih Chart</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-select v-model="selectedChart" :items="availableChart" label="Pilih diagram"></v-select>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="blue-grey-lighten-1" @click="tutupDialog('visualisasi')">
                Tutup
              </v-btn>
              <v-btn variant="tonal" color="blue-darken-1" @click="pilahDialog">
                Lanjut
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="visualisasiLanjutanDialog" width="600">
          <v-card style="padding: 10px">
            <v-card-title>
              <span class="text-h5">Pilih Kolom</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container class="radio-button-list">
                <v-alert v-model="showError" closable title="Terjadi error!"
                  text="Silakan lengkapi kolom sebelum melakukan analisis!" type="error" variant="tonal"></v-alert>
                <br>
                <v-row required>
                  <v-col cols="12" sm="6" required>
                    <v-select v-model="labelColumn" :items=filteredLabelOptions label="Label" required></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" required>
                    <v-autocomplete v-model="selectedColumns" :items=filteredColumnsOptions label="Kolom" multiple
                      required></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="blue-grey-lighten-1" @click="alihDialog('visualisasiLanjutan', 'visualisasi')">
                Balik
              </v-btn>
              <v-btn color="green-darken-1" variant="tonal" @click="pilihVisualisasi('lanjutan')">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="visualisasiLineChartDialog" width="600">
          <v-card style="padding: 10px">
            <v-card-title>
              <span class="text-h5">Pilih Baris</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container class="radio-button-list">
                <v-alert v-model="showError" closable title="Terjadi error!"
                  text="Silakan lengkapi baris sebelum melakukan analisis!" type="error" variant="tonal"></v-alert>
                <br>
                <v-row required>
                  <v-col cols="12" sm="12" required>
                    <v-autocomplete v-model="selectedRows" :items=dataRows label="Baris" multiple
                      required></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="blue-grey-lighten-1" @click="alihDialog('visualisasiLineChart', 'visualisasi')">
                Balik
              </v-btn>
              <v-btn color="green-darken-1" variant="tonal" @click="pilihVisualisasi('lineChart')">
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

      <v-data-table :headers="tableHeaders" :items="tableContents" :search="search"></v-data-table>
    </v-card>
  </div>

  <div class="hasil">
    <v-sheet class="d-flex mb-6">
      <v-sheet class="ma-2 pa-2 me-auto">
        <p>Hasil</p>
      </v-sheet>
      <v-sheet class="ma-2 pa-2">
        <v-btn color="red-accent-3" variant="outlined" @click="clearOutput">
          Hapus
        </v-btn>
        <v-divider class="mx-1" vertical></v-divider>
        <v-btn :loading="onDownload" color="#43A047" @click="downloadAsPDF()">
          Unduh
        </v-btn>
      </v-sheet>
    </v-sheet>

    <v-app class="box-output">
      <v-container>
        <v-sheet :height="auto" width="102%" border rounded class="box-hasil">

          <!-- Komponen Deskriptif -->
          <template v-for="(component, index) in descriptiveComponent">
            <component :key="index" :is="component" :passedDescriptive="descriptiveTobePassed"
              v-if="descriptiveTobePassed" />
          </template>

          <!-- Komponen Inferensia -->
          <template v-for="(component, index) in inferenceComponent">
            <component :key="index" :is="component" :passedInference="inferenceTobePassed" v-if="inferenceTobePassed" />
          </template>

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
import { API_ENDPOINT, BASE_NGROK_HEADER as HEADER } from '@/others/config';
import axios from 'axios';
import {
  BarChartComponent,
  ScatterPlotComponent,
  PieChartComponent,
  LineChartComponent,
} from './visualization';

import AnovaInferenceComponent from './inference/AnovaInferenceComponent.vue';
import PairedTTestComponent from './inference/PairedTTestComponent.vue';
import UnpairedTTestComponent from './inference/UnpairedTTestComponent.vue';
import WilcoxonRankTestComponent from './inference/WilcoxonRankTestComponent.vue';
import MannWhitneyUTestComponent from './inference/MannWhitneyUTestComponent.vue';
import SummaryDescriptiveComponent from './descriptive/SummaryDescriptiveComponent.vue';
import CorrelationDescriptiveComponent from './descriptive/CorrelationDescriptiveComponent.vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default {
  components: {
    BarChartComponent,
    ScatterPlotComponent,
    PieChartComponent,
    LineChartComponent,
    AnovaInferenceComponent,
    SummaryDescriptiveComponent,
    CorrelationDescriptiveComponent,
    PairedTTestComponent,
    UnpairedTTestComponent,
    WilcoxonRankTestComponent,
    MannWhitneyUTestComponent,
  },

  data() {
    return {
      onLoading: false,
      onDownload: false,
      showError: false,
      katalogData: [],
      tableHeaders: [],
      dataRows: [],
      tableContents: [],
      search: '',
      headersArray: [],
      tambahDataDialog: false,
      requestDataDialog: false,
      confirmDataDialog: false,
      idDataTerpilih: null,

      deskriptifDialog: false,
      selectedDescriptiveStats: [],
      descriptiveTobePassed: null,
      descriptiveComponent: [],

      inferensiaDialog: false,
      anovaDialog: false,
      pairedTTestDialog: false,
      tTestDialog: false,
      wilcoxonDialog: false,
      mannWhitneyDialog: false,
      availableInfentialStats: ['Paired t-test', 'Unpaired t-test', 'One Way Anova', 'Wilcoxon Rank Test', 'Mann Whitney U-test'],
      selectedInferential: [],
      inferenceTobePassed: null,
      inferenceComponent: [],
      sampelPertama: null,
      sampelKedua: null,
      alternative: "TWO_SIDED",
      xbar: 0,

      visualisasiDialog: false,
      visualisasiLanjutanDialog: false,
      visualisasiLineChartDialog: false,
      availableChart: ['Bar Chart', 'Pie Chart', 'Line Chart', 'Scatter Plot'],
      chartComponents: ['BarChartComponent', 'ScatterPlotComponent', 'PieChartComponent', 'LineChartComponent'],
      selectedChart: null,
      labelColumn: null,
      selectedColumns: [],
      selectedRows: [],
      dataTobePassed: {},
      visualComponents: [],
    }
  },

  computed: {
    filteredLabelOptions() {
      return this.headersArray.filter((option) => !this.selectedColumns.includes(option));
    },
    filteredColumnsOptions() {
      return this.headersArray.filter((option) => option !== this.labelColumn);
    },
  },

  methods: {
    clearInput() {
      this.idDataTerpilih = null;
      this.selectedColumns = [];
      this.selectedDescriptiveStats = [];
      this.selectedInferential = [];
      this.selectedChart = [];
      this.labelColumn = [];
      this.selectedRows = [];
      this.sampelPertama = null;
      this.sampelKedua = null;
      this.alternative = "TWO_SIDED";
      this.xbar = 0;
    },

    clearOutput() {
      this.descriptiveComponent = [];
      this.inferenceComponent = [];
      this.visualComponents = [];
    },

    validateColumnSelection(...componentNames) {
      for (const componentName of componentNames) {
        if (!componentName || componentName.length === 0) {
          return true;
        }
      }
      return false;
    },

    validasiAkses() {
      if (!this.idDataTerpilih) {
        this.showError = true;
        return;
      }

      const selectedPilihan = this.katalogData.find((pilihan) => pilihan.id === this.idDataTerpilih);

      if (selectedPilihan.status === 'PROHIBITED') {
        this.alihDialog('tambahData', 'requestData');
        return;
      } else {
        console.log(this.idDataTerpilih)
        this.pilihData();
        this.tutupDialog('tambahData');
      }
    },

    ajukanAkses() {
      HEADER['tableId'] = this.idDataTerpilih;
      HEADER['userId'] = "102";

      axios.post(API_ENDPOINT + 'data/request', HEADER)
        .catch(error => {
          console.error('Error request data:', error);
        })
        .finally(
          delete HEADER['tableId'],
          delete HEADER['userId'],
          this.alihDialog('requestData', 'confirmData')
        );
    },

    bukaDialog(componentName) {
      this[`${componentName}Dialog`] = true;
    },

    tutupDialog(componentName) {
      this.showError = false;
      this[`${componentName}Dialog`] = false;
      this.clearInput();
    },

    alihDialog(startComponent, endComponent) {
      this[`${startComponent}Dialog`] = false;
      this[`${endComponent}Dialog`] = true;
    },

    pilahDialog() {
      if (this.selectedChart === 'Line Chart') {
        this.alihDialog('visualisasi', 'visualisasiLineChart');
      } else {
        this.alihDialog('visualisasi', 'visualisasiLanjutan');
      }
    },

    navigasiInferensia() {
      switch (this.selectedInferential) {
        case "Paired t-test":
          this.alihDialog('inferensia', 'pairedTTest');
          break;
        case "Unpaired t-test":
          this.alihDialog('inferensia', 'tTest');
          break;
        case "One Way Anova":
          this.alihDialog('inferensia', 'anova');
          break;
        case "Wilcoxon Rank Test":
          this.alihDialog('inferensia', 'wilcoxon');
          break;
        case "Mann Whitney U-test":
          this.alihDialog('inferensia', 'mannWhitney');
          break;
        default:
          this.alihDialog('inferensia', 'anova');
          break;
      }
    },

    getRow() {
      HEADER.tableId = this.idDataTerpilih;
      HEADER.columnNames = [this.headersArray[0]];

      axios.post(API_ENDPOINT + 'data/', HEADER)
        .then(response => {
          const contents = response.data.entity.map(jsonString => JSON.parse(jsonString));
          this.dataRows = contents.map(data => data[this.headersArray[0]]);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        .finally(
          delete HEADER.tableId,
          delete HEADER.columnNames,
          this.clearInput()
        );
    },

    pilihData() {
      this.$emit('tableIdChanged', this.idDataTerpilih);

      axios.get(API_ENDPOINT + 'data/' + this.idDataTerpilih, { headers: HEADER })
        .then(response => {
          this.headersArray = response.data.entity.headers;

          const mappedHeaders = this.headersArray.map((key) => {
            return { key, title: key };
          });

          const contents = response.data.entity.contents.map(jsonString => JSON.parse(jsonString));
          this.tableHeaders = mappedHeaders;
          this.tableContents = contents;

          this.getRow();
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },

    pilihDeskriptif() {
      const validationResult = this.validateColumnSelection(this.selectedColumns, this.selectedDescriptiveStats);

      if (validationResult) {
        this.showError = true;
        return;
      }

      this.descriptiveTobePassed = {
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

      this.tutupDialog('deskriptif');
    },

    pilihInferensia() {
      let validationResult = false;
      if (this.selectedInferential === "Paired t-test" || this.selectedInferential === "Wilcoxon Rank Test" || this.selectedInferential === "Mann Whitney U-test") {
        validationResult = this.sampelPertama === this.sampelKedua;
      } else if (this.selectedInferential === "Unpaired t-test") {
        validationResult = this.sampelPertama === null || !/^[0-9.]+$/.test(this.xbar);
      } else {
        validationResult = this.validateColumnSelection(this.selectedColumns, this.selectedInferential);
      }

      if (validationResult) {
        this.showError = true;
        return;
      }

      switch (this.selectedInferential) {
        case "Paired t-test":
          this.inferenceComponent.push("PairedTTestComponent");
          this.inferenceTobePassed = {
            tableId: this.idDataTerpilih,
            columnNames: [this.sampelPertama, this.sampelKedua],
          }
          this.tutupDialog('pairedTTest');
          break;
        case "Unpaired t-test":
          this.inferenceComponent.push("UnpairedTTestComponent");
          this.inferenceTobePassed = {
            tableId: this.idDataTerpilih,
            columnNames: this.sampelPertama,
            alternative: this.alternative,
            mu: this.xbar
          }
          this.tutupDialog('tTest');
          break;
        case "One Way Anova":
          this.inferenceComponent.push("AnovaInferenceComponent");
          this.inferenceTobePassed = {
            tableId: this.idDataTerpilih,
            columnNames: this.selectedColumns,
          }
          this.tutupDialog('anova');
          break;
        case "Wilcoxon Rank Test":
          this.inferenceComponent.push("WilcoxonRankTestComponent");
          this.inferenceTobePassed = {
            tableId: this.idDataTerpilih,
            columnNames: [this.sampelPertama, this.sampelKedua]
          }
          this.tutupDialog('wilcoxon');
          break;
        case "Mann Whitney U-test":
          this.inferenceComponent.push("MannWhitneyUTestComponent");
          this.inferenceTobePassed = {
            tableId: this.idDataTerpilih,
            columnNames: [this.sampelPertama, this.sampelKedua]
          }
          this.tutupDialog('mannWhitney');
          break;
        default:
          break;
      }
    },

    pilihVisualisasi(priorActivity) {
      let validationResult = false;
      if (priorActivity === "lineChart") {
        validationResult = this.validateColumnSelection(this.selectedChart, this.selectedRows);

        this.dataTobePassed = {
          tableId: this.idDataTerpilih,
          rowNames: this.selectedRows,
          labelRow: this.headersArray
        }
      } else {
        validationResult = this.validateColumnSelection(this.selectedChart, this.labelColumn, this.selectedColumns);

        this.dataTobePassed = {
          tableId: this.idDataTerpilih,
          columnNames: this.selectedColumns,
          labelColumn: this.labelColumn
        }
      }

      if (validationResult) {
        this.showError = true;
        return;
      }

      switch (this.selectedChart) {
        case 'Bar Chart':
          this.visualComponents.push("BarChartComponent");
          break;
        case 'Pie Chart':
          this.visualComponents.push("PieChartComponent");
          break;
        case 'Line Chart':
          this.visualComponents.push("LineChartComponent");
          this.tutupDialog('visualisasiLineChart');
          break;
        case 'Scatter Plot':
          this.visualComponents.push("ScatterPlotComponent");
          break;
        default:
          break;
      }

      this.tutupDialog('visualisasiLanjutan');
    },

    downloadAsPDF() {
      this.onDownload = true;
      const elementToCapture = document.querySelector('.box-output');
      html2canvas(elementToCapture).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('landscape');
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth - 20, imgHeight - 20);

        pdf.save('visualization.pdf');
        this.onDownload = false;
      });
    },
  },

  mounted() {
    this.onLoading = true;
    HEADER['userId'] = "102"
    axios.post(API_ENDPOINT + 'data/katalog', HEADER)
      .then(response => {
        const parsedData = response.data.entity.map(jsonString => JSON.parse(jsonString));
        const sortedData = parsedData.sort((a, b) => {
          const statusOrder = getStatusOrder(a.status) - getStatusOrder(b.status);

          if (statusOrder !== 0) {
            return statusOrder;
          }

          const titleA = a.judul.toLowerCase();
          const titleB = b.judul.toLowerCase();

          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;
        });

        function getStatusOrder(status) {
          switch (status) {
            case 'GRANTED':
              return 1;
            case 'PROHIBITED':
              return 2;
            default:
              return 0;
          }
        }

        this.katalogData = sortedData;
        console.log(this.katalogData);
      })
      .catch(error => {
        console.error('Error fetching katalog data:', error);
      })
      .finally(() => {
        this.onLoading = false;
        delete HEADER['userId'];
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

.text-granted {
  color: #000000;
}

.text-prohibited {
  color: #9a9999;
}

/* .box-output{
  margin-left: 2%;
} */
</style>
