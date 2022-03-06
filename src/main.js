import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import './global/main.css'
import App from './App.vue'
const app = createApp(App)

import http from './global/http.js'
app.mixin(http);

import router from './global/router'
app.use(router)

import global from './global/global.js'
app.mixin(global)

app.mount('#app')
