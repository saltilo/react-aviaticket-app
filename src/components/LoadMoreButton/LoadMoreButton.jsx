import React from "react";
import { useDispatch } from "react-redux";
import { loadMoreTickets } from "../../store/reducers/ticketReducer";
import styles from "./LoadMoreButton.module.scss";

const LoadMoreButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(loadMoreTickets());
  };

  return (
    <button className={styles.loadMore} onClick={handleClick}>
      Показать ещё 5 билетов
    </button>
  );
};

export default LoadMoreButton;
