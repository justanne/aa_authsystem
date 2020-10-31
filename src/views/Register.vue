<template lang="pug">
  #register.aa-container
    h1(class="aa-heading-1") Register
      div(class="w-full mx-auto mt-6 text-left")
        div(class="w-full mb-4")
          label(for="email" class="w-full") Email
            input(
              id="email"
              type="email"
              v-model.lazy.trim="email"
              :class="['textfield-md block mt-2', {'border-field-error' : $v.email.$error} ]"
              @change="setEmail($event.target.value)"
            )
            small(
              v-if="$v.email.$error"
              class="aa-notif-error inline-block w-full"
              v-text="notiftext"
            )
        label(for="fname" class="w-full") First name
          input(
            id="fname"
            type="text"
            class="textfield-md block my-2 mb-4"
          )
        label(for="lname" class="w-full") Last name
          input(
            id="lname"
            type="text"
            class="textfield-md block my-2 mb-4"
          )
        label(for="pwd" class="w-full") Password
          input(
            id="pwd"
            type="password"
            class="textfield-md block my-2 mb-4"
          )
        label(for="pwd-c" class="w-full") Confirm password
          input(
            id="pwd-c"
            type="password"
            class="textfield-md block my-2 mb-4"
          )
        a.btn.btn-md.block.mt-8.w-full(
          @click.stop.prevent="validateFields()"
        ) Register
        //- router-link(to="verify" class="btn btn-md block mt-8 w-full") Register

</template>

<script>
import {
  required,
  email,
} from 'vuelidate/lib/validators'

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
  mounted() {
  },
  validations: {
    email: {
      email,
      required
    }
  },
  watch: {
    email: function() {
      if (this.$v.email.$invalid) {
        this.notiftext = 'Please provide a valid email address'
      }
      if (this.$v.email.$model === '' && this.$v.email.$dirty) {
        this.notiftext = 'Email address is required'
      }
    },
  },
  methods: {
    setEmail(value) {
      this.email = value
      this.$v.email.$touch()
    },
    validateFields() {
      this.$v.$touch()
    },
  },
}
</script>