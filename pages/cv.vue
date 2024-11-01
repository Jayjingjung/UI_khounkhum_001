<template>
    <div>
      <!-- Button to toggle CV visibility -->
      <v-btn class="rgb-glow-btn" @click="toggleCvProfile">
        <span class="cv-text">CV</span>
      </v-btn>
  
      <!-- CV Profile Card -->
      <v-btn style="margin-left: 10px;" color="ping" class="card-shadow" @click="print">
        <v-icon>mdi-printer</v-icon>ພີມລາຍງານທັງໝົດ
      </v-btn>
  
      <div style="display:none;">
        <div id="modalInvoice">
          <v-card height="100%" elevation="2" rounded="lg" width="900px"
            style="border: 1px solid rgba(191, 0, 0, 0.8);">
  
            <div style="display: flex; justify-content: space-evenly; align-items: start;margin-top: 50px;">
              <div>
  
                <!-- <img class="mx-auto" src="../assets/images/profile.jpeg" width="180" /> -->
              </div>
              <div>
  
                <div
                  style="display: flex; justify-content: center; align-items: start;margin-top: 20px; font-size: 30px; color: brown; font-weight: bold; font-family: 'Times New Roman', Times, serif;">
                  SOULIVANH NANTHAVONG
                </div>
  
                <div
                  style="display: flex; justify-content: center; align-items: start;margin-top: 20px;font-size:30px;color: brown;font-weight: bold;">
                  Front-end developer
                </div>
  
                <div
                  style="display: flex; justify-content: center; align-items: start;margin-top: 20px;font-size:17px;color: black;font-weight:300;">
  
                  <v-icon>
                    mdi-vuejs
  
                  </v-icon>
                  <div style="margin-right: 10px;">
                    02098295253
                  </div>
                  <v-icon>
                    mdi-email
  
                  </v-icon>
                  <div style="margin-right: 10px;">
  
                    Jayjingjung555.@gmail.com
                  </div>
                  <v-icon>
                    mdi-github
  
                  </v-icon>
                  <div style="margin-right: 10px;">
  
                    Jayjingjung
                  </div>
                </div>
  
                <div
                  style="width: 520px;;display: flex; justify-content: center; align-items: start;margin-top: 20px;font-size:17px;color: black;font-weight:300;">
                  Highly motivated and continuously seeking opportunities to expand my skill set, take on new challenges,
                  and
                  grow professionally. A dedicated team player with excellent organizational and interpersonal abilities,
                  always striving to contribute positively and take initiative in any environment.
                </div>
              </div>
            </div>
            <div
              style="display: flex; justify-content: center; align-items: start;margin-top: 30px;font-size:30px;color: brown;font-weight:bold;">
              EXPERIENCE
            </div>
  
            <div style="width: 900px;display: flex;justify-content: space-evenly; align-items: start; margin-top: 20px;">
              <div>
                2022-2023
              </div>
              <!-- <v-divider vertical></v-divider> -->
              <v-divider vertical :thickness="5" class="border-opacity-100" color="error"></v-divider>
              <div>
  
                <div style="width: 700PX;">
                  VILLAGE FOREST MANAGEMENT PROJECT
  
                </div>
                <div>
                  (ໂຄງການຄຸ້ມຄອງປ່າໄມຸ້ຂັ້ນບຸ້ານ)
                </div>
                <div style="width: 700PX;">
                  Developed and implemented a web application for the VFMP, using Next.js for the front-end, Node.js for
                  the
                  back-end, and Tailwind CSS to create a highly responsive and modern user interface. Collaborated closely
                  with the project team to ensure the application met user needs and aligned with project goals, resulting
                  in
                  improved forest management practices at the village level. </div>
              </div>
            </div>
  
            <div style="width: 900px;display: flex;justify-content: space-evenly; align-items: start; margin-top: 20px;">
              <div>
                2023-2024
              </div>
              <!-- <v-divider vertical></v-divider> -->
              <v-divider vertical :thickness="5" class="border-opacity-100" color="error"></v-divider>
              <div>
  
                <div style="width: 700PX;">
                  MOBILE APPLICATION AND WEBSITE VFMPP TRACKING LAOS
  
                </div>
                <div>
                  (ໂຄງການຄຸ້ມຄອງປ່າໄມຸ້ຂັ້ນບຸ້ານ)
                </div>
                <div style="width: 700PX;">
                  Designed and developed both a web and mobile application for the VFMPP Tracking system in Laos,
                  utilizing
                  Vue.js and Node.js for the web platform, and Flutter with Dart for the mobile application. Implemented
                  Vuetify and custom CSS to enhance the user interface, ensuring a responsive and visually consistent
                  design.
                  Collaborated with cross-functional teams to ensure seamless integration and functionality, improving
                  real-time tracking and forest management efficiency.
                </div>
              </div>
            </div>
  
  
            <div style="width: 900px;;display: flex;justify-content: space-evenly; align-items: start; margin-top: 20px;">
              <div>
                2024-2024
              </div>
              <!-- <v-divider vertical></v-divider> -->
              <v-divider vertical :thickness="5" class="border-opacity-100" color="error"></v-divider>
              <div>
  
                <div style="width: 700PX;">
                  LOGISTICS KHOUMKHUM
  
                </div>
                <div>
                  (ລະບົບຂົນສົ່ງ ບໍລິສັດ KHOUMKHUM)
                </div>
                <div style="width: 700PX;">
                  Developed a comprehensive web application for KHOUMKHUM Logistics, utilizing Vue.js for the front-end,
                  Java
                  for the back-end, and Vuetify for UI components. Implemented custom CSS to enhance design consistency
                  and
                  responsiveness, resulting in a more user-friendly and visually appealing platform that streamlined
                  logistics
                  operations and improved real-time shipment visibility. </div>
              </div>
            </div>
  
            <!-- <div style="display: flex;justify-content: space-evenly; align-items: start; margin-top: 20px;">
          <div>
            2024-2025
          </div>
          <v-divider vertical :thickness="5" class="border-opacity-100" color="error"></v-divider>
          <div>
  
            <div style="width: 700PX;">
              HR KHOUMKHUM
  
            </div>
            <div>
              (ລະບົບຂົນສົ່ງ ບໍລິສັດ KHOUMKHUM)
            </div>
            <div>
              Developed a web application for KHOUMKHUM Logistics Utilized vue.js and java
            </div>
          </div>
        </div> -->
  
            <!-- <div style="display: flex;justify-content: space-evenly; align-items: start; margin-top: 20px;">
          <div>
            2024-2025
          </div>
   
          <v-divider vertical :thickness="5" class="border-opacity-100" color="error"></v-divider>
          <div>
  
            <div style="width: 700PX;">
              BUNC KHOUMKHUM
  
            </div>
            <div>
              (ລະບົບ)
            </div>
            <div>
              Developed a web application for KHOUMKHUM Logistics Utilized vue.js and java
            </div>
          </div>
        </div> -->
  
  
  
            <div
              style="display: flex; justify-content: center; align-items: start;margin-top: 30px;font-size:30px;color: brown;font-weight:bold;">
              EDUCATION
            </div>
  
            <div style="display: flex;justify-content: space-evenly; align-items: start; margin-top: 20px;">
              <div>
                2019-2023
              </div>
              <!-- <v-divider vertical></v-divider> -->
              <v-divider vertical :thickness="5" class="border-opacity-100" color="error"></v-divider>
              <div>
  
                <div style="width: 700PX;">
                  The University of Laos
  
                </div>
                <div>
                  Bachelor of Computer Science
                </div>
  
              </div>
            </div>
  
            <div style="display: flex;justify-content: space-evenly; align-items: start; margin-top: 20px;">
              <div>
                2019-2021
              </div>
              <!-- <v-divider vertical></v-divider> -->
              <v-divider vertical :thickness="5" class="border-opacity-100" color="error"></v-divider>
              <div>
  
                <div style="width: 700PX;">
                  The Lao-American College
  
                </div>
                <div>
                  General English
                </div>
  
              </div>
            </div>
  
  
            <div style="display: flex;justify-content: space-evenly; align-items: start; margin-top: 20px;">
              <div>
                2024-2024
              </div>
              <!-- <v-divider vertical></v-divider> -->
              <v-divider vertical :thickness="5" class="border-opacity-100" color="error"></v-divider>
              <div>
  
                <div style="width: 700PX;">
                  Wall Start English
  
                </div>
                <div>
                  General English
                </div>
  
              </div>
            </div>
  
  
            <div style="display: flex;justify-content: space-evenly;">
              <div>
                <div style="margin-top: 30px;font-size:30px;color: brown;font-weight:bold;">
                  PROGRAMMING SKILLS
                </div>
                <div style="width: 400px;">
  
  
  
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      <spen style="font-weight: 600;">
                        Languages:
                      </spen>
                      JavaScript, CSS, HTML, Dart
                    </div>
                  </div>
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      <spen style="font-weight: 600;">
                        JavaScript Frameworks:
                      </spen>
                      React.js, Next.js, Vue.js
                    </div>
                  </div>
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      <spen style="font-weight: 600;">
                        CSS Libraries:
                      </spen>
                      Material UI, Tailwind CSS, Vuetify
                    </div>
                  </div>
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      <spen style="font-weight: 600;">
                        Mobile Development:
                      </spen>
                      Flutter
                    </div>
                  </div>
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      <spen style="font-weight: 600;">
                        UX/UI Design:
                      </spen>
                      Figma, Illustrator
                    </div>
                  </div>
  
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      <spen style="font-weight: 600;">
  
                        API Testing:
                      </spen>
                      Postman
                    </div>
                  </div>
  
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      <spen style="font-weight: 600;">
  
                        Content Management Systems:
                      </spen>
                      WordPress
                    </div>
                  </div>
  
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      <spen style="font-weight: 600;">
  
                        Version Control
                      </spen>
                      : GitHub
                    </div>
                  </div>
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      <spen style="font-weight: 600;">
  
                        Databases :
                      </spen>
                      MongoDB
                    </div>
                  </div>
  
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      <spen style="font-weight: 600;">
  
                        Tools and Technologies :
                      </spen>
                      Trello, Visual Code, Android Studio
                    </div>
                  </div>
  
  
  
  
                </div>
  
              </div>
  
              <div>
                <div style="margin-top: 30px;font-size:30px;color: brown;font-weight:bold;">
                  SOFT SKILLS
                </div>
                <div style="width: 300px;">
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      Communication
                    </div>
                  </div>
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      Adaptability
                    </div>
                  </div>
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      Collaboration
                    </div>
                  </div>
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      Management
                    </div>
                  </div>
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      Critical Thinking and Creativity
                    </div>
                  </div>
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      Emotional Intelligence
                    </div>
                  </div>
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      Positive Attitude
                    </div>
                  </div>
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      Analytical Thinking
                    </div>
                  </div>
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      Research Skills
                    </div>
                  </div>
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      Information Management
                    </div>
                  </div>
  
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      AI-assisted Problem Solving
                    </div>
                  </div>
                  <div style="display: flex;">
                    <div>
  
                    </div>
                    <div>
                      Work smart
                    </div>
                  </div>
  
                </div>
  
              </div>
            </div>
          </v-card>
        </div>
  
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showCvProfile: false, // Initially hidden
      };
    },
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
  
        window.location.href = '/invoice-list';
  
      },
      toggleCvProfile() {
        this.showCvProfile = !this.showCvProfile;
      },
    },
  };
  </script>
  
  <style scoped>
  .rgb-glow-btn {
    position: relative;
    display: inline-block;
    width: 70px;
    height: 70px;
    font-size: 25px;
    font-weight: bold;
    color: red;
    text-align: center;
    line-height: 70px;
    cursor: pointer;
    border: 1px solid rgba(191, 0, 0, 0.8);
    background-color: transparent;
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0);
  }
  
  /* RGB Glow effect on hover */
  .rgb-glow-btn:hover {
    background-color: #f80202;
    color: white;
    animation: rgbGlow 2s infinite alternate;
    border-color: transparent;
  }
  
  @keyframes rgbGlow {
    0% {
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.6),
        0 0 60px rgba(0, 255, 0, 0.4);
    }
  
    33% {
      box-shadow: 0 0 20px rgba(0, 230, 0, 0.8), 0 0 40px rgba(0, 230, 0, 0.6),
        0 0 60px rgba(0, 230, 0, 0.4);
    }
  
    66% {
      box-shadow: 0 0 20px rgba(0, 200, 0, 0.8), 0 0 40px rgba(0, 200, 0, 0.6),
        0 0 60px rgba(0, 200, 0, 0.4);
    }
  
    100% {
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.6),
        0 0 60px rgba(0, 255, 0, 0.4);
    }
  }
  
  .cv-text {
    font-weight: bold;
    color: red;
  }
  
  /* Hover text turns white */
  .rgb-glow-btn:hover .cv-text {
    color: white;
  }
  </style>
  