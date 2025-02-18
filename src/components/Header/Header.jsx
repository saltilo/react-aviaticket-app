import React from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/images/Logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Логотип" className={styles.logo} />
    </header>
  );
};

export default Header;
