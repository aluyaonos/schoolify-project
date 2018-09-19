<template>
  <section id="add-question">
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
            <!--  <row class="mt-4">
              <column md="12">

                <div class="form-group" :class="{ 'form-group--error': $v.classLevel.$error }">
                <md-input label="Class" class="form__input" v-model.trim="$v.classLevel.$model"/>
                </div>
                <div class="error orange-text" v-if="!$v.classLevel.required && $v.classLevel.$error">Pick a class</div>

              </column>
              </row> -->
              <row class="mt-5">
              <column md="12">

                <div class="form-group" :class="{ 'form-group--error': $v.course.$error }">
                <label class="typo__label">Select A Course</label>
                <multiselect class="form__input" v-model.trim="$v.course.$model" :options="courseTostrin" placeholder="Type to search" label="courseCode" track-by="courseCode" id="course" :loading="isLoading" :searchable="true" open-direction="bottom" :options-limit="10" :max-height="600" :hide-selected="true"></multiselect><!-- database -->
                </div>
                <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.course.required && $v.course.$error">Please select a course</md-tooltip>
              <!--  <div class="error orange-text" v-if="!$v.course.required && $v.course.$error">Choose a course</div> -->

              </column>
              </row>
              <row class="mt-4 mb-4">
              <column col="12">

                <div class="form-group" :class="{ 'form-group--error': $v.priority.$error }">
                <label class="typo__label">Select Question Priority</label>
                <multiselect class="form__input" v-model.trim="$v.priority.$model" :options="options" placeholder="Select one" label="priority" track-by="priority" id="priority"></multiselect>
                </div>
                <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.priority.required && $v.priority.$error">Please select a priority</md-tooltip>
                <!-- <div class="error orange-text" v-if="!$v.priority.required && $v.priority.$error">A priority is required</div> -->

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

                    <div class="form-group" :class="{ 'form-group--error': $v.question.$error }">
                    <md-textarea :rows="1" label="Enter Question" class="form__input" v-model.trim="$v.question.$model"/> <!-- database -->
                    </div>
                    <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.question.required && $v.question.$error">Please enter a question</md-tooltip>
                    <!-- <div class="error orange-text" v-if="!$v.question.required && $v.question.$error">Enter a question</div> -->

                    </column>
                    </row>
                    <row>
                    <column col="12">
                    <h6>
                    Enter the options
                    </h6>
                    <div class="form-group" :class="{ 'form-group--error': $v.answer.$error }">

                    <row>
                    <column md="6">
                      <md-input label="Option 1" v-model="answer[0]" />
                    </column>
                    <column md="6">
                      <md-input label="Option 2" v-model="answer[1]"/>
                    </column>
                    </row>
                    <row>
                    <column md="6">
                      <md-input label="Option 3" v-model="answer[2]"/>
                    </column>
                    <column md="6">
                      <md-input label="Option 4" v-model="answer[3]"/>
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
                      <multiselect class="form__input" v-model="selectedAnswer" :options="answerList" placeholder="Type to search" label="ans" track-by="ans" id="ans" :searchable="true" open-direction="bottom" :options-limit="10" :max-height="600" :hide-selected="true"></multiselect><!-- database -->
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

                  <btn outline="success" rounded size="sm" @click.native.prevent="logger(); tooltipActive = !tooltipActive" :disabled="submitStatus === 'PENDING'">Save</btn>
                  <btn outline="danger" rounded size="sm" @click.native.prevent="$v.$reset">Cancel</btn>
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
  </section>
</template>

<script>
import { Row, Column, Card, CardBody, ViewWrapper, MdMask, CardTitle, CardText, CardFooter, Fa, Btn, MdInput, NumericInput, MdTextarea } from 'mdbvue'
import { required } from 'vuelidate/lib/validators'
import Multiselect from 'vue-multiselect'
import AddingCourse from '@/services/AddingCourse'
import AddingQuestion from '@/services/AddingQuestion'
import _ from 'lodash'

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
    MdInput,
    NumericInput,
    MdTextarea,
    Multiselect
  },
  data () {
    let answers = []
    return {
      classLevel: '',
      course: null,
      selectedAnswer: null,
      courseSelect: [],
      priority: null,
      options: [
        { priority: 'Priority 1' },
        { priority: 'Priority 2' }
      ],
      question: '',
      answer: answers,
      answerList: [ answers[0], answers[1], answers[2], answers[3] ],
      tooltipActive: false,
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
    // Picks only the course element from the ccourseSelect
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
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    logger () {
      console.log(JSON.stringify(this.answer, null, 2))
      console.log(JSON.stringify(this.answerList, null, 2))
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
