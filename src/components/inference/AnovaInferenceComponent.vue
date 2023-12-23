<template>
    <div class="judul">
        <h2>ANOVA Result</h2>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Source</th>
                    <th>Sum of Squares</th>
                    <th>df</th>
                    <th>MS</th>
                    <th>F</th>
                    <th>P</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Between Groups</td>
                    <td>{{ anovaResult.betweenGroups.SS }}</td>
                    <td>{{ anovaResult.betweenGroups.df }}</td>
                    <td>{{ anovaResult.betweenGroups.MS }}</td>
                    <td>{{ anovaResult.betweenGroups.F }}</td>
                    <td>{{ anovaResult.betweenGroups.P }}</td>
                </tr>
                <tr>
                    <td>Within Groups</td>
                    <td>{{ anovaResult.withinGroups.SS }}</td>
                    <td>{{ anovaResult.withinGroups.df }}</td>
                    <td>{{ anovaResult.withinGroups.MS }}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>{{ anovaResult.total.SS }}</td>
                    <td>{{ anovaResult.total.df }}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import { API_ENDPOINT, BASE_NGROK_HEADER as HEADER } from '@/others/config';

export default {
    name: 'AnovaInferenceComponent',
    props: {
        passedInference: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            anovaResult: {
                betweenGroups: {
                    SS: 0,
                    df: 0,
                    MS: 0,
                    F: 0,
                    P: 0
                },
                withinGroups: {
                    SS: 0,
                    df: 0,
                    MS: 0
                },
                total: {
                    SS: 0,
                    df: 0
                }
            }
        }
    },
    mounted() {
        HEADER['tableId'] = this.passedInference['tableId'];
        HEADER['columnNames'] = this.passedInference['columnNames'];
        HEADER['inferenceType'] = this.passedInference['inferenceType'];

        axios.post(API_ENDPOINT + 'inference/anova', HEADER)
            .then(response => {
                const result = response.data.entity;
                const parsedResult = JSON.parse(result);

                parsedResult.betweenGroups.P = parsedResult.betweenGroups.P.toFixed(3);


                function formatNumber(number) {
                    return !isNaN(Number(number)) && number % 1 !== 0
                        ? Number(number).toFixed(2)
                        : number;
                }

                this.anovaResult.betweenGroups.SS = formatNumber(parsedResult.betweenGroups.SS);
                this.anovaResult.betweenGroups.df = formatNumber(parsedResult.betweenGroups.df);
                this.anovaResult.betweenGroups.MS = formatNumber(parsedResult.betweenGroups.MS);
                this.anovaResult.betweenGroups.F = formatNumber(parsedResult.betweenGroups.F);
                this.anovaResult.betweenGroups.P = parsedResult.betweenGroups.P;

                this.anovaResult.withinGroups.SS = formatNumber(parsedResult.withinGroups.SS);
                this.anovaResult.withinGroups.df = formatNumber(parsedResult.withinGroups.df);
                this.anovaResult.withinGroups.MS = formatNumber(parsedResult.withinGroups.MS);

                this.anovaResult.total.SS = formatNumber(parsedResult.total.SS);
                this.anovaResult.total.df = formatNumber(parsedResult.total.df);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                delete HEADER['inferenceType'];
                delete HEADER['tableId'];
                delete HEADER['columnNames'];
            })
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