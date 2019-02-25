import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { Button, Form as SUIForm } from 'semantic-ui-react'
import * as yup from 'yup'

const schema = yup.object().shape({
  queryString: yup
    .string()
    .required('You need to fill in something to search for.'),
})

const initialValues = {
  queryString: '',
}

const SearchForm = ({ onSearch }) => {
  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSearch(values.queryString)
          resetForm(initialValues)
          setTimeout(() => {
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ isSubmitting }) => (
          <Form className="ui form">
            <h3>Search for a book</h3>
            <SUIForm.Field>
              <label htmlFor="queryString">
                Search
                <Field
                  type="text"
                  name="queryString"
                  id="queryString"
                  placeholder="Ex. Harry"
                />
              </label>
              <ErrorMessage
                name="queryString"
                component="div"
                className="error-message"
              />
            </SUIForm.Field>
            <Button positive type="submit" disabled={isSubmitting}>
              Search
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default SearchForm
