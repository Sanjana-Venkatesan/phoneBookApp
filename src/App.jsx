import { useState, useEffect } from 'react';
import noteService from './services/persons';
import './App.css';

const Filter = ({ searchQuery, handleSearch }) => (
  <div>
    <input
      className="filter-input"
      placeholder="Filter numbers"
      value={searchQuery}
      onChange={handleSearch}
    />
  </div>
);

const Notification = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

const PopupForm = ({ closeForm, addInfo, newName, handleNewName, newNum, handleNewNum }) => (
  <div className="popup">
    <div className="popup-content">
      <button className="close-btn" onClick={closeForm}>×</button>
      <h3>Add a New Number</h3>
      <form onSubmit={addInfo} className="form">
        <div>
          <input
            placeholder="Name"
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          <input
            placeholder="Number"
            value={newNum}
            onChange={handleNewNum}
          />
        </div>
        <div>
          <button type="submit" className="form-btn">Add</button>
        </div>
      </form>
    </div>
  </div>
);

const Persons = ({ personsToShow, deleteInfo }) => (
  <ul>
    {personsToShow.map((person) => (
      <li key={person._id}>
        {person.name}: {person.phone}
        <button onClick={(event) => deleteInfo(event, person._id)} className="delete-btn">
          Delete
        </button>
      </li>
    ))}
  </ul>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => setPersons(initialNotes))
      .catch((error) => console.error('Error fetching data', error));
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const showNotification = (message, type = 'success') => {
    setNotification(message);
    setNotificationType(type);
    setTimeout(() => setNotification(''), 3000);
  };

  const addInfo = (event) => {
    event.preventDefault();
    if (newName.trim() === '' || newNum.trim() === '') {
      alert('Enter valid name and number');
      return;
    }
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newObj = { name: newName, phone: newNum };

    noteService.create(newObj).then((returnedNote) => {
      setPersons([...persons, returnedNote]);
      setNewName('');
      setNewNum('');
      setShowPopup(false);
      showNotification(`Added ${newName}`);
    });
  };

  const deleteInfo = (event, id) => {
    event.preventDefault();
    if (window.confirm('Do you want to delete this record?')) {
      noteService.deleteRec(id).then(() => {
        setPersons(persons.filter((person) => person._id !== id));
        showNotification('Record deleted', 'error');
      });
    }
  };

  const handleNewNum = (event) => setNewNum(event.target.value);
  const handleNewName = (event) => setNewName(event.target.value);
  const handleSearch = (event) => setSearchQuery(event.target.value);

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`container ${theme}`}>
      <div className="header">
        <h1>Phonebook</h1>
        <Filter searchQuery={searchQuery} handleSearch={handleSearch} />
        <button className="theme-toggle" onClick={toggleTheme}>
          Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
        </button>
      </div>
      <Notification message={notification} type={notificationType} />
      <button className="add-btn" onClick={() => setShowPopup(true)}></button>
      <div className="section">
        <h3>Numbers</h3>
        <Persons personsToShow={personsToShow} deleteInfo={deleteInfo} />
      </div>
      {showPopup && (
        <PopupForm
          closeForm={() => setShowPopup(false)}
          addInfo={addInfo}
          newName={newName}
          handleNewName={handleNewName}
          newNum={newNum}
          handleNewNum={handleNewNum}
        />
      )}
    </div>
  );
};

export default App;
