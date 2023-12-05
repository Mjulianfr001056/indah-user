<template>
    <div class="judul">
        <h2>Correlation</h2>
    </div>
    <div class="matrix-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Variable</th>
                    <th v-for="variable in correlationVariables" :key="variable">{{ variable }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(rowValue, rowKey) in correlation" :key="rowKey">
                    <td>{{ rowKey }}</td>
                    <td v-for="colKey in correlationVariables" :key="colKey">
                        {{ correlation[rowKey][colKey] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
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
            correlationVariables: ['Variable1', 'Variable2', 'Variable3']
        }
    },
    mounted() {
        const header = this.passedDescriptive

        axios.post('https://9b13-110-138-125-213.ngrok-free.app/api/v1/desc/correlation', header)
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

                // Construct the correlation object
                for (let i = 0; i < numRows; i++) {
                    const rowKey = this.correlationVariables[i];
                    this.correlation[rowKey] = {};
                    for (let j = 0; j < numCols; j++) {
                        const colKey = this.correlationVariables[j];
                        this.correlation[rowKey][colKey] = matrix[i][j];
                    }
                }
            })
            .catch(error => {
                console.log(error);
            })

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