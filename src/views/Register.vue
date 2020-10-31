<template lang="pug">
  .aa-container
    h1(class="aa-heading-1") Register
      div(class="w-full mx-auto mt-6 text-left")
        label(for="email" class="w-full") Email
          input(
            id="email"
            type="email"
            class="textfield-md block my-2 mb-4"
            autofocus
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
        a.btn.btn-md.block.mt-8.w-full(href="#") Register

</template>

<script>
export default {

}
</script>