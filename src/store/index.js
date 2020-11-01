import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

Axios.defaults.headers.post['Accept'] = 'application/json'
Axios.defaults.headers.post['Content-Type'] = 'application/json'

const state = {
    register: {
        email: '',
        full_name: '',
        password: '',
        password_confirmation: '',
    },
    verify: {
        token: '',
        via: '',
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
}

const actions = {
    storeRegistrationDetails: ({ commit }, payload) => {
        return new Promise((resolve) => {
            commit('storeRegistrationDetails', payload)
            setTimeout(() => { resolve(1)  }, 1000)
        })
    },
    registerUser: ({ state }) => {
        return new Promise((resolve, reject) => {
            Axios.post('https://api.baseplate.appetiserdev.tech/api/v1/auth/register', state.register)
                .then((reply) => {
                    console.log(reply)
                    resolve()
                })
                .catch((reply) => {
                    console.error(reply)
                    reject()
                })
        })
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})