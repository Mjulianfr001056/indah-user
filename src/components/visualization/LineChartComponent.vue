<template>
  <div>
    <h2 class="mt-4 mb-3 text-center">Line Chart Output</h2>
    <v-divider class="mb-3 ml-2 mr-2" />
    <div class="d-flex flex-column justify-center w-auto mb-10">
      <Line v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { API_ENDPOINT, BASE_NGROK_HEADER as HEADER } from '@/others/config'
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

export default {
  name: 'LineChart',
  components: { Line },
  props: {
    passedData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      colors: [
        "#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f",
        "#edc949", "#b07aa1", "#ff9da7", "#9c755f", "#bab0ac"
      ],
      chartData: {
        labels: "",
        datasets: [{
          label: '',
          data: [],
          borderColor: null,
          backgroundColor: null,
        }
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      },
      xNames: [],
    };
  },
  mounted() {
    HEADER.tableId = this.passedData.tableId;
    HEADER.rowNames = this.passedData.rowNames;
    this.xNames = this.passedData.labelRow;

    axios.post(API_ENDPOINT + 'data/row/', HEADER)
      .then(response => {
        let contents = response.data.entity;
        let parsedContents = {};

        Object.keys(contents).forEach(key => {
          parsedContents[key] = JSON.parse(contents[key]);
        });

        this.chartData = {
          labels: this.xNames.slice(1),
          datasets: Object.keys(parsedContents).map((key, index) => {
            return {
              data: parsedContents[key],
              backgroundColor: this.colors[index % this.colors.length],
              fill: false,
              borderColor: this.colors[index % this.colors.length],
              label: key,
            };
          }),
        };

        console.log(this.chartData);
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        delete HEADER.tableId
        delete HEADER.columnNames
      })
  },
};
</script>