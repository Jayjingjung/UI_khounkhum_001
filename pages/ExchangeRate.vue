<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <span class="headline">Exchange Rates</span>
            </v-card-title>
            <v-card-subtitle>
              <v-select
                v-model="selectedCurrency"
                :items="currencies"
                label="Select Currency"
                @change="fetchExchangeRate"
              />
            </v-card-subtitle>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(rate, currency) in exchangeRates" :key="currency">
                  <v-list-item-content>
                    <v-list-item-title>{{ currency }}</v-list-item-title>
                    <v-list-item-subtitle>{{ rate }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedCurrency: '',
        currencies: ['USD', 'EUR', 'JPY'], // Add more currencies as needed
        exchangeRates: {},
      };
    },
    methods: {
      async fetchExchangeRate() {
        if (!this.selectedCurrency) return;
  
        try {
          const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${this.selectedCurrency}`);
          this.exchangeRates = response.data.rates;
        } catch (error) {
          console.error('Error fetching exchange rates:', error);
          this.$toast.error('Failed to fetch exchange rates.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .headline {
    font-size: 1.5rem;
    font-weight: bold;
  }
  </style>
  