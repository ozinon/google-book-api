import { Link } from '@reach/router'
import React from 'react'
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
    <li>
      <Link to={id}>
        <h3>{title}</h3>
        <p>{description ? truncate(description) : ''}</p>
        <p>{publisher}</p>
        <img src={smallThumbnail} alt="title" />
        {authors
          ? authors.map((author, index) => <p key={index}>{author}</p>)
          : ''}
      </Link>
    </li>
  )
}

export default BookItem
