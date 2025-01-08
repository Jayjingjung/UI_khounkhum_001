<template>
  <div>
    <v-card class="pa-5">
      <v-card-title>Project Gantt Chart</v-card-title>
      <v-card-text>
        <div id="gantt-chart" style="width: 100%; height: 500px;"></div>
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
      tasks: { data: [], links: [] },
    };
  },
  mounted() {
    gantt.config.date_format = "%Y-%m-%d";
    gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
    gantt.config.order_branch = true; // Allow ordering of tasks within branches

    gantt.init("gantt-chart");

    this.fetchTasks();

    gantt.attachEvent("onAfterTaskAdd", (id, task) => {
      this.createTask(id, task);
    });

    gantt.attachEvent("onAfterTaskUpdate", (id, task) => {
      this.updateTask(id, task);
    });

    gantt.attachEvent("onAfterTaskDelete", (id) => {
      this.deleteTask(id);
    });
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await this.$axios.$post(
          "http://khounkham.com/api-prod/v1/truck/getShowTask.service",
          { toKen: localStorage.getItem("toKen") }
        );

        if (!response || response.status !== "00" || !Array.isArray(response.data)) {
          throw new Error("Invalid API response structure");
        }
        const tasks = {
          data: response.data.map((task) => ({
            id: task.key_id,
            text: task.topic_task, // No need to split here, handle in createTask
            start_date: task.startDate.split("T")[0],
            duration: task.duration || 1,
            parent: task.parent_id || 0, // Important: Map parent_id from API
          })),
          links: [],
        };

        gantt.parse(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    },
    async createTask(id, task) {
      try {
        const startDate = gantt.date.date_to_str("%Y-%m-%d")(task.start_date);
        const endDateObj = gantt.date.add(task.start_date, task.duration, "day");
        const endDate = gantt.date.date_to_str("%Y-%m-%d")(endDateObj);

        const newTask = {
          topic_task: task.text, // Send the full text to the API
          startDate,
          endDate,
          toKen: localStorage.getItem("toKen"),
          parent_id: task.parent || 0, // Send parent_id to API
        };

        const response = await this.$axios.$post(
          "http://khounkham.com/api-prod/v1/truck/storeTask.service",
          [newTask]
        );

        if (response?.status === "00" && response.data && response.data[0].key_id) {
          // Success handling
          gantt.changeTaskId(id, response.data[0].key_id);
          gantt.getTask(response.data[0].key_id).text = task.text; // Set the text after getting the ID
          gantt.refreshData();
          gantt.message({ type: "success", text: "Task created successfully" });
        } else {
          // Error handling
          throw new Error(response?.message || "Failed to create task");
        }
      } catch (error) {

        console.error("Error creating task:", error.message);
        gantt.message({ type: "error", text: "Failed to create task" });
      }
    },
    async updateTask(id, task) {
      try {
        const endDate = gantt.date.add(task.start_date, task.duration, "day");
        const updatedTask = {
          key_id: id,
          topic_task: task.text,
          startDate: gantt.date.date_to_str("%Y-%m-%d")(task.start_date),
          endDate: gantt.date.date_to_str("%Y-%m-%d")(endDate),
          parent_id: task.parent || 0,
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

        if (response?.status !== "00") {
          throw new Error(response?.message || "Failed to delete task");
        }

        gantt.message({ type: "success", text: "Task deleted successfully" });
      } catch (error) {
        console.error("Error deleting task:", error.message);
        gantt.message({ type: "error", text: "Failed to delete task" });
      }
    },
  },
};
</script>

<style scoped>
#gantt-chart {
  border: 1px solid #ccc;
}
</style>


// const tasks = {
// data: [
// { id: 1, text: "Project Initiation", start_date: "06-Apr-20", duration: 9, progress: 0.4 },
// { id: 2, text: "Identify Site location", start_date: "06-Apr-20", duration: 4, progress: 0.6, parent: 1 },
// { id: 3, text: "Perform Soil test", start_date: "10-Apr-20", duration: 4, progress: 0.8, parent: 1 },
// { id: 4, text: "Soil test approval", start_date: "13-Apr-20", duration: 4, progress: 0.2, parent: 1 },



// { id: 5, text: "Project Estimation", start_date: "03-Apr-20", duration: 6, progress: 0.5 },
// { id: 6, text: "Develop floor plan", start_date: "03-Apr-20", duration: 3, progress: 0.7, parent: 5 },
// { id: 7, text: "List materials", start_date: "06-Apr-20", duration: 3, progress: 0.4, parent: 5 },
// { id: 8, text: "Estimation approval", start_date: "08-Apr-20", duration: 3, progress: 0.1, parent: 5 },
// ],
// links: [
// { id: 1, source: 1, target: 2, type: "1" },
// { id: 2, source: 2, target: 3, type: "0" },
// { id: 3, source: 3, target: 4, type: "0" },
// { id: 4, source: 5, target: 6, type: "1" },
// { id: 5, source: 6, target: 7, type: "0" },
// { id: 6, source: 7, target: 8, type: "0" },
// ],
// };