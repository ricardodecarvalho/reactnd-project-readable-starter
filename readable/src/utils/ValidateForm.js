export const required = value => (value ? undefined : 'Required')

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const maxLength150 = maxLength(150)
export const maxLength50 = maxLength(50)
export const maxLength1000 = maxLength(1000)
export const minLength3 = minLength(3)
export const minLength15 = minLength(15)
