import { Link } from '@reach/router'
import React from 'react'
import { Image, List } from 'semantic-ui-react'
import { truncate } from '../helpers/helpers'

const BookItem = props => {
  const {
    book: {
      volumeInfo: {
        title,
        description,
        publisher,
        authors,
        imageLinks: { smallThumbnail, thumbnail },
      },
      id,
    },
  } = props
  return (
    <List.Item>
      <Image src={smallThumbnail} alt="title" />
      <List.Content>
        <List.Header>{title}</List.Header>
        <List.Description>
          {description ? truncate(description) : ''}
        </List.Description>
        <p>Published by {publisher}</p>
        <p>Written by:</p>
        {authors
          ? authors.map((author, index) => <p key={index}>{author}</p>)
          : ''}
        <Link to={`/book/${id}`}>Read more</Link>
      </List.Content>
    </List.Item>
  )
}

export default BookItem
