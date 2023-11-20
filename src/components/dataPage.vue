<template>
    <h1>
        Daftar Data Terpilih
    </h1>
    <ol>
        <li>Data Sensus Penduduk Long Form 2020 Blok I</li> <Metadata /> <router-view />
        <li>Data Sensus Penduduk Long Form 2020 Blok II</li> <Metadata /> <router-view />
        <li>Data Sensus Penduduk Long Form 2020 Blok III</li> <Metadata /> <router-view />
        <li>Data Sensus Penduduk Long Form 2020 Blok IV</li> <Metadata /> <router-view />

    </ol>
</template>

<script>
    import Metadata from "@/views/metadataDetails.vue"
    export default {
        name: 'MetadataDetails',
        components: {
        Metadata
    }
}
</script>

<style scoped>
    h1 {
        text-align: left;
        margin-left: 20px;
    }
    ol {display: flex;
        flex-wrap: wrap;
    }
    li {
        /* border: solid 1px green; */
        font-size: 14px;
        width: 50%;
        text-align: left;
        padding: 2px 0px;
    }
    li, a {
        margin-bottom: 10px;
    }
    
</style>