import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DownItem.module.css";

type Props = {
    findItemObject : any;
    itemObject : any;
}

const DownItem = ({ findItemObject, itemObject } : Props) => {
    const navigate = useNavigate();

    return (
        <>
            <h3 className={styles['item-desc']}>하위 아이템</h3>
            {findItemObject.from?.map((id, index) => (
                <div 
                    className={styles['DownItem']}
                    onClick={() => {navigate(`/item/${id}`)}}
                >
                    <img 
                        src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/${id}.png`} 
                        alt={findItemObject.name} 
                        id={styles['DownItem-img']}
                    />
                    <h5 id={styles['DownItem-itemName']}>{itemObject[id].name}</h5>
                </div>
            ))}
        </>
    )
}

export default DownItem;
