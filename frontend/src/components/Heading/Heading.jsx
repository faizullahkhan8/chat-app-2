import React from "react";
import styles from "./Heading.module.css";

const Heading = ({ children, size = "md" }) => {
    return (
        <h1 className={`${styles.defaults} ${size === "lg" ? styles.lg : ""}`}>
            {children}
        </h1>
    );
};

export default Heading;
