import React, { useEffect, useState } from "react"
import styles from "./RotationChampions.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

type Props = {
    championObjectArray : any[]
}
type RotationChampion = {
    freeChampionIds?: number[];
    freeChampionIdsForNewPlayers?: number[];
    maxNewPlayerLevel?: number;
};

const RotationChampions = ({
    championObjectArray
} : Props) => {
    const navigate = useNavigate();
    // 로테이션 챔피언정보가 들어갈 Array
    const [rotationChampion, setRotationChampion] = useState<RotationChampion | undefined>(undefined); 
    // 로테이션 챔피언의 영문명을 담을 Array
    let findResult : any[] = []; 
    // 로테이션 챔피언 key값을 담을 Array
    let findKey : string[] = []; 

    // 로테이션챔피언 id를 불러오는 함수
    const getRotationData = () => {
        axios.get('http://localhost:4000/rotation')
            .then((response) => response.data)
            .then(result => setRotationChampion(result))
            .catch(error => console.log(error))
    };

    useEffect(() => {
        getRotationData();
    }, []);

    return (
        <>
            <h3 className={styles['rotation-title']}>이번 주 로테이션 챔피언</h3>
            <div className={styles['rotation-Container']}>
                {/* 로테이션챔피언의 ID값을 가진 배열에 대해 반복한다. */}
                {rotationChampion?.freeChampionIds?.map((id, index) => {
                    // 챔피언정보를 담고있는 championObjectArray를 반복하면서 key값과 id값이 일치하는 것에 대해서 findResult에 추가해준다.
                    championObjectArray?.forEach(obj => {
                        if (obj.key == id) {
                            findResult.push(obj.id);
                            findKey.push(obj.key);
                        }
                    })
                    return <React.Fragment key={id}>
                        <img 
                            src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${findResult[index]}.png`} 
                            onClick={() => navigate(`/championInfo/${findKey[index]}`)}
                            className={styles[`rotation-championImg`]}
                            alt={findResult[index]}
                        />
                    </React.Fragment>
                })}
            </div>
        </>
    )
}

export default RotationChampions;