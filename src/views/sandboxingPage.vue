<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="notebook">Notebook</v-tab>
      <v-tab value="keterangan">Keterangan</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="notebook">
          <notebook @tableIdChanged="handleTableIdChanged" />
        </v-window-item>

        <v-window-item value="keterangan">
          <MetadataPage :tableId="globalTableId" ref="metaPageRef" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
import notebook from "../components/notebookPage.vue";
import MetadataPage from "../components/metadataPage.vue";

export default {
  name: 'App',
  components: {
    notebook,
    MetadataPage,
  },
  data() {
    return {
      layout: 'notebookActive',
      tab: 'Notebook',
      items: ['Notebook', 'keterangan'],
      globalTableId: '',
    };
  },
  methods: {
    handleTableIdChanged(newTableId) {
      this.globalTableId = newTableId;
      this.$nextTick(() => {
        if (this.$refs.metaPageRef) {
          this.$refs.metaPageRef.fetchData();
        }
      });
    },
  },
};
</script>


<style scoped>
.vcard {
  /* max-width: 300px; */
  margin-left: 45px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #428DD1;

}

li {
  float: left;
}

li button {
  font-weight: 900;
  font-size: 16px;
  display: block;
  color: white;
  text-align: center;
  padding: 10px 20px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: cornflowerblue;
}

.active {
  background-color: white;
  color: #428DD1;
}
</style>