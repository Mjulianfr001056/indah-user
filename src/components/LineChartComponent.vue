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
      pastelColors: [
        '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF',
        '#FFDAC1', '#E2F0CB', '#FFD3E0', '#FFB7C5', '#B5EAD7',
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
        },
      },
    };
  },
  mounted() {
    console.log(this.passedData.contents);
    this.transformData();
  },
  methods: {
    transformData() {
      this.chartData = {
        labels: Object.keys(this.passedData.contents[0]).slice(0),
        datasets: this.passedData.contents.map((item, index) => {
          const i = index % 4;
          return {
            data: Object.values(item).slice(0),
            backgroundColor: this.pastelColors[index % this.pastelColors.length],
            fill: false,
            borderColor: this.pastelColors[index % this.pastelColors.length],
            label: this.passedData.xLabel[i]
          };
        }),
      };
    },
  },
};
</script>