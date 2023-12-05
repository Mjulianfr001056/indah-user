<template>
    <h2>Pie Chart Output</h2>
    <div style="max-height: 700px;">
        <Pie :data="data" :options="options" />
    </div>
</template>
  
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    components: {
        Pie
    },
    data() {
        return {
            data: {
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                datasets: [
                    {
                        data: [40, 20, 80, 10]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        }
    },
    mounted() {
        const headers = {
            'ngrok-skip-browser-warning': 'true',
            tableName: 'data_sampel5',
            columnNames: ['provinsi', 'durian']
        }

        axios.post('http://localhost:8080/api/v1/data', headers)
            .then(response => {
                var parsedData = response.data.entity.map(jsonString => JSON.parse(jsonString));
                var labels = parsedData.map(data => data.provinsi);
                var data = parsedData.map(data => data.durian);

                // Define an array of 5 pastel colors
                var colors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'];

                // Map the data to colors
                var backgroundColors = data.map((_, i) => colors[i % colors.length]);

                this.data = {
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            backgroundColor: backgroundColors
                        }
                    ]
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>