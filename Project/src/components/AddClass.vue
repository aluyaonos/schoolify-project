<template>
  <section id="add-class">
  <form @submit.prevent="attending">

    <row>
      <column md="7" class="mb-1">
        <card cascade narrow class="d-flex mb-2 top-left">
          <card-body>
            <view-wrapper>
            <h3 class="h3-responsive mt-2 text-center">Add A New Class</h3>
              <md-mask overlay="white-slight" waves/>
            </view-wrapper>
            <card-text>
              <row class="mt-4 ">
              <column col="12">

             <div class="form-group" :class="{ 'form-group--error': $v.classLevel.$error }">
                <md-input label="Level" placeholder="Example. 100 Level" class="form__input" v-model.trim="$v.classLevel.$model"/> <!-- database -->
             </div>
              <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.classLevel.required && $v.classLevel.$error">Please enter a level</md-tooltip>
              <md-tooltip class="error white-text" md-direction="top" v-if="!$v.classLevel.minLength">Level must have at least {{$v.classLevel.$params.minLength.min}} letters</md-tooltip>
              <!-- <div class="error orange-text" v-if="!$v.classLevel.required && $v.classLevel.$error">Level is required</div>
              <div class="error orange-text" v-if="!$v.classLevel.minLength">Level must have at least {{$v.classLevel.$params.minLength.min}} letters.</div> -->

              </column>
              </row>
              <row class="mt-4 mb-2">
              <column col="12">

                <div class="form-group" :class="{ 'form-group--error': $v.studentNumber.$error }">
                <md-input placeholder="Total Number of Students" class="form__input" v-model.trim.lazy="$v.studentNumber.$model"></md-input>   <!-- database -->
                </div>
                <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.studentNumber.between">Must be between {{$v.studentNumber.$params.between.min}} and {{$v.studentNumber.$params.between.max}}</md-tooltip>
                <!-- <div class="error orange-text" v-if="!$v.studentNumber.between">Must be between {{$v.studentNumber.$params.between.min}} and {{$v.studentNumber.$params.between.max}}</div> -->

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
                  <h3 class="h3-responsive mt-2 text-center black-text">Course Represntative Contact Details</h3>
                  <card-text>
                    <row class="mt-4">
                    <column col="12" class="mb-1">

                    <div class="form-group" :class="{ 'form-group--error': $v.repName.$error }">
                    <md-input label="Full Name" class="form__input" v-model.trim="$v.repName.$model"/><!-- database -->
                    </div>
                    <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.repName.required && $v.repName.$error">Please enter a full name</md-tooltip>
                    <md-tooltip class="error white-text" md-direction="top" v-if="!$v.repName.minLength">Full Name must have at least {{$v.repName.$params.minLength.min}} letters.</md-tooltip>
                    <!-- <div class="error orange-text" v-if="!$v.repName.required && $v.repName.$error">Full Name is required</div> -->
                    <!-- <div class="error orange-text" v-if="!$v.repName.minLength">Full Name must have at least {{$v.repName.$params.minLength.min}} letters.</div> -->

                    </column>
                    </row>
                    <row>
                    <column col="12" class="mb-1">

                    <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
                    <md-input label="Email" class="form__input" v-model.trim="$v.email.$model"/><!-- database -->
                    </div>
                    <md-tooltip class="error white-text" :md-active.sync="tooltipActive" md-direction="top" v-if="!$v.email.required  && $v.email.$error">A valid email is required</md-tooltip>
                    <md-tooltip class="error white-text" md-direction="top" v-if="!$v.email.email">Please enter a valid email address</md-tooltip>
                    <!-- <div class="error orange-text" v-if="!$v.email.required  && $v.email.$error">A valid email is required</div> -->
                    <!-- <div class="error orange-text" v-if="!$v.email.email">Please enter a valid email address</div> -->
                    </column>
                    </row>

                    <row>
                    <column col= "12" class="mt-3 mb-3">
                     <!-- <p class="typo__p green-text" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
                      <p class="typo__p red-text" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                      <p class="typo__p orange-text" v-if="submitStatus === 'PENDING'">Sending...</p> -->

                      <btn outline="success" rounded size="md" @click.native.prevent="attending(); tooltipActive = !tooltipActive" :disabled="submitStatus === 'PENDING'">Save</btn>
                      <btn outline="danger" rounded size="md" @click.native.prevent="$v.$reset">Cancel</btn>
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
  </section>
</template>

<script>
import { Row, Column, Card, CardBody, ViewWrapper, MdMask, CardTitle, CardText, CardFooter, Fa, Btn, MdInput, NumericInput, MdTextarea } from 'mdbvue'
import { required, minLength, between, email } from 'vuelidate/lib/validators'
import AddingClass from '@/services/AddingClass'

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
    MdInput,
    NumericInput,
    MdTextarea
  },
  data () {
    return {
      classLevel: '',
      studentNumber: null,
      repName: '',
      email: '',
      tooltipActive: false,
      submitStatus: null
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
          await AddingClass.addClass({
            classLevel: this.classLevel,
            studentNumber: this.studentNumber,
            repName: this.repName,
            email: this.email
          })
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
          }, 500)
          console.log('submit!')
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}

</script>

<style scoped>
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
