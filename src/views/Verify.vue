<template lang="pug">
  #verify.aa-container
    h1(class="aa-heading-1") Verify your email
    div(class="w-full mx-auto mt-6 text-left")
      label(for="vtoken" class="w-full") Verification code
        input(
          id="vtoken"
          type="tel"
          minlength="5"
          class="textfield-md block my-2 mb-4"
          autofocus
        )
      router-link(to="login" class="btn btn-md block mt-8 w-full") Proceed to Login
</template>

<script>
export default {

}
</script>

<style>

</style>