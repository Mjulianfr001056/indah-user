<template>
    <h1>
        Pilih Data
    </h1>

    <table class="tg">
        <thead>
            <tr>
                <th>No</th>
                <th>Data</th>
                <th>Keterangan</th>
                <th>Rincian</th>
                <th>Pilih</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Sensus Penduduk 2020<br></td>
                <td>Data Sensus Penduduk 2020</td>
                <td>Detail</td>
                <td><input type="checkbox" name="data1" id="data1"></td>
            </tr>
            <tr>
                <td>2</td>
                <td>Sensus Pertanian 2023<br></td>
                <td>Data Sensus Pertanian 2023</td>
                <td>Detail</td>
                <td><input type="checkbox" name="data1" id="data1"></td>
            </tr>
        </tbody>
    </table>
    <a href="">Tambahkan</a>
</template>

<script>
export default{
    data() {
    return {
    views: 'PopUp'
}
}
}
</script>

<style scoped>
    .close{
        /* float: right; */
    }
</style>