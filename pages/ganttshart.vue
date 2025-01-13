<template>
  <div>
    <v-card class="fullscreen-map">
      <v-card-text>
        <div>
          <div style="display: flex; justify-self: center; margin-bottom: 40px;">
            <h3>
              ແຜນວຽກປະຈຳ ຂອງຝ່າຍ ໄອທີ IT
              (ວັນທີ {{ formattedStartDate }} - {{ formattedEndDate }})
            </h3>
          </div>
          <div style="display: flex; justify-content: space-around; color: dodgerblue; margin-bottom: 50px;">
            <div>Project Name:</div>
            <div>ຄືບໜ້າ ແລະ ສໍາເລັດ:</div>
            <div>ແຜນລິເລີ່ມ:</div>
          </div>
        </div>

        <div style="width: 350px; display: flex;">
          <v-menu v-model="startDateMenu" :close-on-content-click="false" :nudge-right="40"
            transition="scale-transition" offset-y>
            <template v-slot:activator="{ on }">
              <v-text-field dense outlined v-model="formattedStartDate" label="Project Start" readonly v-on="on" />
            </template>
            <v-date-picker v-model="startDate" no-title scrollable @input="updateStartDate" />
          </v-menu>
          <v-menu v-model="endDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
            offset-y>
            <template v-slot:activator="{ on }">
              <v-text-field dense outlined v-model="formattedEndDate" label="Current Date:" readonly v-on="on" />
            </template>
            <v-date-picker v-model="endDate" no-title scrollable @input="updateEndDate" />
          </v-menu>
        </div>
        <div id="gantt-container">
          <div id="gantt-chart" style="width: 100%; height: 100%;"></div>
        </div>
      </v-card-text>
      <v-card-text style="width: 400px;">
        <v-simple-table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks.data" :key="task.id">
              <td>{{ task.text }}</td>
              <td>
                <v-progress-linear :value="task.progress * 100" color="green" height="20" striped>
                  {{ Math.round(task.progress * 100) }}%
                </v-progress-linear>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import gantt from "dhtmlx-gantt";

export default {
  name: "GanttChart",
  data() {
    return {
      startDate: null,
      endDate: null,
      tasks: { data: [], links: [] },
      startDateMenu: false,
      endDateMenu: false,
    };
  },
  computed: {
    formattedStartDate() {
      return this.startDate ? this.formatDate(this.startDate) : null;
    },
    formattedEndDate() {
      return this.endDate ? this.formatDate(this.endDate) : null;
    },
  },
  mounted() {
    gantt.config.date_format = "%Y-%m-%d";
    gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";

    // New Scale Configuration
    gantt.templates.timeline_cell_class = () => "gantt_cell";
    gantt.config.scales = [
      { unit: "month", step: 1, format: "%F %Y" },
      { unit: "day", step: 1, format: "%j %D" },
    ];
    gantt.config.row_height = 55;
    gantt.config.bar_height = 50;

    gantt.attachEvent("onTemplatesReady", () => {
      const css = `
        .gantt_task_line {
          height: ${gantt.config.bar_height}px !important;
        }
        .gantt_grid_head_cell {
          height: ${gantt.config.row_height}px !important;
        }
      `;
      const style = document.createElement("style");
      style.innerHTML = css;
      document.head.appendChild(style);
    });

    gantt.init("gantt-chart");
    this.fetchTasks();
    this.fetchLinks();

    // Attach events
    gantt.attachEvent("onAfterLinkAdd", (id, link) => this.createLink(link));
    gantt.attachEvent("onAfterTaskAdd", (id, task) => this.createTask(id, task));
    gantt.attachEvent("onAfterTaskUpdate", (id, task) =>
      this.updateTask(id, task)
    );
    gantt.attachEvent("onAfterTaskDelete", (id) => this.deleteTask(id));
    gantt.attachEvent("onAfterLinkDelete", (id) => this.deleteLink(id)); // Link deletion event
  },
  
  methods: {
    formatDate(date) {
      if (typeof date === "string") {
        return date;
      }
      return new Date(date).toISOString().split("T")[0];
    },
    updateStartDate() {
      this.startDateMenu = false;
      this.fetchTasks();
    },
    updateEndDate() {
      this.endDateMenu = false;
      this.fetchTasks();
    },
    async fetchTasks() {
      try {
        const response = await this.$axios.$post(
          "http://khounkham.com/api-prod/v1/truck/getShowTask.service",
          {
            toKen: localStorage.getItem("toKen"),
            startDate: this.formattedStartDate,
            endDate: this.formattedEndDate,
          }
        );

      
        this.tasks.data = response.data.map((task) => ({
          id: task.key_id,
          text: task.topic_task,
          start_date: task.startDate.split("T")[0],
          duration: task.duration || 1,
          parent: task.parent || 0,
          progress: task.progress || 0,
        }));
        gantt.clearAll();
        gantt.parse(this.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    },
    async fetchLinks() {
      try {
        const response = await this.$axios.$post(
          "http://khounkham.com/api-prod/v1/truck/getShowLink.service",
          {
            toKen: localStorage.getItem("toKen"),
          }
        );

       

        this.tasks.links = response.data.map((link) => ({
          id: link.id,
          source: link.source,
          target: link.target,
          type: link.type,
        }));

        gantt.parse(this.tasks);
      } catch (error) {
        console.error("Error fetching links:", error.message);
      }
    },
    async createTask(id, task) {
      try {
        const startDate = gantt.date.date_to_str("%Y-%m-%d")(task.start_date);
        const endDate = gantt.date.date_to_str("%Y-%m-%d")(
          gantt.date.add(task.start_date, task.duration, "day")
        );

        const newTask = {
          topic_task: task.text,
          startDate,
          endDate,
          progress: task.progress || 0,
          toKen: localStorage.getItem("toKen"),
          parent: task.parent || 0,
        };

        const response = await this.$axios.$post(
          "http://khounkham.com/api-prod/v1/truck/storeTask.service",
          [newTask]
        );

        if (response?.status === "00") {
          gantt.message({ type: "success", text: "Task created successfully" });
        } else {
          throw new Error(response?.message || "Failed to create task");
        }
      } catch (error) {
        console.error("Error creating task:", error.message);
        gantt.message({ type: "error", text: "Failed to create task" });
      }
      this.fetchTasks();

    },
    async updateTask(id, task) {
      try {
        const endDate = gantt.date.date_to_str("%Y-%m-%d")(
          gantt.date.add(task.start_date, task.duration, "day")
        );

        const updatedTask = {
          key_id: id,
          topic_task: task.text,
          startDate: gantt.date.date_to_str("%Y-%m-%d")(task.start_date),
          endDate,
          progress: task.progress || 0,
          parent: task.parent || 0,
        };

        const response = await this.$axios.$post(
          "http://khounkham.com/api-prod/v1/truck/UpdateTask.service",
          [updatedTask]
        );

        if (response?.status === "00") {
          gantt.message({ type: "success", text: "Task updated successfully" });
        } else {
          throw new Error(response?.message || "Failed to update task");
        }
      } catch (error) {
        console.error("Error updating task:", error.message);
        gantt.message({ type: "error", text: "Failed to update task" });
      }
    },
    async deleteTask(id) {
      try {
        const response = await this.$axios.$post(
          "http://khounkham.com/api-prod/v1/truck/DelTasks.service",
          { key_id: id }
        );

        if (response?.status === "00") {
          gantt.message({ type: "success", text: "Task deleted successfully" });
        } else {
          throw new Error(response?.message || "Failed to delete task");
        }
      } catch (error) {
        console.error("Error deleting task:", error.message);
        gantt.message({ type: "error", text: "Failed to delete task" });
      }
    },
    async deleteLink(id) {
      try {
        const response = await this.$axios.$post(
          "http://khounkham.com/api-prod/v1/truck/Dellink.service",
          { id }
        );

        if (response?.status === "00") {
          gantt.message({ type: "success", text: "Link deleted successfully" });
        } else {
          throw new Error(response?.message || "Failed to delete link");
        }
      } catch (error) {
        console.error("Error deleting link:", error.message);
        gantt.message({ type: "error", text: "Failed to delete link" });
      }
    },
    async createLink(link) {
      try {
        const payload = {
          source: link.source,
          target: link.target,
          type: link.type,
          toKen: localStorage.getItem("toKen"),
        };

        const response = await this.$axios.$post(
          "http://khounkham.com/api-prod/v1/truck/storeLinks.service",
          [payload]
        );

        if (response?.status === "00") {
          gantt.message({ type: "success", text: "Link created successfully" });
        } else {
          throw new Error(response?.message || "Failed to create link");
        }
      } catch (error) {
        console.error("Error creating link:", error.message);
      }
    },
  },
};
</script>

<style>
#gantt-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.gantt_grid_head_cell {
  text-align: center;
}

.v-simple-table thead th {
  text-align: center;
}

.v-progress-linear {
  margin-top: 10px;
}

.fullscreen-map {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
}



</style>
