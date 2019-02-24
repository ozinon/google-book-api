import { Link } from '@reach/router'
import React, { Fragment, useEffect, useState } from 'react'
import { getBook } from '../helpers/helpers'

const BookDetails = props => {
  const { details } = props
  const [data, setData] = useState({ book: {} })
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchBook = async id => {
    setIsError(false)
    setIsLoading(true)
    try {
      const result = await getBook(id)
      setData(result.volumeInfo)
    } catch (error) {
      setIsError(true)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchBook(details)
  }, [])
  return (
    <Fragment>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <article>
          <h2>{data.title}</h2>
          <p>
            {data.description
              ? data.description.replace(/(<([^>]+)>)/gi, '')
              : ''}
          </p>
          <p>{data.publisher}</p>
          <p>{data.publishedDate}</p>
          {data.authors
            ? data.authors.map((author, index) => <p key={index}>{author}</p>)
            : ''}
          {data.imageLinks ? (
            <Fragment>
              <img src={data.imageLinks.small} alt={data.title} />
              <img src={data.imageLinks.medium} alt={data.title} />
            </Fragment>
          ) : (
            ''
          )}
          <Link to="/">Back to search</Link>
        </article>
      )}
    </Fragment>
  )
}

export default BookDetails
