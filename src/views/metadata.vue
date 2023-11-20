<template>
    <h1>Metadata</h1>
    <div class="sub">
        <p><GridIcon/>Detil Dataset</p>
    </div>
    <div>
        <table>
        <tbody>
            <tr>
                <td>Nama</td>
                <td>Data Sensus Penduduk Long Form 2020 Blok IV</td>
            </tr>
            <tr>
                <td>Deskripsi</td>
                <td></td>
            </tr>
            <tr>
                <td>Jenis</td>
                <td>Mikrodata</td>
            </tr>
            <tr>
                <td>Frekuensi</td>
                <td>Sepuluh Tahunan</td>
            </tr>
            <tr>
                <td>Subjek</td>
                <td>Kependudukan dan Migrasi</td>
            </tr>
            <tr>
                <td>Periode</td>
                <td>2022</td>
            </tr>
            <tr>
                <td>Produsen Data</td>
                <td>Badan Pusat Statistik</td>
            </tr>
            <tr>
                <td>Unit Pengolahan Data</td>
                <td></td>
            </tr>
    </tbody>
    </table>

    <div class="sub">
        <p><GridIcon/>Kolom</p>
    </div>
    </div>
</template>

<script>
import GridIcon from '@/components/gridIcons.vue'
export default {
    components: {
        GridIcon
    }
}
</script>

<style scoped>
 h1 {
    font-weight: bold;
 }

 tr {
    padding-bottom: 30px;
    border-bottom: 1px #918A8A;

 }

 .sub {
    background-color: #E4F5F8;
 }

 .sub p {
    color: #138083;
 }
</style>