<template>
  <div>


    <!-- <v-card>
      <v-card-title class="headline">
        
      </v-card-title>
      <v-card-text>
        <span color="primary">{{ $t('welcome') }}</span><br />
        <span color="primary">{{ $t('about') }}</span><br />
        <span color="primary">{{ $t('contact') }}</span>
      </v-card-text>
    </v-card> -->
    <!-- <v-stepper v-model="e1" width="100%" elevation="1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" color="#4AAF41" >
          Name of step 1
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2" color="#4AAF41">
          Name of step 2
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 3" step="3" color="#4AAF41">
          Name of step 3
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 4" step="4" color="#4AAF41">
          Name of step 4
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
          <v-btn color="primary" @click="e1 = 2">
            Continue
          </v-btn>
          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
          <v-btn color="primary" @click="e1 = 3">
            Continue
          </v-btn>
          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
          <v-btn color="primary" @click="e1 = 4">
            Continue
          </v-btn>
          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
          <v-btn color="primary" @click="e1 = 4">
            Continue
          </v-btn>
          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper> -->
    <div style="display:none">
      <div id="modalInvoice" size="lg" title="Invoice">

        <div class="pl-10" style="display:flex;flex-direction:row;justify-content:space-between;">

          <span class="ml-10">Hello world</span>
          <span class="ml-10">Hello world</span>
          <span class="ml-10">Hello world</span>
        </div>
        <div style="height:500px;border:1px solid red">

        </div>
       
      </div>
    </div>
    <v-btn @click="print">print</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ['lao', 'en'],
      // selectedLocale: this.$i18n.locale,
      e1: 1,
    }
  },
  name: 'IndexPage',
  methods: {
    
    print() {
      const modal = document.getElementById("modalInvoice")
      const cloned = modal.cloneNode(true)
      let section = document.getElementById("print")
      if (!section) {
        section = document.createElement("div")
        section.id = "print"
        document.body.appendChild(section)
      }
      section.innerHTML = "";
      section.appendChild(cloned);
      window.print();
    }
  }
}

</script>
<style lang="scss">
@media screen {
  #print {
    display: none;
  }
}

@media print {
  body * {
    visibility: hidden;
  }

  #print,
  #print * {
    visibility: visible;
  }

  #print {
    position: absolute;
    left: 50px;
    top: 50px;
    right: 50px;
  }
}
</style>
