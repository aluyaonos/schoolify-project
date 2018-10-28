<template>
  <section id="class-data">
        <div class="text-center pb-3">
          <div class="row" v-for="aclasses in groupedClasses" :key="aclasses._id">
          <div class="col-12 col-md-4" v-for="(aclass, index) in aclasses" :key="aclass._id">
              <card cascade narrow class="d-flex mb-1 mt-4">
                <view-wrapper>
                <img src="@/assets/class.jpg" alt="Project" class="img-fluid"/>
                <md-mask overlay="white-slight" waves/>
                </view-wrapper>
                <card-body>
                <card-title class="font-bold mb-3 mt-2">
                    <div class="p-2" @click.native="showFluidModalRight = true">
                      <strong>{{aclass.classLevel}}</strong>
                    </div>
                    <class-view :showFluidModalRight="showFluidModalRight" :key="aclass._id" :classdata="aclass">
                    </class-view>
                </card-title>
                <card-text>
                  <div class="d-flex justify-content-center">
                  <h6>
                  <strong>Total Students</strong>
                  <badge pill color="light-blue">{{aclass.studentNumber}}</badge>
                  </h6>
                  </div>
                  <div class="d-flex justify-content-center mt-3 blue-text">
                  <h6>
                  <strong>Course Rep Details</strong>
                  </h6>
                  </div>
                  <div class="d-flex justify-content-center">
                  <p>
                  <strong>{{aclass.repName}}</strong>
                  </p>
                  </div>
                  <div class="d-flex justify-content-center">
                  <p>
                  <strong>{{aclass.email}}</strong>
                  </p>
                  </div>
                </card-text>
                </card-body>
                <card-footer class="links-light profile-card-footer justify-content-center">
                  <span class="right">
                    <a class="p-2" @click="deleteClass(aclass._id, index)">
                      Delete
                    </a>
                  </span>
                </card-footer>
              </card>
          </div>
    </div>
    </div>
  </section>
</template>

<script>
import { Row, Column, Card, CardBody, ViewWrapper, MdMask, CardTitle, CardText, CardFooter, Fa, Btn, Badge } from 'mdbvue'
import _ from 'lodash'
import ClassView from '../ModalPopup/ClassView'
import AddingClass from '@/services/AddingClass'

export default {
  name: 'ClassData',
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
    Badge,
    ClassView
  },
  data () {
    return {
      showFluidModalRight: false,
      aclasses: null
    }
  },
  computed: {
    groupedClasses () {
      return _.chunk(this.aclasses, 3)
    }
  },
  async mounted () {
    try {
      this.aclasses = (await AddingClass.classList()).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async deleteClass (id, index) {
      console.log('touched')
      await AddingClass.deleteClass(id)
      this.aclasses.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile-card-footer {
  background-color: #F7F7F7 !important;
  padding: 1.25rem;
}
.card.card-cascade .view {
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15), 0 3px 12px 0 rgba(0, 0, 0, 0.15);
}
</style>
