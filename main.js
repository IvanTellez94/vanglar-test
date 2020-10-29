import Vue from 'vue'
import firebase from 'firebase';
import App from './App.vue'
import router from './router'
import { rtdbPlugin as VueFire } from 'vuefire'
import VueGoogleCharts from 'vue-google-charts'

Vue.use(VueGoogleCharts)
Vue.use(VueFire)
Vue.config.productionTip = false

let app = '';

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            render: h => h(App)
        }).$mount('#app');
    }
});