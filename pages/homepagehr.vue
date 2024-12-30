<template>
  <div>
      <div>
      <canvas ref="fireworksCanvas" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;"></canvas>
      <div v-show="showMessage" class="message" :style="messageStyle">Countdown {{ currentDate }}</div>
      <button @click="launchFireworks">Launch Fireworks</button>
    </div>
    <v-row>
      <!-- ລົດບໍລິຫານ -->
      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="./HR/carindek_hr" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-car</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">ລົດບໍລິຫານ</span><br />
                
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <!-- ລາຍຮັບ-ລາຍຈ່າຍອື່ນໆ -->

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="./HR/itemhr" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-package-variant-closed</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">ອຸປະກອນຫ້ອງການ</span><br />
                  <!-- <div style="background-color: red;width: 30px;height: 30px;border-radius: 20px;display: flex;justify-content: center;align-items: center;color: white;"><span>10</span></div> -->
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'|| USER_NAME === 'mai_ud'">
          <v-card to="./HR/akasarn" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-application-import</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">ເອກກະສານ</span><br />
                  <!-- <div style="background-color: red;width: 30px;height: 30px;border-radius: 20px;display: flex;justify-content: center;align-items: center;color: white;"><span>10</span></div> -->
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="/reportbaisner" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-folder-multiple-outline</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">ລາຍງານສະເໜີ</span><br />
                  <!-- <div style="background-color: red;width: 30px;height: 30px;border-radius: 20px;display: flex;justify-content: center;align-items: center;color: white;"><span>10</span></div> -->
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="/mining" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-image-filter-hdr</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">ລາຍງານການຄຸດເຈາະ</span><br />
                  <!-- <div style="background-color: red;width: 30px;height: 30px;border-radius: 20px;display: flex;justify-content: center;align-items: center;color: white;"><span>10</span></div> -->
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>

      <!-- <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="/signature" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-pen</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">signature</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col> -->

      <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="/receivedAll" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55">mdi-receipt-send-outline</v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">ໃບສະເໜີລາຄາ</span><br />
                  <!-- <div style="background-color: red;width: 30px;height: 30px;border-radius: 20px;display: flex;justify-content: center;align-items: center;color: white;"><span>10</span></div> -->
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>

      <!-- <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="/ExchangeRate" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55"></v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">ExchangeRate</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col> -->

      <!-- <v-col cols="12" md="3">
        <div v-if="USER_ROLE === 'USER'|| USER_ID === 'ADMIN'">
          <v-card to="/testt-v-card-pdf" height="100" elevation="2" rounded="lg" width="310px"
            style="border: 1px solid  rgba(191, 0, 0, 0.8);">
            <v-card-text>
              <div class="d-flex align-center">
                <v-icon style="color: rgba(191, 0, 0, 0.8);" size="55"></v-icon>
                <div class="pl-5 pb-5 pt-5 pr-5 ">
                  <span style="font-size: 18pt;font-weight: bold;">test</span><br />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col> -->
    </v-row>



  </div>
</template>

<script>
  import confetti from "canvas-confetti";

export default {
  name: "Fireworks",
  data() {
    return {
      USER_ID: '',
      USER_NAME: '',
      USER_ROLE: '',
      TOTAL: '',
      TOTAL_INVOICE: '',
      TOTAL_FORMANCE: '',
      TOTAL_payStatus: '',
      TOTAL_totalOwe: '',
      TOTAL_notiDetails: '',
      loading_processing: false,
      showMessage: true, // Controls the visibility of the message
        messageOpacity: 1, // Controls the opacity of the message
        currentDate: this.getCurrentDate(), // Holds the current date
    }
  },
  computed: {
      messageStyle() {
        return {
          opacity: this.messageOpacity,
          transition: "opacity 2s ease-in-out",
        };
      },
    },
  mounted() {
    this.total_count()
    this.USER_ID = localStorage.getItem('USER_ID')
    this.USER_NAME = localStorage.getItem('USER_NAME')
    this.USER_ROLE = localStorage.getItem('USER_ROLE')

    this.launchFireworks(); // Automatically launch fireworks on load
  },
  methods: {
    total_count() {
      try {
        this.loading_processing = true;
        this.$axios.$post('/getNotiTab3.service'
          , {
            toKen: localStorage.getItem('toKen'),

          }
        ).then((data) => {
          this.loading_processing = false
          this.TOTAL = data?.totalRow
          this.TOTAL_INVOICE = data?.notiInvoice
          this.TOTAL_FORMANCE = data?.notiPerForMance
          this.TOTAL_payStatus = data?.payStatus
          this.TOTAL_notiDetails = data?.notiDetails
          this.TOTAL_totalOwe = data?.totalOwe
        })
      } catch (error) {
        this.loading_processing = false
        swal.fire({
          icon: 'error',
          text: error
        })
        console.log(error)
      }
    },

    onCleck() {


    },

  getCurrentDate() {
        const date = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, options);
      },
      launchFireworks() {
        const canvas = this.$refs.fireworksCanvas;
        const myConfetti = confetti.create(canvas, { resize: true });
  
        const colors = ["#FFD700", "#FF0000", "#FFFFFF"];
  
        const fireworkBurst = () => {
          myConfetti({
            particleCount: 100,
            angle: Math.random() * 360,
            spread: 60,
            origin: { x: Math.random(), y: Math.random() },
            colors: colors,
          });
        };
  
        // Launch multiple fireworks with intervals
        for (let i = 0; i < 10; i++) {
          setTimeout(fireworkBurst, i * 500);
        }
  
        // Gradually fade out the message after the fireworks finish
        setTimeout(() => {
          this.messageOpacity = 0;
          setTimeout(() => {
            this.showMessage = false;
          }, 2000); // Wait for the fade-out transition to complete
        }, 6000); // 6 seconds for 10 bursts
      },


  }
}

</script>

<style scoped>
canvas {
  pointer-events: none;
  z-index: 9999;
}
.message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: #FFD700;
  text-shadow: 3px 3px 5px #FF0000;
  z-index: 10000;
  font-family: "Arial", sans-serif;
}
button {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #FFD700;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  z-index: 10001;
}
button:hover {
  background-color: #FF0000;
}
</style>
