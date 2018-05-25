import React from 'react'
import {Field, reduxForm} from 'redux-form'
import * as valid from '../utils/ValidateForm'

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
)

const renderTextareaField = ({
  input,
  label,
  type,
  meta: { touched, error }, children }
) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input} placeholder={label}  type={type}></textarea>
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
)

let CommentsForm = props => {
  const {handleSubmit, pristine, submitting} = props
  return (
    <form onSubmit={handleSubmit}>

      <Field
        name="body"
        component={renderTextareaField}
        label="Body"
        validate={[valid.required, valid.maxLength1000, valid.minLength3]}
      />

      <Field
        name="author"
        component={renderField}
        type="text"
        label="Author"
        validate={[valid.required, valid.maxLength50, valid.minLength3]}
      />

      <button
        type="submit"
        className="btn btn-primary"
        disabled={pristine || submitting}>
        Send
      </button>
    </form>
  )
}

export default reduxForm({
  form: 'CommentsForm',
})(CommentsForm)
