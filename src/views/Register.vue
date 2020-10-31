<template lang="pug">
  #register.aa-container
    h1(class="aa-heading-1") Register
      div(class="w-full mx-auto mt-6 text-left")
        Input-Field(
          label="Email"
          id="email"
          type="email"
        )
        div(class="w-full mb-4")
          label(for="fname" class="w-full") First name
            input(
              id="fname"
              type="text"
              v-model.lazy.trim="fname"
              class="textfield-md block my-2 mb-4"
            )
            small(
              v-show="$v.fname.$error"
              class="aa-notif-error inline-block w-full"
              v-text="notiftext"
            )
        div(class="w-full mb-4")
          label(for="lname" class="w-full") Last name
            input(
              id="lname"
              type="text"
              v-model.lazy.trim="lname"
              class="textfield-md block my-2 mb-4"
            )
            small(
              v-show="$v.lname.$error"
              class="aa-notif-error inline-block w-full"
              v-text="notiftext"
            )
        div(class="w-full mb-4")
          label(for="pwd" class="w-full") Password
            input(
              id="pwd"
              type="password"
              v-model.lazy.trim="pwd"
              class="textfield-md block my-2 mb-4"
            )
            small(
              v-show="$v.pwd.$error"
              class="aa-notif-error inline-block w-full"
              v-text="notiftext"
            )
        div(class="w-full mb-4")
          label(for="pwd-c" class="w-full") Confirm password
            input(
              id="pwd-c"
              type="password"
              v-model.lazy.trim="pwdc"
              class="textfield-md block my-2 mb-4"
            )
            small(
              v-show="$v.pwdc.$error"
              class="aa-notif-error inline-block w-full"
              v-text="notiftext"
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
} from 'vuelidate/lib/validators'

import InputField from '@/components/InputField'

export const alphaNumWhite = helpers.regex("alphaNumWhite", /^[a-zA-Z0-9\s]*$/)
export const alphaNumWhiteSym = helpers.regex("alphaNumWhiteSym", /^[a-zA-Z0-9!@#$%^&*()-+\s]*$/)

export default {
  data() {
    return {
      email: '',
      fname: '',
      lname: '',
      pwd: '',
      pwdc: '',
      notiftext: '',
    }
  },
  components: {
    InputField
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
      minLength: minLength(6),
    },
  },
  watch: {
    // email: function() {
    //   if (this.$v.email.$invalid) {
    //     this.notiftext = 'Please provide a valid email address'
    //   }
    //   if (this.$v.email.$model === '' && this.$v.email.$dirty) {
    //     this.notiftext = 'Email address is required'
    //   }
    // },
  },
  methods: {
  },
}
</script>