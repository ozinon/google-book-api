import React, { useState } from 'react'
import { getData } from '../helpers/helpers'
import BookList from './BookList'
import SearchForm from './SearchForm'

const App = () => {
  const [data, setData] = useState({ books: [] })

  const fetchBooks = async query => {
    try {
      const result = await getData(query)
      setData(result.items)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <SearchForm onSearch={query => fetchBooks(query)} />
      {data.length > 0 ? <BookList books={data} /> : ''}
    </div>
  )
}

export default App
