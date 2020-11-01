<template lang="pug">
  #verify.aa-container
    h1(class="aa-heading-1") Verify your email
    div(class="w-full mx-auto mt-6 text-left")
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
      a.btn.btn-md.block.mt-8.w-full(
          @click.stop.prevent="validateFields()"
        ) Proceed to Login
</template>

<script>
import {
  required,
  numeric,
  minLength,
} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      verify: '',
      notification: {
        verify: {
          empty: 'Please enter the verification code sent to your email',
          invalid: 'Invalid code',
          expired: 'The code have been expired. Request verification code again'
        }
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
  methods: {
    validateFields() {
      this.$v.$touch()
      this.storeDetails()
    },
    async storeDetails() {
      if (this.$v.$anyError === false) {
        await this.$store.dispatch('storeVerificationDetails', this.verify)
        .then((reply) => {
          if (reply) this.goToNextStep('login')
        })
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