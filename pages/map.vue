<template>
    <div>
      <div id="map" style="height: 500px; width: 100%;"></div>
      <v-btn @click="downloadMap">Download Map</v-btn>
    </div>
  </template>
  
  <script>
  import L from "leaflet";
  import html2canvas from "html2canvas"; // For exporting the map as an image
  
  export default {
    data() {
      return {
        map: null,
      };
    },
    mounted() {
      // Initialize the map
      this.map = L.map("map").setView([latitude, longitude], 13);
  
      // Add a tile layer (e.g., OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
      }).addTo(this.map);
  
      // Add a marker (optional)
      L.marker([latitude, longitude])
        .addTo(this.map)
        .bindPopup("Your location")
        .openPopup();
    },
    methods: {
      async downloadMap() {
        // Use html2canvas to take a snapshot of the map
        const mapElement = document.getElementById("map");
        const canvas = await html2canvas(mapElement);
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "map.png";
        link.click();
      },
    },
  };
  </script>
  