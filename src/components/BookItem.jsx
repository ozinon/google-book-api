import { Link } from '@reach/router'
import React, { useState } from 'react'
import { animated, config, useSpring } from 'react-spring'
import { Image, List } from 'semantic-ui-react'
import { truncate } from '../helpers/helpers'

const BookItem = ({
  book: {
    volumeInfo: {
      title,
      description,
      publisher,
      authors,
      imageLinks: { smallThumbnail, thumbnail },
    },
    id,
  },
}) => {
  const [hovered, setHovered] = useState(false)
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1, transform: `scale(${hovered ? 1.1 : 1})` },
    config: config.molasses,
  })

  return (
    <List.Item>
      <animated.div
        onMouseLeave={() => setHovered(false)}
        onMouseEnter={() => setHovered(true)}
        style={props}
      >
        <Image floated="left" src={smallThumbnail} alt="title" />

        <List.Content>
          <List.Header>{title}</List.Header>
          <List.Description>
            {description ? truncate(description) : ''}
          </List.Description>
          <p>Published by {publisher}</p>
          <p>Written by:</p>
          {authors
            ? authors.map((author, index) => <p key={index}>{author}</p>)
            : ''}
          <Link to={`/book/${id}`}>Read more</Link>
        </List.Content>
      </animated.div>
    </List.Item>
  )
}

export default BookItem
