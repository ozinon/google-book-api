import { Link } from '@reach/router'
import React from 'react'
import { Container } from 'semantic-ui-react'

const NotFound = () => {
  return (
    <Container>
      <p>404 Page not found.</p>
      <Link to="/">Go back to search</Link>
    </Container>
  )
}

export default NotFound
