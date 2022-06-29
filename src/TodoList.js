import React, { useState } from 'react'
import { Icon, Input, List } from 'semantic-ui-react'
import './todoList.scss'

function TodoList() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos') || '[]')
  )

  function updateTodos(toUpdateTodos) {
    localStorage.setItem('todos', JSON.stringify(toUpdateTodos))

    setTodos(toUpdateTodos)
  }

  function handleAdd() {
    updateTodos([...todos, newTodo])
    setNewTodo('')
  }

  function handleRemove(index) {
    let updatedTodos = todos
    updatedTodos.splice(index, 1)

    updateTodos([...updatedTodos])
  }

  function handleEnter(event) {
    if (event.code === 'Enter') {
      handleAdd()
    }
  }

  const todoItems = todos.map((todo, todoIndex) => (
    <List.Item key={todo} onClick={() => handleRemove(todoIndex)}>
      {todoIndex + 1}. {todo}
    </List.Item>
  ))

  return (
    <div style={{ padding: '2rem' }}>
      <Input
        placeholder={'Neues Todo'}
        value={newTodo}
        onKeyUp={handleEnter}
        onInput={(e) => setNewTodo(e.target.value)}
        action={{ onClick: handleAdd, content: 'Hinzufügen' }}
      />
      <List>{todoItems}</List>
    </div>
  )
}

export default TodoList