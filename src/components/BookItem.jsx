import { Link } from '@reach/router'
import React from 'react'

const BookItem = ({
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
}) => {
  return (
    <li>
      <Link to={id}>
        <h3>{title}</h3>
        <p>{description}</p>
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
