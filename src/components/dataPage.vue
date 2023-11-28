<template>
    <h1>
        Daftar Data Terpilih
    </h1>

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
        showMetadata: false,
        items: [
        { description: "Metadata 1" },
        { description: "Metadata 2" },
        { description: "Metadata 3" },
        { description: "Metadata 4" },
        ],
      selectedData: [1, 2, 3, 4], // Data terpilih sesuai dengan jumlah panel
    }
    }
}
</script>

<style scoped>
    h1 {
        text-align: left;
        margin: 30px 0px 30px 20px;
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