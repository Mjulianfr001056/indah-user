<template>
  <header class="bg-white">
    <nav class="md:flex md:items-center font-semibold text-green-700">
      
    </nav>
      <div class="flex">
        <h2 class="indah">Indonesia Data Hub</h2>
        <p>Indonesia Data Hub Merupakan one stop collaboration platform yang bertujuan untuk meningkatkan literasi data dan value of statistics serta mendukung interabilitas data dan kolaborasi eksplorasi terhadap data</p>
        <p>Cari Data</p>
        <input type="text" placeholder="Masukkan kata kunci pencarian...">
        <button>Pencarian</button>
        <div class="tambah">
          <button class="putih">Tambah Data</button> <button>Tambah API</button>
        </div>
      </div>
      <div class="bawah">
        <h2>Mari Kontribusi dan Kolaborasi di Indonesia Data Hub (INDAH)</h2>
        <div class="containeratas">
          <div class="container">
            <img src="https://img.icons8.com/ios/50/circled.png" alt="circled"/>
            <span>Ajudikasi</span>
          </div>
          <div class="container">
            <img src="https://img.icons8.com/ios/50/circled.png" alt="circled"/>
            <span>Tabel Dinamis</span>
          </div>
          <div class="container">
            <img src="https://img.icons8.com/ios/50/circled.png" alt="circled"/>
            <span>Standar Data Statistik</span>
          </div>
        </div>
        <div class="containerbawah">
          <div class="container">
            <img src="https://img.icons8.com/ios/50/circled.png" alt="circled"/>
            <span>Metadata Statistik</span>
          </div>
          <div class="container">
            <img src="https://img.icons8.com/ios/50/circled.png" alt="circled"/>
            <span>Kemiskinan Ekstrem</span>
          </div>
          <div class="container">
            <img src="https://img.icons8.com/ios/50/circled.png" alt="circled"/>
            <span>Jembrana Satu Data Dari Desa</span>
          </div>
        </div>
      </div>
  </header>
</template>

<script>
  export default{
    name: 'Dashboard',
  }
</script>

<style scoped>
 .indah {
  font-size: 32px;
  font-weight: 600;
  padding: 90px;
  padding-bottom: 10px;
 }

 h2 {
  font-size: 20px;
  font-style: inter;
  font-weight: bold;
 }

 p {
  padding: 15px 90px;
  max-width: 1000px;
 }

 input {
  width: 650px;
  height: 40px;
  border: 1px solid black;
  padding: 20px;
  margin-left: 90px;
}

 button {
  width: 120px;
  height: 40px;
  padding: 1px;
  background-color: #076F3D;
  color: white;
  font-size: 14px;
  border: none;
  cursor: pointer;
 }

 .putih {
  width: 120px;
  height: 40px;
  background-color: white;
  color: black;
  border: 1px solid black;
  font-size: 14px;
  cursor: pointer;
 }

 .tambah {
  margin: 10px 20px 0px 90px;
 }

 .bawah h2 {
  padding: 130px 0 20px 450px;
 }

 .container {
  display: flex;
  align-items: center;
}

.container img {
  width: 50px;
  height: 50px;
  margin-left: 40px;
}

.container span {
  margin-left: 8px;
  font-size: 20px;
}

.containeratas {
  display: inline-flex;
  padding-left: 405px;
}

.containerbawah {
  display: inline-flex;
  padding: 20px 300px;
}

</style>
