<template>
    <div>
      <v-container>
        <v-card class="pa-5">
          <v-card-title>Project Gantt Chart</v-card-title>
          <v-card-text>
            <div id="gantt-chart" style="width: 100%; height: 500px;"></div>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script>
  import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
  import gantt from "dhtmlx-gantt";
  
  export default {
    name: "GanttChart",
    mounted() {
      gantt.config.date_format = "%d-%M-%y";
  
      // Define the tasks and links
      const tasks = {
        data: [
          { id: 1, text: "Project Initiation", start_date: "06-Apr-20", duration: 9, progress: 0.4 },
          { id: 2, text: "Identify Site location", start_date: "06-Apr-20", duration: 4, progress: 0.6, parent: 1 },
          { id: 3, text: "Perform Soil test", start_date: "10-Apr-20", duration: 4, progress: 0.8, parent: 1 },
          { id: 4, text: "Soil test approval", start_date: "13-Apr-20", duration: 4, progress: 0.2, parent: 1 },
          { id: 5, text: "Project Estimation", start_date: "03-Apr-20", duration: 6, progress: 0.5 },
          { id: 6, text: "Develop floor plan", start_date: "03-Apr-20", duration: 3, progress: 0.7, parent: 5 },
          { id: 7, text: "List materials", start_date: "06-Apr-20", duration: 3, progress: 0.4, parent: 5 },
          { id: 8, text: "Estimation approval", start_date: "08-Apr-20", duration: 3, progress: 0.1, parent: 5 },
        ],
        links: [
          { id: 1, source: 1, target: 2, type: "1" },
          { id: 2, source: 2, target: 3, type: "0" },
          { id: 3, source: 3, target: 4, type: "0" },
          { id: 4, source: 5, target: 6, type: "1" },
          { id: 5, source: 6, target: 7, type: "0" },
          { id: 6, source: 7, target: 8, type: "0" },
        ],
      };
  
      gantt.init("gantt-chart"); // Initialize the Gantt chart
      gantt.parse(tasks); // Load the task data
    },
  };
  </script>
  
  <style scoped>
  #gantt-chart {
    border: 1px solid #ccc;
  }
  </style>
  