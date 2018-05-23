import React from 'react'
import {Field, reduxForm} from 'redux-form'
import { connect } from 'react-redux'
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

const renderSelectField = ({
  input,
  label,
  type,
  meta: { touched, error }, children }
) => (
  <div>
    <label>{label}</label>
    <div>
      <select {...input}>
        {children}
      </select>
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

let PostsForm = props => {
  const {handleSubmit, pristine, submitting, categories} = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        component={renderField}
        type="text"
        label="title"
        validate={[valid.required, valid.maxLength150, valid.minLength3]}
      />

      <Field
        name="author"
        component={renderField}
        type="text"
        label="Author"
        validate={[valid.required, valid.maxLength50, valid.minLength3]}
      />

      <Field
        name="category"
        component={renderSelectField}
        label="Category"
        validate={[valid.required]}>
          <option value="">Selec</option>
          {categories.items.length > 0  && (categories.items.map((category, key) => (
            <option
              key={key}
              value={category.name}>
                {category.name}
            </option>
          )))}
      </Field>

      <Field
        name="body"
        component={renderTextareaField}
        label="Body"
        validate={[valid.required, valid.maxLength1000, valid.minLength3]}
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

function mapStateToProps({ postById }) {
  return {
    initialValues: postById.items
  }
}

PostsForm = reduxForm({
  form: 'PostsForm',
  enableReinitialize: true
})(PostsForm)

PostsForm = connect(
  mapStateToProps
)(PostsForm)

export default PostsForm
