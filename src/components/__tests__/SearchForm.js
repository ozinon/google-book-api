import 'jest-dom/extend-expect'
import React from 'react'
import { cleanup, fireEvent, render, wait } from 'react-testing-library'
import SearchForm from '../SearchForm'

afterEach(cleanup)
const onSearch = jest.fn()

test('Render Search Form', async () => {
  const fakeQuery = 'Harry'

  const { getByTestId } = render(<SearchForm onSearch={onSearch} />)

  expect(getByTestId('form')).toContainElement(getByTestId('form-header'))
  expect(getByTestId('form')).toContainElement(getByTestId('form-label'))
  expect(getByTestId('form')).toContainElement(getByTestId('form-search'))
  expect(getByTestId('form')).toContainElement(getByTestId('form-button'))

  const inputNode = getByTestId('form-search')
  const submitButton = getByTestId('form-button')

  fireEvent.change(inputNode, { target: { value: fakeQuery } })

  expect(submitButton).toHaveTextContent('Search')
  fireEvent.click(submitButton)
  await wait(() => {
    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith(fakeQuery)
  })
})
