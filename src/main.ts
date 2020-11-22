import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import LayoutContainer from './components/layout/Container.vue'

const app = createApp(App)
app.use(store).use(router).mount('#app')
app.component('layout-container', LayoutContainer)
