import { ErrorMessage, Field, Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { Button, Form as SUIForm, Header } from 'semantic-ui-react'
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

const SearchForm = ({ onSearch }) => {
  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false)
          onSearch(values.queryString)
          resetForm(initialValues)
        }}
      >
        {({ isSubmitting }) => (
          <Form className="ui form" data-testid="form">
            <Header as="h1" data-testid="form-header">
              Find a book
            </Header>
            <SUIForm.Field>
              <label htmlFor="queryString" data-testid="form-label">
                Search
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

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default SearchForm
