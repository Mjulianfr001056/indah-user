<template>
  <div>
    <h2>Pie Chart Output</h2>
    <div>
      <label for="selectedColumn">Pilih Kolom Data:</label>
      <select v-model="selectedColumn" @change="updateChartData">
        <option v-for="column in availableColumns" :key="column">{{ column }}</option>
      </select>
    </div>
    <div style="max-height: 700px">
      <Pie v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default {
  name: "PieChart",
  components: { Pie },
  props: {
    passedData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
      },
      Colors: ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"],
      availableColumns: [],
      selectedColumn: null,
      result: {}, // Define result object here
    };
  },
  mounted() {
    this.initializeChartData();
  },
  methods: {
    initializeChartData() {
      this.passedData.contents.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (!this.result[key]) {
            this.result[key] = {
              label: key,
              total: 0,
            };
          }
          this.result[key].total += item[key];
        });
      });

      this.availableColumns = Object.keys(this.result);
      this.selectedColumn = this.availableColumns[0]; // Set default selected column

      this.updateChartData();
    },
    updateChartData() {
      if (!this.selectedColumn) {
        return;
      }

      const chartDataArray = Object.keys(this.result).map((key) => ({
        label: this.result[key].label,
        total: this.result[key].total,
      }));

      this.chartData = {
        labels: chartDataArray.map((data) => data.label),
        datasets: [
          {
            data: chartDataArray.map((data) => data.total),
            backgroundColor: this.Colors.slice(0, chartDataArray.length),
          },
        ],
      };
    },
  },
};
</script>