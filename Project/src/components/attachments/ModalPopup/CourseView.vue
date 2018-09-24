<template>
  <section id="course-view">
    <div class="text-center">
      <row>
        <column md="12">
          <btn outline="primary" size="sm" @click.native="showFluidModalRight = true">View</btn>
          <modal fullHeight position="right" v-if="showFluidModalRight" @close="showFluidModalRight = false">
            <modal-header>
              <modal-title>Modal title</modal-title>
            </modal-header>
            <modal-body>
            <row>
            <column col="12">
              <div class="form-group" :class="{ 'form-group--error': $v.classLevel.$error }">
                <md-input label="Level" class="form__input" v-model.trim="$v.classLevel.$model"/> <!-- database -->
             </div>
              <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.classLevel.required && $v.classLevel.$error">Please enter a level</md-tooltip>
              <md-tooltip class="error white-text" md-direction="top" v-if="!$v.classLevel.minLength">Level must have at least {{$v.classLevel.$params.minLength.min}} letters</md-tooltip>

              <div class="form-group" :class="{ 'form-group--error': $v.studentNumber.$error }">
                <md-input label="Total Students" class="form__input" v-model.trim="$v.studentNumber.$model"/>  <!-- database -->
              </div>
              <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.studentNumber.between">Must be between {{$v.studentNumber.$params.between.min}} and {{$v.studentNumber.$params.between.max}}</md-tooltip>

              <h6 class="h6-responsive mt-4 text-center blue-text">Course Represntative Contact Details</h6>

              <div class="form-group" :class="{ 'form-group--error': $v.repName.$error }">
                <md-input label="Full Name" class="form__input" v-model.trim="$v.repName.$model"/><!-- database -->
              </div>
              <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.repName.required && $v.repName.$error">Please enter a full name</md-tooltip>
              <md-tooltip class="error white-text" md-direction="top" v-if="!$v.repName.minLength">Full Name must have at least {{$v.repName.$params.minLength.min}} letters.</md-tooltip>

            <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
              <md-input label="Email" class="form__input" v-model.trim="$v.email.$model"/><!-- database -->
            </div>
            <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.email.required  && $v.email.$error">A valid email is required</md-tooltip>
            <md-tooltip class="error white-text" md-direction="top" v-if="!$v.email.email">Please enter a valid email address</md-tooltip>
            </column>
            </row>
            </modal-body>
            <modal-footer class="d-flex justify-content-center">
              <btn size="sm" color="secondary" @click.native="showFluidModalRight = false">Close</btn>
              <btn size="sm" color="blue" @click.native="logger">Edit</btn>
              <btn size="sm" color="primary" @click.native.prevent="update(); tooltipActive = !tooltipActive" :disabled="submitStatus === 'PENDING'">Save changes</btn>
            </modal-footer>
          </modal>
        </column>
      </row>
    </div>
  </section>
</template>

<script>
import { Row, Column, Btn, Card, CardBody, CardHeader, CardText, Fa, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, MdInput } from 'mdbvue'
import { required, minLength, between } from 'vuelidate/lib/validators'
import AddingCourse from '@/services/AddingCourse'

export default {
  name: 'ClassView',
  components: {
    Row,
    Column,
    Btn,
    Card,
    CardBody,
    CardHeader,
    CardText,
    Fa,
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
    MdInput
  },
  data () {
    return {
      title: '',
      courseCode: '',
      classLevel: null,
      timesAweek: null,
      contLecturers: null,
      description: '',
      tooltipActive: false,
      submitStatus: null
    }
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
  methods: {
    async update () {
      this.$v.$touch()
      try {
        console.log('submit!')
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          // submit logic here
          await AddingCourse.updateCourse(
            this.coursedata._id,
            {
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
  },
  props: ['showFluidModalRight', 'coursedata']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
