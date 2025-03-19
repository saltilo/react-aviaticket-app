import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFilter } from "../../store/actions/filterActions";
import styles from "./Filters.module.scss";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleCheckboxChange = (filterName) => {
    dispatch(toggleFilter(filterName));
  };

  const checkboxes = [
    { name: "all", label: "Все" },
    { name: 0, label: "Без пересадок" },
    { name: 1, label: "1 пересадка" },
    { name: 2, label: "2 пересадки" },
    { name: 3, label: "3 пересадки" },
  ];

  return (
    <div className={styles.filters}>
      <p>Количество пересадок</p>
      {checkboxes.map(({ name, label }) => (
        <label key={name}>
          <input
            type="checkbox"
            checked={filters[name] ?? filters.transfers[name]}
            onChange={() => handleCheckboxChange(name)}
          />
          {label}
        </label>
      ))}
    </div>
  );
};

export default Filters;
