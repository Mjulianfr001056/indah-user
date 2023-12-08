<template>
    <h2>Scatterplot Output</h2>
    <div style="max-height: 700px;">
      <Scatter :data="plotData" :options="plotOptions" />
    </div>
  </template>
  
  <script>
  import { Scatter } from 'vue-chartjs'
  import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
  import axios from 'axios'
  
  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)
  
  export default {
    name: 'App',
    components: { Scatter },
    props: {
      passedData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        pastelColors: [
          '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF',
          '#FFDAC1', '#E2F0CB', '#FFD3E0', '#FFB7C5', '#B5EAD7'
        ],
        plotData: {
          datasets: [{
            label: 'Scatter Plot Data',
            fill: false,
            borderColor: '#f87979',
            backgroundColor: '#f87979',
            data: this.passedData.contents.map(item => ({
              x: item.AK,
              y: item.APK
            }))
          }],
          labels: this.passedData.contents.map(item => item.Provinsi)
        },
        plotOptions: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom'
            }
          }
        }
      }
    },
    mounted() {
      const headers = {
        'ngrok-skip-browser-warning': 'true',
        tableName: 'data_sampel2',
        columnNames: ['A', 'B']
      }
  
      axios.post('http://localhost:8080/api/v1/data', headers)
        .then(response => {
          const parsedData = response.data.entity.map(jsonString => JSON.parse(jsonString))
          const mappedData = parsedData.map(data => ({ x: data.A, y: data.B, label: data.Provinsi }))
  
          this.plotData.datasets.push({
            label: 'API Data',
            fill: false,
            borderColor: '#79f8f8',
            backgroundColor: '#79f8f8',
            data: mappedData
          })
        })
        .catch(error => {
          console.error(error)
        })
    // console.log(this.passedData)
}
  }
  </script>