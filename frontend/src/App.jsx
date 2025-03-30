import { useEffect, useState } from 'react';
import UserForm from './UserForm';
import SearchPerson from './SearchPerson';
import DisplayContacts from './DisplayContacts';
import dataService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null);

  const showNotification = (message, type="success") => {
    setNotificationMessage({message, type});
    setTimeout(()=> {
      setNotificationMessage(null)
    },4000)
  };
  
  useEffect(() => {
    dataService
    .getAll()
    .then(initalContacts => {
      setPersons(initalContacts);
      showNotification("Contacts fetched successfully!", "success");
    })
    . catch(error => { 
    showNotification("Error fetching contacts. please try again.", "error");
    },);

  },[]);


  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchPattern, setSearchPattern] = useState('');

  const handleInput1Change = (e) => setNewName(e.target.value);
  const handleInput2Change = (e) => setNewNumber(e.target.value);
  const handleSearchInput = (e) => setSearchPattern(e.target.value);

  const addPhone = (e) => {
    e.preventDefault();

    

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {

      const confirmUpdate = confirm(`${newName} is already added to phonebook, replace the old number with a new one`)
      if(confirmUpdate){
        const updatedPerson = {...existingPerson, number: newNumber};
  
        dataService
        .updatePhone(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          showNotification(`Updated ${updatedPerson.name}'s number`, "success");
        })
        .catch(error => {
          showNotification("Error updating contact, please try again", "error");
        });
      }
      return
    }
    
    dataService
    .addPhone(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
     setNewNumber('');
     showNotification(`Added ${newPerson.name}`, "success");
    })
    .catch(error => {
    showNotification("Error adding contact. Please try again.", "error");
  });
    
  };


  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name} ?`)){
      dataService
      .deletePhone(id)
      .then(() => {
        setPersons(persons.filter(person => person.id != id));
        showNotification(`Deleted ${name}`, "success");

    }) 
      .catch(error => {showNotification("Error deleting contact. Please try again.")});
    }
  }

  
  const personsToShow = searchPattern
    ? persons.filter(person =>
        person.name.toLowerCase().includes(searchPattern.toLowerCase())
      )
    : persons;

  return (
    <>
      {notificationMessage && (
      <div style={{ 
        color: notificationMessage.type === "error" ? "red" : "green",
        backgroundColor: "#f4f4f4",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
      border: `1px solid ${notificationMessage.type === "error" ? "red" : "green"}`
      }}>
      {notificationMessage.message}
     </div>
      )}
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
