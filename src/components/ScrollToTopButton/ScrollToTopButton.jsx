import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import styles from "./ScrollToTopButton.module.scss";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setVisible(scrollTop > 200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      type="primary"
      icon={<ArrowUpOutlined />}
      onClick={scrollToTop}
      className={styles.scrollToTop}>
      Наверх
    </Button>
  );
};

export default ScrollToTopButton;
