<template>
    <h1>
        Daftar Data Terpilih
    </h1>
    <!-- <ol>
        <li>Data Sensus Penduduk Long Form 2020 Blok I</li>
        <button @click="toggleShowMetadata">
        <span>Lihat Metadata</span>
        </button>
        <div v-if="showMetadata" class="showMetadata">
            <Metadata />
        </div>
        <br>
        <li>Data Sensus Penduduk Long Form 2020 Blok II</li>
        <button @click="toggleShowMetadata">
        <span>Lihat Metadata</span>
    </button>
    <div v-if="showMetadata">
        <Metadata />
    </div>
        <li>Data Sensus Penduduk Long Form 2020 Blok III</li>
        
        <li>Data Sensus Penduduk Long Form 2020 Blok IV</li>

    </ol> -->

    <div>
    <v-expansion-panels variant="accordion">
        <v-expansion-panel
        v-for="(item, index) in items"
        :key="index"
        :title="`Data terpilih ${selectedData[index]}`"
        :text="item.description"
        ></v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
    // import Metadata from "@/views/metadata.vue"
    export default {
        // components: {Metadata},
    data(){
    return{
        // showMetadata: false,
        items: [
        { description: "Metadata 1" },
        { description: "Metadata 2" },
        { description: "Metadata 3" },
        { description: "Metadata 4" },
      ],
      selectedData: [1, 2, 3, 4], // Data terpilih sesuai dengan jumlah panel
    }
    },
    // methods:{
    //     toggleShowMetadata(){
    //         this.showMetadata = !this.showMetadata
    //     }
    // }
}
</script>

<style scoped>
    h1 {
        text-align: left;
        margin-left: 20px;
        margin-bottom: 30px;
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
    .showMetadata{
        width: fit-content;
        height: max-content;
    }
</style>