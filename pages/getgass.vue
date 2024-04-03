<template>
  <div>
    <div class="ml-10" style="display: flex; justify-content: flex-start;" >
      <div v-if="sumFooter">
        <h3 class="mb-5">ລວມ ທີກຽວກັບນໍ້າມັນ</h3>

        <div style="display: flex; justify-content: flex-start;">
          <p>ລວມລິດນໍ້າມັນທັງໝົດ: </p>
          <p class="text-red">{{ sumFooter.totalLidFuel }}</p>
        </div>

        <div style="display: flex; justify-content: flex-start;">
          <p>ລວມເງິນຄ້າງຈ່າຍນໍ້າມັນ: </p>
          <p class="text-red">{{ sumFooter.totalPriceFuel }}</p>
        </div>
      </div>



    </div>
    <v-data-table :headers="headers" :items="gasReports" :items-per-page="10" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>ລາຍງານບິນນໍ້າມັນທັງໝົດ</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gasReports: [], // Array to store fetched gas reports
      sumFooter: null // Object to store sumFooter data
    };
  },
  mounted() {
    this.fetchReportFuel(); // Call the method to fetch report data
  },
  methods: {
    async fetchReportFuel() {
      try {
        const response = await this.$axios.$post('/ShowAllReportFuel.service', {
          toKen: localStorage.getItem('toKen'),
        });
        if (response?.status == '00') {
          console.log('Report fuel data:', response.data);
          this.gasReports = response.data; // Update gasReports with retrieved data
          this.sumFooter = response.sumFooter; // Update sumFooter data
        } else {
          console.log('Error fetching report fuel data:', response?.message);
          // Handle error message display or other logic here
        }
      } catch (error) {
        console.error('Error fetching report fuel data:', error);
        // Handle error message display or other logic here
      }
    },
  },
  computed: {
    headers() {
      return [
        // { text: 'ID', value: 'key_id' },
        { text: 'ID', value: 'del' },

        { text: 'ຊື່ ປໍ້ານໍ້າມັນ', value: 'pumpName' },
        { text: 'ປ້າຍຫົວລົດ', value: 'plateTruckHead' },
        { text: 'ລິດນໍ້າມັນ', value: 'lidFuel' },
        { text: 'ລາຄານໍ້າມັນ', value: 'prizPerLid' },
        { text: 'ລວມເປັນເງິນ', value: 'totalPrizeFuelAll' },

        { text: 'ແຂວງ', value: 'province' },
        { text: 'ເມືອງ', value: 'district' },
        { text: 'ບ້ານ', value: 'village' },
        { text: 'ວັນທີຕື່ມນໍ້າມັນ', value: 'dateFillFuel' },
      ];
    }
  }
};
</script>
<style>
.text-red {
  color: red;
}
</style>