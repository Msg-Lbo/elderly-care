import App from './App'
import Vue from 'vue'

import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'

import myFunction from '@/common/js/index.js'
Vue.prototype.$fn = myFunction

import uView from "uni_modules/uview-ui";

Vue.use(uView);



// 引入uView对小程序分享的mixin封装
let mpShare = require('uni_modules/uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare)
// 引入vuex
import store from "@/store";
// 引入uView提供的对vuex的简写法文件
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

import api from '@/api/http.api.js'
Vue.prototype.$api = api

const app = new Vue({
	...App,
	store,
})

// http接口API抽离，免于写url或者一些固定的参数
require('@/api/http.interceptor.js')(app)

app.$mount()