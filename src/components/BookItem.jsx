import { Link } from '@reach/router'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { animated, config, useSpring } from 'react-spring'
import { Item } from 'semantic-ui-react'
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
    <animated.div
      onMouseLeave={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
      style={props}
      className="item"
    >
      <Item.Image
        floated="left"
        src={smallThumbnail}
        alt={title}
        data-testid="item-image"
      />

      <Item.Content>
        <Item.Header as="h3" data-testid="item-title">
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
            {title}
          </Link>
        </Item.Header>
        <Item.Description data-testid="item-description">
          {description ? truncate(description) : ''}
        </Item.Description>
        <Item.Meta data-testid="item-publisher">
          Published by {publisher}
        </Item.Meta>
        <Item.Meta data-testid="item-authors">Written by:</Item.Meta>
        {authors
          ? authors.map((author, index) => (
              <Item.Meta key={index} data-testid="item-author">
                {author}
              </Item.Meta>
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
      </Item.Content>
    </animated.div>
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
