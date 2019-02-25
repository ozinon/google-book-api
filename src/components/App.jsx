import { Router } from '@reach/router'
import React from 'react'
import BookDetails from './BookDetails'
import Home from './Home'
import NotFound from './NotFound'

const App = () => {
  return (
    <div>
      <Router>
        <NotFound default />
        <Home path="/" />
        <BookDetails path="/book/:details" />
      </Router>
    </div>
  )
}

export default App
