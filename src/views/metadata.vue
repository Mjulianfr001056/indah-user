<template>
  <h1>Metadata</h1>
    <div class="sub">
        <p><GridIcon/>Detil Dataset</p>
    </div>
    <div>
        <table id="dataset">
        <tbody>
            <tr>
                <td id="kolom">Nama</td>
                <td>Data Sensus Penduduk Long Form 2020 Blok IV</td>
            </tr>
            <tr>
                <td id="kolom">Deskripsi</td>
                <td><textarea></textarea></td>
            </tr>
            <tr>
                <td id="kolom">Jenis</td>
                <td>Mikrodata</td>
            </tr>
            <tr>
                <td id="kolom">Frekuensi</td>
                <td>Sepuluh Tahunan</td>
            </tr>
            <tr>
                <td id="kolom">Subjek</td>
                <td>Kependudukan dan Migrasi</td>
            </tr>
            <tr>
                <td id="kolom">Periode</td>
                <td>2022</td>
            </tr>
            <tr>
                <td id="kolom">Produsen Data</td>
                <td>Badan Pusat Statistik</td>
            </tr>
            <tr>
                <td id="kolom">Unit Pengolahan Data</td>
                <td></td>
            </tr>
        </tbody>
        </table>
    </div>
    <div class="sub">
        <p><GridIcon/>Kolom</p>
    </div>

    <div id="bottom-section">
        <div id="left">
            <div class="scroll-table">
                <table id="data_kol">
                    <tbody>
                        <tr>
                            <td>b4r406a</td>
                        </tr>
                        <tr>
                            <td>b4r406a</td>
                        </tr>
                        <tr>
                            <td>b4r406a</td>
                        </tr>
                        <tr>
                            <td>b4r406a</td>
                        </tr>
                        <tr>
                            <td>b4r406a</td>
                        </tr>
                        <tr>
                            <td>b4r406a</td>
                        </tr>
                        <tr>
                            <td>b4r406a</td>
                        </tr>
                        <tr>
                            <td>b4r406a</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>

        </div>
        <div id="right">
            <div class="sub">
                <p><GridIcon/>Detil Kolom</p>
            </div>
            <div>
                <table id="detil_kol">
                    <tbody>
                        <tr>
                            <td id="kolom">Nama Kolom</td>
                            <td>b4r406a</td>
                        </tr>
                        <tr>
                            <td id="kolom">Deskripsi Kolom</td>
                            <td>Nomor urut ART</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
    
</template>

<script>
import GridIcon from '@/components/gridIcons.vue'
export default {
    components: {
        GridIcon,
    }
}
</script>

<style scoped>
 h1 {
    font-weight: bold;
 }

 table {
    /* width:100%; */
    border-collapse: collapse;

 }

 td{
    border-bottom: 1px solid #ddd;
    padding: 10px;
 }

 tr {
    /* padding-bottom: 30px; */
    border-bottom: 1px #918A8A;

 }

 tr > #kolom{
    width: 20%;
 }
#data_kol td{
  border-bottom: none;

 }
 #dataset{
    margin-left: 20px;
    width: 98%;
 }
 #detil_kol{
    width: 99%;
 }

 .sub {
    background-color: #E4F5F8;
    display: flex;
    align-items:center;
    margin-bottom: 0;
 }

 .sub p {
    color: #138083;
    margin-left:10px;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    padding: 10px;
    
 }
 .scroll-table {
    max-height: 300px; /* Sesuaikan tinggi maksimal sesuai kebutuhan Anda */
    overflow-y: auto;
 }
 #bottom-section{
    display: flex;
    background-color: white;
    align-content: center;
    justify-content: center;
    /* grid-template-columns: 1fr 1fr;
    grid-gap: 10px; */
 }
 #bottom-section div{
    background-color:white;
    align-items: center;
    margin-left: 10px;
   

 }
 #bottom-section > #left{
    flex: 1;
    width: 100px;
 }
 #bottom-section > #right{

    flex: 3;
 }
   
</style>