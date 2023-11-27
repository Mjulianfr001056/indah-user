<template>
    <div class="navbar">
      <a href="/"><img class="logo-indah" :src="image" alt="INDAH"/></a>
      <a>Beranda</a>
      <a>Katalog Data</a>
      <a>Visualisasi</a>
      <a>Basis Pengetahuan</a>
      <a>Ensiklopedia</a>
      <div class="dropdown">
        <button class="dropbtn">Tools <i class="fa fa-caret-down"></i></button>
        <div class="dropdown-content">
          <a href="#">Ajudikasi</a>
          <a href="#">Data Eksplorasi</a>
          <router-link  to="/sandboxing" class="data-sandboxing"><a>Data Sandboxing</a></router-link>
          <a href="#">Tabel Dinamis</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import image from "@/components/logo-indah.png"
  export default {
    name: 'Navbar',
    data: function(){
      return{
        image: image
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    overflow: hidden;
    text-align: center;
    background-color: #ffffff;
    /* float: left; */
    margin-left: 1%;
    max-width: max-content;
  }
  
  .logo-indah{
    max-width: 107px;
  }
  .navbar a {
    font-size: 16px;
    font-weight: 600;
    color: #076f3d;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    float: left;
  }
  
  .dropdown {
    float: right;
    overflow: hidden;
  }
  
  .dropdown .dropbtn {
    font-size: 16px;
    font-weight: 600;
    border: none;
    color: #076f3d;
    padding: 14px 16px;
    margin: 0;
    background-color: #ffffff;
    cursor: pointer;
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  
  .dropdown-content a {
    float: none;
    color: #076f3d;
    font-weight: 600;
    display: block;
    text-align: left;
  }
  
  .dropdown-content a:hover {
    font-weight: bold;
  }
  
  .dropdown:hover .dropdown-content {
    display: block;
  }
  .data-sandboxing{
    text-align: left;
  }
  </style>
  