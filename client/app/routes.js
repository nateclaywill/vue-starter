// ------------------------------------------------------------------------------
// routes.js
//
// Setup global routes for Vue application.
// ------------------------------------------------------------------------------

// Vue components
import Home from './components/Home.vue';
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';

// ------------------------------------------------------------------------------

// Setup and export routes
export const routes = [
    { path: '/', component: Home },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login }
];

// ------------------------------------------------------------------------------

