<template>
  <div>
    <h2>Line Chart Output</h2>
    <div style="max-height: 700px;">
      <Line v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
      pastelColors: [
        '#FFB3BA',
        '#FFDFBA',
        '#FFFFBA',
        '#BAFFC9',
        '#BAE1FF',
        '#FFDAC1',
        '#E2F0CB',
        '#FFD3E0',
        '#FFB7C5',
        '#B5EAD7',
      ],
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 1,
          },
          x: {
            ticks: {
              callback: (value, index) =>
                this.chartData.labels[index] || '', // Avoid undefined labels
            },
          },
        },
      },
    };
  },
  mounted() {
    console.log(this.passedData)
    this.transformData();
  },
  methods: {
  transformData() {
    const labels = []; // Menyimpan nama line berdasarkan isi kolom pertama
    const datasets = [];

    this.passedData.contents.forEach((item) => {
      const dataPoints = [];

      // Mengisi array dataPoints dengan data dari setiap kolom (kecuali kolom pertama)
      Object.keys(item).forEach((key, index) => {
        if (index === 0) {
          labels.push(item[key]); // Menambahkan isi kolom pertama sebagai nama line
        } else {
          dataPoints.push(item[key]);
        }
      });

      datasets.push({
        data: dataPoints,
        backgroundColor: this.pastelColors[datasets.length % this.pastelColors.length],
      });
    });

    this.chartData = {
      labels: labels,
      datasets: datasets,
    };
  }
},
  


};
</script>