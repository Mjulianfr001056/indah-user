import { createApp } from 'vue'
import App from './App.vue'
// import './assets/css/input.css'
import router from './router'

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components, directives,
})

const app = createApp(App)
    app.use(router)
    app.mount('#app')
    app.use(vuetify)
