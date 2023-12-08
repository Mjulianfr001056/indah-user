<template>
    <div>
        <h2>Pie Chart Output</h2>
        <div style="max-height: 700px" v-for="(data, index) in chartData" :key="index">
            <Pie v-if="data" :data="data" :options="chartOptions" />
        </div>
    </div>
</template>

<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default {
    name: "PieChart",
    components: { Pie },
    props: {
        passedData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chartData: null,
            chartOptions: {
                responsive: true,
                maintainAspectRatio: true,
            },
            colors: ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"],
        };
    },
    mounted() {
        let result = {};

        this.passedData.contents.forEach((item) => {
            Object.keys(item).forEach((key) => {
                if (!result[key]) {
                    result[key] = {
                        data: [],
                    };
                }
                result[key].data.push(item[key]);
            });
        });

        this.chartData = [];

        Object.keys(result).forEach( key => {
            const label = this.passedData.xLabel;
            
            this.chartData.push({
                labels: label,
                datasets: [
                    {
                        backgroundColor: this.colors.slice(0, label.length),
                        data: result[key].data,
                    }
                ],
            });
        });
    }
};
</script>