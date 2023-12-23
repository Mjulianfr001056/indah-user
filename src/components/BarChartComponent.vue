<template>
    <div class="judul">
        <h2>Bar Chart Output</h2>
    </div>
    <div style="max-height: 700px;">
        <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
</template>
  
<script>
import axios from 'axios'
import { API_ENDPOINT, BASE_NGROK_HEADER as HEADER } from '@/others/config'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
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
            chartData: null,
            chartOptions: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }]
                }
            }
        }
    },
    mounted() {
        console.log(this.passedData)
        HEADER.tableId = this.passedData.tableId
        HEADER.columnNames = [...this.passedData.columnNames, this.passedData.labelColumn];

        axios.post(API_ENDPOINT + 'data/', HEADER)
            .then(response => {
                let contents = response.data.entity.map(jsonString => JSON.parse(jsonString))
                let xLabel = contents.map(data => data[this.passedData.labelColumn]);
                let result = {}
                let filteredContents = contents.map(item => {
                    let newItem = { ...item };
                    delete newItem[this.passedData.labelColumn];
                    return newItem;
                });

                filteredContents.forEach(item => {
                    Object.keys(item).forEach(key => {
                        if (!result[key]) {
                            result[key] = {
                                label: key,
                                data: []
                            }
                        }
                        result[key].data.push(item[key]);
                    })
                })

                this.chartData = {
                    labels: xLabel,
                    datasets: Object.keys(result).map((key, index) => {
                        return {
                            label: result[key].label,
                            data: result[key].data,
                            backgroundColor: this.pastelColors[index % this.pastelColors.length],
                        }
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                delete HEADER.tableId
                delete HEADER.columnNames
            })
    }
}
</script>

<style scoped>
.judul {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-bottom: 20px;
    margin-top: 20px;
}
</style>