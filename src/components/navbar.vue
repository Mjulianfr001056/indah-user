<template>
    <div class="navbar">
      <a href="/" class="logo"><img class="logo-indah" :src="image" alt="INDAH"/></a>
      <a href="/">Beranda</a>
      <a>Katalog Data</a>
      <a>Visualisasi</a>
      <a>Basis Pengetahuan</a>
      <a>Ensiklopedia</a>
      <div class="dropdown">
        <button class="dropbtn">Tools <i class="fa fa-caret-down"></i></button>
        <div class="dropdown-content">
          <a href="#">Ajudikasi</a>
          <a href="#">Data Eksplorasi</a>
          <div  class="data-sandboxing">
            <router-link to="/sandboxing">Data Sandboxing</router-link>
          </div>
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
    margin-left: 1%;
    max-width: max-content;
  }
  
  
  .navbar a {
    font-size: 16px;
    font-weight: 600;
    color: #076f3d;
    text-align: center;
    padding: 12px 16px;
    text-decoration: none;
    float: left;
  }
  a.logo{
    padding-bottom: 7.5px;
  }
  .logo-indah{
    max-height: 22px;
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
    padding: 12px 16px;
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
  </style>
  