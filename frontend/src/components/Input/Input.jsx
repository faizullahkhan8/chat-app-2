import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
    return <input {...props} className={styles.defaults} />;
};

export default Input;
