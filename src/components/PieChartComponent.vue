<template>
  <div>
    <h2 class="mt-4 mb-3 text-center">Pie Chart Output</h2>
    <v-divider class="mb-3 ml-2 mr-2" />
    <div class="d-flex flex-column w-auto mb-10" v-for="(data, index) in chartData" :key="index">
      <div class="d-flex justify-center mb-2">
        <h3 class="mr-1">Kolom:</h3>
        <h3 class="text-center h-auto" v-for="(key, value) in chartNames[index]" :key="value">{{ key }}</h3>
      </div>
      <div class="pie d-flex justify-center w-auto">
        <Pie v-if="data" :data="data" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_ENDPOINT, BASE_NGROK_HEADER as HEADER } from "@/others/config";
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
      chartData: [],
      chartNames: [],
      chartOptions: {
        borderWidth: 1,
        responsive: true,
        maintainAspectRatio: false,
      },
      colors: ["#B191BD", "#6E87B2", "#B7C0DF", "#7E878F", "#A9908A", "#7BB0DB", "#9AEAEF", "#F97645", "#C84557", "#D5BA99", "#BAD252", "#99424F", "#F1617D", "#2F9E77", "#D8B5D9", "#FFC325", "#A49D8F", "#1EC2D1"],
    };
  },
  mounted() {
    HEADER.tableId = this.passedData.tableId;

    this.chartNames = [...this.passedData.columnNames, this.passedData.labelColumn];
    HEADER.columnNames = this.chartNames;

    axios.post(API_ENDPOINT + 'data/', HEADER)
      .then(response => {
        const contents = response.data.entity.map(jsonString => JSON.parse(jsonString));

        let xLabel = contents.map(data => data[this.passedData.labelColumn]);
        let filteredContents = contents.map(item => {
          let newItem = { ...item };
          delete newItem[this.passedData.labelColumn];
          return newItem;
        });

        let result = {};

        filteredContents.forEach(item => {
          Object.keys(item).forEach(key => {
            result[key] = result[key] || { data: [] };
            result[key].data.push(item[key]);
          });
        });

        Object.keys(result).forEach(key => {
          this.chartData.push({
            labels: xLabel,
            datasets: [{
              backgroundColor: this.colors.slice(0, xLabel.length),
              data: result[key].data,
            }],
          });
        });

        console.log(this.chartData);
      })
      .catch(error => console.log(error))
      .finally(() => {
        delete HEADER.tableId;
        delete HEADER.columnNames;
      });
  },
};
</script>


<style scoped>
.pie {
  width: 300px;
  height: 300px;
}
</style>
