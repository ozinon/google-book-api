import React, { useState } from 'react'
import { getBooks } from '../helpers/helpers'
import BookList from './BookList'
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

  return (
    <div>
      <SearchForm onSearch={query => fetchBooks(query)} />
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section>{books.length > 0 ? <BookList books={books} /> : ''}</section>
      )}
    </div>
  )
}

export default Home
