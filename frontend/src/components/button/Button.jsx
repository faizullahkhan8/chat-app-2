import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
    return (
        <button
            {...props}
            className={
                props.varients === "default" ? styles.default : styles.ghoost
            }
        >
            {props.children}
        </button>
    );
};

export default Button;
