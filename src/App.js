
import React, { useState, useEffect } from 'react'
import People from './components/People'
import Filter from './components/Filter'
import personService from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}
const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const rows = () => personsToShow.map(person =>
    <People
      name={person.name}
      number={person.number}
      key={person.name}
      deletePerson={() => personToDelete(person.id, person.name)}
      />
    )

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.includes(newFilter))

  const personToDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {

    personService
      .deletePerson(id)
      .then(response => {
        document.location.reload()
      })
      .catch(error => {
        setErrorMessage(
          `${name} has already been deleted, please refresh!`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addName = (event) => {

    event.preventDefault()
    setNewName('')
    setNewNumber('')
    if (persons.some(person => person.name === newName)) {
    window.alert(`${newName} is already in the Phonebook`)

    }
    {
    const nameObject = {
      name: newName,
      number: newNumber
    }

    personService
    .create(nameObject)
      .then(returnedPersons => {
      setPersons(persons.concat(returnedPersons))
    })
    setSuccessMessage(
      `Successfully added ${newName}!`
    )
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)

  }
 }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} />
      <Error message={errorMessage} />

      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h3>Add new number</h3>
      <form onSubmit={addName}>
        <div>
          Name: <input
           value={newName}
           onChange={handleNameChange}
           />
        </div>
        <div>
          Number: <input
          value={newNumber}
          onChange={handleNumberChange}
          />
          </div>
          <button type="submit">add</button>
      </form>
      <h3>Numbers</h3>
      <div>{rows()}</div>
    </div>
  )
}




export default App
