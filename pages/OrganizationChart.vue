<template>
    <div id="app">
        <h1>Organization Chart</h1>
        <div class="org-chart">
            <svg :width="svgWidth" :height="svgHeight" class="org-svg" xmlns="http://www.w3.org/2000/svg">
                <!-- Draw links -->
                <line v-for="(link, index) in links" :key="'link-' + index" :x1="link.x1" :y1="link.y1" :x2="link.x2"
                    :y2="link.y2" stroke="black" stroke-width="2" />
                <!-- Draw nodes -->
                <g v-for="(node, index) in nodes" :key="'node-' + index">
                    <rect :x="node.x" :y="node.y" :width="nodeWidth" :height="nodeHeight" fill="lightblue"
                        stroke="black" rx="8" />
                    <text :x="node.x + nodeWidth / 2" :y="node.y + nodeHeight / 2" text-anchor="middle"
                        alignment-baseline="middle" font-family="Arial" font-size="12">
                        {{ node.label }}
                    </text>
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: "CompanyStructure",
    data() {
        return {
            svgWidth: 800,
            svgHeight: 600,
            nodeWidth: 120,
            nodeHeight: 50,
            nodes: [
                { id: 1, label: "Board", x: 340, y: 20 },
                { id: 2, label: "General Manager", x: 340, y: 100 },
                { id: 3, label: "Human Resource Manager", x: 60, y: 200 },
                { id: 4, label: "Design Manager", x: 240, y: 200 },
                { id: 5, label: "Operations Manager", x: 420, y: 200 },
                { id: 6, label: "Marketing Manager", x: 600, y: 200 },
                { id: 7, label: "Trainers", x: 20, y: 300 },
                { id: 8, label: "Recruiting Team", x: 60, y: 300 },
                { id: 9, label: "Finance Asst. Manager", x: 100, y: 300 },
                { id: 10, label: "Design Supervisor", x: 240, y: 300 },
                { id: 11, label: "Development Supervisor", x: 240, y: 350 },
                { id: 12, label: "Drafting Supervisor", x: 240, y: 400 },
                { id: 13, label: "Statistics Department", x: 420, y: 300 },
                { id: 14, label: "Logistics Department", x: 420, y: 350 },
                { id: 15, label: "Overseas Sales Manager", x: 600, y: 300 },
                { id: 16, label: "Petroleum Manager", x: 600, y: 350 },
                { id: 17, label: "Service Dept. Manager", x: 600, y: 400 },
                { id: 18, label: "Quality Control Dept.", x: 600, y: 450 },
            ],
            links: [
                { x1: 400, y1: 45, x2: 400, y2: 100 },
                { x1: 400, y1: 125, x2: 100, y2: 200 },
                { x1: 400, y1: 125, x2: 300, y2: 200 },
                { x1: 400, y1: 125, x2: 500, y2: 200 },
                { x1: 400, y1: 125, x2: 700, y2: 200 },
                { x1: 100, y1: 225, x2: 20, y2: 300 },
                { x1: 100, y1: 225, x2: 100, y2: 300 },
                { x1: 100, y1: 225, x2: 140, y2: 300 },
                { x1: 300, y1: 225, x2: 300, y2: 300 },
                { x1: 300, y1: 300, x2: 300, y2: 350 },
                { x1: 300, y1: 350, x2: 300, y2: 400 },
                { x1: 500, y1: 225, x2: 500, y2: 300 },
                { x1: 500, y1: 300, x2: 500, y2: 350 },
                { x1: 700, y1: 225, x2: 700, y2: 300 },
                { x1: 700, y1: 300, x2: 700, y2: 350 },
                { x1: 700, y1: 350, x2: 700, y2: 400 },
                { x1: 700, y1: 400, x2: 700, y2: 450 },
            ],
        };
    },
};
</script>

<style scoped>
#app {
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 20px;
}

.org-chart {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.org-svg {
    border: 1px solid #ccc;
    background-color: #f9f9f9;
}
</style>