import { Component } from "react";
import { nanoid } from 'nanoid'
import css from "./Form.module.css"

const INITIAL_STATE = {
  name: "",
  phone: "",
};

export class Form extends Component {
  state = { ...INITIAL_STATE };

  nameId = nanoid()
  tagId = nanoid()

  handleChange = e => {
    const { name, value } = e.currentTarget
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
  e.preventDefault();
  this.props.onSubmit(this.state);
  this.reset();
  }

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {

    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <div className={css.form__container}>
          <label htmlFor={this.nameId}>
            Name
          </label>
          <input
            type="text"
            name="name"
            className={css.form__input}
            id={this.nameId}
            value={this.state.name}
            onChange={this.handleChange}
            required
            pattern={"^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"}
          />
        </div>
        <div className={css.form__container}>
          <label htmlFor={this.tagId}>
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            className={css.form__input}
            id={this.tagId}
            value={this.state.phone}
            onChange={this.handleChange}
            required
            pattern={"\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}"}
            />
          </div>
        <button type="submit" className={css.form__btn}>Add contact</button>
      </form>
    );
  }
}
