<template lang="pug">
  #login.aa-container
    h1(class="aa-heading-1") Login
    div(class="w-full mx-auto mt-6 text-left")
      label(for="email" class="w-full") Email address
        input(
          id="email"
          type="email"
          class="textfield-md block my-2 mb-4"
          autofocus
        )
      label(for="pwd" class="w-full") Pasword
        input(
          id="pwd"
          type="password"
          class="textfield-md block my-2 mb-4"
        )
      router-link(to="dashboard" class="btn btn-md block mt-8 w-full") Go to my Dashboard
</template>

<script>
export default {

}
</script>

<style>

</style>