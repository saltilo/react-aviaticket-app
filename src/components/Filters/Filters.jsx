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

  return (
    <div className={styles.filters}>
      <p>Количество пересадок</p>
      <label>
        <input
          type="checkbox"
          checked={filters.all}
          onChange={() => handleCheckboxChange("all")}
        />
        Все
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.noTransfers}
          onChange={() => handleCheckboxChange("noTransfers")}
        />
        Без пересадок
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.oneTransfer}
          onChange={() => handleCheckboxChange("oneTransfer")}
        />
        1 пересадка
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.twoTransfers}
          onChange={() => handleCheckboxChange("twoTransfers")}
        />
        2 пересадки
      </label>
      <label>
        <input
          type="checkbox"
          checked={filters.threeTransfers}
          onChange={() => handleCheckboxChange("threeTransfers")}
        />
        3 пересадки
      </label>
    </div>
  );
};

export default Filters;
