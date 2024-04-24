import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChampionListComponent.module.css";

type Props = {
    championObjectArray : any[]
}

// 챔피언 리스트 컴포넌트
const ChampionListComponent = ({
    championObjectArray,
} : Props) => {
    const navigate = useNavigate();

    return (
        <>
            {championObjectArray.map((championName, index) => {
                return (
                    <div 
                        className={styles['championList-champContainer']} 
                        key={index}
                        onClick={() => {navigate(`/championInfo/${championObjectArray[index].key}`)}}
                    >
                        <img 
                            src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${championObjectArray[index].id}.png`} 
                            className={styles['championList-img']}
                            // onError={() => onErrorImg()}
                            alt={championObjectArray[index].id}
                        />
                        <div>{championObjectArray[index].name}</div>
                    </div>
                )})
            }
        </>
    )
}

export default ChampionListComponent;
