import Vue from 'vue'
import App from './App'

import utils from 'common/utils.js'
import { myRequest } from 'common/request.js'
Vue.prototype.$utils = utils
Vue.prototype.$myRuquest = myRequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
