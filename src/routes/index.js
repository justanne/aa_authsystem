import Vue from 'vue'
import Router from 'vue-router'

import Register from '../views/Register'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Register,
            name: 'register',
        },
    ]
})

export default router