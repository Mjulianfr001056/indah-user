<template>
    <h1>
        Daftar Data Terpilih
    </h1>
    <ol>
        <li>Data Sensus Penduduk Long Form 2020 Blok I</li>
        <button @click="toggleShowMetadata">
        <span>Lihat Metadata</span>
        </button>
        <div v-if="showMetadata">
            <Metadata />
        </div>
        <li>Data Sensus Penduduk Long Form 2020 Blok II</li>
        <button @click="toggleShowMetadata">
        <span>Lihat Metadata</span>
    </button>
    <div v-if="showMetadata">
        <Metadata />
    </div>
        <li>Data Sensus Penduduk Long Form 2020 Blok III</li>
        <v-expansion-panels>
            <v-expansion-panel title="Lihat Metadata"
            slotA="<Metadata />"
            >
                <Metadata />
            </v-expansion-panel>
        </v-expansion-panels>
        <li>Data Sensus Penduduk Long Form 2020 Blok IV</li>

    </ol>

    
</template>

<script>
    import Metadata from "@/views/metadata.vue"
    export default {
        components: {Metadata},
    data(){
    return{
        showMetadata: false
    }
    },
    methods:{
        toggleShowMetadata(){
            this.showMetadata = !this.showMetadata
        }
    }
}
</script>

<style scoped>
    h1 {
        text-align: left;
        margin-left: 20px;
    }
    ol {
        display: flex;
        margin-left: 40px;
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