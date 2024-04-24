import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <>
            <header className={styles['Footer-Container']}>
                <h2 className={styles['Footer-title']}>LOLY.GG</h2>
                <h3 className={styles['Footer-copyright']}>Copyright 2024. (ykkim97) All rights reserved.</h3>
            </header>
        </>
    )
}

export default Footer;