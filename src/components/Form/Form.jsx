import React, { useState } from 'react';
import { nanoid } from 'nanoid'
import css from "./Form.module.css"

export const Form = ({onSubmit} ) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const nameId = nanoid()
  const tagId = nanoid()

  const handleChange = e => {
    const { name, value } = e.currentTarget

    switch (name) {
      case 'name': {
        setName(value);
        return;
      }
      case 'phone': {
        setPhone(value);
        return;
      }
      default:
        return;
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, phone });
    reset();
  };

  const reset = () => {
    setName("");
    setPhone("");
  };

    return (
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.form__container}>
          <label htmlFor={nameId}>
            Name
          </label>
          <input
            type="text"
            name="name"
            className={css.form__input}
            id={nameId}
            value={name}
            onChange={handleChange}
            required
            pattern={"^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"}
          />
        </div>
        <div className={css.form__container}>
          <label htmlFor={tagId}>
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            className={css.form__input}
            id={tagId}
            value={phone}
            onChange={handleChange}
            required
            pattern={"\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}"}
            />
          </div>
        <button type="submit" className={css.form__btn}>Add contact</button>
      </form>
    );
}
