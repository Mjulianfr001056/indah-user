<template>
    <h2>Scatterplot Output</h2>
    <div style="max-height: 700px;">
        <Scatter :data="data" :options="options" />
    </div>
</template>

<script>
import { Scatter } from 'vue-chartjs'
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import axios from 'axios'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

export default {
    name: 'App',
    components: {
        Scatter
    },
    data() {
        return {
            data: {
                datasets: [{
                    label: 'Scatter Dataset 1',
                    fill: false,
                    borderColor: '#f87979',
                    backgroundColor: '#f87979',
                    data: [{
                        x: -1,
                        y: 0
                    }, {
                        x: 0,
                        y: 1
                    }, {
                        x: 1,
                        y: 3
                    }, {
                        x: 2,
                        y: 2
                    }, {
                        x: 3,
                        y: 3
                    }, {
                        x: 4,
                        y: 1
                    }, {
                        x: 5,
                        y: 2
                    }
                    ]
                }]
            },
            options: {
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
                var parsedData = response.data.entity.map(jsonString => JSON.parse(jsonString));
                var mappedData = parsedData.map(data => ({ x: data.A, y: data.B }));
                this.data = {
                    datasets: [{
                        label: 'Scatter Dataset 1',
                        fill: false,
                        borderColor: '#f87979',
                        backgroundColor: '#f87979',
                        data: mappedData
                    }]
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
} 
</script>