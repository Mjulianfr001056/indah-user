<template>
    <h2>Scatterplot Output</h2>
    <div style="max-height: 700px;">
        <Scatter :data="plotData" :options="plotOptions" />
    </div>
</template>

<script>
import { Scatter } from 'vue-chartjs'
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'

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
                    label: 'Scatter Dataset',
                    fill: false,
                    borderColor: '#f87979',
                    backgroundColor: '#f87979',
                    data: []
                }]
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
        console.log(this.passedData)
        let result = {}

        this.passedData.contents.forEach(item => {
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

        // Menyimpan nilai dari kunci "a" dan "b"
        const keyA = Object.keys(result)[0];
        const keyB = Object.keys(result)[1];

        this.plotData = {
            labels: this.passedData.xLabel,
            datasets: [{
                label: '${keyA} vs ${keyB}',
                data: result[keyA].data.map((value, index) => ({ x: value, y: result[keyB].data[index] })),
                backgroundColor: this.pastelColors[0], // Menggunakan warna pertama dari pastelColors
            }]
        }
    }
} 
</script>