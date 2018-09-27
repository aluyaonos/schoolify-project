<template>
  <section id="question-view">
    <div class="text-center">
    <form>
      <row>
        <column md="12">
          <btn outline="primary" size="sm" @click.native="view">View</btn>
          <modal fullHeight position="right" v-if="showFluidModalRight" @close="showFluidModalRight = false">
            <modal-header>
              <modal-title>View Question</modal-title>
            </modal-header>
            <modal-body>
            <row>
            <column col="12">
                  <!-- <md-field>
                    <label>Course Title</label>
                    <md-input v-model.trim="$v.title.$model"></md-input>
                    <span class="md-helper-text red-text" v-if="!$v.title.required && $v.title.$error">*Please enter a title</span>
                    <span class="md-helper-text red-text" v-if="!$v.title.minLength">*Course title must have at least {{$v.title.$params.minLength.min}} letters</span>
                  </md-field> -->

            </column>
            </row>
            </modal-body>
            <modal-footer class="d-flex justify-content-center">
              <btn size="sm" color="secondary" @click.native="showFluidModalRight = false">Close</btn>
              <btn size="sm" color="blue" @click.native="logger">Edit</btn>
              <btn size="sm" color="primary" @click.native.prevent="update(); tooltipActive = !tooltipActive" :disabled="submitStatus === 'PENDING'">Save changes</btn>
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
import { Row, Column, Card, CardBody, ViewWrapper, MdMask, CardTitle, CardText, CardFooter, Fa, Btn, NumericInput } from 'mdbvue'
import { required } from 'vuelidate/lib/validators'
import Multiselect from 'vue-multiselect'
import AddingCourse from '@/services/AddingCourse'
import AddingQuestion from '@/services/AddingQuestion'
import _ from 'lodash'

const mockData = ['a', 'b', 'c', 'd']

export default {
  name: 'AddQuestion',
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
      course: null,
      selectedAnswer: null,
      courseSelect: [],
      priority: null,
      options: [
        { priority: 'Priority 1' },
        { priority: 'Priority 2' }
      ],
      question: '',
      ans1: null,
      ans2: null,
      ans3: null,
      ans4: null,
      answerList: [],
      myList: [],
      submitStatus: null
    }
  },
  async mounted () {
    this.isLoading = true
    this.courseSelect = (await AddingCourse.courseList()).data
    this.isLoading = false
  },
  validations: {
    classLevel: {
      required
    },
    course: {
      required
    },
    priority: {
      required
    },
    question: {
      required
    },
    answer: {
    }
  },
  computed: {
    // Picks only the course element from the courseSelect
    courseTostrin () {
      return _.map(this.courseSelect, _.partialRight(_.pick, ['courseCode']))
    },
    courseSelected () {
      return _.values(this.course)
    }
  },
  methods: {
    async prepare () {
      this.$v.$touch()
      try {
        console.log('submit!')
        this.$v.$touch()
        this.$wait.start('post class')
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
        //  submit logic here
          await AddingQuestion.addQuestion({
            classLevel: this.classLevel,
            course: this.courseSelected,
            priority: this.priority,
            question: this.question,
            answer: this.answer
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
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    resetter () {
      this.$v.$reset()
      this.classLevel = null
      this.studentNumber = null
      this.repName = null
      this.email = null
      this.submitStatus = null
      this.$v.$reset()
    },
    async created () {
      this.$wait.start('overlay reload')
      this.myList = await new Promise(resolve => {
        setTimeout(() => resolve(mockData), 5000)
      })
      location.reload()
      this.$wait.end('overlay reload')
    }
  },
  props: ['view', 'list']
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>
