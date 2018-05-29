import React from 'react'
import {Field, reduxForm} from 'redux-form'
import { connect } from 'react-redux'
import * as valid from '../utils/ValidateForm'
import {Button, Form, FormGroup, Input, FormFeedback} from 'reactstrap'

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <FormGroup>

    <Input {...input} placeholder={label} type={type} invalid={touched && (error && (true))} />
    {touched && (error && <FormFeedback>{error}</FormFeedback>)}
  </FormGroup>
)

let CommentsForm = props => {
  const {handleSubmit, pristine, submitting} = props
  return (
    <Form onSubmit={handleSubmit}>

      <Field
        name="body"
        component={renderField}
        type="textarea"
        label="What are you thoughts?"
        validate={[valid.required, valid.maxLength1000, valid.minLength3]}
      />

      <Field
        name="author"
        component={renderField}
        type="text"
        label="Who are you?"
        validate={[valid.required, valid.maxLength50, valid.minLength3]}
      />

      <Button
        className="btn btn-success"
        disabled={pristine || submitting}>
        Send
      </Button>
    </Form>
  )
}

function mapStateToProps({ commentById }) {
  return {
    initialValues: commentById.items
  }
}

CommentsForm = reduxForm({
  form: 'CommentsForm',
  enableReinitialize: true
})(CommentsForm)

CommentsForm = connect(
  mapStateToProps
)(CommentsForm)

export default CommentsForm
