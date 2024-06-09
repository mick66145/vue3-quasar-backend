import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import GlobalComponents from '@core/components'
import GlobalViewsComponents from './components/views'
import 'virtual:svg-icons-register'

// plugins
import { registerPlugins } from '@core/utils/plugins'
import { useRegisterSW } from 'virtual:pwa-register/vue'

// directive
import { registerDirective } from '@core/utils/directive'

// mock
import { setupProdMockServer } from '../server/mock'

import '@/styles/index.scss'

if (import.meta.env === 'development') { setupProdMockServer() }
useRegisterSW()
const app = createApp(App)
registerPlugins(app)
registerDirective(app)
app.use(createPinia())
app.use(router)
app.use(GlobalComponents)
app.use(GlobalViewsComponents)
app.mount('#app')
