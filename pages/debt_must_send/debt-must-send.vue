<template>
    <v-card padding-top="1" height="735" width="2000" class="mx-auto">
      <v-navigation-drawer permanent :active="active">
        
        
        <v-list-item >
          <v-list-item-content>
            
            <v-card-title style="background-color:#E57373;color:white ">ໜີ້ຕ້ອງສົ່ງ</v-card-title>
  
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
  
        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title" link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </template>
  
  <script>
  export default {
  data () {
    return {
      items: [
        { title: 'ລາຍງານໜີ້ຕ້ອງສົ່ງ', icon: 'mdi-chart-areaspline'},
      ],
      right: null,
    }
  },
  }
  </script>