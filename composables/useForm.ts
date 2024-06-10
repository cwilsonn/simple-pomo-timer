import useVuelidate, { type ValidationArgs } from "@vuelidate/core"

function generateRules(values: any, rules: any): any {
  const generatedRules: any = {};

  for (const key in values) {
    if (typeof values[key] === 'object' && values[key] !== null) {
      generatedRules[key] = generateRules(values[key], rules[key] || {});
    } else {
      generatedRules[key] = rules[key] || { required: false };
    }
  }

  return generatedRules;
}

export function useForm<T>(values: T, rules: ValidationArgs) {
  const formValues = ref<T>(values);

  // Generate the rules object with the same shape as the values object.
  const generatedRules = generateRules(formValues.value, rules);

  const v$ = useVuelidate(generatedRules, formValues, { $scope: false });
  const formErrors = computed(() => {
    if (formValues.value === null || typeof formValues.value !== 'object') return {};
    return Object.keys(formValues.value).reduce((errors: Record<string, any>, property) => {
      errors[property] = v$.value[property].$errors ? v$.value[property].$errors.map(e => e.$message) : [];
      return errors;
    }, {});
  });
  const isValid = computed(() => !v$.value.$invalid);

  watch(() => formValues, (newValues) => {
    if (typeof newValues.value === 'object' && newValues.value !== null) {
      Object.keys(newValues.value).forEach((key) => {
        if (key in v$.value) {
          v$.value[key].$touch();
          (v$.value[key] as any).$model = newValues.value[key];
        }
      });
    }
  }, { deep: true });

  function resetForm() {
    v$.value.$reset();
  }

  return reactive({
    formValues,
    formErrors,
    isValid,
    resetForm,
    v$,
  });
}