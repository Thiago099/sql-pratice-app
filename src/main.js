import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue'
const app = createApp(App)

import http from './global/http.js'
app.mixin(http);

app.mount('#app')
