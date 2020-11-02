import Vue from 'vue'
import Router from 'vue-router'

import Register from '../views/Register'
import Verify from '../views/Verify'
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: Register,
            name: 'register',
        },
        {
            path: '/verify',
            component: Verify,
            name: 'verify',
        },
        {
            path: '/login',
            component: Login,
            name: 'login',
        },
        {
            path: '/dashboard',
            component: Dashboard,
            name: 'dashboard',
        },
        {
           path: '*',
           name: 'catchAll',
           component: Register
        }
    ]
})

export default router