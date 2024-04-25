import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UpItem.module.css";

type Props = {
    findItemObject : any;
    itemObject : any;
}

const UpItem = ({ findItemObject, itemObject } : Props) => {
    const navigate = useNavigate();

    return (
        <>
            <h3 className={styles['item-desc']}>상위 아이템</h3>
            {findItemObject.into?.map((id, index) => (
                <div 
                    className={styles['UpItem']}
                    onClick={() => {navigate(`/item/${id}`)}}
                >
                    <img 
                        src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/${id}.png`} 
                        alt={findItemObject.name}
                        id={styles['UpItem-img']}
                    />
                    <h5>{itemObject[id].name}</h5>
                </div>
            ))}
        </>
    )
}

export default UpItem;
