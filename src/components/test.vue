<template>
    <div class="analisis-inferensia">
    <!-- Tombol untuk membuka dialog pertama -->
    <v-btn color="#43A047" @click="bukaDialogInferensia">Statistik Inferensia</v-btn>

    <!-- Dialog Pertama: Memilih Uji Statistik -->
    <v-dialog v-model="dialogInferensia" width="600">
    <v-card>
        <v-card-title>
        <span class="text-h5">Pilih Uji Statistik</span>
        </v-card-title>
        <v-card-text>
        <v-radio-group v-model="selectedTest" column>
            <v-radio v-for="test in availableTests" :key="test" :label="test" :value="test"></v-radio>
        </v-radio-group>
        </v-card-text>
        <v-card-actions class="justify-end">
        <v-btn color="blue-darken-1" @click="tutupDialogInferensia">
            Tutup
        </v-btn>
        <v-btn color="blue-darken-1" @click="bukaDialogKolom">
            Simpan
        </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>

    <!-- Dialog Kedua: Memilih Kolom -->
    <v-dialog v-model="dialogKolom" width="600">
    <v-card>
        <v-card-title>
        <span class="text-h5">Pilih Kolom</span>
        </v-card-title>
        <v-card-text>
        <v-checkbox v-model="selectedColumns" :items=headersArray label="Kolom" required multiple></v-checkbox>
            
        </v-card-text>
        <v-card-actions class="justify-end">
        <v-btn color="blue-darken-1" @click="tutupDialogKolom">
            Tutup
        </v-btn>
        <!-- Tambahkan logika simpan jika diperlukan -->
        <v-btn color="blue-darken-1" @click="simpanDataDialog">
            Simpan
        </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
data() {
    return {
    dialogInferensia: false,
    dialogKolom: false,
    availableTests: ['Paired t-test', 'Unpaired t-test', 'One Way Anova', 'Wilcoxon Rank Test', 'Mann Whitney U-test', 'Kruskal Wallis Test'],
    selectedTest: null,
    selectedColumns: [],
    headersArray: ['Kolom1', 'Kolom2', 'Kolom3'], // Gantilah dengan data sesuai kebutuhan
    };
},
methods: {
    bukaDialogInferensia() {
    this.dialogInferensia = true;
    },
    tutupDialogInferensia() {
    this.dialogInferensia = false;
    },
    bukaDialogKolom() {
    // Pastikan telah memilih uji statistik sebelum membuka dialog kolom
    if (this.selectedTest) {
        this.dialogInferensia = false;
        this.dialogKolom = true;
    }
    },
    tutupDialogKolom() {
    this.dialogKolom = false;
    },
    simpanDataDialog() {
    // Logika simpan data di sini
    // Misalnya, akses this.selectedTest dan this.selectedColumns untuk pengolahan lebih lanjut
    // ...
    this.dialogKolom = false;
    },
},
};
</script>
