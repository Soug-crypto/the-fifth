import Vue from 'vue';
import App from './App.vue';
import router from "./router/index";
import BootstrapVue from 'bootstrap-vue';
import VueTouch from 'vue-touch';
import Trend from 'vuetrend';
import Toasted from 'vue-toasted';
import VueApexCharts from 'vue-apexcharts';
import store from './store';

import VueUploadMultipleImage from '../src/components/VueUploadMultipleImage'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import VueApollo from 'vue-apollo'


Vue.config.productionTip = false

Vue.use(VueApollo)

const apolloClient = new ApolloClient({
    link: createUploadLink({ uri: 'https://guarded-fortress.herokuapp.com' }),
    cache: new InMemoryCache()
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(BootstrapVue);
Vue.use(VueTouch);
Vue.use(Trend);
Vue.use(Toasted, {duration: 10000});
Vue.component('apexchart', VueApexCharts);

Vue.config.productionTip = false;

export const eventBus = new Vue()

if (document.querySelector('#my-strictly-unique-vue-upload-multiple-image')) {
    Vue.component('VueUploadMultipleImage', VueUploadMultipleImage);
}

new Vue({
  apolloProvider,
  router,
  // el: '#my-strictly-unique-vue-upload-multiple-image',
  store,
  render: h => h(App),
}).$mount('#app')