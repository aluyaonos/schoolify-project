<template>
  <section id="view-course">
    <row>
      <column md="12">
        <card cascade narrow class="mt-2">
          <view-wrapper class="gradient-card-header blue darken-2">
            <h4 class="h4-responsive text-white"><strong>View Course</strong></h4>
          </view-wrapper>
          <card-body>
        <course-data>
        </course-data>
          </card-body>
        </card>
      </column>
    </row>
  </section>
</template>

<script>
import { Row, Column, Card, ViewWrapper, CardBody } from 'mdbvue'
import CourseData from './attachments/CardViews/CourseData'

export default {
  name: 'ViewCourse',
  components: {
    Row,
    Column,
    Card,
    ViewWrapper,
    CardBody,
    CourseData
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card.card-cascade .view.gradient-card-header {
  padding: 1rem 1rem;
  text-align: center;
}
.card.card-cascade h3,
.card.card-cascade h4 {
  margin-bottom: 0;
}
</style>
