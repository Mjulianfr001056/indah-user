<template>
    <div>
        <h2 class="mt-4 mb-3 text-center">Wilcoxon Rank Test Output</h2>
        <v-divider class="mb-3 ml-2 mr-2" />
        <div class="d-flex flex-column justify-center w-auto mb-10 ml-5">
            <p><strong>Data</strong>: {{ sampel1 }} and {{ sampel2 }}</p>
            <p><strong>V</strong>: {{ V }}, <strong>p-value</strong>: {{ pValue }}</p>
            <p><strong>Alternative hypothesis</strong>: true location shift is not equal to 0</p>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'
import { API_ENDPOINT, BASE_NGROK_HEADER as HEADER } from '@/others/config';

export default {
    data() {
        return {
            sampel1: "",
            sampel2: "",
            V: 0,
            pValue: 0
        };
    },
    props: {
        passedInference: {
            type: Object,
            required: true
        }
    },
    mounted() {
        HEADER['tableId'] = this.passedInference['tableId'];
        HEADER['columnNames'] = this.passedInference['columnNames'];

        this.sampel1 = this.passedInference['columnNames'][0];
        this.sampel2 = this.passedInference['columnNames'][1];

        axios.post(API_ENDPOINT + 'inference/wilcoxon', HEADER)
            .then(response => {
                function roundToThreeDecimalPlaces(value) {
                    return Number.isInteger(value) ? value : value.toFixed(3);
                }

                this.V = roundToThreeDecimalPlaces(response.data.entity.v);
                this.pValue = response.data.entity.pvalue.toFixed(3);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(
                delete HEADER['tableId'],
                delete HEADER['columnNames']
            );
    }
};
</script>


<style scoped>
p {
    font-size: 14pt;
}
</style>