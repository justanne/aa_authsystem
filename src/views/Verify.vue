<template lang="pug">
  #verify.aa-container
    h1(class="aa-heading-1") Verify your email
    div(class="w-full mx-auto mt-6 text-left")
      small(
        v-if="notification.postErrorMsg"
        class="aa-notif-error inline-block w-full mb-4"
        v-text="notification.postErrorMsg"
      )
      label(for="vtoken" class="w-full") Verification code
        input(
          id="vtoken"
          type="tel"
          v-model="$v.verify.$model"
          :class="['textfield-md block my-2', { 'border-field-error' : $v.verify.$error }]"
          required
          autofocus
        )
        small(
          v-show="$v.verify.$error"
          class="aa-notif-error inline-block w-full"
          v-text="setNotificationMsg()"
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
  numeric,
  minLength,
} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      verify: '',
      btnCtaTextMsg: {
        default: 'Verify',
        status : 'Verifying code...'
      },
      notification: {
        verify: {
          empty  : 'Please enter the verification code sent to your email',
          invalid: 'Invalid format',
          expired: 'Verification failed. Request verification code again'
        },
        postErrorMsg: ''
      }
    }
  },
  validations: {
    verify: {
      required,
      numeric,
      minLength: minLength(5)
    }
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
      if (this.$v.$anyError === false && this.isStepBtnDisabled) {
        await this.$store.dispatch('storeVerificationDetails', this.verify)
        .then(reply => {
          if (reply) {
            this.notification.postErrorMsg = ''
            this.goToNextStep('login')
          }
        })
        .catch(error => {
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
    setNotificationMsg() {
      if (this.$v.verify.$model === '') {
        return this.notification.verify.empty
      }
      else if (this.$v.verify.$error) {
        return this.notification.verify.invalid
      }
    },
  },
}
</script>

<style>

</style>