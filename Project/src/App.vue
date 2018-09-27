<template>
  <div class="page-container md-layout-column">
    <md-toolbar>
    <!-- Might be needed (Main Show navigation)
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button> -->

      <div class="md-toolbar-section-end">
      <md-button class="md-icon-button md-raised" @click="showNavigation = true">
        <fa icon="navicon"/>
      </md-button>
      <!--  Might be needed (Side panel)
      <md-button class="md-icon-button md-primary" @click="showSidepanel = true">
        <fa icon="navicon" class="mr-1"/>
      </md-button>
       -->
      </div>
        <span class="md-title">Schoolify</span>
    </md-toolbar>

    <!-- Left navigation -->
    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Schoolify</span>
      </md-toolbar>

    <div class="full-control">
      <div class="list">
        <md-list :md-expand-single="expandSingle">

          <!-- Single Items -->
          <router-link to="/dashboard" @click.native="activeItem = 1">
            <md-list-item :action="true" :class="activeItem === 1 && 'active'">
              <fa icon="pie-chart" class="mr-4" />
              <span class="md-list-item-text">Dashboard</span>
            </md-list-item>
          </router-link>

          <router-link to="/profile" @click.native="activeItem = 2">
            <md-list-item :action="true" :class="activeItem === 2 && 'active'">
              <fa icon="user" class="mr-4" />
              <span class="md-list-item-text">Profile</span>
            </md-list-item>
          </router-link>
          <!-- /Single Items -->

          <!-- Accordion Items -->
          <md-list-item md-expand>
            <fa icon="graduation-cap" class="mr-4" />
              <span class="md-list-item-text">Class</span>
                <!-- /List group in accordion -->
                <md-list slot="md-expand">
                  <md-list-item>
                    <router-link to="/addclass" @click.native="activeItem = 3">
                    <md-list-item :action="true" :class="activeItem === 3 && 'active'">
                    Add Class</md-list-item>
                    </router-link>
                  </md-list-item>
                  <md-list-item>
                    <router-link to="/viewclass" @click.native="activeItem = 4">
                      <md-list-item :action="true" :class="activeItem === 4 && 'active'">
                      View Class</md-list-item>
                    </router-link>
                  </md-list-item>
                <!-- /List group in accordion -->

                </md-list>
          </md-list-item>

          <md-list-item md-expand>
            <fa icon="puzzle-piece" class="mr-4" />
            <span class="md-list-item-text">Courses</span>

            <!-- /List group in accordion -->
            <md-list slot="md-expand">
              <md-list-item>
                <router-link to="/addcourses" @click.native="activeItem = 5">
                  <md-list-item :action="true" :class="activeItem === 5 && 'active'">
                    Add Course</md-list-item>
                </router-link>
              </md-list-item>
              <md-list-item>
                <router-link to="/viewcourses" @click.native="activeItem = 6">
                  <md-list-item :action="true" :class="activeItem === 6 && 'active'">
                  View Courses</md-list-item>
                </router-link>
              </md-list-item>
            <!-- /List group in accordion -->
            </md-list>

          </md-list-item>
          <md-list-item md-expand>
            <fa icon="bank" class="mr-4" />
            <span class="md-list-item-text">Question Bank</span>

            <!-- /List group in accordion -->
            <md-list slot="md-expand">
              <md-list-item >
                <router-link to="/addquestion" @click.native="activeItem = 7">
                  <md-list-item :action="true" :class="activeItem === 7 && 'active'">
                    Add Question</md-list-item>
                </router-link>
              </md-list-item>
              <md-list-item >
                <router-link to="/viewquestions" @click.native="activeItem = 8">
                  <md-list-item :action="true" :class="activeItem === 8 && 'active'">
                    View Questions</md-list-item>
                </router-link>
              </md-list-item>
              <md-list-item >
                <router-link to="/generatepaper" @click.native="activeItem = 9">
                  <md-list-item :action="true" :class="activeItem === 9 && 'active'">
                    Generate Paper</md-list-item>
                </router-link>
              </md-list-item>
              <md-list-item >
                <router-link to="/questionvault" @click.native="activeItem = 10">
                  <md-list-item :action="true" :class="activeItem === 10 && 'active'">
                    Question Vault</md-list-item>
                </router-link>
              </md-list-item>
              <!-- /List group in accordion -->

            </md-list>
          </md-list-item>
          <!-- /Accordion Items -->

          <!-- Single Items Again -->
          <router-link to="/tables" @click.native="activeItem = 11">
            <md-list-item :action="true" :class="activeItem === 11 && 'active'">
              <fa icon="table" class="mr-4" />
              <span class="md-list-item-text">Tables</span>
            </md-list-item>
          </router-link>

          <router-link to="/maps" @click.native="activeItem = 12">
            <md-list-item :action="true" :class="activeItem === 12 && 'active'">
              <fa icon="map" class="mr-4" />
              <span class="md-list-item-text">Map</span>
            </md-list-item>
          </router-link>

          <router-link to="/404" @click.native="activeItem = 13">
            <md-list-item :action="true" :class="activeItem === 13 && 'active'">
              <fa icon="exclamation" class="mr-4" />
              <span class="md-list-item-text">404</span>
            </md-list-item>
          </router-link>
          <!-- Single Items Again -->

        </md-list>
      </div>
    </div>
    <!-- /Left navigation) -->
    </md-drawer>

  <!-- Sidepanel
    <md-drawer class="md-right" :md-active.sync="showSidepanel">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Favorites</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <span class="md-list-item-text">Abbey Christansen</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Alex Nelson</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Mary Johnson</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon>chat_bubble</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
    </md-drawer>
    -->

  <!-- Main Contents -->
    <md-content>
    <main>
      <div class="p-4">
        <router-view></router-view>
      </div>
      <ftr color="primary-color-dark" class="text-center font-small darken-2">
        <div class="pt-4">
          <btn outline="white" tag="a" href="https://mdbootstrap.com/getting-started/" target="_blank">Download MDB
            <fa icon="download" class="ml-2" />
          </btn>
          <btn outline="white" tag="a" href="https://mdbootstrap.com/bootstrap-tutorial/" target="_blank">Start free tutorial
            <fa icon="graduation-cap" class="ml-2" />
          </btn>
        </div>
        <hr class="my4" />
        <div class="pb-4">
          <a href="#">
            <fa icon="facebook" class="mr-3" />
          </a>
          <a href="#">
            <fa icon="twitter" class="mr-3" />
          </a>
          <a href="#">
            <fa icon="youtube" class="mr-3" />
          </a>
          <a href="#">
            <fa icon="google-plus" class="mr-3" />
          </a>
          <a href="#">
            <fa icon="dribbble" class="mr-3" />
          </a>
          <a href="#">
            <fa icon="pinterest" class="mr-3" />
          </a>
          <a href="#">
            <fa icon="github" class="mr-3" />
          </a>
          <a href="#">
            <fa icon="codepen" class="mr-3" />
          </a>
        </div>
        <p class="footer-copyright mb-0 py-3 text-center">
          &copy; {{new Date().getFullYear()}} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
        </p>
      </ftr>
    </main>
    </md-content>

  </div>
</template>

<script>
import { Collapse, Column, Row, Card, Container, Navbar, NavbarItem, NavbarNav, NavbarCollapse, Btn, Fa, CardBody, Footer, waves } from 'mdbvue'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'

export default {
  name: 'AdminTemplate',
  components: {
    Collapse,
    Column,
    Row,
    Card,
    Container,
    Navbar,
    NavbarItem,
    NavbarNav,
    NavbarCollapse,
    Btn,
    Fa,
    CardBody,
    'ftr': Footer,
    Dashboard,
    Profile
  },
  data () {
    return {
      activeItem: 1,
      active: 1,
      elHeight: 0,
      showNavigation: false,
      showSidepanel: false,
      expandSingle: true
    }
  },
  beforeMount () {
    this.activeItem = this.$route.matched[0].props.default.page
  },
  methods: {
    beforeEnter (el) {
      this.elHeight = el.scrollHeight
    },
    enter (el) {
      el.style.height = this.elHeight + 'px'
    },
    beforeLeave (el) {
      el.style.height = 0
    }
  },
  mixins: [waves]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  main {
    background-color: #EDEDEE;
  }
  .flexible-content {
    transition: padding-left 0.3s;
    padding-left: 270px;
  }
  .flexible-navbar {
    transition: padding-left 0.5s;
    padding-left: 270px;
    box-shadow: none;
    background-color: #EDEDEE;
  }
  .sidebar-fixed {
    left: 0;
    top: 0;
    height: 100vh;
    width: 270px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    z-index: 1050;
    background-color: #fff;
    padding: 1.5rem;
    padding-top: 0;
  }
  .sidebar-fixed .logo-wrapper img {
    width: 100%;
    padding: 2.5rem;
  }
  .sidebar-fixed .list-group-item {
    display: block !important;
    transition: background-color 0.3s;
  }
    .sidebar-fixed .list-group .active {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    border-radius: 5px;
  }
    .collapse-item {
    overflow: hidden;
    height: 0;
    padding: 0;
    transition: height .5s;
  }
  @media (max-width: 1199.98px) {
    .sidebar-fixed {
      display: none;
    }
    .flexible-content {
      padding-left: 0;
    }
    .flexible-navbar {
      padding-left: 10px;
    }
  }
</style>

<style>
  .navbar-light .navbar-brand {
    margin-left: 15px;
    color: #2196f3 !important;
    font-weight: bolder;
  }
</style>

<style lang="scss" scoped>
  .page-container {
    min-height: 300px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }
  .md-toolbar {
    box-shadow: none;
    background-color: #EDEDEE;
  }

   // Demo purposes only
  .md-drawer {
    width: 320px;
    max-width: calc(100vw - 125px);
  }

  $list-width: 220px;

  .md-drawer {
    width: $list-width;
    max-width: 100%;
  }

  .full-control {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
  }

  .list {
    width: $list-width;
  }

  .full-control > .md-list {
    width: $list-width;
    max-width: 100%;
    height: 400px;
    display: inline-block;
    overflow: auto;
    border: 1px solid rgba(#000, .12);
    vertical-align: top;
  }

  .control {
    min-width: 250px;
    display: flex;
    flex-direction: column;
    padding: 16px;
  }
</style>
