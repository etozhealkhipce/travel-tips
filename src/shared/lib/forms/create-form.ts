import { createEvent, createStore } from "effector";
import { createFormControl, type FieldValues, type UseFormProps } from "react-hook-form";

export function createEffectorForm<TValues extends FieldValues>(props?: UseFormProps<TValues>) {
  const formResult = createFormControl<TValues>(props);
  const { formControl } = formResult;
  
  const setValues = createEvent<TValues>();
  const setIsDirty = createEvent<boolean>();
  const setIsValid = createEvent<boolean>();
  const setIsSubmitting = createEvent<boolean>();

  const $values = createStore<TValues>((props?.defaultValues as TValues) || {} as TValues)
    .on(setValues, (_, values) => values);
  const $isDirty = createStore(false).on(setIsDirty, (_, isDirty) => isDirty);
  const $isValid = createStore(false).on(setIsValid, (_, isValid) => isValid);
  const $isSubmitting = createStore(false).on(setIsSubmitting, (_, isSubmitting) => isSubmitting);
  
  const formChanged = createEvent<TValues>();
  const submitTriggered = createEvent();
  
  // Update stores on form changes
  formControl.subscribe({
    formState: {
      isDirty: true,
      isValid: true,
      isSubmitting: true,
      values: true,
      // biome-ignore lint/suspicious/noExplicitAny: library type mismatch
    } as any,
    callback: (state) => {
      if (state.isDirty !== undefined) setIsDirty(state.isDirty);
      if (state.isValid !== undefined) setIsValid(state.isValid);
      if (state.isSubmitting !== undefined) setIsSubmitting(state.isSubmitting);
      
      if (state.values) {
        setValues(state.values as TValues);
        formChanged(state.values as TValues);
      }
    },
  });

  return {
    ...formResult,
    $values,
    $isDirty,
    $isValid,
    $isSubmitting,
    formChanged,
    submitTriggered
  };
}
