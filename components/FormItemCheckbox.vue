<template>
  <div class="form-control">
    <label :for="name"
      class="justify-start cursor-pointer gap-x-2 label">
      <input :id="name"
        v-model="value"
        :name="name"
        type="checkbox"
        class="checkbox"
        :placeholder="placeholder || label"
        :disabled="disabled"
        :required="required" />
      <span class="label-text">
        {{ label }}
        <span v-if="required"
          class="align-top text-error label-required-indicator">*</span>
      </span>
    </label>
    <FormItemErrors v-if="errors"
      :errors="errors" />
  </div>
</template>

<script setup
  lang="ts">
  type FormItemNumberProps = {
    label: string
    name: string
    placeholder?: string
    disabled?: boolean
    required?: boolean
    errors?: string[]
  };

  const props = defineProps<FormItemNumberProps>();

  const value = defineModel()
</script>
