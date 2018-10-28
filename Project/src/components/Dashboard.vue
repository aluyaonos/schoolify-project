<template>
  <section id="dashboard">
    <section class="mt-lg-2">
      <row class="mb-3">
        <column md="4" class="mb-r">
        <row>
        <column md="12">
          <card cascade class="cascading-admin-card top-left">
            <div class="admin-up">
              <img src="../assets/professor.png" alt="Professor" class="admin-img"/>
              <div class="admin-text">
                <h6>Hello,</h6>
                <h4>
                  <strong>Professor.</strong>
                </h4>
                <h6>How are you today?</h6>
              </div>
            </div>
            <card-body>
              <div style="display: block" class="mt-3">
                <h5><center>Check Class Performance</center></h5>
              </div>
              <div style="display: block">
                <md-input label="Select a class"/><!-- database -->
              </div>
            </card-body>
          </card>
        </column>
        </row>
        </column>
        <column md="5" class="mb-4">
          <card class="mb-4 mt-3 all-center">
            <card-header class="black">
              <h3 class="h3-responsive white-text">
               <strong><center>Attendance Monitor</center></strong>
              </h3>
            </card-header>
            <card-body>
              <div style="display: block">
                <line-chart :data="lineChartData" :options="lineChartOptions" :height="200"></line-chart>
              </div>
            </card-body>
          </card>
        </column>
        <column md="3" class="mb-4">
          <card class="mb-3 mt-3 top-right">
            <card-header class="white">
              <h3 class="h3-responsive black-text">
               <strong><center>Question Metrics</center></strong>
              </h3>
            </card-header >
            <card-body>
              <div style="display: block">
                <doughnut-chart :data="doughnutChartData" :options="doughnutChartOptions" :height="300"></doughnut-chart>
              </div>
            </card-body>
          </card>
        </column>
      </row>
    </section>
                                    <!-- Top Classes Section -->
    <section class="mb-5">
    <card class="mb-5 middle">
      <card-body class="cascading-admin-card">
      <row class="mb-5">
        <column col="12">
        <h4 class="mb-sm-0 pt-1">
          <center>Top Classes</center>
        </h4>
        </column>
      </row>
      <row>
        <column xl="4" md="6" class="mb-r">
          <card cascade narrow class="d-flex">
          <view-wrapper>
          <img src="@/assets/courses.jpg" alt="Project" class="img-fluid"/>
          <md-mask overlay="white-slight" waves/>
          </view-wrapper>
          <card-body>
          <card-title class="font-bold mb-3 mt-2 d-flex justify-content-center">
            <h4><strong>300 Level</strong></h4>
          </card-title>
          <card-text>
            <div class="d-flex justify-content-center">
            <h6>
            <strong>Total Students</strong>
            <badge pill color="red darken-1">130</badge>
            </h6>
            </div>
          </card-text>
          </card-body>
        </card>
        </column>
        <column xl="4" md="6" class="mb-r">
          <card cascade narrow class="d-flex">
          <view-wrapper>
          <img src="@/assets/courses.jpg" alt="Project" class="img-fluid"/>
          <md-mask overlay="white-slight" waves/>
          </view-wrapper>
          <card-body>
          <card-title class="font-bold mb-3 mt-2 d-flex justify-content-center">
            <h4><strong>200 Level</strong></h4>
          </card-title>
          <card-text>
            <div class="d-flex justify-content-center">
            <h6>
            <strong>Total Students</strong>
            <badge pill color="brown">174</badge>
            </h6>
            </div>
          </card-text>
          </card-body>
        </card>
        </column>
        <column xl="4" md="6" class="mb-r">
          <card cascade narrow class="d-flex">
          <view-wrapper>
          <img src="@/assets/courses.jpg" alt="Project" class="img-fluid"/>
          <md-mask overlay="white-slight" waves/>
          </view-wrapper>
          <card-body>
          <card-title class="font-bold mb-3 mt-2 d-flex justify-content-center">
            <h4><strong>100 Level</strong></h4>
          </card-title>
          <card-text>
            <div class="d-flex justify-content-center">
            <h6>
            <strong>Total Students</strong>
            <badge pill color="grey darken-4">220</badge>
            </h6>
            </div>
          </card-text>
          </card-body>
        </card>
        </column>
      </row>
      </card-body>
    </card>
    </section>
                                          <!-- Top Courses Section -->
    <section class="mb-2">
    <card class="mb-2 bottom">
      <card-body class="cascading-admin-card">
      <row class="mb-5">
        <column col="12">
        <h4 class="mb-sm-0 pt-1">
          <center>Top Courses</center>
        </h4>
        </column>
      </row>
      <row>
        <column xl="4" md="6" class="mb-r">
          <card cascade narrow class="d-flex">
          <view-wrapper>
          <img src="@/assets/courses.jpg" alt="Project" class="img-fluid"/>
          <md-mask overlay="white-slight" waves/>
          </view-wrapper>
          <card-body>
          <card-title class="font-bold mb-3 mt-2 d-flex justify-content-center">
            <h4><strong>CSC 400</strong></h4>
          </card-title>
          <card-text>
            <div class="d-flex justify-content-center">
            <h6 class="red-text">
            <strong>Lorem Ipsum</strong>
            </h6>
            </div>
          </card-text>
          </card-body>
        </card>
        </column>
        <column xl="4" md="6" class="mb-r">
          <card cascade narrow class="d-flex">
          <view-wrapper>
          <img src="@/assets/courses.jpg" alt="Project" class="img-fluid"/>
          <md-mask overlay="white-slight" waves/>
          </view-wrapper>
          <card-body>
          <card-title class="font-bold mb-3 mt-2 d-flex justify-content-center">
            <h4><strong>CSC 200</strong></h4>
          </card-title>
          <card-text>
            <div class="d-flex justify-content-center">
            <h6 class="brown-text">
            <strong>Lorem Ipsum</strong>
            </h6>
            </div>
          </card-text>
          </card-body>
        </card>
        </column>
        <column xl="4" md="6" class="mb-r">
          <card cascade narrow class="d-flex">
          <view-wrapper>
          <img src="@/assets/courses.jpg" alt="Project" class="img-fluid"/>
          <md-mask overlay="white-slight" waves/>
          </view-wrapper>
          <card-body>
          <card-title class="font-bold mb-3 mt-2 d-flex justify-content-center">
            <h4><strong>CSC 300</strong></h4>
          </card-title>
          <card-text>
            <div class="d-flex justify-content-center">
            <h6 class="black-text">
            <strong>Lorem Ipsum</strong>
            </h6>
            </div>
          </card-text>
          </card-body>
        </card>
        </column>
      </row>
      </card-body>
    </card>
    </section>
  </section>
</template>

<script>
import { Row, Column, Btn, Card, CardBody, CardHeader, ViewWrapper, MdMask, CardTitle, CardText, Fa, BarChart, PieChart, LineChart, RadarChart, DoughnutChart, ListGroup, ListGroupItem, Badge, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, MdInput } from 'mdbvue'

export default {
  name: 'Dashboard',
  components: {
    Row,
    Column,
    Btn,
    Card,
    CardBody,
    CardHeader,
    ViewWrapper,
    MdMask,
    CardTitle,
    CardText,
    Fa,
    BarChart,
    PieChart,
    LineChart,
    RadarChart,
    DoughnutChart,
    ListGroup,
    ListGroupItem,
    Badge,
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
    MdInput
  },
  data () {
    return {
      showFrameModalTop: false,
      showFrameModalBottom: false,
      showSideModalTopRight: false,
      showSideModalTopLeft: false,
      showSideModalBottomRight: false,
      showSideModalBottomLeft: false,
      showCentralModalSmall: false,
      showCentralModalMedium: false,
      showCentralModalLarge: false,
      showCentralModalFluid: false,
      showFluidModalRight: false,
      showFluidModalLeft: false,
      showFluidModalTop: false,
      showFluidModalBottom: false,
      barChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: '#1',
            data: [12, 39, 3, 50, 2, 32, 84],
            backgroundColor: 'rgba(245, 74, 85, 0.5)',
            borderWidth: 1
          }, {
            label: '#2',
            data: [56, 24, 5, 16, 45, 24, 8],
            backgroundColor: 'rgba(90, 173, 246, 0.5)',
            borderWidth: 1
          }, {
            label: '#3',
            data: [12, 25, 54, 3, 15, 44, 3],
            backgroundColor: 'rgba(245, 192, 50, 0.5)',
            borderWidth: 1
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            barPercentage: 1,
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      pieChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            data: [300, 50, 100, 40, 120, 24, 52],
            backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#ac64ad'],
            hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#da92db']
          }
        ]
      },
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      lineChartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'],
        datasets: [
          {
            label: 'Attendance Per-Class',
            backgroundColor: 'rgba(156, 39, 176, 0.7)',
            data: [100, 91, 121, 20, 70, 50, 81, 129, 30, 89, 90, 10]
          },
          {
            label: 'Total Students',
            backgroundColor: 'rgba(255, 152, 0, 0.7)',
            data: [129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129]
          }
        ]
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }]
        }
      },
      radarChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: '#1',
            backgroundColor: 'rgba(245, 74, 85, 0.5)',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: '#2',
            backgroundColor: 'rgba(90, 173, 246, 0.5)',
            data: [12, 42, 121, 56, 24, 12, 2]
          },
          {
            label: '#3',
            backgroundColor: 'rgba(245, 192, 50, 0.5)',
            data: [2, 123, 154, 76, 54, 23, 5]
          }
        ]
      },
      radarChartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      doughnutChartData: {
        labels: ['Priority One Questions', 'Priority Two Questions', 'Total Questions'],
        datasets: [
          {
            data: [80, 220, 300],
            backgroundColor: ['#5E35B1', '#D81B60', '#1C2A48'],
            hoverBackgroundColor: ['#311B92', '#880E4F', '#1C2331']
          }
        ]
      },
      doughnutChartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-left{
  border-radius: 2px 0 0 25px
}
.top-right{
  border-radius: 0 2px 28px 0
}
.all-center{
  border-radius: 2px
}
.middle{
  border-radius: 25px
}
.bottom{
  border-radius: 25px 25px 2px 2px
}
.admin-img{
  width: 40%;
  height: auto;
  border-radius: 100px;
  padding: 0.1rem;
  font-size: 2rem;
  color: #fff;
  text-align: left;
  margin-right: 1rem;
  border-radius: 100px;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2), 0 2px 13px 0 rgba(0, 0, 0, 0.19);
}
.cascading-admin-card .admin-up .admin-text{
  float: right;
  margin-top: 3.3rem;
  text-align: right;
}
.cascading-admin-card {
  margin: 20px 0;
}
.cascading-admin-card .admin-up {
  margin-left: 4%;
  margin-right: 4%;
  margin-top: -20px;
}
.cascading-admin-card .admin-up .fa {
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2), 0 2px 13px 0 rgba(0, 0, 0, 0.19);
}
.cascading-admin-card .admin-up .fa {
  padding: 1.7rem;
  font-size: 2rem;
  color: #fff;
  text-align: left;
  margin-right: 1rem;
  border-radius: 15px;
}
.cascading-admin-card .admin-up .data {
  float: right;
  margin-top: 2rem;
  text-align: right;
}
.admin-up .data p {
  color: #999999;
  font-size: 12px;
}
.classic-admin-card .card-body {
  color: #fff;
  margin-bottom: 0;
  padding: 0.9rem;
}
.classic-admin-card .card-body p {
  font-size: 13px;
  opacity: 0.7;
  margin-bottom: 0;
}
.classic-admin-card .card-body h4 {
  margin-top: 10px;
}
.classic-admin-card .card-body h4 {
  margin-top: 10px;
}
</style>
