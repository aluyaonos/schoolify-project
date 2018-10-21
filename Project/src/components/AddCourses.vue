<template>
  <section id="add-courses">
    <v-wait for="overlay reload">
    <template slot="waiting">
    <div class="d-flex justify-content-center">
      <row class="mt-3">
        <column md="12" class="mt-3">
          <center><img alt="Reloading" class="overlay" src="../assets/logo title.png"/></center>
          <center><h3 class="h3-responsive mt-5 mb-5">Creating A blank slate ...</h3></center>
        </column>
      </row>
    </div>
    </template>

    <v-wait for="overlay">
      <template slot="waiting">
    <div class="d-flex justify-content-center">
      <row class="mt-3">
        <column md="12" class="mt-3">
          <center><img alt="Saved" class="overlay" src="../assets/logo menu.png"/></center>
          <center><h5>Made with <img src="@/assets/heart.gif" alt="Love" class="heart"/> by Vue</h5></center>
          <center><h4 class="mt-5">Do you want to add a new course ?</h4><btn class="mb-5" outline="success" rounded size="md" @click.native='created'>Add New
          </btn></center>
        </column>
      </row>
    </div>
    </template>
    <form>
    <row class="mt-4">
      <column md="7" class="mb-1">
        <card cascade narrow class="d-flex bottom-left mb-2">
          <card-body>
            <view-wrapper>
            <h3 class="h3-responsive mt-2 text-center">Add Course</h3>
              <md-mask overlay="white-slight" waves/>
            </view-wrapper>
            <card-text>
              <row class="mt-4">
              <column col="12">

                  <md-field>
                    <label>Course Title</label>
                    <md-input v-model.trim="$v.title.$model"></md-input>
                    <span class="md-helper-text red-text" v-if="!$v.title.required && $v.title.$error">*Please enter a title</span>
                    <span class="md-helper-text red-text" v-if="!$v.title.minLength">*Course title must have at least {{$v.title.$params.minLength.min}} letters</span>
                  </md-field>

              </column>
              </row>
              <row class="mt-4">
              <column md="6">

                  <md-field>
                    <label>Course Code</label>
                    <md-input placeholder="Example. CSC-400" v-model.trim="$v.courseCode.$model"></md-input>
                    <span class="md-helper-text red-text" v-if="!$v.courseCode.required && $v.courseCode.$error">*A course code is required</span>
                    <span class="md-helper-text red-text" v-if="!$v.courseCode.minLength">Course code must have at least {{$v.courseCode.$params.minLength.min}} letters</span>
                  </md-field>

              </column>
              <column md="6">

                <div class="form-group" :class="{ 'form-group--error': $v.classLevel.$error }">
                <label class="typo__label">Select A Class Level</label>
                <multiselect class="form__input" v-model.trim="$v.classLevel.$model" :options="classTostrin" placeholder="Type to search" label="classLevel" track-by="classLevel" id="classLevel" :loading="isLoading" :searchable="true" open-direction="bottom" :options-limit="10" :max-height="600" :hide-selected="true"></multiselect><!-- database -->
                </div>
                <!--  <span class="md-helper-text red-text" v-if="!$v.classLevel.required && $v.classLevel.$error">*Please select a level</span> -->
              </column>
              </row>
              <row class="mt-4">
              <column md="6" class="mb-2">

                  <md-field>
                    <label>Participating Lectures</label>
                    <md-input type="number"  v-model.trim="$v.contLecturers.$model"></md-input>
                    <span class="md-helper-text red-text" v-if="!$v.contLecturers.between">Must be between {{$v.contLecturers.$params.between.min}} and {{$v.contLecturers.$params.between.max}}</span>
                  </md-field>

              </column>
              <column md="6" class="mb-2">

                  <md-field>
                    <label>Times A Week</label>
                    <md-input type="number"  v-model.trim="$v.timesAweek.$model"></md-input>
                    <span class="md-helper-text red-text" v-if="!$v.timesAweek.between">Must be between {{$v.timesAweek.$params.between.min}} and {{$v.timesAweek.$params.between.max}}</span>
                  </md-field>

              </column>
              </row>
            </card-text>
          </card-body>
          <card-footer color="blue darken-1" class="lighten-3 p-1 text-center bottom-left">
            <p class="mt-2">Saved courses can be viewed in the <strong>View Courses</strong> menu <fa icon="puzzle-piece" class="ml-1" /></p>
          </card-footer>
        </card>
      </column>
      <column md="5">
        <section class="text-center pb-3">
          <row class="d-flex justify-content-center">
            <column col="12" class="mb-4">
              <card cascade narrow class="d-flex top-right mb-5">
                <card-body>
                  <h3 class="h3-responsive mt-2 text-center blue-text">Describe the course in a sentence</h3>
                  <card-text>

                  <md-field>
                    <label>Course Description</label>
                    <md-textarea :rows="2"  v-model.trim="$v.description.$model"/>
                    <span class="md-helper-text red-text" v-if="!$v.description.required && $v.description.$error">Please describe the course</span>
                    <span class="md-helper-text red-text" v-if="!$v.description.minLength">Must have at least {{$v.description.$params.minLength.min}} letters</span>
                  </md-field>

                  </card-text>
                </card-body>
              </card>
            </column>
          </row>
          <row class="d-flex justify-content-center">
            <column col="12" class="mb-3 mt-3">
              <card cascade narrow class="d-flex mb-5">
                <card-body>

                      <btn outline="success" rounded size="md" @click.native.prevent="register" :disabled='$wait.is("post class")'>
                      <v-wait for='post class'>
                          <template slot="waiting">
                            Saving..
                          </template>
                          Save
                        </v-wait>
                      </btn>
                <btn outline="danger" rounded size="md" @click.native.prevent="resetter">Cancel</btn>
                </card-body>
                <card-footer color="blue darken-1" class="lighten-3 p-1 text-center">
                  <p class="mt-2">Complete course registration</p>
                </card-footer>
              </card>
            </column>
          </row>
        </section>
      </column>
    </row>
    <row>

    </row>
    </form>
  </v-wait>
  </v-wait>
  </section>
</template>

<script>
import { Row, Column, Card, CardBody, ViewWrapper, MdMask, CardTitle, CardText, CardFooter, Fa, Btn, NumericInput } from 'mdbvue'
import { required, minLength, between } from 'vuelidate/lib/validators'
import Multiselect from 'vue-multiselect'
import AddingClass from '@/services/AddingClass'
import AddingCourse from '@/services/AddingCourse'
import _ from 'lodash'

const mockData = ['a', 'b', 'c', 'd']

export default {
  name: 'AddCourses',
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
    NumericInput,
    Multiselect
  },
  data () {
    return {
      title: '',
      courseCode: '',
      classLevel: null,
      classSelect: [],
      timesAweek: null,
      contLecturers: null,
      description: '',
      submitStatus: null,
      isLoading: false,
      myList: []
    }
  },
  async mounted () {
    this.isLoading = true
    this.classSelect = (await AddingClass.classList()).data
    this.isLoading = false
  },
  validations: {
    title: {
      required,
      minLength: minLength(6)
    },
    courseCode: {
      required,
      minLength: minLength(6)
    },
    classLevel: {
      required
    },
    timesAweek: {
      between: between(1, 10)
    },
    contLecturers: {
      between: between(1, 10)
    },
    description: {
      required,
      minLength: minLength(30)
    }
  },
  computed: {
    // Picks only the class level element from the classSelect
    classTostrin () {
      return _.map(this.classSelect, _.partialRight(_.pick, ['classLevel']))
    },
    classSelected () {
      return _.values(this.classLevel)
    }
  },
  methods: {
    async register () {
      this.$v.$touch()
      try {
        this.$v.$touch()
        this.$wait.start('post class')
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          // submit logic here
          await AddingCourse.addCourse({
            title: this.title,
            courseCode: this.courseCode,
            classLevel: this.classSelected,
            timesAweek: this.timesAweek,
            contLecturers: this.contLecturers,
            description: this.description
          })
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
          }, 500)
          this.myList = await new Promise(resolve => {
            setTimeout(() => resolve(mockData), 3000)
          })
          this.$wait.end('post class')
          this.$wait.start('overlay')
          this.resetter()
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    resetter () {
      this.$v.$reset()
      this.title = ''
      this.courseCode = ''
      this.classLevel = null
      this.timesAweek = null
      this.contLecturers = null
      this.description = ''
      this.submitStatus = null
    },
    async created () {
      this.$wait.end('overlay')
      this.$wait.start('overlay reload')
      this.myList = await new Promise(resolve => {
        setTimeout(() => resolve(this.$v.$reset()), 4000)
      })
      this.$wait.end('overlay reload')
    }
  }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.heart{
  width: 4%;
  height: auto;
}
.overlay{
  width: 30%;
  height: auto;
  padding-top: 3rem;
  padding-bottom: 2rem;
}
.top-right {
  border-radius: 0 25px 0 2px
}
.bottom-left {
  border-radius: 0 0 5px 25px
}
.profile-card-footer {
  background-color: #F7F7F7 !important;
  padding: 1.25rem;
}
.card.card-cascade .view {
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15), 0 3px 12px 0 rgba(0, 0, 0, 0.15);
  background: linear-gradient(to right, #64b5f6,#1e88e5,#1565c0);
  color: white;
}
.card.card-cascade .h3 {
  color: white;
}
</style>
