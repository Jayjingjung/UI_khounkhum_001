<template>
  <div>
    <v-card>
      <pdf class="pdf-border" style="width: 1400px;" :src="pdfSrc"></pdf>

      <div v-if="carDetail && carDetail.pdf">
        <v-card
          class="card-center"
          style="text-align: center; width: 100%; margin-top: 10px; margin-left: 7px; margin-right: 7px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;"
        >
          <div>
            <span style="font-family: 'Times New Roman', Times, serif;">DOC</span>
          </div>
          <pdf class="pdf-border" style="width: 1400px;" :src="carDetail.pdf"></pdf>
          <v-card-title>{{ carDetail.branchUser }}</v-card-title>
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
  data() {
    return {
      loading_processing: false,
      valid: false,
      carDetail: {
        pdf: '',
        search: '',
        key_id: '', // Ensure key_id is defined here
      },
      // pdfSrc: 'http://khounkham.com/images/car/f1274ecc-0f04-4402-aabc-c70cb1df4a45-f1274ecc-0f04-4402-aabc-c70cb1df4a45.pdf', 
      pdfSrc: 'http://res.cloudinary.com/dbnjr4jnn/raw/upload/v1720775918/Model%202-1720775916771', 


      img: null,
      nameRules: [
        v => !!v || 'Image is required'
      ]
    }
  },
  mounted() {
    if (this.$route.query.key_id) {
      this.ongetData(this.$route.query.key_id);
    }
  },
  methods: {
    async ongetData(key_id) {
      try {
        const data = await this.$axios.$post('/listDocumentDetail.service', {
          key_id: key_id
        });
        if (data?.status === "00") {
          this.carDetail = data?.data[0];
        } else {
          swal.fire({
            icon: 'error',
            text: 'Failed to fetch car details',
          });
        }
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error.message || error
        });
        console.log(error);
      }
    },
  },
}
</script>

<style lang="scss">
.margintops {
  margin-top: -25px;
}

.top {
  margin-top: 5px;
  margin-left: 10px;
}

.tops {
  margin-top: -25px;
  font-size: 14px;
}

.preview-image {
  width: 220px;
  height: 220px;
}

.red-background {
  background-color: red !important;
}
</style>
