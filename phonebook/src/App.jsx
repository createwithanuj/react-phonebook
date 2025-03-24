import { useState } from 'react';
import UserForm from './UserForm';
import SearchPerson from './SearchPerson';
import DisplayContacts from './DisplayContacts';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  
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
      id: persons.length + 1
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

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
      <DisplayContacts personsToShow = {personsToShow} />
    </>
  );
};

export default App;
