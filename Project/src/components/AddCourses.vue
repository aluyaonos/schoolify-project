<template>
  <section id="add-courses">
    <form>
    <row>
      <column md="7" class="mb-1">
        <card cascade narrow class="d-flex bottom-left mb-5">
          <card-body>
            <view-wrapper>
            <h3 class="h3-responsive mt-2 text-center">Add A New Course</h3>
              <md-mask overlay="white-slight" waves/>
            </view-wrapper>
            <card-text>
              <row class="mt-3">
              <column col="12">

                <div class="form-group" :class="{ 'form-group--error': $v.title.$error }">
                <md-input label="Course Title" class="form__input" v-model.trim="$v.title.$model"/><!-- database -->
                </div>
                  <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.title.required && $v.title.$error">Please enter a course title</md-tooltip>
                  <md-tooltip class="error white-text" md-direction="top" v-if="!$v.title.minLength">The course title must have at least {{$v.title.$params.minLength.min}} letters</md-tooltip>
                  <!-- <div class="error orange-text" v-if="!$v.title.required && $v.title.$error">Course title is required</div> -->
                  <!-- <div class="error orange-text" v-if="!$v.title.minLength">The course title must have at least {{$v.title.$params.minLength.min}} letters.</div> -->

              </column>
              </row>
              <row class="mt-4">
              <column md="6">

                <div class="form-group" :class="{ 'form-group--error': $v.courseCode.$error }">
                <md-input label="Course Code" placeholder="Example. CSC-400" class="form__input" v-model.trim="$v.courseCode.$model"/><!-- database -->
                </div>
                  <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.courseCode.required && $v.courseCode.$error">A course code is required</md-tooltip>
                  <md-tooltip class="error white-text" md-direction="top" v-if="!$v.courseCode.minLength">Course code must have at least {{$v.courseCode.$params.minLength.min}} letters</md-tooltip>
                  <!-- <div class="error orange-text" v-if="!$v.courseCode.required && $v.courseCode.$error">Course code is required</div> -->
                  <!-- <div class="error orange-text" v-if="!$v.courseCode.minLength">Course code must have at least {{$v.courseCode.$params.minLength.min}} letters.</div> -->

              </column>
              <column md="6">

                <div class="form-group" :class="{ 'form-group--error': $v.classLevel.$error }">
                <label class="typo__label">Select A Class Level</label>
                <multiselect class="form__input" v-model.trim="$v.classLevel.$model" :options="classTostrin" placeholder="Type to search" label="classLevel" track-by="classLevel" id="classLevel" :loading="isLoading" :searchable="true" open-direction="bottom" :options-limit="10" :max-height="600" :hide-selected="true"></multiselect><!-- database -->
                </div>
                  <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.classLevel.required && $v.classLevel.$error">Please select a level</md-tooltip>
                  <!-- <div class="error orange-text" v-if="!$v.classLevel.required && $v.classLevel.$error">Level is required</div> -->
              </column>
              </row>
              <row class="mt-4">
              <column md="6" class="mb-2">

               <div class="form-group" :class="{ 'form-group--error': $v.contLecturers.$error }">
                <md-input placeholder="Participating Lecturers" class="form__input" v-model.trim.lazy="$v.contLecturers.$model"></md-input> <!-- database (select field with binding to class db) -->
                </div>
                <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.contLecturers.between">Must be between {{$v.contLecturers.$params.between.min}} and {{$v.contLecturers.$params.between.max}}</md-tooltip>
                <!-- <div class="error orange-text" v-if="!$v.contLecturers.between">Must be between {{$v.contLecturers.$params.between.min}} and {{$v.contLecturers.$params.between.max}}</div> -->

              </column>
              <column md="6" class="mb-2">

                <div class="form-group" :class="{ 'form-group--error': $v.timesAweek.$error }">
                <md-input placeholder="Times A Week" class="form__input" v-model.trim.lazy="$v.timesAweek.$model"></md-input> <!-- database -->
                </div>
                <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.timesAweek.between">Must be between {{$v.timesAweek.$params.between.min}} and {{$v.timesAweek.$params.between.max}}</md-tooltip>
                <!-- <div class="error orange-text" v-if="!$v.timesAweek.between">Must be between {{$v.timesAweek.$params.between.min}} and {{$v.timesAweek.$params.between.max}}</div> -->

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

                   <div class="form-group" :class="{ 'form-group--error': $v.description.$error }">
                   <md-textarea :rows="2" label="Course description" class="form__input" v-model.trim="$v.description.$model"/>
                   </div>
                    <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.description.required && $v.description.$error">Please describe the course</md-tooltip>
                    <md-tooltip class="error white-text" md-direction="top" v-if="!$v.description.minLength">Must have at least {{$v.description.$params.minLength.min}} letters</md-tooltip>
                     <!-- <div class="error orange-text" v-if="!$v.description.required && $v.description.$error">A description is required</div> -->
                     <!-- <div class="error orange-text" v-if="!$v.description.minLength">Must have at least {{$v.description.$params.minLength.min}} letters.</div> -->

                  </card-text>
                </card-body>
              </card>
            </column>
          </row>
          <row class="d-flex justify-content-center">
            <column col="12" class="mb-3">
              <card cascade narrow class="d-flex mb-5">
                <card-body>

               <!-- <p class="typo__p green-text" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
                <p class="typo__p red-text" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                <p class="typo__p orange-text" v-if="submitStatus === 'PENDING'">Sending...</p> -->

                <btn outline="success" rounded size="md" @click.native.prevent="register(); tooltipActive = !tooltipActive" :disabled="submitStatus === 'PENDING'">Save</btn>
                <btn outline="danger" rounded size="md" @click.native.prevent="$v.$reset">Cancel</btn>
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
  </section>
</template>

<script>
import { Row, Column, Card, CardBody, ViewWrapper, MdMask, CardTitle, CardText, CardFooter, Fa, Btn, MdInput, NumericInput, MdTextarea } from 'mdbvue'
import { required, minLength, between } from 'vuelidate/lib/validators'
import Multiselect from 'vue-multiselect'
import AddingClass from '@/services/AddingClass'
import AddingCourse from '@/services/AddingCourse'
import _ from 'lodash'

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
    MdInput,
    NumericInput,
    MdTextarea,
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
      tooltipActive: false,
      isLoading: false
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
        console.log('submit!')
        this.$v.$touch()
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
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
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
