<template>
  <ul v-if="errors && errors.length > 0"
    class="mt-2 form-errors"
    aria-label="errors">
    <li v-for="(error, i) in errors"
      :key="i"
      class="text-sm text-error">
      {{ error }}
    </li>
  </ul>
</template>

<script setup
  lang="ts">
  type FormItemErrorsProps = {
    errors: string[] | undefined
  };

  const props = defineProps<FormItemErrorsProps>();
</script>
