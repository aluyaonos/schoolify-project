// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import VueWait from 'vue-wait'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'mdbvue/build/css/mdb.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vuelidate from 'vuelidate'
import Multiselect from 'vue-multiselect'
import VueScroller from 'vue-scroller'
import VueHtmlToPaper from 'vue-html-to-paper'
import _ from 'lodash'

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}

Vue.use(Multiselect)
Vue.use(VueMaterial)
Vue.use(Vuelidate)
Vue.use(VueWait)
Vue.use(_)
Vue.use(VueScroller)
Vue.use(VueHtmlToPaper, options)

Vue.use(VueGoogleMaps, {
  load: {
    libraries: 'places'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  wait: new VueWait({
    registerComponent: true,
    componentName: 'v-wait'
  })
})
