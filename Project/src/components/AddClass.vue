<template>
  <section id="add-class">
    <v-wait for="overlay reload">
    <template slot="waiting">
    <div class="d-flex justify-content-center">
      <row class="mt-3">
        <column md="12" class="mt-3">
          <center><img alt="Reloading" class="overlay" src="../assets/logo title.png"/></center>
          <center><h3 class="h3-responsive mt-5 mb-5">Creating A blank slate ...</h3></center>
        </column>
      </row>
    </div>
    </template>

    <v-wait for="overlay">
      <template slot="waiting">
    <div class="d-flex justify-content-center">
      <row class="mt-3">
        <column md="12" class="mt-3">
          <center><img alt="Saved" class="overlay" src="../assets/logo menu.png"/></center>
          <center><h5>Made with <img src="@/assets/heart.gif" alt="Love" class="heart"/> by Vue</h5></center>
          <center><h4 class="mt-5">Do you want to add a new class ?</h4><btn class="mb-5" outline="success" rounded size="md" @click.native='created'>Add New
          </btn></center>
        </column>
      </row>
    </div>
    </template>
  <form @submit.prevent="attending">

    <row>
      <column md="7" class="mb-1">
        <card cascade narrow class="d-flex mb-2 top-left">
          <card-body>
            <view-wrapper>
            <h3 class="h3-responsive mt-2 text-center">Add Class</h3>
              <md-mask overlay="white-slight" waves/>
            </view-wrapper>
            <card-text>
              <row class="mt-4 ">
              <column col="12">

                  <md-field>
                    <label>Class Level</label>
                    <md-input placeholder="Class Level (Example. 100 Level)" v-model.trim="$v.classLevel.$model"></md-input>
                    <span class="md-helper-text red-text" v-if="!$v.classLevel.required && $v.classLevel.$error">Please enter a level</span>
                    <span class="md-helper-text red-text" v-if="!$v.classLevel.minLength">Level must have at least {{$v.classLevel.$params.minLength.min}} letters</span>
                  </md-field>

              </column>
              </row>

              <row class="mt-4 mb-2">
              <column col="12">

                  <md-field>
                    <label>Student Number</label>
                    <md-input type="number" placeholder="Total Number of Students" v-model.trim.lazy="$v.studentNumber.$model"></md-input>
                    <span class="md-helper-text red-text" v-if="!$v.studentNumber.between">*Must be between {{$v.studentNumber.$params.between.min}} and {{$v.studentNumber.$params.between.max}}</span>
                  </md-field>

              </column>
              </row>
            </card-text>
          </card-body>
          <card-footer color="blue darken-1" class="lighten-3 p-1 text-center ">
            <p class="mt-2">Classes registered can be seen in the <strong>View Class</strong> menu <fa icon="graduation-cap" class="ml-1" /></p>
          </card-footer>
        </card>
      </column>
      <column md="5">
        <section class="text-center pb-3">
          <row class="d-flex justify-content-center">
            <column col="12" class="mb-4">
              <card cascade narrow class="d-flex mb-2 bottom-right">
                <card-body>
                  <h3 class="h3-responsive mt-2 text-center black-text">Course Representative Contact Details</h3>
                  <card-text>
                    <row class="mt-4">
                    <column col="12" class="mb-1">

                    <md-field>
                      <label>Full Name</label>
                      <md-input v-model.trim="$v.repName.$model"></md-input>
                      <span class="md-helper-text red-text" v-if="!$v.repName.required && $v.repName.$error">*Please enter a full name</span>
                      <span class="md-helper-text red-text" v-if="!$v.repName.minLength">*Full Name must have at least {{$v.repName.$params.minLength.min}} letters</span>
                    </md-field>

                    </column>
                    </row>
                    <row>
                    <column col="12" class="mb-1">

                    <md-field>
                      <label>Email</label>
                      <md-input v-model.trim="$v.email.$model"></md-input>
                      <span class="md-helper-text red-text" v-if="!$v.email.required  && $v.email.$error">*A valid email is required</span>
                      <span class="md-helper-text red-text" v-if="!$v.email.email">*Please enter a valid email address</span>
                    </md-field>

                    </column>
                    </row>

                    <row>
                    <column col= "12" class="mt-3 mb-3">
                     <!-- <p class="typo__p green-text" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
                      <p class="typo__p red-text" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                      <p class="typo__p orange-text" v-if="submitStatus === 'PENDING'">Sending...</p> -->

                      <btn outline="success" rounded size="md" @click.native.prevent="attending()" :disabled='$wait.is("post class")'>
                      <v-wait for='post class'>
                        <template slot="waiting">
                          Saving..
                        </template>
                        Save
                      </v-wait>
                      </btn>
                      <btn outline="danger" rounded size="md" @click.native.prevent="$v.$reset; resetter()">Clear</btn>
                    </column>
                    </row>

                  </card-text>
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

    <btn outline="danger" rounded size="md" @click.native.prevent='load' :disabled='$wait.is("my list is to load")'>
  <v-wait for='my list is to load'>
    <template slot="waiting">
      loading list..
    </template>
    Load list again.
  </v-wait>
    </btn>
  </v-wait>

    </v-wait>
  </section>
</template>

<script>
import { Row, Column, Card, CardBody, ViewWrapper, MdMask, CardTitle, CardText, CardFooter, Fa, Btn, NumericInput, MdTextarea } from 'mdbvue'
import { required, minLength, between, email } from 'vuelidate/lib/validators'
import AddingClass from '@/services/AddingClass'

const mockData = ['a', 'b', 'c', 'd']

export default {
  name: 'AddClass',
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
    MdTextarea
  },
  data () {
    return {
      classLevel: '',
      studentNumber: null,
      repName: '',
      email: '',
      error: null,
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
    async attending () {
      this.$v.$touch()
      try {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          //  submit logic here
          this.$wait.start('post class')
          await AddingClass.addClass({
            classLevel: this.classLevel,
            studentNumber: this.studentNumber,
            repName: this.repName,
            email: this.email
          })
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
          }, 3000)
          this.myList = await new Promise(resolve => {
            setTimeout(() => resolve(mockData), 4000)
          })
          this.$wait.end('post class')
          this.$wait.start('overlay')
          this.resetter()
          console.log('submit!')
        }
      } catch (error) {
        this.error = error.response.data.error
        console.log(this.error)
      }
    },
    resetter () {
      this.$v.$reset()
      this.classLevel = null
      this.studentNumber = null
      this.repName = null
      this.email = null
      this.submitStatus = null
    },
    async load () {
      // start waiting
      this.$wait.start('my list is to load')

      this.myList = await new Promise(resolve => {
        setTimeout(() => resolve(mockData), 2000)
      })
      // stop waiting
      this.$wait.end('my list is to load')
      this.$wait.start('overlay')
    },
    async created () {
      this.$wait.end('overlay')
      this.$wait.start('overlay reload')
      this.myList = await new Promise(resolve => {
        setTimeout(() => resolve(this.$v.$reset()), 4000)
      })
      this.$wait.end('overlay reload')
    }
  }
}

</script>

<style scoped>
.heart{
  width: 4%;
  height: auto;
}
.overlay{
    width: 30%;
    height: auto;
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
.postload-img{
  width: 15%;
  height: auto;
  padding: 0.1rem;
  color: #fff;
  text-align: left;
  margin-right: 0.5rem;
  margin-left: 1.5rem;
  border-radius: 100px;
}
.top-left{
  border-radius: 25px 0 10px 10px
}
.bottom-right{
  border-radius: 0 0 25px 2px
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
