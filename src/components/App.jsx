import { Router } from '@reach/router'
import React from 'react'
import { Container } from 'semantic-ui-react'
import BookDetails from './BookDetails'
import BookList from './BookList'
import Footer from './Footer'
import Home from './Home'
import NotFound from './NotFound'
import SiteHeader from './SiteHeader'

const App = () => {
  return (
    <div className="App">
      <div className="main-content">
        <Container>
          <SiteHeader />
          <Router>
            <NotFound default />
            <Home path="/" />
            <BookDetails path="/book/:details" />
            <BookList path="/books/" />
          </Router>
        </Container>
      </div>
      <Footer />
    </div>
  )
}

export default App
