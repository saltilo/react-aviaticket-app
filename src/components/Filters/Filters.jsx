import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../../store/actions/filterActions";
import styles from "./Filters.module.scss";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleCheckboxChange = (filterName) => {
    if (filterName === "all") {
      const newFilters = filters.all
        ? {
            all: false,
            noTransfers: false,
            oneTransfer: false,
            twoTransfers: false,
            threeTransfers: false,
          }
        : {
            all: true,
            noTransfers: true,
            oneTransfer: true,
            twoTransfers: true,
            threeTransfers: true,
          };
      dispatch(setFilters(newFilters));
    } else {
      const updatedFilters = { ...filters, [filterName]: !filters[filterName] };

      const allChecked =
        updatedFilters.noTransfers &&
        updatedFilters.oneTransfer &&
        updatedFilters.twoTransfers &&
        updatedFilters.threeTransfers;
      updatedFilters.all = allChecked;

      dispatch(setFilters(updatedFilters));
    }
  };

  const checkboxes = [
    { name: "all", label: "Все" },
    { name: "noTransfers", label: "Без пересадок" },
    { name: "oneTransfer", label: "1 пересадка" },
    { name: "twoTransfers", label: "2 пересадки" },
    { name: "threeTransfers", label: "3 пересадки" },
  ];

  return (
    <div className={styles.filters}>
      <p>Количество пересадок</p>
      {checkboxes.map(({ name, label }) => (
        <label key={name}>
          <input
            type="checkbox"
            checked={filters[name]}
            onChange={() => handleCheckboxChange(name)}
          />
          {label}
        </label>
      ))}
    </div>
  );
};

export default Filters;
