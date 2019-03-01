import { Link } from '@reach/router'
import PropTypes from 'prop-types'
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
      publishedDate,
      categories,
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
        <Image
          floated="left"
          src={smallThumbnail}
          alt="title"
          data-testid="item-image"
        />

        <List.Content>
          <List.Header data-testid="item-title">{title}</List.Header>
          <List.Description data-testid="item-description">
            {description ? truncate(description) : ''}
          </List.Description>
          <p data-testid="item-publisher">Published by {publisher}</p>
          <p data-testid="item-authors">Written by:</p>
          {authors
            ? authors.map((author, index) => (
                <p key={index} data-testid="item-author">
                  {author}
                </p>
              ))
            : ''}
          <Link
            to={`/book/${id}`}
            state={{
              title,
              description,
              publisher,
              publishedDate,
              categories,
              authors,
              thumbnail,
              id,
            }}
          >
            Read more
          </Link>
        </List.Content>
      </animated.div>
    </List.Item>
  )
}

BookItem.defaultProps = {
  book: {
    volumeInfo: {
      title: 'Nothing',
      description: 'Nothing',
      publisher: 'Nothing',
      publishedDate: 'Nothing',
      categories: ['Nothing'],
      authors: ['Nothing', 'Nothing'],
      imageLinks: { smallThumbnail: 'Nothing', thumbnail: 'Nothing' },
    },
    id: 'Nothing',
  },
}

BookItem.propTypes = {
  book: PropTypes.shape({
    volumeInfo: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      publisher: PropTypes.string,
      publishedDate: PropTypes.string,
      categories: PropTypes.array,
      authors: PropTypes.array,
      imageLinks: PropTypes.shape({
        smallThumbnail: PropTypes.string,
        thumbnail: PropTypes.string,
      }),
    }),
    id: PropTypes.string,
  }),
}

export default BookItem
