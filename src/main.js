import { createApp } from 'vue'
import App from './App.vue'

// libraries
import './index.css'
import Vuex from 'vuex' 
import AOS from 'aos'
import 'aos/dist/aos.css'
import VueGoodTablePlugin from 'vue-good-table-next';
import { QuillEditor } from '@vueup/vue-quill'
import Datepicker from '@vuepic/vue-datepicker';
import vSelect from 'vue-select'
import store from './store';
import router from './router';


// import the styles
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'vue-good-table-next/dist/vue-good-table-next.css'
import '@vuepic/vue-datepicker/dist/main.css'
import 'vue-select/dist/vue-select.css';

//declare var
let app;
app = createApp(App);


//calling libarry
app.use(Vuex);
app.use(router);
app.use(store);
app.use(AOS.init());
app.use(VueGoodTablePlugin)

// calling component
app.component('QuillEditor', QuillEditor)
app.component('Datepicker', Datepicker);
app.component('v-select', vSelect);

//execute
app.mount('#app');
