import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <>
            <header className={styles['Footer-Container']}>
                <h2 className={styles['Footer-title']}>LOLY.GG</h2>
                <h3 className={styles['Footer-copyright']}>Copyright 2024. (ykkim97) All rights reserved. 본 서비스는 상업적용도로 사용하지 않습니다.</h3>
                <h3 className={styles['Footer-copyright']}>Contact : 97ykkim@naver.com</h3>
            </header>
        </>
    )
}

export default Footer;