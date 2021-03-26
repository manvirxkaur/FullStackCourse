import React, { useState, useEffect } from 'react'
import Add from './components/add'
import Search from'./components/search'
import Display from './components/display'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showFilter, setshowFilter]=useState('')
  const [found, setFound]=useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
const addPerson=(event)=>
{
  event.preventDefault();
  const nameExists=persons.some(p=>p.name===newName);
  const numExists=persons.some(p=>p.number===newNumber);
  if(nameExists||numExists)
  {
    alert(`already added to phonebook`)
    setNewName('')
    setNewNumber('')
  }
  else
  {
    const personObj={
      name:newName,
      number:newNumber
    }
    setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
  }
}

const handleNameChange=(event)=>
{
  setNewName(event.target.value)
}
const handleNumberChange=(event)=>
{
  setNewNumber(event.target.value)
}
  const handleFilterChange=(event)=>
  {
    event.preventDefault();
    setshowFilter(event.target.value);

    if(event.target.value.trim()==='')
    {
      setFound([]);
      return;
    }
    setFound(persons.filter(i=>i.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

 
  return (
    <div>
      <h2>Phonebook</h2> 
      <Search showFilter={showFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <Add handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
           newName={newName} newNumber={newNumber} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Display found={found}/>
    </div>
  )
}

export default App