<template>
  <section id="class-view">
    <div class="text-center">
      <row>
        <column md="12">
          <btn outline="primary" size="sm" @click.native="showFluidModalRight = true">View</btn>
          <modal fullHeight position="right" v-if="showFluidModalRight" @close="showFluidModalRight = false">
            <modal-header>
              <modal-title>View Class</modal-title>
            </modal-header>
            <modal-body>
            <row>
            <column col="12">
              <form @submit.prevent="updateClass">
                  <md-field>
                    <label>Class Level</label>
                    <md-input placeholder="Class Level (Example. 100 Level)" v-model.trim="$v.classLevel.$model"></md-input>
                    <span class="md-helper-text red-text" v-if="!$v.classLevel.required && $v.classLevel.$error">Please enter a level</span>
                    <span class="md-helper-text red-text" v-if="!$v.classLevel.minLength">Level must have at least {{$v.classLevel.$params.minLength.min}} letters</span>
                  </md-field>

                  <md-field>
                    <label>Student Number</label>
                    <md-input type="number" placeholder="Total Number of Students" v-model.trim.lazy="$v.studentNumber.$model"></md-input>
                    <span class="md-helper-text red-text" v-if="!$v.studentNumber.between">*Must be between {{$v.studentNumber.$params.between.min}} and {{$v.studentNumber.$params.between.max}}</span>
                  </md-field>

                  <h6 class="h6-responsive mt-2 text-center blue-text">Course Representative Contact Details</h6>

                    <md-field>
                      <label>Full Name</label>
                      <md-input v-model.trim="$v.repName.$model"></md-input>
                      <span class="md-helper-text red-text" v-if="!$v.repName.required && $v.repName.$error">*Please enter a full name</span>
                      <span class="md-helper-text red-text" v-if="!$v.repName.minLength">*Full Name must have at least {{$v.repName.$params.minLength.min}} letters</span>
                    </md-field>

                    <md-field>
                      <label>Email</label>
                      <md-input v-model.trim="$v.email.$model"></md-input>
                      <span class="md-helper-text red-text" v-if="!$v.email.required  && $v.email.$error">*A valid email is required</span>
                      <span class="md-helper-text red-text" v-if="!$v.email.email">*Please enter a valid email address</span>
                    </md-field>
            </form>
            </column>
            </row>
            </modal-body>
            <modal-footer class="d-flex justify-content-center">
              <btn size="sm" color="secondary" @click.native="showFluidModalRight = false">Close</btn>
              <btn size="sm" color="blue" @click.native="logger">Edit</btn>
              <btn size="sm" color="primary" @click.native.prevent="update" :disabled="submitStatus === 'PENDING'">Save changes</btn>
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
    </div>
  </section>
</template>

<script>
import { Row, Column, Btn, Card, CardBody, CardHeader, CardText, Fa, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'mdbvue'
import { required, minLength, between, email } from 'vuelidate/lib/validators'
import AddingClass from '@/services/AddingClass'

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
    ModalFooter
  },
  data () {
    return {
      classLevel: this.classdata.classLevel,
      studentNumber: this.classdata.studentNumber,
      repName: this.classdata.repName,
      email: this.classdata.email,
      submitStatus: null,
      myList: []
    }
  },
  validations: {
    classLevel: {
      required,
      minLength: minLength(6)
    },
    studentNumber: {
      between: between(1, 1000)
    },
    repName: {
      required,
      minLength: minLength(3)
    },
    email: {
      required,
      email
    }
  },
  methods: {
    async update () {
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.$v.$touch()
        //  submit logic here
        this.$wait.start('post class')
        await AddingClass.updateClass({
          id: this.classdata._id,
          classLevel: this.classLevel,
          studentNumber: this.studentNumber,
          repName: this.repName,
          email: this.email
        })
        this.myList = await new Promise(resolve => {
          setTimeout(() => resolve(mockData), 2000)
        })
        this.$wait.end('post class')
        // $emit and action to call on mount in class data
        console.log('submit!')
      }
    }
  },
  props: ['showFluidModalRight', 'classdata']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
