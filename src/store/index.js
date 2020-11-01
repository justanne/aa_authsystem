import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

Axios.defaults.headers.post['Accept'] = 'application/json'
Axios.defaults.headers.post['Content-Type'] = 'application/json'

const API_REGISTER_URL     = 'https://api.baseplate.appetiserdev.tech/api/v1/auth/register'
const API_VERIFY_EMAIL_URL = 'https://api.baseplate.appetiserdev.tech/api/v1/auth/verification/verify'
const API_LOGIN_URL        = 'https://api.baseplate.appetiserdev.tech/api/v1/auth/login'

const state = {
    register: {
        email: '',
        full_name: '',
        password: '',
        password_confirmation: '',
    },
    verify: {
        token: '',
        via: 'email',
    },
    login: {
        username: '',
        pwd: '',
    }
}

const getters = {}
const mutations = {
    storeRegistrationDetails(state, payload) {
        state.register.email                 = payload.email
        state.register.full_name             = payload.fname +' '+ payload.lname
        state.register.password              = payload.pwd
        state.register.password_confirmation = payload.pwdc
    },
    storeVerificationDetails(state, payload) {
        state.verify.token = payload
    }
}

const actions = {
    storeRegistrationDetails: ({ commit }, payload) => {
        return new Promise((resolve) => {
            commit('storeRegistrationDetails', payload)
            setTimeout(() => { resolve(1)  }, 1000)
        })
    },
    storeVerificationDetails: ({ commit }, payload) => {
        return new Promise((resolve) => {
            commit('storeVerificationDetails', payload)
            setTimeout(() => { resolve(1)  }, 1000)
        })
    },
    registerUser: ({ state }) => {
        return new Promise((resolve, reject) => {
            Axios.post(API_REGISTER_URL, state.register)
                .then(reply => {
                    console.log(reply)
                    resolve()
                })
                .catch(reply => {
                    console.error(reply)
                    reject()
                })
        })
    },
    verifyUser: ({ state }) => {
        return new Promise((resolve, reject) => {
            Axios.post(API_VERIFY_EMAIL_URL, state.verify)
                .then(reply => {
                    console.log(reply)
                    resolve()
                })
                .catch(reply => {
                    console.log(reply)
                    reject()
                })
        })
    },
    loginUser: ({ state }) => {
        return new Promise((resolve, reject) => {
            Axios.post(API_LOGIN_URL, state.login)
                .then(reply => {
                    console.log(reply)
                    resolve()
                })
                .catch(reply => {
                    console.log(reply)
                    reject()
                })
        })
    },
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})