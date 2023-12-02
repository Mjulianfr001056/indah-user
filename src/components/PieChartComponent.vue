<template>
    <Pie :data="data" :options="options" />
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
                maintainAspectRatio: false
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
                this.data = {
                    labels: labels,
                    datasets: [
                        {
                            data: data
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