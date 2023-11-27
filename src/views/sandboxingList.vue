<template>
  <div class="description">
    <h2>List Sandboxing</h2>
    <p>Daftar akun dan dataset yang diajukan. Sandboxing memungkinkan pengguna untuk melakukan eksplorasi data menggunakan script.</p>
  </div>

  <div>
    <router-link  to="/sandboxing-page" class="button-to-notebook">Buka Notebook</router-link>
  </div>

  <table>
  <thead>
    <tr class="kolom">
      <th>No.</th>
      <th>Tujuan</th>
      <th>Data</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1.</td>
      <td>Untuk eksplorasi kualitas data SPLF2020</td>
      <td>Data Sensus Penduduk Long Form 2020 Blok IV <router-link to="/metadata"><BookIcon/></router-link></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>Data Sensus Penduduk Long Form 2020 Blok V <BookIcon/></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>Data Sensus Penduduk Long Form 2020 Blok VI <BookIcon/></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>Data Sensus Penduduk Long Form 2020 Blok VII <BookIcon/></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>Data Sensus Penduduk Long Form 2020 Blok VIII (r810a) <BookIcon/></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>Data Sensus Penduduk Long Form 2020 Blok VIII (r810b) <BookIcon/></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>Data Sensus Penduduk Long Form 2020 (Data Keluarga) <BookIcon/></td>
    </tr>
  </tbody>
</table>

<div class="pagination">
  <v-pagination :length="5"></v-pagination>
</div>
</template>

<script>
import BookIcon from '@/components/bookIcons.vue';
export default {
  components: {
    BookIcon,
  },
  data() {
    return {
      page: 1,
    }
  }

}
</script>

<style scoped>
  .description{
    margin-left: 3%;
  }
 h2 {
  padding-top: 30px;
  font-style: inter;
  font-size: 27px;
 }

 p {
  color: #756464;
  font-style: inter;
  font-size: 14px;
  margin-right: 30px;
 }

 .button-to-notebook {
  display: flex;
  justify-content:inherit;
  align-items: center;
  color: white;
  background-color: #2B1D1D;
  font-weight: bold;
  font-size: 16px;
  padding: 10px;
  float: right;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-right: 2%;
  text-decoration: none;
 }

 table{
  /* margin-right: 30px; */
  width: 95%;
  border-collapse: collapse;
  margin-left: 3%;
  margin-top: 50px;
  margin-bottom: 50px;
 }
 td {
  padding-left: 15px;
 }

 .kolom {
  background-color: #076F3D;
 }


 th {
  color: white;
  font-style: inter;
  font-size: 16px;
  padding: 10px;
  text-align: left;
 }
.pagination{
  /* float: right; */
  position: absolute;
  right: 2%;
}
</style>


