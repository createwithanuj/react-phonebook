
const UserForm = ({newName, newNumber, handleInput1Change, handleInput2Change, addPhone}) => {
    return(
        <form onSubmit={addPhone}>
        <h2>Add New</h2>
        <div>
          name: <input type="text" value={newName} onChange={handleInput1Change} />
        </div>
        <div>
          number: <input type="tel" value={newNumber} onChange={handleInput2Change} />
        </div>
        <button type="submit">add</button>
      </form>
    );

}

export default UserForm;
