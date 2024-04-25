import React from "react";
import styles from "./ItemDetailInfo.module.css";
import { useParams } from "react-router-dom";
import DownItem from "./DownItem";
import UpItem from "./UpItem";
import ItemIntro from "./ItemIntro";

type Props = {
    item : any
}

const ItemDetailInfo = ({ 
    // onErrorImg,
    item
} : Props) => {
    let { id } = useParams();
    const itemObject = item.data;
    const itemArray = Object.values(itemObject);
    // image.full에 id가 포함되어 있는 것을 찾는다.
    let findItemObject = itemArray.find(item => item.image.full.includes(id));

    return (
        <div className={styles['itemDetailInfo-Container']}>
            <section className={styles['itemDetail-headerInfo']}>
                <ItemIntro
                    // onErrorImg={onErrorImg}
                    findItemObject={findItemObject}
                />
            </section> 

            <section className={styles['itemDetail-mainInfo']}>
                {findItemObject.hasOwnProperty('from') ?
                    <DownItem 
                        // onErrorImg={onErrorImg}
                        itemObject={itemObject}
                        findItemObject={findItemObject}
                    /> : (
                        <div>
                            <h3 className={styles['item-desc']}>하위 아이템</h3>
                            <p className={styles['item-desc']}>최하위 아이템 입니다.</p>
                        </div>
                    )
                }
                {findItemObject.hasOwnProperty('into') ?
                    <UpItem 
                        // onErrorImg={onErrorImg}
                        itemObject={itemObject}
                        findItemObject={findItemObject}
                    /> : (
                        <div>
                            <h3 className={styles['item-desc']}>상위 아이템</h3>
                            <p className={styles['item-desc']}>최상위 아이템 입니다.</p>
                        </div>
                    )
                }
            </section>
        </div>
    )
}

export default ItemDetailInfo;