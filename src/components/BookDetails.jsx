import { Link } from '@reach/router'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { animated, config, useSpring } from 'react-spring'
import { Container, Header, Image } from 'semantic-ui-react'
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
    <Fragment>
      <Container data-testid="details">
        <animated.div style={aniProps}>
          {thumbnail ? (
            <Image floated="left" src={thumbnail} alt={title} />
          ) : (
            ''
          )}
          <Header as="h2" data-testid="detail-title">
            {title}
          </Header>
          <p data-testid="detail-description">
            {description ? description.replace(/(<([^>]+)>)/gi, '') : ''}
          </p>
          <p data-testid="detail-categories">Categories: {cats}</p>
          <p data-testid="detail-publish">
            Published {publishedDate} by {publisher}
          </p>
          {authors
            ? authors.map(author => (
                <p key={author} data-testid="detail-author">
                  <strong>{author}</strong>
                </p>
              ))
            : ''}
          <Link to="/" data-testid="detail-link">
            Back to search
          </Link>
        </animated.div>
      </Container>
    </Fragment>
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
