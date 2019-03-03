import { navigate } from '@reach/router'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { Button, Form as SUIForm } from 'semantic-ui-react'
import * as yup from 'yup'

const schema = yup.object().shape({
  queryString: yup
    .string()
    .trim()
    .required('You need to fill in something to search for.'),
})

const initialValues = {
  queryString: '',
}

const SearchForm = () => {
  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false)
          resetForm(initialValues)
          navigate('/books/', { state: { query: values.queryString } })
        }}
      >
        {({ isSubmitting }) => (
          <Form className="ui form" data-testid="form">
            <SUIForm.Field>
              <label htmlFor="queryString" data-testid="form-label">
                Search for a book
                <Field
                  type="text"
                  name="queryString"
                  id="queryString"
                  placeholder="Ex. Harry Potter"
                  data-testid="form-search"
                />
              </label>
              <ErrorMessage
                name="queryString"
                component="div"
                className="error-message"
                data-testid="form-error"
              />
            </SUIForm.Field>

            <Button
              positive
              type="submit"
              data-testid="form-button"
              disabled={isSubmitting}
            >
              Search
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default SearchForm
