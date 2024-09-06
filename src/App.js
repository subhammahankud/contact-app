import React, { useState } from 'react';
import ContactList from './ContactList';
import AddContact from './AddContact';
import EditContact from './EditContact';
import { v4 as uuidv4 } from 'uuid';
import './App.css';  // Import the CSS file

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const addContact = (contact) => {
    setContacts([...contacts, { ...contact, id: uuidv4() }]);
    setShowAddModal(false);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const updateContact = (updatedContact) => {
    setContacts(contacts.map(contact => (contact.id === updatedContact.id ? updatedContact : contact)));
    setShowEditModal(false);
  };

  const handleEdit = (contact) => {
    setEditContact(contact);
    setShowEditModal(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Contacts Manager</h1>
      <button className="btn btn-primary my-3" onClick={() => setShowAddModal(true)}>Add Contact</button>
      <div className="contact-list">
        <ContactList contacts={contacts} onDelete={deleteContact} onEdit={handleEdit} />
      </div>
      {showAddModal && <AddContact onAdd={addContact} onClose={() => setShowAddModal(false)} />}
      {showEditModal && <EditContact contact={editContact} onUpdate={updateContact} onClose={() => setShowEditModal(false)} />}
    </div>
  );
};

export default App;
