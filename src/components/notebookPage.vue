<template>

  <div class="statistik">
    <a>Statistik Deskriptif</a>
    <a>Statistik Inferensia</a>
  </div>

  <div class="deskriptif">
    <a>Tabel</a>
    <a>Bar Chart</a>
    <a>Pie Chart</a>
    <a>Area Chart</a>
    <a>Line Chart</a>
    <a>Scatter Chart</a>
  </div>

  <div class="deskriptif">
    <a>Unduh Output</a>
    <button @click="views = 'PopUp'">Tambahkan Data</button>
  </div>
  <div v-if="views === 'PopUp'"><popUpPilihData /></div>
  
  

    <p>Tampilkan: </p>
    <div class="tampil">
      <select class="custom-select" id="inlineFormCustomSelect">
        <option selected></option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
    <p>baris</p>
  
    <div class="dropdown">
      <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Column
      </button>
      <ul class="dropdown-menu" style="border-radius: 0;">
        <li><span class="dropdown-item-text">Kolom Data</span></li>
        <li><a class="dropdown-item" href="#">Column 1</a></li>
        <li><a class="dropdown-item" href="#">Column 2</a></li>
        <li><a class="dropdown-item" href="#">Column 3</a></li>
      </ul>

      <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Sort
      </button>
      <ul class="dropdown-menu" style="border-radius: 0;">
        <li><span class="dropdown-item-text">Dropdown item text</span></li>
        <li><a class="dropdown-item" href="#">Ascending</a></li>
        <li><a class="dropdown-item" href="#">Descending</a></li>
      </ul>

      <button>Stripped Table</button>
      <button>Highlight Row</button>
    </div>

    <!-- <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="kolom">
                    <div class="flex items-center">
                        Color
                        <a href="#"><svg class="w-3 h-3 ms-1.5" fill="white">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                </th>
                <th scope="col" class="kolom">
                    <div class="flex items-center">
                        <a href="#"><svg class="w-3 h-3 ms-1.5" fill="white">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                        Color
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>
                    <td>aa</td>
                </th>
            </tr>
        </tbody>
    </table> -->
<!-- </div> -->

<div>

</div>

</template>

<script>
import popUpPilihData from '@/components/PopUpPilihData.vue'
export default {
  components: {popUpPilihData},
data() {
  return {
    views: 'PopUpClose'
  }
}
}
</script>

<style scoped>

 .fitur a {
    padding: 20px 50px 10px 10px;
    font-weight: 600;
    color: white;
 }

 .fitur a:hover {
    color: #428DD1;
    background-color: white;
    padding-right: 10px;
    margin: 20px 50px 0 10px;
 }

 .statistik, .deskriptif {
    padding: 5px 10px 7px 10px;
    background-color: #17A3B4;
    margin: 20px 0 10px 30px;
    display: inline-block;
 }

 .statistik a, .deskriptif a{
    font-size: 12px;
    font-weight: 600;
    font-style: inter;
    padding-right: 20px;  
    color: white;
 }

 .statistik a:hover, .deskriptif a:hover {
    background-color: #138083;
    padding: 10px 5px 8px 5px;
 }

 p, .dropdown{
    padding-left: 30px;
    margin-bottom: 20px;
 }

 button {
    margin-right: 30px;
 }

 .kolom {
    background-color: #428DD1;
    padding: 0;
 }

 .tampil {
    border: 1px solid black;
    padding: 1px;
    display: inline-block;
 }

 table {
    margin: 20px;
    align-content: center;
 }
 td {
    border-bottom: 1px #918A8A;
 }
</style>