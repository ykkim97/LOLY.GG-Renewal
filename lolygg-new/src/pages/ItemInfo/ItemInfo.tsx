import React, { useEffect, useState } from "react";
import styles from "./ItemInfo.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ItemInfo = () => {
    const [itemArray, setItemArray] = useState([]);
    const [itemObject, setItemObject] = useState({});
    const navigate = useNavigate();

    // 아이템 정보를 가져오는 함수
    const getItemInfomation = () => {
        axios.get('http://localhost:4000/item')
            .then(response => {
                return response.data.data
            })
            .then(result => {
                setItemObject(result)
                setItemArray(Object.values(result))
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getItemInfomation();
    }, [])

    return (
        <>
            <h3 className={styles['ItemInfo-title']}>아이템</h3>
            <div className={styles['ItemInfo-container']}>
                {itemArray.map((it, index) => (
                    <div className={styles['ItemInfo-item']}
                        onClick={() => {
                            let param;
                            for (let key in itemObject) {
                                if (it.image.full.includes(key)) {
                                    param = key;
                                }
                            }
                            navigate(`/item/${param}`)
                        }}
                        key={index}
                    >
                        <img 
                            src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/${it.image.full}`} 
                            // onError={onErrorImg} 
                            alt={it.name} 
                            className={styles['item-img']}
                        />
                        <h4>{it.name}</h4>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ItemInfo;