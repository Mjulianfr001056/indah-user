<template>
  <div class="h-auto w-auto overflow-x-auto">
    <h2 class="mt-4 mb-3 text-center">Pie Chart Output</h2>
    <v-divider class="mb-3 ml-2 mr-2" :thickness="3" />
    <div class="d-flex flex-column h-screen w-auto mb-10" v-for="(data, index) in chartData" :key="index">
      <div class="d-flex justify-center mb-2">
        <h3 class="mr-1">Kolom:</h3>
        <h3 class="text-center h-auto" v-for="(key, value) in passedData.headers[index]" :key="value">{{ key }}</h3>
      </div>
      <Pie v-if="data" :data="data" :options="chartOptions" />
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
      required: true,
    },
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        borderWidth: 1,
        responsive: true,
        maintainAspectRatio: false,
      },

      // pastel color
      //   colors: ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"],

      colors: ["#B191BD", "#6E87B2", "#B7C0DF", "#7E878F", "#A9908A", "#7BB0DB", "#9AEAEF", "#F97645", "#C84557", "#D5BA99", "#BAD252", "#99424F", "#F1617D", "#2F9E77", "#D8B5D9", "#FFC325", "#A49D8F", "#1EC2D1"],
    };
  },
  mounted() {
    let result = {};

    this.passedData.contents.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (!result[key]) {
          result[key] = {
            data: [],
          };
        }
        result[key].data.push(item[key]);
      });
    });

    this.chartData = [];

    Object.keys(result).forEach((key) => {
      const label = this.passedData.xLabel;

      this.chartData.push({
        labels: label,
        datasets: [
          {
            backgroundColor: this.colors.slice(0, label.length),
            data: result[key].data,
          },
        ],
      });
    });
  },
};
</script>
