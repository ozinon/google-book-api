import 'jest-dom/extend-expect'
import React from 'react'
import { render } from 'react-testing-library'
import BookItem from '../BookItem'

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

  const { getByTestId } = render(
    <BookItem book={fakeBook.book} key={fakeBook.id} />,
  )

  expect(getByTestId('item-title')).toHaveTextContent('Fake Book')
  // Make more expects here
})
