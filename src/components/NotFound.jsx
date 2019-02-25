import { Link } from '@reach/router'
import React from 'react'

const NotFound = () => {
  return (
    <div>
      404 Page not found.
      <Link to="/">Go back to search</Link>
    </div>
  )
}

export default NotFound
