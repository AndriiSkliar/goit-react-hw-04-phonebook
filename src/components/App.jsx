import React, { useEffect, useState } from 'react';
import { Form } from "./Form/Form";
import { ContactList } from "./Contacts/ContactsList";
import { Section } from "./Section/Section";
import { Filter } from "./Filter/Filter";
import { nanoid } from "nanoid";

const contactsData = [
  {id: 'id-1', name: 'Viacheslav Borysov', phone: '+38 096 999 99 90', avatar: 'https://ca.slack-edge.com/T05UVJFGHKR-U06071TEJBX-c06a44ef6d43-512'},
  {id: 'id-2', name: 'Dima Mentor', phone: '+38 096 888 88 80', avatar: 'https://ca.slack-edge.com/T05UVJFGHKR-U06070Z0R1B-cb7e1290fd75-512'},
  {id: 'id-3', name: 'Nataliia Valko', phone: '+38 097 777 88 80', avatar: 'https://ca.slack-edge.com/T05UVJFGHKR-U0609UHLG4S-847bdf508cac-512'},
  {id: 'id-4', name: 'Sasha Repeta', phone: '+38 097 323 88 80', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZQUbo4Id6f68u2DnixTMAbe3-iI1KB3b8rz03EMkcxyHxWs_XnnCebwXEx9ORbrICNhk&usqp=CAU'},
]
const LS_KEY = "my_contacts"

export const App = () => {
  const [filter, setFilter] = useState("")

  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem(LS_KEY);
    const parsedContacts = JSON.parse(stringifiedContacts) ?? contactsData;

    return parsedContacts;
  });

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts)
    localStorage.setItem(LS_KEY, stringifiedContacts)
  }, [contacts]);

  const formSubmitHandler = data => {
    const hasDuplicates = contacts.some(
      contact => contact.name === data.name
    );

    if (hasDuplicates) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...data },
    ]);
  }

  const handleDeleteContact = contactId => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const updateFilterValue = e => {
    setFilter(e.target.value);
  };

  const sortedContacts = [...contacts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

    return (
      <div className="container">
        <div className="wrapper">
          <Section title="Phonebook">
            <Form onSubmit={formSubmitHandler} />
          </Section>
          <Section title="Contacts">
            <Filter onFilterChange={updateFilterValue} filter={filter} />
            <ContactList contacts={sortedContacts} filter={filter} handleDeleteContact={handleDeleteContact}/>
          </Section>
        </div>
      </div>
    );
};
