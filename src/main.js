import Vue from "vue";
import VueResizeText from 'vue-resize-text';
import App from "./App.vue";
import router from "./router";

//import css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/css/component-custom-switch.css";
import "./assets/css/style.css";

// import VueSimpleSpinner from 'vue-spinners'
// import "vue-spinners/dist/vue-spinners.css";

// Vue.use(VueSimpleSpinner);

Vue.config.productionTip = false;

Vue.use(VueResizeText);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

export const EventBus = new Vue();