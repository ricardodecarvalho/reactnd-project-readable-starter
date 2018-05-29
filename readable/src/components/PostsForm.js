import React from 'react'
import {Field, reduxForm} from 'redux-form'
import { connect } from 'react-redux'
import * as valid from '../utils/ValidateForm'
import {Button, Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap'

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <FormGroup>
    <Label>{label}</Label>
    <Input {...input} placeholder={label} type={type} invalid={touched && (error && (true))} />
    {touched && (error && <FormFeedback>{error}</FormFeedback>)}
  </FormGroup>
)

const renderSelectField = ({
  input,
  label,
  type,
  meta: { touched, error }, children }
) => (
  <FormGroup>
    <Label>{label}</Label>
    <Input {...input} type={type} name={label} invalid={touched && (error && (true))}>
      {children}
    </Input>
    {touched && (error && <FormFeedback>{error}</FormFeedback>)}
  </FormGroup>
)

let PostsForm = props => {
  const {handleSubmit, pristine, submitting, categories} = props
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="title"
        component={renderField}
        type="text"
        label="Title"
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
        type="select"
        component={renderSelectField}
        label="Category"
        validate={[valid.required]}>
          <option value="">Select</option>
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
        component={renderField}
        type="textarea"
        label="Body"
        validate={[valid.required, valid.maxLength1000, valid.minLength3]}
      />

      <Button
        className="btn btn-primary"
        disabled={pristine || submitting}>
        Send
      </Button>
    </Form>
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
