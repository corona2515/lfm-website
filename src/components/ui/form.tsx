'use client'

import * as React from 'react'
import { Controller, FormProvider, useFormContext, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { ShadcnLabel } from '@/components/ui/label'

const ShadcnForm = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

const ShadcnFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
)

function useShadcnFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const { getFieldState, formState } = useFormContext()
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useShadcnFormField should be used within ShadcnFormField')
  }

  return {
    name: fieldContext.name,
    formItemId: `${fieldContext.name}-form-item`,
    formDescriptionId: `${fieldContext.name}-form-item-description`,
    formMessageId: `${fieldContext.name}-form-item-message`,
    ...fieldState,
  }
}

const ShadcnFormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props} />
))
ShadcnFormItem.displayName = 'ShadcnFormItem'

const ShadcnFormLabel = React.forwardRef<
  React.ElementRef<typeof ShadcnLabel>,
  React.ComponentPropsWithoutRef<typeof ShadcnLabel>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useShadcnFormField()

  return (
    <ShadcnLabel
      ref={ref}
      className={cn(error && 'text-red-700', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
ShadcnFormLabel.displayName = 'ShadcnFormLabel'

const ShadcnFormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useShadcnFormField()

  return (
    <div
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
})
ShadcnFormControl.displayName = 'ShadcnFormControl'

const ShadcnFormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useShadcnFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-brand-muted', className)}
      {...props}
    />
  )
})
ShadcnFormDescription.displayName = 'ShadcnFormDescription'

const ShadcnFormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useShadcnFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-red-700', className)}
      {...props}
    >
      {body}
    </p>
  )
})
ShadcnFormMessage.displayName = 'ShadcnFormMessage'

export {
  useShadcnFormField,
  ShadcnForm,
  ShadcnFormItem,
  ShadcnFormLabel,
  ShadcnFormControl,
  ShadcnFormDescription,
  ShadcnFormMessage,
  ShadcnFormField,
}
