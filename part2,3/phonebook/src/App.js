import React, { useState, useEffect } from 'react'
import Add from './components/add'
import Search from'./components/search'
import Display from './components/display'
import personsService from './services/persons'
import Notification from "./components/notification";

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showFilter, setshowFilter]=useState('')
  const [found, setFound]=useState([])
  const [notification, setNotification] = useState(null);
  const [success, setSuccess] = useState(null);


  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

const addPerson=(e)=>
{
    e.preventDefault();
    const personObject = 
    {
      name: newName,
      number: newNumber
    };

    if (persons.some(e => e.name === newName)) 
    {
      alert(`${newName} is already added to phonebook.`);
        let personId = persons.find(item => item.name === newName);
        let updatedEntry = Object.assign(personId, personObject);

        if(window.confirm(`Do you want to update ${newName} with number ${newNumber}?`)) 
        {
          personsService
            .update(personId.id, personObject)
            .then(() => {
              setPersons(
                persons.map(item => (item.name === newName ? updatedEntry : item))
              );
              setNewName("");
              setNewNumber("");
              showMessage(`User ${newName} phone number updated`);
            })
            .catch(error => {
              showMessage(`Update failed. User ${newName} has already been removed from the phone book.`, false );
              setPersons(persons.filter(n => n.name !== newName));
            });
        }
    }
    else 
    {
      if (persons.some(e => e.number === newNumber)) 
      {
        alert(`# ${newNumber} is already in the phone book.`, false);
      } 
      else 
      {
          if (newName === "" || newNumber === "") 
          {
            alert(`The name and number must not be empty`, false);
          } 
          else 
          {
            personsService
              .create(personObject)
              .then(returnedPerson => 
                {
                setPersons(persons.concat(returnedPerson));
                setNewName("");
                setNewNumber("");
                showMessage(`User ${newName} has been added to the phone book`);
                }
              )
              .catch(error => {return showMessage( `Failed to add number. More about error: ${error.response.data.error}`,false );});
            personsService
              .getAll()
              .then(response => {
                setPersons(response);
              })
              .catch(error => showMessage("Could not retrieve data", false));
          }
      }
    }
};
const removeEntry = person => {
  if (window.confirm(`Remove ${person.name}?`)) {
    personsService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter(item => item.id !== person.id));
        showMessage(`${person.name} has been removed from the phone book`);
      })
      .catch(error => {
        showMessage(
          `Removal failed. User ${
            person.name
          } has already been removed from the phone book.`,
          false
        );
        personsService
          .getAll()
          .then(response => {
            setPersons(response);
          })
          .catch(error => showMessage("Could not retrieve data", false));
      });
  }
};

  const showMessage = (message, successNotification = true) => {
    setNotification(message);
    setSuccess(successNotification);

    setTimeout(() => {
      setNotification(null);
      setSuccess(null);
    }, 3000);
  };

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
      <Notification notification={notification} success={success} />
      <Search showFilter={showFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <Add handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
           newName={newName} newNumber={newNumber} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Display found={found} persons={persons} showFilter={showFilter} removeEntry={removeEntry}/>
    </div>
  )
}

export default App