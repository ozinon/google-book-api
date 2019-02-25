import React, { useState } from 'react'
import { Container, Dimmer, Loader } from 'semantic-ui-react'
import { getBooks } from '../helpers/helpers'
import BookList from './BookList'
import NotFound from './NotFound'
import SearchForm from './SearchForm'

const Home = () => {
  const [books, setBooks] = useState({ books: [] })
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchBooks = async query => {
    setIsError(false)
    setIsLoading(true)
    try {
      const result = await getBooks(query)
      setBooks(result.items)
    } catch (error) {
      setIsError(true)
    }
    setIsLoading(false)
  }

  if (isError) {
    return <NotFound />
  }
  return (
    <Container>
      <SearchForm onSearch={query => fetchBooks(query)} />
      {isLoading ? (
        <Dimmer active>
          <Loader content="Loading" />
        </Dimmer>
      ) : (
        <section>{books.length > 0 ? <BookList books={books} /> : ''}</section>
      )}
    </Container>
  )
}

export default Home
