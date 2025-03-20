import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchId, fetchTickets } from "./store/actions/ticketActions";
import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters";
import Tabs from "./components/Tabs/Tabs";
import TicketList from "./components/TicketList/TicketList";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import "./styles/global.scss";
import styles from "./App.module.scss";
import "antd/dist/reset.css";

const App = () => {
  const dispatch = useDispatch();
  const searchId = useSelector((state) => state.tickets.searchId);
  const allTickets = useSelector((state) => state.tickets.allTickets);

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    const loadTickets = async () => {
      if (!searchId) return;

      try {
        let stopLoading = false;

        while (!stopLoading) {
          if (allTickets.length >= 10000) {
            stopLoading = true;
            break;
          }

          const resultAction = await dispatch(fetchTickets(searchId));

          if (fetchTickets.rejected.match(resultAction)) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            continue;
          }

          const payload = resultAction.payload;

          if (payload?.stop) {
            stopLoading = true;
          }

          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      } catch (error) {
        console.error("Ошибка загрузки билетов:", error);
      }
    };

    loadTickets();
  }, [dispatch, searchId, allTickets.length]);

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
      <ScrollToTopButton />
    </div>
  );
};

export default App;
