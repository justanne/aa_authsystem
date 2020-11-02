<template lang="pug">
  #login.aa-container
    h1(class="aa-heading-1") Login
    div(class="w-full mx-auto mt-6 text-left")
      small(
        v-if="notification.postErrorMsg"
        class="aa-notif-error inline-block w-full mb-4"
        v-text="notification.postErrorMsg"
      )
      div(class="w-full mb-4")
        label(for="loginemail" class="w-full") Email address
          input(
            id="loginemail"
            type="email"
            v-model.lazy.trim="$v.loginemail.$model"
            :class="['textfield-md block my-2', { 'border-field-error' : $v.loginemail.$error }]"
            required
            autofocus
          )
          small(
            v-show="$v.loginemail.$error"
            class="aa-notif-error inline-block w-full"
            v-text="setNotificationMsg('loginemail')"
          )
      div(class="w-full mb-4")
        label(for="loginpwd" class="w-full") Password
          input(
            id="loginpwd"
            type="password"
            v-model.lazy.trim="$v.loginpwd.$model"
            :class="['textfield-md block my-2', { 'border-field-error' : $v.loginpwd.$error }]"
            required
          )
          small(
            v-show="$v.loginpwd.$error"
            class="aa-notif-error inline-block w-full"
            v-text="setNotificationMsg('loginpwd')"
          )
      a(
        :class="['btn btn-md block mt-8 w-full', { 'btn-disabled' : isStepBtnDisabled }]"
        @click.stop.prevent="validateFields()"
      ) {{ btnCtaText() }}
</template>

<script>
import { mapState } from 'vuex'

import {
  required,
  email,
} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      logindetails: {},
      loginemail: '',
      loginpwd: '',
      postdata: {
        message: 'Invalid'
      },
      btnCtaTextMsg: {
        default: 'Login',
        status : 'Logging you in...'
      },
      notification: {
        loginemail: {
          empty      : 'Email address is required to log in',
          invalid    : 'Please provide a valid email address',
          postinvalid: 'Invalid credentials',
        },
        loginpwd: {
          empty      : 'Please input your password',
          postinvalid: 'Invalid credentials',
        },
        postErrorMsg: ''
      },
    }
  },
  validations: {
    loginemail: {
      required,
      email
    },
    loginpwd: {
      required,
    },
  },
  computed: {
    ...mapState({
      isStepBtnDisabled: state => state.ui.isStepBtnDisabled
    })
  },
  methods: {
    disableStepBtn() { this.$store.commit('disableStepBtn') },
    enableStepBtn()  { this.$store.commit('enableStepBtn')  },

    btnCtaText() {
      return (this.isStepBtnDisabled) ? this.btnCtaTextMsg.status : this.btnCtaTextMsg.default
    },
    validateFields() {
      this.disableStepBtn()
      this.$v.$touch()
      this.storeDetails()
    },
    async storeDetails() {
      if (this.$v.$anyError === false) {
        this.logindetails = {
          username: this.loginemail,
          password: this.loginpwd
        }
        await this.$store.dispatch('storeLoginDetails', this.logindetails)
          .then(reply => {
            this.notification.postErrorMsg = ''
            if (reply) this.goToNextStep('dashboard')
          })
          .catch(error => {
            console.log(error)
            this.notification.postErrorMsg = error
          })
      }
      else {
        this.enableStepBtn()
      }
    },
    goToNextStep(page) {
      this.$router.push(page)
    },
    setNotificationMsg(field) {
      if (field === 'loginemail') {
        if (this.$v.loginemail.$model === '') {
          return this.notification.loginemail.empty
        }
        else if (this.$v.loginemail.$error) {
          return this.notification.loginemail.invalid
        }
      }
      else if (field === 'loginpwd') {
        if (this.$v.loginpwd.$model === '') {
          return this.notification.loginpwd.empty
        }
      }
    },
  },
}
</script>

<style>

</style>