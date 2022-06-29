import React from 'react'
import Counter from './Counter'
import TodoList from './TodoList'

function Greeting({ name }) {
  return <h2>Was geht, {name}?</h2>
}

function App() {
  return (
    <div>
      <Greeting name="Sebastian" />
      <TodoList />
    </div>
  )
}

export default App