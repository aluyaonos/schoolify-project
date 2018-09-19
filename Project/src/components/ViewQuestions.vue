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
                <tr v-for="(list, index) in questions" :key="list.id"><th scope="row">{{index + 1}}</th><td>{{list.question | ellipsis}}</td><td>{{list.course}}</td><td>{{list.priority}}</td></tr>
              </tbody>
            </table>
          </card-body>
        </card>
      </column>
    </row>
  </section>
</template>

<script>
import { Row, Column, Card, ViewWrapper, CardBody } from 'mdbvue'
import AddingQuestion from '@/services/AddingQuestion'
import _ from 'lodash'

export default {
  name: 'ViewQuestion',
  components: {
    Row,
    Column,
    Card,
    ViewWrapper,
    CardBody
  },
  data () {
    return {
      questions: null
    }
  },
  filters: {
    ellipsis (value) {
      return _.truncate(value, {
        'length': 30
      })
    }
  },
  async mounted () {
    this.questions = (await AddingQuestion.questionList()).data
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
