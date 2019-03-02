import { Link } from '@reach/router'
import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import {
  Container,
  Dimmer,
  Divider,
  Header,
  Item,
  Loader,
  Placeholder,
} from 'semantic-ui-react'
import { getBooks } from '../helpers/helpers'
import BookItem from './BookItem'
import NotFound from './NotFound'
import Pagination from './Pagination'

const BookList = ({
  location: {
    state: { query },
  },
}) => {
  const [pageIndex, setPageIndex] = useState(0)
  const [queryString, setQueryString] = useState(query)
  const [books, setBooks] = useState({ books: [] })
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchBooks = async (string, index) => {
    setIsError(false)
    setIsLoading(true)
    try {
      const result = await getBooks(string, index)
      setBooks(result.items)
    } catch (error) {
      setIsError(true)
    }
    setIsLoading(false)
  }

  const fetchNextPage = async () => {
    if (pageIndex === 9) {
      setPageIndex(0)
    } else {
      setPageIndex(pageIndex + 1)
    }
  }

  const fetchPrevPage = async () => {
    if (pageIndex === 0) {
      setPageIndex(9)
    } else {
      setPageIndex(pageIndex - 1)
    }
  }

  useEffect(() => {
    fetchBooks(queryString, pageIndex)
  }, [pageIndex])

  useEffect(() => {
    setQueryString(query)
  }, [query])

  useEffect(() => {
    fetchBooks(queryString, pageIndex)
  }, [queryString])

  if (isError) {
    return <NotFound />
  }

  return (
    <Container>
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
        <Fragment>
          <Header as="h2">Results</Header>
          <Link to="/">Make a new search</Link>
          <Divider />
          <Pagination
            fetchPrevPage={fetchPrevPage}
            fetchNextPage={fetchNextPage}
          />
          <Item.Group divided>
            {books.length > 0
              ? books.map(book => <BookItem key={book.id} book={book} />)
              : ''}
          </Item.Group>
          <Pagination
            fetchPrevPage={fetchPrevPage}
            fetchNextPage={fetchNextPage}
          />
        </Fragment>
      )}
    </Container>
  )
}

BookList.defaultProps = {
  location: {
    state: {
      query: '',
    },
  },
}

BookList.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      query: PropTypes.string.isRequired,
    }),
  }),
}

export default BookList
