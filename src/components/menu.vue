<template>
    <ul>
        <li><router-link class="active" to="/notebook">Notebook</router-link></li>
        <li><router-link to="/data-page">Data</router-link></li>
        <li><router-link to="/output-page">Ouput</router-link></li>
    </ul>
</template>

<style scoped>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #428DD1;

}
li{
    float: left;
}
li a{
    font-weight: 900;
    font-size: 16px;
    display: block;
    color: white;
    text-align: center;
    padding: 10px 20px;
    text-decoration: none;
}
li a:hover:not(.active){
    background-color: cornflowerblue;
}
.active{
    background-color: white;
    color: #428DD1;
}

</style>