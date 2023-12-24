<template>
    <div>
        <h2 class="mt-4 mb-3 text-center">Paired T-Test Output</h2>
        <v-divider class="mb-3 ml-2 mr-2" />
        <div class="table-responsive">
            <div class="d-flex flex-column justify-center w-auto mb-10">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th rowspan="3"></th>
                            <th colspan="4">Unpaired Differences</th>
                            <th rowspan="3">t</th>
                            <th rowspan="3">df</th>
                            <th rowspan="3">sig.</th>
                        </tr>
                        <tr>
                            <th rowspan="2">mean</th>
                            <th rowspan="2">stdev</th>
                            <th colspan="2">95% confidence interval</th>
                        </tr>
                        <tr>
                            <th>Lower</th>
                            <th>Upper</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{{ sample }}</th>
                            <td>{{ mean }}</td>
                            <td>{{ stdev }}</td>
                            <td>{{ lower }}</td>
                            <td>{{ upper }}</td>
                            <td>{{ t }}</td>
                            <td>{{ df }}</td>
                            <td>{{ sig }}</td>
                        </tr>
                    </tbody>
                </table>
                <p>Alternative Hypothesis: {{ hypothesis }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { API_ENDPOINT, BASE_NGROK_HEADER as HEADER } from '@/others/config';

export default {
    name: 'TTestComponent',
    props: {
        passedInference: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            sample: "",
            t: 0,
            df: 0,
            sig: 0,
            mean: 0,
            stdev: 0,
            lower: 0,
            upper: 0,
            hypothesis: ""
        }
    },

    mounted() {
        HEADER['tableId'] = this.passedInference['tableId'];
        HEADER['columnNames'] = this.passedInference['columnNames'];
        HEADER['alternative'] = this.passedInference['alternative'];
        HEADER['mu'] = this.passedInference['mu'];

        axios.post(API_ENDPOINT + 'inference/ttest', HEADER)
            .then(res => {
                function roundToThreeDecimalPlaces(value) {
                    if (typeof value === "string" && (value === "-Infinity" || value === "Infinity")) {
                        return value;
                    } else {
                        return Number.isInteger(value) ? value : value.toFixed(3);
                    }
                }

                this.sample = this.passedInference['columnNames'];

                this.t = roundToThreeDecimalPlaces(res.data.entity.t);
                this.df = roundToThreeDecimalPlaces(res.data.entity.df);
                this.sig = res.data.entity.p.toFixed(3);
                this.mean = roundToThreeDecimalPlaces(res.data.entity.mean);
                this.stdev = roundToThreeDecimalPlaces(res.data.entity.sd);
                this.lower = roundToThreeDecimalPlaces(res.data.entity.ci95Low);
                this.upper = roundToThreeDecimalPlaces(res.data.entity.ci95High);

                if (this.passedInference['alternative'] == 'TWO_SIDED') {
                    this.hypothesis = 'True mean is not equal to ' + this.passedInference['mu'];
                } else if (this.passedInference['alternative'] == 'LESS') {
                    this.hypothesis = 'True mean is less than ' + this.passedInference['mu'];
                } else {
                    this.hypothesis = 'True mean is greater than ' + this.passedInference['mu'];
                }
            }).catch(err => {
                console.log(err);
            })
            .finally(
                delete HEADER['tableId'],
                delete HEADER['columnNames'],
                delete HEADER['alternative'],
                delete HEADER['mu']
            );
    }
}
</script>

<style scoped>
.table-responsive {
    overflow-x: auto;
    margin: 0 50px
}

.table {
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
}

.table-bordered {
    border-collapse: collapse;
}

.table th,
.table td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
}

.table td:not(:first-child) {
    text-align: center;
}

.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
}

.table tbody+tbody {
    border-top: 2px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
    border: 1px solid #dee2e6;
}

.table-bordered thead th,
.table-bordered thead td {
    border-bottom-width: 2px;
}

.judul {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-bottom: 20px;
    margin-top: 20px;
}
</style>