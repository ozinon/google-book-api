import { Router } from '@reach/router'
import React from 'react'
import BookDetails from './BookDetails'
import Footer from './Footer'
import Home from './Home'
import NotFound from './NotFound'

const App = () => {
  return (
    <div className="App">
      <div className="main-content">
        <Router>
          <NotFound default />
          <Home path="/" />
          <BookDetails path="/book/:details" />
        </Router>
      </div>
      <Footer />
    </div>
  )
}

export default App
