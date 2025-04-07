<template>
  <div>
    <v-card>
      <v-card-text>
        <v-card-actions>
          <div class="ml-10">
            <p style="margin-right: 5px;"><strong> ລະຫັດ:</strong> {{ paperDetail.offer_CODE }}</p>
            <p style="margin-right: 5px;"><strong>ຊື່ຜຸ້ສະເໜີ:</strong> {{ paperDetail.offerManName }}</p>
            <p style="margin-right: 5px;"><strong>ອາຊີບ:</strong> {{ paperDetail.job }}</p>
            <p style="margin-right: 5px;"><strong>ລາຍລະອຽດ:</strong> {{ paperDetail.description }}</p>
          </div>
          <v-spacer></v-spacer>
          <v-btn color="#f593b3" class="white--text mt-10" @click="print">
            <v-icon>mdi-printer</v-icon>ພິມລາຍງານທັງໝົດ
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
    <div class="pt-6">
      <v-row>
        <v-col v-for="(item, index) in filteredItems" :key="index" cols="12" md="4" sm="6">
          <v-card color="#ECEFF1">
            <v-card-text>
              <v-img :src="item.img" height="200px" v-if="item.img && item.img !== '0'"></v-img>
              <v-card-title>{{ item.item_name }}</v-card-title>
              <v-card-subtitle>
                ຈຳນວນ: {{ item.qty_offer }} | ລາຄາ: {{ item.unit_price }} {{ currency }}
              </v-card-subtitle>
              <v-card-text>
                ລາຄາລວມ: {{ item.totalMoney }} {{ currency }}
              </v-card-text>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div style="display:none">
      <div id="modalInvoice">
        <Noti />
        <v-row
          style="font-size:14px;margin-left: 50px;margin-top: 10px;display:flex;justify-content:start;flex-direction:column;align-items:start">
          <div>
            <div style="font-size: 16px; font-weight: bold;">
              ສະໜາມ ບ້ານຫັງຄັງ, ເມືອງບົວລະພາ, ແຂວງຊຽງຂວາງ, ສປປ ລາວ
            </div>
            <!-- <span>ສໍານັກງານຕັ້ງຢູ່ ອາຄານ ສະໜາມຍິງປືນ 20 ມັງກອນ, ສະໜາມກີລາກອງທັບ,</span>
            <span> ບ້ານຈອມມະນີ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ</span>
            <span>ໂທລະສັບ: 020 92661111, 020 92 254 999 </span>
            <span> ອີເມວ: kounkham@Mining|ເວັບໄຊ: kounkham</span> -->
          </div>
        </v-row>
        <div class="text-center"
          style="display:flex;justify-content:center;font-size:23px;font-weight:bold;margin-top: 30px;">
          ລາຍງານລາຍລະອຽດອາໄຫຼ່</div>
        <div>
          <p style="margin-right: 5px;"><strong> ລະຫັດ:</strong> {{ paperDetail.offer_CODE }}</p>
          <p style="margin-right: 5px;"><strong>ຊື່ຜຸ້ສະເໜີ:</strong> {{ paperDetail.offerManName }}</p>
          <p style="margin-right: 5px;"><strong>ອາຊີບ:</strong> {{ paperDetail.job }}</p>
          <p style="margin-right: 5px;"><strong>ລາຍລະອຽດ:</strong> {{ paperDetail.description }}</p>
        </div>
        <v-row v-for="(item, index) in filteredItems" :key="index">
          <v-col cols="12">
            <v-card-actions>
              <img :src="item.img" width="100px" height="140px" v-if="item.img && item.img !== '0'" />
              <v-spacer></v-spacer>
              <div>
                <div style="font-size: 18px;">{{ item.item_name }}</div>
                <br>
                <div style="font-size: 14px;">
                  ຈຳນວນ: {{ item.qty_offer }} | ລາຄາ: {{ item.unit_price }} {{ currency }}
                </div>
                <div style="font-size: 14px;">
                  ລາຄາລວມ: {{ item.totalMoney }} {{ currency }}
                </div>
              </div>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-col>
        </v-row>
        <div style="margin-top: 60px;">
          <v-card-actions>
            <h3 class="red--text ">
              ລວມຄ່າອະໄຫຼ່ທັງໝົດ: {{ paperDetail.real_totalMoney?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
              {{
                currency }}
            </h3>
            <v-spacer></v-spacer>
            <div>
              ລາຍເຊັນຜຸ້ກວດກາລະບົບ
            </div>
          </v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div>
              ..............................
            </div>
          </v-card-actions>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      paperDetail: {}, // ข้อมูลรายละเอียดที่ได้จาก API
      sumFooter: null,
      currency: 'THB',
    };
  },
  computed: {
    filteredItems() {
      const items = [];
      for (let i = 0; i <= 9; i++) {
        const name = this.paperDetail[`item_name${i === 0 ? '' : i}`];
        if (name && name !== 'null') {
          items.push({
            item_name: name,
            qty_offer: this.paperDetail[`qty_offer${i === 0 ? '' : i}`],
            unit_price: this.paperDetail[`unit_price${i === 0 ? '' : i}`],
            totalMoney: this.paperDetail[`totalMoney${i === 0 ? '' : i}`],
            img: this.paperDetail[`img${i === 0 ? '' : i}`],
          });
        }
      }
      return items;
    },
  },
  methods: {
    async ongetData(offerCode) {
      try {
        const requestData = {
          offer_CODE: offerCode,
          toKen: localStorage.getItem('toKen'),
        };
        const response = await this.$axios.$post('/showofferpaperDetail.service', requestData);
        if (response?.status === "00") {
          this.paperDetail = response?.data[0];
          this.sumFooter = response?.sumFooter;
          this.currency = response?.data[0]?.currency || 'THB';
          console.log("new data footer:", this.sumFooter);
        } else {
          swal.fire({
            icon: 'error',
            text: 'Failed to fetch car details',
          });
        }
      } catch (error) {
        swal.fire({
          icon: 'error',
          text: error.message || 'An error occurred',
        });
        console.log(error);
      }
    },
    print() {
      const modal = document.getElementById("modalInvoice");
      const cloned = modal.cloneNode(true);
      let section = document.getElementById("print");
      if (!section) {
        section = document.createElement("div");
        section.id = "print";
        document.body.appendChild(section);
      }
      section.innerHTML = "";
      section.appendChild(cloned);
      window.print();
    },
  },
  mounted() {
    if (this.$route.query.offerCode) {
      this.ongetData(this.$route.query.offerCode);
    }
  }
};
</script>
