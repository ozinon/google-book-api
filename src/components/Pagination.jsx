import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const Pagination = ({ fetchPrevPage, fetchNextPage }) => {
  return (
    <div className="paginationButtons">
      <Button animated type="button" color="blue" onClick={fetchPrevPage}>
        <Button.Content visible>Previous</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow left" />
        </Button.Content>
      </Button>
      <Button animated type="button" color="blue" onClick={fetchNextPage}>
        <Button.Content visible>Next</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>
    </div>
  )
}

export default Pagination
