<template>
    <div>
        <h2 class="mt-4 mb-3 text-center">Scatterplot Output</h2>
        <v-divider class="mb-3 ml-2 mr-2" />
        <div class="d-flex flex-column justify-center w-auto mb-10">
            <Scatter :data="plotData" :options="plotOptions" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { API_ENDPOINT, BASE_NGROK_HEADER as HEADER } from '@/others/config'
import { Scatter } from 'vue-chartjs'
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

export default {
    name: 'ScatterPlot',
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
            xNames: null,
            plotNames: [],
            plotData: {
                datasets: [{
                    label: 'Scatter Dataset',
                    fill: false,
                    borderColor: '#f87979',
                    backgroundColor: '#f87979',
                    data: []
                }]
            },
            plotOptions: {}
        }
    },
    mounted() {
        HEADER.tableId = this.passedData.tableId;
        this.xNames = this.passedData.labelColumn;

        this.plotNames = [...this.passedData.columnNames, this.xNames];
        HEADER.columnNames = this.plotNames;

        axios.post(API_ENDPOINT + 'data/', HEADER)
            .then(response => {
                let contents = response.data.entity.map(jsonString => JSON.parse(jsonString))
                let xLabel = contents.map(data => data[this.xNames]);
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

                const yValue = Object.keys(result);

                this.plotData = {
                    datasets: yValue.map((key, index) => ({
                        label: key,
                        data: result[key].data.map((value, index) => ({
                            x: xLabel[index],
                            y: value
                        })),
                        borderColor: this.pastelColors[index % this.pastelColors.length],
                        backgroundColor: this.pastelColors[index % this.pastelColors.length],
                        pointRadius: 5
                    })),
                };

                this.plotOptions = {
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: this.xNames,
                                font: {
                                    size: 14,
                                    weight: 'bold',
                                    lineHeight: 1.2,
                                },
                                padding: { top: 20, left: 0, right: 0, bottom: 0 }
                            }
                        },
                    },
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