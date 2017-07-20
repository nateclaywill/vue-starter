// ------------------------------------------------------------------------------
// app.js
//
// Bootstrap Vue application and render to page.
// ------------------------------------------------------------------------------

// Vue imports
import Vue from 'vue';
import VueRouter from 'vue-router';

// Vue components
import App from './App.vue';

// Import main routes for application
import { routes } from './routes';

// ------------------------------------------------------------------------------
// Setup Vue router
// ------------------------------------------------------------------------------

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes,
    base: '/app/'
});

// ------------------------------------------------------------------------------

// Create and render Vue application
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

// ------------------------------------------------------------------------------

