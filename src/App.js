import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters";
import Tabs from "./components/Tabs/Tabs";
import TicketList from "./components/TicketList/TicketList";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import "./styles/global.scss";
import styles from "./App.module.scss";

const App = () => {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <Header />
        <div className={styles.content}>
          <Filters />
          <div className={styles.main}>
            <Tabs />
            <TicketList />
            <LoadMoreButton />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
