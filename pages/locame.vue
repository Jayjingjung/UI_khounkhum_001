<template>
    <div>
      <div style="margin-top: 25px;">
        <div id="map" class="map-container"></div>
      </div>
      <v-card class="card-container">
        <div class="button-container">
          <v-btn style="background-color: brown; color: aliceblue;" v-if="isWithinDistance" @click="handleSuccess">Success</v-btn>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4501.02287890456!2d102.6309510151204!3d18.002185207520444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312467fa74c37cc9%3A0xe92fb9f8e9729e05!2z4LmA4Lin4Li14Lii4LiH4LiI4Lix4LiZ4LiX4LiZ4LmM!5e1!3m2!1sth!2sla!4v1720516250472!5m2!1sth!2sla"
            class="responsive-iframe"
            allowfullscreen=""
            
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </v-card>
    </div>
  </template>
  
  <script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  export default {
    name: 'MapComponent',
    data() {
      return {
        map: null,
        marker: null,
        isWithinDistance: false,
        targetLocation: {
          lat: 18.002341,
          lng: 102.632926
        },
        redIcon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      };
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        this.map = L.map('map').setView([0, 0], 13);
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
  
        this.getUserLocation();
      },
      getUserLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const userLat = position.coords.latitude;
              const userLng = position.coords.longitude;
              this.map.setView([userLat, userLng], 13);
  
              if (this.marker) {
                this.marker.setLatLng([userLat, userLng]);
              } else {
                this.marker = L.marker([userLat, userLng], { icon: this.redIcon }).addTo(this.map);
              }
  
              this.checkDistance(userLat, userLng);
            },
            error => {
              console.error(error);
              this.handleLocationError();
            }
          );
        } else {
          this.handleLocationError();
        }
      },
      handleLocationError() {
        console.warn('Geolocation is not supported or blocked.');
        // Handle error, e.g., set default location or disable location-based features
        // Example: this.map.setView([defaultLat, defaultLng], 13);
      },
      checkDistance(userLat, userLng) {
        const { lat: targetLat, lng: targetLng } = this.targetLocation;
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = this.deg2rad(targetLat - userLat);
        const dLng = this.deg2rad(targetLng - userLng);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(userLat)) * Math.cos(this.deg2rad(targetLat)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
  
        this.isWithinDistance = distance <= 0.10; // Check if distance is within 50 meters (0.05 kilometers)
      },
      deg2rad(deg) {
        return deg * (Math.PI / 180);
      },
      handleSuccess() {
        alert('Success button pressed!');
      }
    }
  };
  </script>
  
  <style>
  .map-container {
    height: 500px;
    width: 100%;
  }
  
  .card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  .responsive-iframe {
    width: 100%;
    height: 450px;
    border: 0;
  }
  
  .button-container {
    margin-top: 10px;
  }
  
  @media (max-width: 600px) {
    .map-container {
      height: 300px;
    }
  
    .responsive-iframe {
      height: 300px;
    }
  
    .card-container {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  </style>
  