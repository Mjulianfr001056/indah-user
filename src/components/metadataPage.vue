<template>
    <div class="table">
        <v-card flat title="Keterangan Kolom">
            <template v-slot:text>
                <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line
                    variant="outlined" hide-details></v-text-field>
            </template>
            <v-data-table :headers="headerKolom" :items="tableContents" :search="search"></v-data-table>
        </v-card>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
  name: 'MetadataPage',
  props: {
    tableId: String,
  },
  data() {
    return {
      search: '',
      headerKolom: [
        {
          title: 'Nama Kolom',
          key: 'nama_kolom',
        },
        {
          title: 'Keterangan',
          key: 'keterangan',
        },
      ],
      tableContents: [],
    };
  },
  methods: {
    fetchData() {
      const headers = {
        'ngrok-skip-browser-warning': 'true',
        tableId: this.tableId,
      };

      axios.post('localhost:8080/api/v1/data/ket', headers)
        .then(response => {
          this.tableContents = response.data.entity.map(jsonString => JSON.parse(jsonString));
          console.log(this.tableContents);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
  

<style scoped>
.table {
    margin: 20px;
    margin-left: 25px;
    align-content: center;
}
</style>