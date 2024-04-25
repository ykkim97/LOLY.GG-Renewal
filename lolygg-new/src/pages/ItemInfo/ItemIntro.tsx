import React from "react";
import styles from "./ItemIntro.module.css";

type Props = {
    findItemObject : any;
}

const ItemIntro = ({ 
    findItemObject,
} : Props) => {
    return (
        <>
            <div className={styles['itemIntro-imgContainer']}>
                <img 
                    src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/${findItemObject.image.full}`} 
                    alt={findItemObject.name} 
                    className={styles['itemIntro-img']}
                />
            </div>
            <section className={styles['itemIntro-infoContainer']}>
                <h1 id={styles['item-name']}>{findItemObject.name}</h1>
                <h3 id={styles['item-gold']}>{findItemObject.gold.total} Gold</h3>
                <section>
                    <h3 id={styles['item-simpledesc']}>{findItemObject.plaintext}</h3>
                    <h4 id={styles['item-detaildesc']}>{findItemObject.description.replace(/<[^>]*>?/g, '')}</h4>
                </section>
            </section>
        </>
    )
}

export default ItemIntro;