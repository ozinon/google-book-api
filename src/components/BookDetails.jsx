import { Link } from '@reach/router'
import React, { Fragment, useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { config } from 'rxjs'
import {
  Container,
  Dimmer,
  Header,
  Image,
  Loader,
  Placeholder,
} from 'semantic-ui-react'
import { getBook } from '../helpers/helpers'
import NotFound from './NotFound'

const BookDetails = props => {
  const { details } = props
  const [data, setData] = useState({ book: {} })
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const aniProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    // duration: '2000',
    config: config.default,
  })

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
        <Dimmer active inverted>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="short" />
              <Placeholder.Line length="medium" />
            </Placeholder.Paragraph>
          </Placeholder>
          <Loader content="Loading" />
        </Dimmer>
      ) : (
        <Container>
          <animated.div style={aniProps}>
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
          </animated.div>
        </Container>
      )}
    </Fragment>
  )
}

export default BookDetails
