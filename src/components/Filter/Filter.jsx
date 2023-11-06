import css from "./Filter.module.css"

export const Filter = ({ onFilterChange, filter }) => {
  return (
    <div className={css.filter__wrapper}>
      <p>Find name</p>
      <input
        type="text"
        name="filter"
        className={css.filter__input}
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  );
};
