<template lang="pug">
  div(class="w-full mb-4")
    label(:for="id" class="w-full") {{ label }}
      input(
        :id="id"
        :type="id"
        v-model.lazy.trim="$v.inputName.$model"
        :class="['textfield-md block mt-2', {'border-field-error' : $v.inputName.$error} ]"
        @change="setInputValue($event.target.value)"
      )
      small(
        v-show="$v.inputName.$error"
        class="aa-notif-error inline-block w-full"
        v-text="notification.text"
      )
</template>

<script>
import {
  // helpers,
  required,
  email,
  // minLength,
} from 'vuelidate/lib/validators'

export default {
  props: [
    'id',
    'type',
    'label',
  ],
  data() {
    return {
      inputName: '',
      inputModelName: '',
      inputModelValue: '',
      notification: {
        text: ''
      },
    }
  },
  mounted() {
    this.inputModelName = this.id
  },
  validations() {
    return {
      inputName: {
        [this.inputModelName]: required, email
      }
    }
  },
  watch: {
  },
  methods: {
    setInputValue(value) {
      this.inputModelValue = value
      this.$v.inputName.$touch()
    },
  },
}
</script>

<style>

</style>