import React from 'react'
import { Header, Image } from 'semantic-ui-react'
import searchBook from '../../images/search-book.svg'

const SiteHeader = () => {
  return (
    <section>
      <Image src={searchBook} size="small" circular />
      <Header as="h1">Welcome to your friendly Book Finder</Header>
    </section>
  )
}

export default SiteHeader
