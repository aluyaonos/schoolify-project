<template>
  <section id="add-question">
    <v-wait for="overlay reload">
    <template slot="waiting">
    <div class="d-flex justify-content-center">
      <row class="mt-5">
        <column md="12" class="mt-5">
          <h2 class="h2-responsive mt-5 mb-5">Creating A blank slate ...</h2>
          <h4>The requested URL was not found on this server.</h4>
          <img alt="Error 404" class="img-fluid" height="20px" src="../assets/logo-mdb-vue-small.png"/>
          <h4>Error 404</h4>
        </column>
      </row>
    </div>
    </template>

    <v-wait for="overlay">
      <template slot="waiting">
    <div class="d-flex justify-content-center">
      <row class="mt-5">
        <column md="12" class="mt-5">
          <img alt="Error 404" class="img-fluid" height="20px" src="../assets/logo-mdb-vue-small.png"/>
          <h2 class="h2-responsive mt-5 mb-5">404. That's an error.</h2>
          <h4>The requested URL was not found on this server.</h4>
          <h4>Error 404</h4>
          <btn outline="success" rounded size="md" @click.native='created'>Add New
          </btn>
        </column>
      </row>
    </div>
    </template>
    <form>
    <row>
      <column md="4" class="mb-1">
        <card cascade narrow class="d-flex mb-5 side">
          <card-body>
            <view-wrapper>
            <h3 class="h3-responsive mt-2 text-center">Add Question</h3>
              <md-mask overlay="white-slight" waves/>
            </view-wrapper>
            <card-text>
            <row class="mt-4">
              <column md="12">

                <div class="form-group" :class="{ 'form-group--error': $v.course.$error }">
                <label class="typo__label">Select A Course</label>
                <multiselect class="form__input" v-model.trim="$v.course.$model" :options="courseTostrin" placeholder="Type to search" label="courseCode" track-by="courseCode" id="course" :loading="isLoading" :searchable="true" open-direction="bottom" :options-limit="10" :max-height="600" :hide-selected="true"></multiselect><!-- database -->
                </div>
                <span class="md-helper-text red-text" v-if="!$v.course.required && $v.course.$error">Please select a course</span>
              <!--  <div class="error orange-text" v-if="!$v.course.required && $v.course.$error">Choose a course</div> -->

              </column>
              </row>
            <row class="mt-3">
              <column md="12">
                     <md-field>
                        <label>Class Level</label>
                        <md-input  v-model.trim="classLevel" disabled />
                      <span class="md-helper-text blue-text" >Select a course first</span>
                      </md-field>
<!--               <div class="form-group" :class="{ 'form-group--error': $v.classLevel.$error }">
                <md-input label="Class" class="form__input" v-model.trim="$v.classLevel.$model"/>
                </div>
                <div class="error orange-text" v-if="!$v.classLevel.required && $v.classLevel.$error">Pick a class</div> -->
              </column>
              </row>
              <row class="mt-5 mb-2">
              <column col="12">

                <div class="form-group" :class="{ 'form-group--error': $v.priority.$error }">
                <label class="typo__label">Select Question Priority</label>
                <multiselect class="form__input" v-model.trim="$v.priority.$model" :options="options" placeholder="Select one" label="priority" track-by="priority" id="priority"></multiselect>
                </div>
                <span class="md-helper-text red-text" v-if="!$v.priority.required && $v.priority.$error">Please select a priority</span>

              </column>
              </row>
            </card-text>
          </card-body>
          <card-footer color="blue darken-1" class="lighten-3 p-1 text-center bottom-left">
            <p class="mt-2"><strong>Tip:</strong> Ensure the right question priority is set</p> <!-- maybe a tooltip too -->
          </card-footer>
        </card>
      </column>
      <column md="6">
        <section class="text-center pb-3">
          <row class="d-flex justify-content-center">
            <column col="12" class="mb-4">
              <card cascade narrow class="d-flex mb-2">
                <card-body class="mb-2">
                  <h3 class="h3-responsive mt-2 text-center blue-text">Enter Question Details</h3>
                  <card-text class="mb-0">
                    <row>
                    <column col="12" >

                  <md-field>
                    <label>Enter Question</label>
                    <md-textarea :rows="1" v-model.trim="$v.question.$model"/> <!-- database -->
                    <span class="md-helper-text red-text" v-if="!$v.question.required && $v.question.$error">Please enter a question</span>
                  </md-field>

                    </column>
                    </row>
                    <row>
                    <column col="12">
                    <h6>
                    Enter Available Answers
                    </h6>
                    <div class="form-group" :class="{ 'form-group--error': $v.answer.$error }">

                    <row>
                    <column md="6">
                      <md-field>
                        <label>Option 1</label>
                        <md-input  v-model.trim="answer1" />
                      <!--  <span class="md-helper-text red-text" v-if="!$v.question.required && $v.question.$error">Please enter a question</span> -->
                      </md-field>
                    </column>
                    <column md="6">
                      <md-field>
                        <label>Option 2</label>
                        <md-input v-model.trim="answer2" />
                      <!--  <span class="md-helper-text red-text" v-if="!$v.question.required && $v.question.$error">Please enter a question</span> -->
                      </md-field>
                    </column>
                    </row>
                    <row>
                    <column md="6">
                      <md-field>
                        <label>Option 3</label>
                        <md-input v-model.trim="answer3" />
                      <!--  <span class="md-helper-text red-text" v-if="!$v.question.required && $v.question.$error">Please enter a question</span> -->
                      </md-field>
                    </column>
                    <column md="6">
                      <md-field>
                        <label>Option 4</label>
                        <md-input v-model.trim="answer4" />
                      <!--  <span class="md-helper-text red-text" v-if="!$v.question.required && $v.question.$error">Please enter a question</span> -->
                      </md-field>
                    </column>
                    </row>
                    </div>

                    </column>
                    </row>
                  </card-text>
                </card-body>
                <card-footer color="blue darken-1" class="lighten-3 p-0 text-center">
                  <p class="mt-2">Questions can be found in the <strong>View Question</strong> menu <fa icon="bank" class="ml-1" /></p>
                </card-footer>
              </card>
            </column>
          </row>
        </section>
      </column>
      <column md="2">
        <section class="text-center pb-3">
          <row class="d-flex justify-content-center">
            <column col="12" class="mb-4">
              <card cascade narrow class="d-flex mb-2 top-right">
                <card-body>
                  <h3 class="h3-responsive mt-2 text-center blue-text">Select Answer</h3>
                  <card-text class="mt-4">
                    <row>
                    <column col="12">
                    <md-field>
                      <label for="answer">Select Answer</label>
                      <md-select v-model="answer" name="answer" id="answer">
                        <md-option value="answer1">{{answer1}}</md-option>
                        <md-option value="answer2">{{answer2}}</md-option>
                        <md-option value="answer3">{{answer3}}</md-option>
                        <md-option value="answer4">{{answer4}}</md-option>
                      </md-select>
                    </md-field>
                    </column>
                    </row>
                  </card-text>
                </card-body>
              </card>
            </column>
          </row>
          <row class="d-flex justify-content-center">
              <column col="12" class="mb-3">
                <card cascade narrow class="d-flex mb-5 bottom-right">
                  <card-body>
                  <div class="">
                <!--  <p class="typo__p green-text" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
                  <p class="typo__p red-text" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                  <p class="typo__p orange-text" v-if="submitStatus === 'PENDING'">Sending...</p> -->

                  <btn outline="success" rounded size="sm" @click.native.prevent="logger" :disabled="submitStatus === 'PENDING'">Logger</btn>
                  <btn outline="success" rounded size="md" @click.native.prevent="prepare" :disabled='$wait.is("post class")'>
                  <v-wait for='post class'>
                      <template slot="waiting">
                        Saving..
                      </template>
                      Save
                    </v-wait>
                    </btn>
                  <btn outline="danger" rounded size="sm" @click.native.prevent="resetter">Cancel</btn>
                  </div>
                  </card-body>
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
      selectedAnswer: null,
      course: null,
      answer: null,
      courseSelect: [],
      priority: null,
      options: [
        { priority: 'Priority 1' },
        { priority: 'Priority 2' }
      ],
      question: '',
      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
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
    },
    courseString () {
      return _.toString(this.courseSelected)
      // return _.filter(this.courseSelect, { 'courseCode': this.courseSelected })
      // return _.find(this.courseSelect, function (o) { return o.courseCode === (_.values(this.course)) })
    },
    courseTrimmed () {
      return _.trim(this.courseString, '"')
    },
    classLevel () {
      return _(this.courseSelect)
        .filter(c => c.courseCode === this.courseTrimmed)
        .map('classLevel')
        .value()
    },
    prioritySelected () {
      return _.values(this.priority)
    }
  },
  methods: {
    selectAnswer () {
      if (this.answer === 'answer1') {
        this.selectedAnswer = this.answer1
      } else if (this.answer === 'answer2') {
        this.selectedAnswer = this.answer2
      } else if (this.answer === 'answer4') {
        this.selectedAnswer = this.answer3
      } else if (this.answer === 'answer4') {
        this.selectedAnswer = this.answer4
      } else {
        this.selectedAnswer = null
      }
    },
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
          this.selectAnswer()
          await AddingQuestion.addQuestion({
            classLevel: this.classLevel,
            course: this.courseSelected,
            priority: this.prioritySelected,
            question: this.question,
            answer1: this.answer1,
            answer2: this.answer2,
            answer3: this.answer3,
            answer4: this.answer4,
            answer: _.trim((JSON.stringify(this.selectedAnswer, null, 2)), '/"')
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
    },
    logger () {
      this.selectAnswer()
      console.log(JSON.stringify(this.answer, null, 2))
      console.log(JSON.stringify(this.selectedAnswer, null, 2))
      console.log(JSON.stringify(this.findClass, null, 2))
    }
  }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.top-right {
  border-radius: 0 25px 0 2px
}
.bottom-right {
  border-radius: 2px 0 25px 0
}
.side {
  border-radius: 25px 0 0 25px
}
.bottom-left {
  border-radius: 0 2px 0 25px
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
