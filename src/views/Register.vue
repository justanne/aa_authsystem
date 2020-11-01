<template lang="pug">
  #register.aa-container
    h1(class="aa-heading-1") Register
      div(class="w-full mx-auto mt-6 text-left")
        div(class="w-full mb-4")
          label(for="email" class="w-full") Email
            input(
              id="email"
              type="email"
              v-model.lazy.trim="$v.email.$model"
              :class="['textfield-md block my-2', { 'border-field-error' : $v.email.$error }]"
              required
              autofocus
            )
            small(
              v-show="$v.email.$error"
              class="aa-notif-error inline-block w-full"
              v-text="setNotificationMsg('email')"
            )
        div(class="w-full mb-4")
          label(for="fname" class="w-full") First name
            input(
              id="fname"
              type="text"
              v-model.lazy.trim="$v.fname.$model"
              :class="['textfield-md block my-2', { 'border-field-error' : $v.fname.$error }]"
              class="textfield-md block my-2"
              required
            )
            small(
              v-show="$v.fname.$error"
              class="aa-notif-error inline-block w-full"
              v-text="setNotificationMsg('fname')"
            )
        div(class="w-full mb-4")
          label(for="lname" class="w-full") Last name
            input(
              id="lname"
              type="text"
              v-model.lazy.trim="$v.lname.$model"
              :class="['textfield-md block my-2', { 'border-field-error' : $v.lname.$error }]"
              required
            )
            small(
              v-show="$v.lname.$error"
              class="aa-notif-error inline-block w-full"
              v-text="setNotificationMsg('lname')"
            )
        div(class="w-full mb-4")
          label(for="pwd" class="w-full") Password
            input(
              id="pwd"
              type="password"
              v-model.lazy.trim="$v.pwd.$model"
              :class="['textfield-md block my-2', { 'border-field-error' : $v.pwd.$error }]"
              required
            )
            small(
              v-show="$v.pwd.$error"
              class="aa-notif-error inline-block w-full"
              v-text="setNotificationMsg('pwd')"
            )
        div(class="w-full mb-4")
          label(for="pwd-c" class="w-full") Confirm password
            input(
              id="pwd-c"
              type="password"
              v-model.lazy.trim="$v.pwdc.$model"
              :class="['textfield-md block my-2', { 'border-field-error' : $v.pwdc.$error }]"
              required
            )
            small(
              v-show="$v.pwdc.$error"
              class="aa-notif-error inline-block w-full"
              v-text="setNotificationMsg('pwdc')"
            )
        a.btn.btn-md.block.mt-8.w-full(
          @click.stop.prevent="validateFields()"
        ) Register

</template>

<script>
import {
  helpers,
  required,
  email,
  minLength,
  sameAs,
} from 'vuelidate/lib/validators'

export const alphaNumWhite = helpers.regex("alphaNumWhite", /^[a-zA-Z0-9\s]*$/)
export const alphaNumWhiteSym = helpers.regex("alphaNumWhiteSym", /^[a-zA-Z0-9!@#$%^&*()-+\s]*$/)

export default {
  data() {
    return {
      register: {},
      email: '',
      fname: '',
      lname: '',
      pwd: '',
      pwdc: '',
      notification: {
        email: {
          empty: 'Email address is required',
          invalid: 'Please provide a valid email address',
        },
        fname: {
          empty: 'First name is required',
          invalid: 'Please provide your first name',
        },
        lname: {
          empty: 'Last name is required',
          invalid: 'Please provide your last name',
        },
        pwd  : {
          empty: 'Please nominate a password',
          minlength: 'Please provide at least 6 minimum characters',
          invalid: 'Some characters are not supported, please try again',
          unmatch: 'Password does not match',
        },
        pwdc : {
          empty: 'Please enter the password again to confirm',
          unmatch: 'Password does not match',
        },
      },
    }
  },
  components: {
  },
  mounted() {
  },
  validations: {
    email: {
      email,
      required
    },
    fname: {
      required,
      alphaNumWhite,
      minLength: minLength(3),
    },
    lname: {
      required,
      alphaNumWhite,
      minLength: minLength(3),
    },
    pwd: {
      required,
      alphaNumWhiteSym,
      minLength: minLength(6),
    },
    pwdc: {
      required,
      alphaNumWhiteSym,
      sameAsPassword: sameAs('pwd')
    },
  },
  watch: {
    email: function() { this.setNotificationMsg('email') },
    fname: function() { this.setNotificationMsg('fname') },
    lname: function() { this.setNotificationMsg('lname') },
    pwd  : function() { this.setNotificationMsg('pwd') },
    pwdc : function() { this.setNotificationMsg('pwdc') },
  },
  methods: {
    validateFields() {
      this.$v.$touch()
      this.storeDetails()
    },
    async storeDetails() {
      if (this.$v.$anyError === false) {
        this.register = {
          email: this.email,
          fname: this.fname,
          lname: this.lname,
          pwd  : this.pwd,
          pwdc : this.pwdc,
        }
        await this.$store.dispatch('storeRegistrationDetails', this.register)
          .then((reply) => {
            if (reply) this.goToNextStep('verify')
          })
      }
    },
    goToNextStep(page) {
      this.$router.push(page)
    },
    setNotificationMsg(field) {
      switch(field) {
        case 'email':
          if (this.$v.email.$model === '') {
            return this.notification.email.empty
          }
          else if (this.$v.email.$error) {
            return this.notification.email.invalid
          }
          break
        case 'fname':
          if (this.$v.fname.$model === '') {
            return this.notification.fname.empty
          }
          else if (this.$v.fname.$error) {
            return this.notification.fname.invalid
          }
          break
        case 'lname':
          if (this.$v.lname.$model === '') {
            return this.notification.lname.empty
          }
          else if (this.$v.lname.$error) {
            return this.notification.lname.invalid
          }
          break
        case 'pwd':
          if (this.$v.pwd.$model === '') {
            return this.notification.pwd.empty
          }
          else if (this.$v.pwd.minLength === false) {
            return this.notification.pwd.minlength
          }
          else if (this.$v.pwd.$error) {
            return this.notification.pwd.invalid
          }
          break
        case 'pwdc':
          if (this.$v.pwdc.$model === '') {
            return this.notification.pwdc.empty
          }
          else if (this.$v.pwdc.sameAsPassword === false) {
            return this.notification.pwdc.unmatch
          }
          else if (this.$v.pwdc.$error) {
            return this.notification.pwdc.invalid
          }
          break
      }
    },
  },
}
</script>