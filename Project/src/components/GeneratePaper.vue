<template>
  <section id="generate-paper">
    <section class="mb-5">
      <row class="mb-5">
        <column col="12">
        <h4 class="mb-sm-0 pt-1 blue-text">
          <center><strong>Generate Paper</strong></center>
        </h4>
        </column>
      </row>
      <row>
        <column col="12">
          <card class="mb-4 mt-1 all-center p-5">
            <card-body>
                <div class="form-group" :class="{ 'form-group--error': course }">
                <label class="typo__label">Select A Course</label>
                <multiselect class="form__input" v-model.trim="course" :options="courseTostrin" placeholder="Type to search" label="courseCode" track-by="courseCode" id="courseCode" :loading="isLoading" :searchable="true" open-direction="bottom" :options-limit="10" :max-height="600" :hide-selected="true"></multiselect><!-- database -->
                </div>
              <div style="display: block">
                <md-field>
                 <label>Number of Questions</label>
                  <md-input  v-model.trim="needQ" />
                </md-field>
                <center><btn outline="success" rounded size="md" @click.native.prevent="uniqueQuestion" :disabled='$wait.is("generate")'>
                <v-wait for='generate'>
                    <template slot="waiting">
                      Generating.. <img alt="loading" class="loader" src="../assets/infinity.svg"/>
                    </template>
                    Generate
                  </v-wait>
                  </btn></center>
              </div>
            </card-body>
          </card>
        </column>
      </row>
      <row>
        <column col="12">
          <card class="mb-4 mt-3 all-center p-5">
            <card-body>
            <v-wait for="overlay questions">
            <template slot="waiting">
            <div class="display: block">
              <!-- Display generated questions -->
              <div v-for = "(selQ, index) in selectedQ" :key = "selQ.id">
                <hr/> <center>
                <btn outline="success" rounded size="sm" @click.native.prevent="changeQuestion(index)">Change</btn>
                <div :id="'print'+index" class="page">
                <!-- style="page-break-before: always; page-break-after: always;" -->
                <p style="page-break-before: always; page-break-after: always;"> {{index+1}}. {{selQ.question}}
                </p>
                <p> [A]  {{selQ.answer1}}  [B]  {{selQ.answer2}}  [C]  {{selQ.answer3}}  [D]  {{selQ.answer4}}
                </p> </div> </center>
              </div>
              <center><btn outline="success" rounded size="md" @click.native.prevent="pdfexport()">Print</btn></center>
            </div>
            </template>

              <div style="display: block">
                <h2 class="grey-text">
                  <center>Awaiting The Questions</center>
                </h2>
                <center><img alt="loading" class="loader2" src="../assets/infinity.svg"/></center>
              </div>
            </v-wait>
            </card-body>
          </card>
        </column>
      </row>
    </section>
  </section>
</template>

<script>
import { Row, Column, Card, CardBody, ViewWrapper, MdMask, CardTitle, CardText, CardFooter, Fa, Btn } from 'mdbvue'
import _ from 'lodash'
import Multiselect from 'vue-multiselect'
import AddingCourse from '@/services/AddingCourse'
import AddingQuestion from '@/services/AddingQuestion'
import Jspdf from 'jspdf'
import JQuery from 'jquery'
// import SampleData from './SampleData.json'

const mockData = ['a', 'b', 'c', 'd']

export default {
  name: 'GeneratePaper',
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
    Multiselect
  },
  data () {
    return {
      arr: null, // holds the retrieved questions
      arr2: null, // replaces arr
      needQ: null, // collects the number of required questions
      qp1: null, // holds all questions with priority 1
      qp2: null, // holds all questions with priority 2
      reqQp1: null, // holds the required questions with priority 1
      reqQp2: null, // holds the required questions with priority 2
      sizeqp1: null, // returns the size of questions with priority 1
      forq2: null, // returns a value from subtracting needQ from sizeqp1 to determine the number of questions to be selected from qp2
      selectedQ: null, // holds all required questions
      arrnew: null, // holds the remaining objects that were not selected
      sizeArrnew: null, // holds the size of arrnew
      course: null,
      isLoading: false,
      courseSelect: [],
      questions: [],
      selectedQuestions: [],
      myList: [],
      me: null,
      output: null
    }
  },
  /* filters: {
    concatenation: function (arr) {
      return _.concat(arr, 2, [3], [[4]])
    }
  }, */
  async mounted () {
    this.isLoading = true
    this.courseSelect = (await AddingCourse.courseList()).data
    this.questions = (await AddingQuestion.questionList()).data
    this.isLoading = false
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
    },
    courseTrimmed () {
      return _.trim(this.courseString, '"')
    }
  },
  methods: {
    async uniqueQuestion () {
      this.generatePaper(this.courseTrimmed)
    },
    async generatePaper (uniqueCourse) {
      this.$wait.start('generate')
      this.created()
      this.checking = (await AddingQuestion.uniqueQuestion(uniqueCourse)).data
      this.arr2 = this.checking
      this.qp1 = _.filter(this.arr2, function (pars) {
        return pars.priority === 'Priority 1'
      })
      this.qp2 = _.filter(this.arr2, function (pars) {
        return pars.priority === 'Priority 2'
      })
      this.sizeqp1 = _.size(this.qp1)
      if (this.needQ === null) {
        console.log('Please enter some values na!!')
      }
      if (this.needQ <= this.sizeqp1) {
        this.selectedQ = _.sampleSize(this.qp1, this.needQ)
        this.arrnew = _.pullAllBy(this.arr2, this.selectedQ, '_id')
      }
      if (this.needQ > this.sizeqp1) {
        this.forq2 = this.needQ - this.sizeqp1
        this.reqQp1 = _.sampleSize(this.qp1, this.sizeqp1)
        this.reqQp2 = _.sampleSize(this.qp2, this.forq2)
        this.selectedQ = _.concat(this.reqQp1, this.reqQp2)
        this.arrnew = _.pullAllBy(this.arr2, this.selectedQ, '_id')
        this.selectedQ = _.shuffle(this.selectedQ)
      }
      console.log(JSON.stringify(this.checking, null, 2))
      console.log(JSON.stringify(this.arr2, null, 2))
      /* console.log(JSON.stringify(this.arr2, null, 2))
      console.log(JSON.stringify(this.qp1, null, 2))
      console.log(JSON.stringify(this.qp2, null, 2))
      console.log(JSON.stringify(this.sizeqp1, null, 2))
      console.log(JSON.stringify(this.forq2, null, 2))
      console.log(JSON.stringify(this.selectedQ, null, 2))
      console.log(JSON.stringify(this.arrnew, null, 2)) */
    },
    // Changing a generated question by its array index
    changeQuestion (index) {
      this.sizeArrnew = _.size(this.arrnew)
      if (this.sizeArrnew != null) {
        this.selectedQ.splice(index, 1, this.arrnew[0])
        this.arrnew = _.pullAllBy(this.arrnew, this.selectedQ, '_id')
        this.arrnew = _.shuffle(this.arrnew)
        // selectedQ is changing... now to save the contents in mongo
        console.log(JSON.stringify(this.selectedQ, null, 2))
      } else {
        console.log('Oga!! no more questions')
      }
    },
    async created () {
      this.myList = await new Promise(resolve => {
        setTimeout(() => resolve(mockData), 2000)
      })
      this.$wait.end('generate')
      this.$wait.start('overlay questions')
    },
    pdfexport () {
      let i = 0
      let $ = JQuery
      let doc = new Jspdf()
      let specialElementHandlers = {
        '#bypassme': function (element, renderer) {
          return true
        }
      }
      let margins = {
        top: 40,
        bottom: 60,
        left: 40,
        width: 522
      }
      for (i = 0; i < this.needQ; i++) {
        doc.fromHTML($('#print' + i).get(0), margins.left, margins.top, {
          'width': margins.width,
          'elementHandlers': specialElementHandlers
        })
      }
      doc.save(this.courseTrimmed + '.pdf')
      this.$wait.end('overlay questions')
      this.resetter()
    },
    resetter () {
      this.course = null
      this.needQ = null
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader {
  width: 12%;
  height: auto;
}
.loader2 {
  width: 12%;
  height: auto;
}
.full {
  height: 70vh;
}
.bad-gateway-row {
  margin: 0;
  position: absolute;
  top: 40%;
  left: 55%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.page {
  page-break-before: always;
  page-break-after: always;
}
</style>
