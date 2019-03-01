import { Link } from '@reach/router'
import PropTypes from 'prop-types'
import React from 'react'
import { animated, config, useSpring } from 'react-spring'
import { Container, Item } from 'semantic-ui-react'
import NotFound from './NotFound'

const BookDetails = ({
  location: {
    state: {
      title,
      description,
      publisher,
      publishedDate,
      categories,
      authors,
      thumbnail,
    },
  },
}) => {
  const aniProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.default,
  })

  const cats = categories.join('')

  if (title === 'Nothing') {
    return <NotFound />
  }

  return (
    <Container data-testid="details">
      <animated.div style={aniProps}>
        <Item.Group>
          <Item>
            {thumbnail ? (
              <Item.Image floated="left" src={thumbnail} alt={title} />
            ) : (
              ''
            )}
            <Item.Content>
              <Item.Header as="a" data-testid="detail-title">
                {title}
              </Item.Header>
              <Item.Description data-testid="detail-description">
                {description ? description.replace(/(<([^>]+)>)/gi, '') : ''}
              </Item.Description>
              <Item.Meta data-testid="detail-categories">
                Categories: {cats}
              </Item.Meta>
              <Item.Meta data-testid="detail-publish">
                Published {publishedDate} by {publisher}
              </Item.Meta>
              {authors
                ? authors.map(author => (
                    <Item.Description key={author} data-testid="detail-author">
                      <strong>{author}</strong>
                    </Item.Description>
                  ))
                : ''}
              <Link to="/" data-testid="detail-link">
                Back to search
              </Link>
            </Item.Content>
          </Item>
        </Item.Group>
      </animated.div>
    </Container>
  )
}

BookDetails.defaultProps = {
  location: {
    state: {
      title: 'Nothing',
      description: 'Nothing',
      publihser: 'Nothing',
      publishedDate: 'Nothing',
      thumbnail: 'Nothing',
      categories: [],
      authors: [],
    },
  },
}

BookDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      categories: PropTypes.array,
      publisher: PropTypes.string,
      publishedDate: PropTypes.string,
      authors: PropTypes.array,
      thumbnail: PropTypes.string,
    }),
  }),
}

export default BookDetails
