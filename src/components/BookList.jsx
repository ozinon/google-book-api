import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Dimmer, Header, List, Loader, Placeholder } from 'semantic-ui-react'
import { getBooks } from '../helpers/helpers'
import BookItem from './BookItem'
import NotFound from './NotFound'
import Pagination from './Pagination'

const BookList = ({ query }) => {
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
    <div>
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
        <List relaxed>
          <Header as="h2">Results</Header>
          <Pagination
            fetchPrevPage={fetchPrevPage}
            fetchNextPage={fetchNextPage}
          />
          {books.length > 0
            ? books.map(book => <BookItem key={book.id} book={book} />)
            : ''}
          <Pagination
            fetchPrevPage={fetchPrevPage}
            fetchNextPage={fetchNextPage}
          />
        </List>
      )}
    </div>
  )
}

BookList.propTypes = {
  query: PropTypes.string.isRequired,
}

export default BookList
