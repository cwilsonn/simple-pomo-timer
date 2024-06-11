<template>
  <form id="pomodoro-form"
    class="grid grid-cols-2 gap-4 p-4 font-mono border-4 border-black rounded-lg md:p-8 bg-base-100"
    @submit.prevent="emit('form:submit', formValues)">
    <header class="col-span-2">
      <h1 class="mb-6 font-mono text-xl font-bold text-center md:text-4xl">Simple Pomodoro Timer</h1>
      <p class="mb-6 text-sm text-center md:text-base">The Pomodoro Technique is a time management method that uses a timer to break down
        work
        into intervals, traditionally 25 minutes in length, separated by short breaks.</p>
    </header>
    <FormItemNumber v-model="formValues.workDuration"
      label="Work duration (minutes)"
      placeholder="Work duratation"
      name="workDuration"
      class="col-span-2 md:col-span-1"
      :errors="formErrors?.workDuration"
      required />
    <FormItemNumber v-model="formValues.breakDuration"
      label="Break duration (minutes)"
      placeholder="Break duratation"
      name="breakDuration"
      class="col-span-2 md:col-span-1"
      :errors="formErrors?.breakDuration"
      required />
    <FormItemCheckbox v-model="formValues.shouldRepeat"
      label="Repeat timer"
      name="shouldRepeat"
      class="col-span-2"
      :errors="formErrors?.shouldRepeat" />
    <FormItemCheckbox
      v-model="formValues.shouldPlaySound"
      label="Enable audio notifications"
      name="shouldPlaySound"
      class="col-span-2"
      :errors="formErrors?.shouldPlaySound" />
    <FormItemCheckbox v-if="shouldShowDevFeatures"
      v-model="formValues.shouldUseAcceleratedTime"
      label="Use accelerated time"
      name="shouldUseAcceleratedTime"
      class="col-span-2"
      :errors="formErrors?.shouldUseAcceleratedTime" />
    <button class="col-span-2 border-4 btn btn-neutral"
      type="submit"
      :disabled="!isValid">
      START TIMER
    </button>
  </form>
</template>

<script setup
  lang="ts">
  import { required } from '@vuelidate/validators';
  import type { TimerFormValues } from '~/types';

  const emit = defineEmits(['form:submit']);

  const { formValues, formErrors, isValid, resetForm, v$ } = toRefs(useForm<TimerFormValues>({
    workDuration: 25,
    breakDuration: 5,
    shouldRepeat: true,
    shouldPlaySound: true,
    shouldUseAcceleratedTime: false,
  }, {
    workDuration: { required },
    breakDuration: { required },
  }));

  const shouldShowDevFeatures = ref(false);

  onMounted(() => {
    if (process.env.NODE_ENV === 'development') {
      shouldShowDevFeatures.value = true;
    }
  });
</script>