import React, { useState } from 'react'

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>Clicked {count} times</h1>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click
      </button>
    </div>
  )
}

export default App
