<template>
    <div>
        <div v-if="!errorOccurred">
            <div class="judul">
                <h2>Correlation</h2>
            </div>
            <div class="matrix-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th v-for="variable in correlationVariables" :key="variable" style="text-align: center">{{ variable }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(rowValue, rowKey) in correlation" :key="rowKey" style="text-align: center">
                            <td>{{ rowKey }}</td>
                            <td v-for="colKey in correlationVariables" :key="colKey" style="text-align: center">
                                {{ correlation[rowKey][colKey] }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else>
            <v-alert class="mb-4" title="Terjadi error!" text="Terjadi error saat melakukan perhitungan korelasi!" type="error" variant="outlined"></v-alert>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { API_ENDPOINT, BASE_NGROK_HEADER as HEADER } from '@/others/config';

export default {
    name: 'CorrelationDescriptiveComponent',
    props: {
        passedDescriptive: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            correlation: {},
            correlationVariables: [],
            errorOccurred: false,
        }
    },
    mounted() {
        HEADER['tableId'] = this.passedDescriptive['tableId'];
        HEADER['columnNames'] = this.passedDescriptive['columnNames'];

        axios.post(API_ENDPOINT + 'desc/correlation', HEADER)
            .then(response => {
                const matrixString = response.data.entity;
                let matrix = matrixString.split('\n').map(
                    row => row.split(' ').map(
                        element => element.trim()
                    ).filter(Boolean).map(
                        element => Number(element)
                    )
                )

                const numRows = matrix.length;
                const numCols = matrix[0].length;

                this.correlationVariables = [...this.passedDescriptive.columnNames];

                for (let i = 0; i < numRows; i++) {
                    const rowKey = this.correlationVariables[i];
                    this.correlation[rowKey] = {};

                    for (let j = 0; j < numCols; j++) {
                        const colKey = this.correlationVariables[j];
                        let value = matrix[i][j];

                        // Check if the value is a number and has decimals
                        if (!isNaN(Number(value)) && value % 1 !== 0) {
                            // Round to 2 significant figures
                            value = Number(value).toFixed(4);
                        }

                        this.correlation[rowKey][colKey] = value;
                    }
                }

            })
            .catch(error => {
                console.log(error)
                this.errorOccurred = true;
            })
            .finally(() => {
                delete HEADER['tableId'];
                delete HEADER['columnNames'];
            });

    }
}
</script>

<style scoped>
.matrix-responsive {
    overflow-x: auto;
    margin: 0 50px;
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