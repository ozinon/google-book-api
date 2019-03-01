import 'jest-dom/extend-expect'
import React from 'react'
import { cleanup, render } from 'react-testing-library'
import BookDetails from '../BookDetails'

afterEach(cleanup)

test('Render BookDetails', () => {
  const fakeBook = {
    state: {
      title: 'Fake Book',
      imageLinks: {
        smallThumbnail: 'https://fakebook.png',
        thumbnail: 'https://fakebook.png',
      },
      description: 'Fake description',
      publisher: 'Fake publisher',
      publishedDate: '2019-01-01',
      categories: ['FakeCategory1 & FakeCategory2'],
      authors: ['Fake author 1', 'Fake author 2', 'Fake author 3'],
      id: 1,
    },
  }

  const { getByTestId, getAllByTestId } = render(
    <BookDetails location={fakeBook} />,
  )
  expect(getByTestId('detail-title')).toHaveTextContent(fakeBook.state.title)
  expect(getByTestId('detail-description')).toHaveTextContent(
    fakeBook.state.description,
  )
  expect(getByTestId('detail-categories')).toHaveTextContent(
    `Categories: ${fakeBook.state.categories.join('')}`,
  )
  expect(getByTestId('detail-publish')).toHaveTextContent(
    `Published ${fakeBook.state.publishedDate} by ${fakeBook.state.publisher}`,
  )
  expect(getAllByTestId('detail-author')).toHaveLength(3)
})
