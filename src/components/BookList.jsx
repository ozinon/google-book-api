import React from 'react'
import { List } from 'semantic-ui-react'
import BookItem from './BookItem'

const BookList = props => {
  const { books } = props
  return (
    <List relaxed>
      {books.map(book => (
        <BookItem key={book.id} book={book} />
      ))}
    </List>
  )
}

export default BookList
