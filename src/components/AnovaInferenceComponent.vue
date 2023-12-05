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