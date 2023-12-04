<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March'],
                datasets: [{ data: [40, 20, 12] }]
            },
            chartOptions: {
                responsive: true
            }
        }
    },
    // methods: {
    //     fetchData() {
    //         const headers = {
    //             'ngrok-skip-browser-warning': 'true',
    //             tableName: 'data_sampel2',
    //             columnNames: ['A', 'B', 'C']
    //         }

    //         axios.post('http://localhost:8080/api/v1/data', headers)
    //             .then(response => {
    //                 console.log(response.data.entity);
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    //     },
    // },
    mounted() {
        // this.fetchData()
        const headers = {
            'ngrok-skip-browser-warning': 'true',
            tableName: 'data_sampel5',
            columnNames: ['provinsi', 'semangka']
        }

        axios.post('http://localhost:8080/api/v1/data', headers)
            .then(response => {
                var parsedData = response.data.entity.map(jsonString => JSON.parse(jsonString));
                var labels = parsedData.map(data => data.provinsi);
                var data = parsedData.map(data => data.semangka);

                // Define an array of 5 colors
                var colors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'];

                // Map the data to colors
                var backgroundColors = data.map((_, i) => colors[i % colors.length]);

                this.chartData = {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: backgroundColors
                    }]
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>