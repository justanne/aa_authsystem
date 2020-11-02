<template lang="pug">

  #app.flex
    .aa-main-layout
      transition(
        name="fade"
        mode="out-in"
      )
        keep-alive
          router-view

</template>

<script>
export default {

}
</script>

<style lang="scss">
body, html {
  @apply font-sans;
  @apply text-gray-700;
  @apply bg-indigo-100;
}
h1 {
  @apply font-normal;
}
label {
  @apply text-base;
  @apply text-gray-600;
}
input[type="password"],
input[type="email"],
input[type="text"],
input[type="tel"] {
  @apply shadow-none;
  @apply appearance-none;
  @apply rounded;
  @apply border-2;
  @apply border-gray-300;
  @apply w-full;
  @apply text-gray-700;
  @apply transition duration-300 ease-in-out;

  &.textfield-md {
    @apply px-2;
    @apply py-1;
  }
  &.border-field-error {
    @apply border-orange-400;

    &:hover {
      @apply border-orange-200;
    }
  }
  &:hover {
    @apply border-purple-200;
  }
  &:focus {
    @apply outline-none;
    @apply border-2;
    @apply border-purple-700;
    @apply shadow-none;
  }
}
.aa-main-layout {
  @apply w-11/12;
  @apply mx-auto;
  @apply my-20;
}
.aa-container {
  @apply bg-white;
  @apply shadow-md;
  @apply rounded;
  @apply px-8;
  @apply py-8;
  @apply mb-4;
  @apply w-full;
  @apply mx-auto;

  @screen md {
    @apply w-6/12;
  }
  @screen lg {
    @apply w-4/12;
  }
}
.aa-heading-1 {
  @apply text-xl;
  @apply text-center;
}
.btn {
  @apply rounded;
  @apply text-center;
  @apply text-white;
  @apply bg-purple-700;
  @apply transition-all duration-300 ease-in-out;

  &:hover {
    @apply cursor-pointer;
    @apply bg-purple-600;
  }
  &:active {
    @apply bg-purple-800;
  }
  &.btn-md {
    @apply text-base;
    @apply px-4;
    @apply py-2;
  }
  &.btn-disabled {
    @apply opacity-25;
    @apply pointer-events-none;
  }
}

.aa-notif-error {
  @apply bg-orange-200;
  @apply text-orange-700;
  @apply px-2;
  @apply py-1;
  @apply rounded-sm;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>