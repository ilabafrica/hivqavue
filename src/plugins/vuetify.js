import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
//import "../theme/default.styl"
Vue.use(Vuetify, {
  iconfont: 'mdiSvg',
  theme: {
  	primary: "#0D47A1",
    secondary: "#424242",
    accent: "#82B1FF",
  	success: '#3cd1c2',
  	info: '#ffaa2c',
  	error: '#f83e70',
    warning: "#FFC107"
  },
  customProperties: true
})
