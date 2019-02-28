import 'jest-dom/extend-expect'
import React from 'react'
import { cleanup, render } from 'react-testing-library'
import BookItem from '../BookItem'

afterEach(cleanup)

test('Render BookDetails', () => {
  const fakeBook = {
    book: {
      volumeInfo: {
        title: 'Fake Book',
        imageLinks: {
          smallThumbnail: 'https://fakebook.png',
          thumbnail: 'https://fakebook.png',
        },
        description: 'Fake description',
        publisher: 'Fake publisher',
        publishedDate: '2019-01-01',
        authors: ['Fake author 1', 'Fake author 2', 'Fake author 3'],
      },
      id: 1,
    },
  }

  const { getByTestId, getAllByTestId } = render(
    <BookItem book={fakeBook.book} key={fakeBook.id} />,
  )

  expect(getByTestId('item-title')).toHaveTextContent(
    fakeBook.book.volumeInfo.title,
  )
  expect(getByTestId('item-description')).toHaveTextContent(
    fakeBook.book.volumeInfo.description,
  )
  expect(getByTestId('item-publisher')).toHaveTextContent(
    fakeBook.book.volumeInfo.publisher,
  )
  expect(getByTestId('item-authors')).toHaveTextContent('Written by:')
  expect(getAllByTestId('item-author')).toHaveLength(3)
})
