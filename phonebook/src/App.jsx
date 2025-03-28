import { useEffect, useState } from 'react';
import UserForm from './UserForm';
import SearchPerson from './SearchPerson';
import DisplayContacts from './DisplayContacts';
import axios from 'axios';
import dataService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    dataService
    .getAll()
    .then(initalContacts => {
      setPersons(initalContacts);
    })
  })


  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchPattern, setSearchPattern] = useState('');

  const handleInput1Change = (e) => setNewName(e.target.value);
  const handleInput2Change = (e) => setNewNumber(e.target.value);
  const handleSearchInput = (e) => setSearchPattern(e.target.value);

  const addPhone = (e) => {
    e.preventDefault();

    const duplicateName = persons.find(person => person.name === newName);
    if (duplicateName) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1
    };
    
    dataService
    .addPhone(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
     setNewNumber('');
    })
    
  };


  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name} ?`)){
      dataService
      .deletePhone(id)
      .then(() => setPersons(persons.filter(person => person.id != id)));
    }
  }

  
  const personsToShow = searchPattern
    ? persons.filter(person =>
        person.name.toLowerCase().includes(searchPattern.toLowerCase())
      )
    : persons;

  return (
    <>
      <h1>React Phonebook</h1>
      <SearchPerson 
      searchPattern={searchPattern}
      handleSearchInput={handleSearchInput}
      />
      <UserForm 
      newName={newName} 
      newNumber={newNumber}
      handleInput1Change={handleInput1Change}
      handleInput2Change={handleInput2Change}
      addPhone = {addPhone}
      />
      <DisplayContacts personsToShow = {personsToShow} handleDelete={handleDelete}/>
    </>
  );
};

export default App;
