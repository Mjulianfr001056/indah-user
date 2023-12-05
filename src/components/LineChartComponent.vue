<template>
    <h2>Line Chart Output</h2>
    <div style="max-height: 700px;">
        <Line :data="data" :options="options" />
    </div>
</template>
  
<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

import axios from 'axios'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
    name: 'App',
    components: {
        Line
    },
    data() {
        return {
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [40, 39, 10, 40, 39, 80, 40]
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
            columnNames: ['provinsi', 'semangka']
        }

        axios.post('http://localhost:8080/api/v1/data', headers)
            .then(response => {
                var parsedData = response.data.entity.map(jsonString => JSON.parse(jsonString));
                var labels = parsedData.map(data => data.provinsi);
                var data = parsedData.map(data => data.semangka);
                this.data = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Data One',
                            backgroundColor: '#f87979',
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