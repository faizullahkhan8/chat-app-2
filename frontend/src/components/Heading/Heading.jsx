import React from "react";
import styles from "./Heading.module.css";

const Heading = ({ children, size = "md" }) => {
    return (
        <h1
            className={`${styles.defaults} ${size === "lg" ? styles.lg : ""} ${
                size === "md" ? styles.md : ""
            }`}
        >
            {children}
        </h1>
    );
};

export default Heading;
