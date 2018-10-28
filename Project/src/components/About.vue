<template>
  <section id="about">
      <row class="mb-3">
        <column md="4" class="mb-r">
        <row>
        <column md="12">
          <card cascade class="cascading-admin-card top-left">
            <div class="admin-up">
              <img src="../assets/professor.png" alt="Professor" class="admin-img"/>
              <div class="admin-text p-2">
                <h4 class="h4-responsive">
                  <strong>Prof. E. A. Onibere</strong>
                </h4>
                <h6 class="h6-responsive">Project Supervisor</h6>
              </div>
            </div>
          </card>
        </column>
        </row>
        </column>
        <column md="4" class="mb-0">
          <!-- space -->
        </column>
        <column md="4" class="mb-4">
        <column md="12">
          <card cascade class="cascading-admin-card top-left">
            <div class="admin-up">
              <div class="admin-text float-left p-2">
                <h4 class="h4-responsive ">
                  <strong>Onoriode Aluya</strong>
                </h4>
                <h6 class="h6-responsive">Project Student</h6>
              </div>
              <img src="../assets/student.jpg" alt="Professor" class="admin-img float-right"/>
            </div>
          </card>
        </column>
        </column>
      </row>
                                        <!-- About schoolify -->
    <card class="mb-3 middle">
      <card-body class="cascading-admin-card">
      <row class="mb-3">
        <column col="12">
        <h4 class="mb-sm-0 pt-1 blue-text">
          <center>About Schoolify</center>
        </h4>
        </column>
      </row>
      <row>
        <column md="12" class="mb-r mt-4">
          <center><h5 class="h5-responsive pl-5 pr-5 text-sm-center">
          Schoolify is a student project work developed by Onoriode Aluya
          under the supervision of Prof. E.A. Onibere. <br/>
          The project title "A web based question bank system" was
          transformed to schoolify for ease. <br/>
          &nbsp; <br/>
          Schoolify aims at optimizing the process taken by lecturers
          in preparing examination questions, <br/>
          each page has been built to ensure one or more functionality
          is met using up-to-date technologies and tools.
          </h5></center>
        </column>
      </row>
      </card-body>
    </card>
  </section>
</template>

<script>
import { Row, Column, Card, CardBody, ViewWrapper, MdMask, CardTitle, CardText, CardFooter, Fa, Btn } from 'mdbvue'

export default {
  name: 'About',
  components: {
    Row,
    Column,
    Card,
    CardBody,
    ViewWrapper,
    MdMask,
    CardTitle,
    CardText,
    CardFooter,
    Fa,
    Btn
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-left{
  border-radius: 50px
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
.card.card-cascade .view {
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15), 0 3px 12px 0 rgba(0, 0, 0, 0.15);
}
</style>
