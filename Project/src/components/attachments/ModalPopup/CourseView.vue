<template>
  <section id="course-view">
    <div class="text-center">
    <form>
      <row>
        <column md="12">
          <btn outline="primary" size="sm" @click.native="showFluidModalRight = true">View</btn>
          <modal fullHeight position="right" v-if="showFluidModalRight" @close="showFluidModalRight = false">
            <modal-header>
              <modal-title>View Course</modal-title>
            </modal-header>
            <modal-body>
            <row>
            <column col="12">
                  <md-field>
                    <label>Course Title</label>
                    <md-input v-model.trim="$v.title.$model"></md-input>
                    <span class="md-helper-text red-text" v-if="!$v.title.required && $v.title.$error">*Please enter a title</span>
                    <span class="md-helper-text red-text" v-if="!$v.title.minLength">*Course title must have at least {{$v.title.$params.minLength.min}} letters</span>
                  </md-field>

                  <md-field>
                    <label>Course Code</label>
                    <md-input placeholder="Example. CSC-400" v-model.trim="$v.courseCode.$model"></md-input>
                    <span class="md-helper-text red-text" v-if="!$v.courseCode.required && $v.courseCode.$error">*A course code is required</span>
                    <span class="md-helper-text red-text" v-if="!$v.courseCode.minLength">Course code must have at least {{$v.courseCode.$params.minLength.min}} letters</span>
                  </md-field>

                  <multiselect class="form__input" v-model.trim="$v.classLevel.$model" :options="classTostrin" placeholder="Type to search" label="classLevel" track-by="classLevel" id="classLevel" :loading="isLoading" :searchable="true" open-direction="bottom" :options-limit="10" :max-height="600" :hide-selected="true"></multiselect><!-- database -->

                    <row>
                    <column col="6">
                  <md-field>
                    <label>Participating Lectures</label>
                    <md-input v-model.trim="$v.contLecturers.$model"></md-input>
                    <span class="md-helper-text red-text" v-if="!$v.contLecturers.between">Must be between {{$v.contLecturers.$params.between.min}} and {{$v.contLecturers.$params.between.max}}</span>
                  </md-field>
                    </column>
                    <column col="6">
                  <md-field>
                    <label>Times A Week</label>
                    <md-input  v-model.trim="$v.timesAweek.$model"></md-input>
                    <span class="md-helper-text red-text" v-if="!$v.timesAweek.between">Must be between {{$v.timesAweek.$params.between.min}} and {{$v.timesAweek.$params.between.max}}</span>
                  </md-field>
                    </column>
                    </row>
                  <md-field>
                    <label>Course Description</label>
                    <md-textarea :rows="2"  v-model.trim="$v.description.$model"/>
                    <span class="md-helper-text red-text" v-if="!$v.description.required && $v.description.$error">Please describe the course</span>
                    <span class="md-helper-text red-text" v-if="!$v.description.minLength">Must have at least {{$v.description.$params.minLength.min}} letters</span>
                  </md-field>

            </column>
            </row>
            </modal-body>
            <modal-footer class="d-flex justify-content-center">
              <btn outline="danger" size="md" color="secondary" @click.native="showFluidModalRight = false">Close</btn>
              <btn type="submit" outline="success" rounded size="md" @click.native.prevent="update" :disabled='$wait.is("post class")'>
                <v-wait for='post class'>
                    <template slot="waiting">
                      Saving..
                    </template>
                    Save
                  </v-wait>
              </btn>
            </modal-footer>
          </modal>
        </column>
      </row>
    </form>
    </div>
  </section>
</template>

<script>
import { Row, Column, Btn, Card, CardBody, CardHeader, CardText, Fa, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'mdbvue'
import { required, minLength, between } from 'vuelidate/lib/validators'
import Multiselect from 'vue-multiselect'
import AddingCourse from '@/services/AddingCourse'
import AddingClass from '@/services/AddingClass'
import _ from 'lodash'

const mockData = ['a', 'b', 'c', 'd']

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
    Multiselect
  },
  data () {
    return {
      title: this.coursedata.title,
      courseCode: this.coursedata.courseCode,
      classLevel: this.coursedata.classLevel,
      classSelect: [],
      timesAweek: this.coursedata.timesAweek,
      contLecturers: this.coursedata.contLecturers,
      description: this.coursedata.description,
      submitStatus: null,
      myList: []
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
  async mounted () {
    this.isLoading = true
    this.classSelect = (await AddingClass.classList()).data
    this.isLoading = false
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
          this.$wait.start('post class')
          await AddingCourse.updateCourse({
            id: this.coursedata._id,
            title: this.title,
            courseCode: this.courseCode,
            classLevel: this.classSelected,
            timesAweek: this.timesAweek,
            contLecturers: this.contLecturers,
            description: this.description
          })
          this.myList = await new Promise(resolve => {
            setTimeout(() => resolve(mockData), 2000)
          })
          this.$wait.end('post class')
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>
