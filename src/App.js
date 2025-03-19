import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchId, fetchTickets } from "./store/actions/ticketActions";
import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters";
import Tabs from "./components/Tabs/Tabs";
import TicketList from "./components/TicketList/TicketList";
import "./styles/global.scss";
import styles from "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();
  const searchId = useSelector((state) => state.tickets.searchId);
  const stop = useSelector((state) => state.tickets.stop);

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (searchId && !stop) {
      dispatch(fetchTickets(searchId));
    }
  }, [dispatch, searchId, stop]);

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.content}>
        <Filters />
        <div className={styles.main}>
          <Tabs />
          <TicketList />
        </div>
      </div>
    </div>
  );
};

export default App;
