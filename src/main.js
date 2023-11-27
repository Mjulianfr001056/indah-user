import { createApp } from 'vue'
import {mdi} from "vuetify/iconsets/mdi";
import App from './App.vue'
// import './assets/css/input.css'
import router from './router'

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components, directives,
        theme: {
            defaultTheme: 'light'
        },
        icons: {
            defaultSet: 'mdi',
            sets: {
                mdi
            }
        },
        
    })
const app = createApp(App)
    app.use(router)
    app.mount('#app')
    app.use(vuetify)
