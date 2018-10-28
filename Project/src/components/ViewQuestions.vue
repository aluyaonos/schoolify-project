<template>
  <section id="view-question">
    <row>
      <column md="12">
        <card cascade narrow class="mt-2">
          <view-wrapper class="gradient-card-header blue darken-2">
            <h4 class="h4-responsive text-white">View Questions</h4>
          </view-wrapper>
          <card-body>
            <h3 class="mt-2 mb-2 text-left"><strong>Available Questions:</strong></h3>
            <table class="table table-striped">
              <thead>
                <tr><th>#</th><th>Question</th><th>Course Code</th><th>Priority</th></tr>
              </thead>
              <tbody>
              <!-- <scroller :on-infinite="infinite" style="padding-top: 44px;"> -->
                <tr v-for="(list, index) in questions" :key="list.id"><th scope="row">{{index + 1}}</th><td>{{list.question | ellipsis}}<question-view :view="viewQuestions" :list="list"></question-view></td><td>{{list.course}}</td><td>{{list.priority}}</td></tr>
            <!--  </scroller> -->
              </tbody>
            </table>
          </card-body>
        </card>
      </column>
    </row>
  </section>
              <!--  <scroller :on-refresh="refresh"
                          :on-infinite="infinite"
                          style="padding-top: 44px;">
                  <div v-for="(item, index) in questions" :key="item.id" class="row" :class="{'grey-bg': index % 2 == 0}">
                    {{ item }}
                  </div>
                </scroller> -->
</template>

<script>
import { Row, Column, Card, ViewWrapper, CardBody } from 'mdbvue'
import AddingQuestion from '@/services/AddingQuestion'
import QuestionView from './attachments/ModalPopup/QuestionView'
import _ from 'lodash'

export default {
  name: 'ViewQuestion',
  components: {
    Row,
    Column,
    Card,
    ViewWrapper,
    CardBody,
    QuestionView
  },
  data () {
    return {
      questions: null,
      items: [],
      showFluidModalRight: false
    }
  },
  filters: {
    ellipsis (value) {
      return _.truncate(value, {
        'length': 30
      })
    }
  },
  methods: {
    viewQuestions () {
      this.showFluidModalRight = true
    },
    refresh (done) {
      var self = this
      setTimeout(function () {
        var start = self.top - 1
        for (var i = start; i > start - 10; i--) {
          self.items.splice(0, 0, this.questions[i])
        }
        self.top = self.top - 10
        done()
      }, 1500)
    },
    infinite (done) {
      var self = this
      setTimeout(function () {
        var start = self.bottom + 1
        for (var i = start; i < start + 10; i++) {
          self.items.push(this.questions[i])
        }
        self.bottom = self.bottom + 10
        done()
      }, 1500)
    }
  },
  async mounted () {
    this.questions = (await AddingQuestion.questionList()).data
    for (var i = 1; i <= 20; i++) {
      this.questions.push(this.questions[i])
    }
    this.top = 1
    this.bottom = 20
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
