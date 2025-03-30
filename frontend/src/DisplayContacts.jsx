const DisplayContacts = ({personsToShow, handleDelete}) => {

    return(
        <>
        <h2>Contacts:</h2>
         <ul>
        {personsToShow.map(person => (
          <li key={person.id}>
            {person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
          </li>
        ))}
      </ul>
        </>
        
    );
}

export default DisplayContacts;