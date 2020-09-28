import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
// import StringeePlugin from './components/StringeePlugin'

Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.use(StringeePlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)

})
