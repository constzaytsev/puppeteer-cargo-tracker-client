import Vue from 'vue';
import VueRouter from 'vue-router';
import VeeValidate, { Validator } from 'vee-validate';
import VTooltip from 'v-tooltip';
import ru from '../node_modules/vee-validate/dist/locale/ru';
import App from './App.vue';
import './assets/styles.scss';

Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(VTooltip);

Validator.localize('ru', ru);
Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#tracker');
