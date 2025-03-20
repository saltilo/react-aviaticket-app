import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";
import logo from "../../assets/images/Logo.png";

const Header = () => {
  const allTickets = useSelector((state) => state.tickets.allTickets);
  const [showSpinner, setShowSpinner] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (allTickets.length >= 10000 && !completed) {
      setCompleted(true);
      setTimeout(() => {
        setShowSpinner(false);
      }, 3000);
    }
  }, [allTickets.length, completed]);

  return (
    <>
      <img src={logo} alt="Логотип" className={styles.logo} />
      {showSpinner && (
        <div className={styles.fixedSpinner}>
          {!completed ? (
            <>
              <LoadingOutlined
                style={{ fontSize: 16, color: "#2196f3" }}
                spin
              />
              <span className={styles.spinnerText}>Загрузка данных...</span>
            </>
          ) : (
            <span className={styles.spinnerText}> ✅ Загрузка завершена</span>
          )}
        </div>
      )}
      <div className={styles.header}></div>
    </>
  );
};

export default Header;
