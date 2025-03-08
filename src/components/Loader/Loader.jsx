import React, { useEffect } from "react";
import { quantum } from "ldrs";
import styles from "./Loader.module.css";

quantum.register();

const Loader = () => {
  useEffect(() => {
    quantum.register();
  }, []);

  return (
    <div className={styles.loaderWrapper}>
      <l-quantum size="45" speed="1.75" color="black"></l-quantum>
    </div>
  );
};

export default Loader;
