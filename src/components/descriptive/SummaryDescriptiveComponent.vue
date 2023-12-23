<template>
    <div class="judul">
        <h2>Summary Statistics</h2>
    </div>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th class="center-content">Variable</th>
                    <th class="center-content">Count</th>
                    <th class="center-content">Mean</th>
                    <th class="center-content">Stdev</th>
                    <th class="center-content">Min</th>
                    <th class="center-content">Q1</th>
                    <th class="center-content">Median</th>
                    <th class="center-content">Q3</th>
                    <th class="center-content">Max</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, key) in summary" :key="key">
                    <td class="center-content">{{ key }}</td>
                    <td class="center-content">{{ value.count }}</td>
                    <td class="center-content">{{ value.mean }}</td>
                    <td class="center-content">{{ value.stddev }}</td>
                    <td class="center-content">{{ value.min }}</td>
                    <td class="center-content">{{ value['25%'] }}</td>
                    <td class="center-content">{{ value['50%'] }}</td>
                    <td class="center-content">{{ value['75%'] }}</td>
                    <td class="center-content">{{ value.max }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import { API_ENDPOINT, BASE_NGROK_HEADER as HEADER } from '@/others/config';

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
        HEADER['tableId'] = this.passedDescriptive['tableId'];
        HEADER['columnNames'] = this.passedDescriptive['columnNames'];

        axios.post(API_ENDPOINT + 'desc/summary', HEADER)
            .then(response => {
                const parsedResponse = response.data.entity.map(element => JSON.parse(element));

                parsedResponse.forEach(item => {
                    Object.keys(item).forEach(key => {
                        if (key !== 'summary') {
                            if (!this.summary[key]) {
                                this.summary[key] = {};
                            }
                            let value = item[key];

                            if (!isNaN(Number(value)) && value % 1 !== 0) {
                                value = Number(value).toFixed(2);
                            }

                            this.summary[key][item.summary] = value;
                        }
                    });
                });

            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                delete HEADER['tableId'];
                delete HEADER['columnNames'];
            });
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

.center-content {
    text-align: center;
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