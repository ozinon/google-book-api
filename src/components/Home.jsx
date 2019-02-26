import React, { useState } from 'react'
import { Container, Divider } from 'semantic-ui-react'
import BookList from './BookList'
import SearchForm from './SearchForm'

const Home = () => {
  const [query, setQuery] = useState()
  return (
    <Container>
      <SearchForm onSearch={queryString => setQuery(queryString)} />
      <Divider />
      <section>{query ? <BookList query={query} /> : ''}</section>
    </Container>
  )
}

export default Home
