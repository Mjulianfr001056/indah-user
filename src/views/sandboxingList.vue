<template>
  <div>
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

<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</template>

<script>
import BookIcon from '@/components/bookIcons.vue';
export default {
  components: {
    BookIcon,
  }
}
</script>

<style scoped>
 h2 {
  padding: 30px 0 0 30px;
  font-style: inter;
  font-size: 27px;
 }

 p {
  padding: 0 0 0 30px;
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
  margin-bottom: 5px;
  float: right;
  margin-right: 30px;
  text-decoration: none;
 }

 td {
  padding-left: 15px;
 }

 .kolom {
  background-color: #076F3D;
 }
 table{
  margin-right: 30px;
  /* width: 100%; */
  border-collapse: collapse;
  margin-left: 30px;
  margin-top: 90px;


 }

 th {
  color: white;
  font-style: inter;
  font-size: 16px;
  padding: 10px;
  width: 500px;
  height: 41px;
  text-align: left;
 }
 

 .pagination {
  display: flex;
  justify-content:inherit;
  align-items: center;
  background-color: #fff;
  /* padding: 1rem; */
  float: right;
  margin-right: 30px;
  margin-top: 60px;
}

.pagination li {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 7px;
  text-decoration: none;
  font-size: 10px;
  font-weight: 600;
  color: black;
  border: 0.25px solid #756464;
  border-radius: 2px;
}

 .page-link {
  color: #428DD1;
 }
</style>