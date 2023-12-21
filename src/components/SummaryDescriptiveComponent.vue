<template>
    <div class="judul">
        <h2>Summary Statistics</h2>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Variable</th>
                    <th>Count</th>
                    <th>Mean</th>
                    <th>Stdev</th>
                    <th>Min</th>
                    <th>Q1</th>
                    <th>Median</th>
                    <th>Q3</th>
                    <th>Max</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, key) in summary" :key="key">
                    <td>{{ key }}</td>
                    <td>{{ value.count }}</td>
                    <td>{{ value.mean }}</td>
                    <td>{{ value.stddev }}</td>
                    <td>{{ value.min }}</td>
                    <td>{{ value['25%'] }}</td>
                    <td>{{ value['50%'] }}</td>
                    <td>{{ value['75%'] }}</td>
                    <td>{{ value.max }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SummaryDescriptiveComponent',
    props: {
        passedDescriptive: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            summary: {}
        }
    },
    mounted() {
        const header = this.passedDescriptive

        axios.post('localhost:8080/api/v1/desc/summary', header)
            .then(response => {
                const parsedResponse = response.data.entity.map(element => JSON.parse(element));

                parsedResponse.forEach(item => {
                    Object.keys(item).forEach(key => {
                        if (key !== 'summary') {
                            if (!this.summary[key]) {
                                this.summary[key] = {};
                            }
                            let value = item[key];
                            if (!isNaN(Number(value))) {
                                value = Math.round(value, 4)
                            }
                            this.summary[key][item.summary] = value;
                        }
                    });
                });
            })
            .catch(error => {
                console.log(error)
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