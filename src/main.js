import { createApp } from 'vue'
import { aliases, fa } from 'vuetify/iconsets/fa'
import {mdi} from "vuetify/lib/iconsets/mdi";
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
import '@fortawesome/fontawesome-free/css/all.css'

const vuetify = createVuetify({
    components, directives,
        theme: {
            defaultTheme: 'light'
        },
        icons: {
            defaultSet: 'fa',
            aliases,
            sets: {
                mdi,
                fa
            }
        },
        
    })
const app = createApp(App)
    app.use(router)
    app.mount('#app')
    app.use(vuetify)
