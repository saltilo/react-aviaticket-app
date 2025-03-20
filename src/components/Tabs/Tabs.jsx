import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSortType } from "../../store/actions/sortActions";
import styles from "./Tabs.module.scss";

const Tabs = () => {
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.sort.sortType);

  const handleSortChange = (type) => {
    dispatch(setSortType(type));
  };

  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.btn} ${
          sortType === "cheapest" ? styles.active : ""
        }`}
        onClick={() => handleSortChange("cheapest")}>
        Самый дешёвый
      </button>
      <button
        className={`${styles.btn} ${
          sortType === "fastest" ? styles.active : ""
        }`}
        onClick={() => handleSortChange("fastest")}>
        Самый быстрый
      </button>
      <button
        className={`${styles.btn} ${
          sortType === "optimal" ? styles.active : ""
        }`}
        onClick={() => handleSortChange("optimal")}>
        Оптимальный
      </button>
    </div>
  );
};

export default Tabs;
