import React, { useEffect, useState } from 'react'
import { getData } from '../helpers/helpers'
import BookList from './BookList'

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
  useEffect(() => {
    fetchBooks('harry')
  }, [])

  return <div>{data.length > 0 ? <BookList books={data} /> : ''}</div>
}

export default App
