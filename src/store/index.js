import Axios from 'axios'
// import { reject } from 'core-js/fn/promise';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Axios.defaults.headers.post['Accept'] = 'application/json'
Axios.defaults.headers.post['Content-Type'] = 'application/json'

const API_REGISTER_URL     = 'https://api.baseplate.appetiserdev.tech/api/v1/auth/register'
const API_VERIFY_EMAIL_URL = 'https://api.baseplate.appetiserdev.tech/api/v1/auth/verification/verify'
const API_LOGIN_URL        = 'https://api.baseplate.appetiserdev.tech/api/v1/auth/login'

const state = {
    ui: {
        isStepBtnDisabled: false,
    },
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
        password: '',
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
    },
    storeLoginDetails(state, payload) {
        state.login = payload
    },
    enableStepBtn(state) {
        state.ui.isStepBtnDisabled = false
    },
    disableStepBtn(state) {
        state.ui.isStepBtnDisabled = true
    },
}

const actions = {
    storeRegistrationDetails: ({ commit, dispatch }, payload) => {
        return new Promise((resolve, reject) => {
            commit('storeRegistrationDetails', payload)

            dispatch('registerUser')
                .then(reply => {
                    console.log(reply)
                    commit('enableStepBtn')
                    resolve(1)
                })
                .catch(error => {
                    console.log(error)
                    commit('enableStepBtn')
                    reject(error)
                })
        })
    },
    storeVerificationDetails: ({ commit, dispatch }, payload) => {
        return new Promise((resolve, reject) => {
            commit('storeVerificationDetails', payload)
            dispatch('verifyUser')
                .then(reply => {
                    console.log(reply)
                    commit('enableStepBtn')
                    resolve(1)
                })
                .catch(error => {
                    console.log(error)
                    commit('enableStepBtn')
                    reject(error)
                })
        })
    },
    storeLoginDetails: ({ commit, dispatch }, payload) => {
        return new Promise((resolve, reject) => {
            commit('storeLoginDetails', payload)

            dispatch('loginUser')
            .then(reply => {
                console.log(reply)
                commit('enableStepBtn')
                resolve(1)
            })
            .catch(error => {
                console.log(error)
                commit('enableStepBtn')
                reject(error)
            })
        })
    },
    registerUser: () => {
        return new Promise((resolve, reject) => {
            let postRegisterDetails = JSON.stringify(state.register)

            Axios.post(API_REGISTER_URL, postRegisterDetails)
                .then(reply => {
                    console.log(reply.data.http_status)
                    resolve()
                })
                .catch(error => {
                    console.log(error.responseText)
                    reject(error)
                })
        })
    },
    verifyUser: ({ state }) => {
        return new Promise((resolve, reject) => {
            let postVerifyDetails = JSON.stringify(state.verify)

            Axios.post(API_VERIFY_EMAIL_URL, postVerifyDetails)
                .then(reply => {
                    console.log(reply)
                    resolve(reply)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })
    },
    loginUser: ({ state }) => {
        return new Promise((resolve, reject) => {
            let postLoginDetails = state.login

            Axios.post(API_LOGIN_URL, postLoginDetails)
                .then(reply => {
                    console.log(reply)
                    resolve(reply)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
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