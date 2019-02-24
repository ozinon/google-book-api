import React, { useEffect, useState } from 'react'
import { getBook } from '../helpers/helpers'

const BookDetails = props => {
  console.log(props)
  const [data, setData] = useState({ book: {} })

  const fetchBook = async id => {
    try {
      const result = await getBook(id)
      setData(result)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchBook(props.details)
  }, {})
  if (data.volumeInfo) {
    const {
      title,
      description,
      publisher,
      authors,
      imageLinks: { small, medium },
      publishedDate,
      industryIdentifiers,
    } = data.volumeInfo
    return (
      <article>
        <h2>{title}</h2>
        <p>{description ? description.replace(/(<([^>]+)>)/gi, '') : ''}</p>
        <p>{publisher}</p>
        <p>{publishedDate}</p>
        {authors
          ? authors.map((author, index) => <p key={index}>{author}</p>)
          : ''}
        <p>ISBN: {industryIdentifiers[1].identifier}</p>
        <img src={small} alt={title} />
        <img src={medium} alt={title} />
      </article>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default BookDetails
