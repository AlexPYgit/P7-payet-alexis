import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import moment from 'moment'

const app =  createApp(App).use(store).use(moment).use(router)

new WaveUI(app)

app.mount("#app");