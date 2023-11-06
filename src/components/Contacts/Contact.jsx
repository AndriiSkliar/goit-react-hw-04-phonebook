import css from "./Contact.module.css"

export const Contact = ({ contact: { id, name, phone, avatar }, handleDeleteContact }) => {
  return (
    <>
      <li key={id} className={css.contact__item}>
        <img className={css.contact__img} src={avatar || "https://pofoto.club/uploads/posts/2021-12/1639591399_1-pofoto-club-p-ptichki-malenkie-foto-1.jpg"} alt={name} width="50"/>
        <p className={css.contact__text}>
          <span className={css.contact__name}>{name}</span>
          <span className={css.contact__phone}>{phone}</span>
        </p>
        <button
          type="button"
          className={css.contact__btn}
          onClick={() => handleDeleteContact(id)}>
          Delete
        </button>
      </li>
    </>
  )
}

