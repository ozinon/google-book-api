import React from 'react'

const BookItem = ({
  book: {
    volumeInfo: {
      title,
      description,
      publisher,
      imageLinks: { smallThumbnail, thumbnail },
    },
  },
}) => {
  return (
    <li>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{publisher}</p>
      <img src={smallThumbnail} alt="title" />
    </li>
  )
}

export default BookItem
