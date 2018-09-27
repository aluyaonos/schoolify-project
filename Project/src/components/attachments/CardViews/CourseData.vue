<template>
  <section id="course-data">
        <div class="text-center pb-3">
          <div class="row" v-for="courses in groupedCourses" :key="courses._id">
          <div class="col-12 col-md-4" v-for="course in courses" :key="course._id">
              <card cascade narrow class="d-flex mb-1 mt-4">
                <view-wrapper>
                <img src="@/assets/courses.jpg" alt="Project" class="img-fluid"/>
                <md-mask overlay="white-slight" waves/>
                </view-wrapper>
                <card-body>
                <card-title class="font-bold mb-3 mt-2">
                    <div class="p-2" @click.native="showFluidModalRight = true">
                      <strong>{{course.title}} - {{course.courseCode}}</strong>
                    </div>
                    <course-view :showFluidModalRight="showFluidModalRight" :key="course._id" :coursedata="course">
                    </course-view>
                </card-title>
                <card-text>
                  <div class="d-flex justify-content-center mt-4">
                  <h6>
                  <strong>Class</strong>
                  <badge pill color="light-blue">{{course.classLevel}}</badge>
                  </h6>
                  </div>
                  <div class="d-flex justify-content-center">
                  <h6>
                  <strong>Times a week</strong>
                  <badge pill color="light-blue">{{course.timesAweek}}</badge>
                  </h6>
                  </div>
                  <div class="d-flex justify-content-center">
                  <h6>
                  <strong>Participating Lecturers</strong>
                  <badge pill color="light-blue">{{course.contLecturers}}</badge>
                  </h6>
                  </div>
                </card-text>
                </card-body>
                <card-footer class="links-light profile-card-footer justify-content-center">
                  <span class="right">
                    <a class="p-2" @click="deleteCourse(course._id, index)">
                      Delete
                    </a>
                  </span>
                </card-footer>
              </card>
          </div>
    </div>
    </div>
  </section>
</template>

<script>
import { Row, Column, Card, CardBody, ViewWrapper, MdMask, CardTitle, CardText, CardFooter, Fa, Btn, Badge } from 'mdbvue'
import _ from 'lodash'
import CourseView from '../ModalPopup/CourseView'
import AddingCourse from '@/services/AddingCourse'

export default {
  name: 'CourseData',
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
    Btn,
    Badge,
    CourseView
  },
  data () {
    return {
      showFluidModalRight: false,
      courses: null
    }
  },
  computed: {
    groupedCourses () {
      return _.chunk(this.courses, 3)
    }
  },
  async mounted () {
    try {
      this.courses = (await AddingCourse.courseList()).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async deleteCourse (id, index) {
      await AddingCourse.deleteCourse(id)
      this.courses.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile-card-footer {
  background-color: #F7F7F7 !important;
  padding: 1.25rem;
}
.card.card-cascade .view {
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15), 0 3px 12px 0 rgba(0, 0, 0, 0.15);
}
</style>
