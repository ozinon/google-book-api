import { Link } from '@reach/router'
import React, { Fragment, useEffect, useState } from 'react'
import { Container, Dimmer, Header, Image, Loader } from 'semantic-ui-react'
import { getBook } from '../helpers/helpers'
import NotFound from './NotFound'

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

  if (isError) {
    return <NotFound />
  }
  return (
    <Fragment>
      {isLoading ? (
        <Dimmer active>
          <Loader content="Loading" />
        </Dimmer>
      ) : (
        <Container>
          {data.imageLinks ? (
            <Image
              floated="left"
              src={data.imageLinks.small}
              alt={data.title}
            />
          ) : (
            ''
          )}
          <Header as="h2">{data.title}</Header>
          <p>
            {data.description
              ? data.description.replace(/(<([^>]+)>)/gi, '')
              : ''}
          </p>
          <p>
            Published {data.publishedDate} by {data.publisher}
          </p>
          {data.authors
            ? data.authors.map((author, index) => (
                <p key={index}>
                  <strong>{author}</strong>
                </p>
              ))
            : ''}
          <Link to="/">Back to search</Link>
        </Container>
      )}
    </Fragment>
  )
}

export default BookDetails
