import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log(event.target)
    const newPerson = {
      name: newName //todo 如果用了大括号会怎样？？？？？
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handlerNameChange = (event) => {
    console.log(event.target.value) 
    setNewName(event.target.value)
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handlerNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person,id)=> <div key = {id}>{person.name}</div> )
        // 这个有点丑陋， 不应该用数组下标作为id的
      }
    </div>
  )
}

export default App