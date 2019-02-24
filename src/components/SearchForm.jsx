import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
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
    <div>
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
          <Form>
            <h3>Search for a book</h3>
            <div>
              <label htmlFor="queryString" className="label">
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
            </div>
            <button type="submit" disabled={isSubmitting}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SearchForm
