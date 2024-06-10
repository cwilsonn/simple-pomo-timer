<template>
  <label :for="name"
    class="col-span-1 form-control">
    <div class="label">
      <div class="label-text">
        {{ label }}
        <span v-if="required"
          class="align-top text-error label-required-indicator">*</span>
      </div>
    </div>
    <input :id="name"
      v-model="value"
      :name="name"
      type="number"
      class="input input-bordered"
      :placeholder="placeholder || label"
      :disabled="disabled"
      :required="required" />
    <FormItemErrors v-if="errors"
      :errors="errors" />
  </label>
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
