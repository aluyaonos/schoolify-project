<template>
  <section id="generate-paper">
    <!-- not using filter {{arr | concatenation}} -->
    <input type="text" v-model="needQ" />
    <button type="submit" v-on:click="generatePaper">try</button>
      <div v-for = "(selQ, index) in selectedQ" :key = "selQ.id">
        <hr/> <p> <strong>Question Name :</strong> {{selQ.name}}  -  <strong>Question Priority :</strong> {{selQ.priority}}
        </p>
        <button type="submit" v-on:click="changeQuestion(index)">change</button>
      </div>
  </section>
</template>

<script>
import { Row, Column } from 'mdbvue'
import _ from 'lodash'
import SampleData from './SampleData.json'

export default {
  name: 'GeneratePaper',
  components: {
    Row,
    Column
  },
  data () {
    return {
      arr: SampleData, // holds the retrieved questions
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
      sizeArrnew: null // holds the size of arrnew
    }
  },
  /* filters: {
    concatenation: function (arr) {
      return _.concat(arr, 2, [3], [[4]])
    }
  }, */
  methods: {
    generatePaper () {
      this.arr2 = this.arr
      this.qp1 = _.filter(this.arr2, function (pars) {
        return pars.priority === '1'
      })
      this.qp2 = _.filter(this.arr2, function (pars) {
        return pars.priority === '2'
      })
      this.sizeqp1 = _.size(this.qp1)
      if (this.needQ === null) {
        console.log('Please enter some values na!!')
      }
      if (this.needQ <= this.sizeqp1) {
        this.selectedQ = _.sampleSize(this.qp1, this.needQ)
        this.arrnew = _.pullAllBy(this.arr2, this.selectedQ, 'id')
      }
      if (this.needQ > this.sizeqp1) {
        this.forq2 = this.needQ - this.sizeqp1
        this.reqQp1 = _.sampleSize(this.qp1, this.sizeqp1)
        this.reqQp2 = _.sampleSize(this.qp2, this.forq2)
        this.selectedQ = _.concat(this.reqQp1, this.reqQp2)
        this.arrnew = _.pullAllBy(this.arr2, this.selectedQ, 'id')
        this.selectedQ = _.shuffle(this.selectedQ)
      }
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
        this.arrnew = _.pullAllBy(this.arrnew, this.selectedQ, 'id')
        this.arrnew = _.shuffle(this.arrnew)
      } else {
        console.log('Oga!! no more questions')
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
