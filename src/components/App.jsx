import { Router } from '@reach/router'
import React from 'react'
import BookDetails from './BookDetails'
import Home from './Home'

const App = () => {
  return (
    <div>
      <Router>
        <Home path="/" />
        <BookDetails path=":details" />
      </Router>
    </div>
  )
}

export default App
