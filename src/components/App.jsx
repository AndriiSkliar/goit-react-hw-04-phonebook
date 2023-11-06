import { Component } from "react"
import { Form } from "./Form/Form";
import { ContactList } from "./Contacts/ContactsList";
import { Section } from "./Section/Section";
import { Filter } from "./Filter/Filter";
import { nanoid } from "nanoid";

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Viacheslav Borysov', phone: '+38 096 999 99 90', avatar: 'https://ca.slack-edge.com/T05UVJFGHKR-U06071TEJBX-c06a44ef6d43-512'},
      {id: 'id-2', name: 'Dima Mentor', phone: '+38 096 888 88 80', avatar: 'https://ca.slack-edge.com/T05UVJFGHKR-U06070Z0R1B-cb7e1290fd75-512'},
      {id: 'id-3', name: 'Nataliia Valko', phone: '+38 097 777 88 80', avatar: 'https://ca.slack-edge.com/T05UVJFGHKR-U0609UHLG4S-847bdf508cac-512'},
      {id: 'id-4', name: 'Sasha Repeta', phone: '+38 097 323 88 80', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZQUbo4Id6f68u2DnixTMAbe3-iI1KB3b8rz03EMkcxyHxWs_XnnCebwXEx9ORbrICNhk&usqp=CAU'},
    ],
    filter: "",
  }

  componentDidMount() {
    const LS_KEY = "my_contacts"
    const stringifiedContacts = localStorage.getItem(LS_KEY);
    const parsedContacts = JSON.parse(stringifiedContacts) ?? this.state.contacts;

    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const LS_KEY = "my_contacts"
      const stringifiedContacts = JSON.stringify(this.state.contacts)

      localStorage.setItem(LS_KEY, stringifiedContacts)
    }
  }

  formSubmitHandler = data => {
    const hasDuplicates = this.state.contacts.some(
      contact => contact.name === data.name
    );

    if (hasDuplicates) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), ...data }],
    }));
  }

  handleDeleteContact = contactId => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };

  updateFilterValue = (e) => {
    this.setState({ filter: e.target.value });
  };

  render() {
      const sortedContacts = [...this.state.contacts].sort((a, b) => a.name.localeCompare(b.name));

    return (
      <div className="container">
        <div className="wrapper">
          <Section title="Phonebook">
            <Form onSubmit={this.formSubmitHandler} />
          </Section>
          <Section title="Contacts">
            <Filter onFilterChange={this.updateFilterValue} filter={this.state.filter} />
            <ContactList contacts={sortedContacts} filter={this.state.filter} handleDeleteContact={this.handleDeleteContact}/>
          </Section>
        </div>
      </div>
    );
  }
};
