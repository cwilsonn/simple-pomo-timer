<template>
  <label :for="name"
    class="col-span-1 form-control">
    <div class="label">
      <div class="font-bold label-text">
        {{ label }}
        <span v-if="required"
          class="align-top text-error label-required-indicator">*</span>
      </div>
    </div>
    <input :id="name"
      v-model="value"
      :name="name"
      type="number"
      class="border-2 border-neutral input input-bordered"
      pattern="[0-9]*"
      inputmode="numeric"
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
