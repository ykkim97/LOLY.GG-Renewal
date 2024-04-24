import React, { useEffect, useState } from "react"
import styles from "./RotationChampions.module.css"
import axios from "axios"

type Props = {
    championObjectArray : any[]
}

const RotationChampions = ({
    championObjectArray
} : Props) => {
    const [rotationChampion, setRotationChampion] = useState([]); // 로테이션 챔피언정보가 들어갈 Array

    let findResult : any[] = []; // 로테이션 챔피언의 영문명을 담을 Array

    // 로테이션챔피언 id를 불러오는 함수
    const getRotationData = () => {
        axios.get('http://localhost:4000/rotation')
            .then((response) => response.data)
            .then(result => setRotationChampion(result))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getRotationData();
    }, [])

    useEffect(() => {
        console.log(rotationChampion, "rotationChampion")
    }, [rotationChampion])

    return (
        <>
            <h3 className={styles['rotation-title']}>이번 주 로테이션 챔피언</h3>
            <div className={styles['rotation-Container']}>
                {/* 로테이션챔피언의 ID값을 가진 배열에 대해 반복한다. */}
                {rotationChampion.freeChampionIds?.map((id, index) => {
                    // 챔피언정보를 담고있는 championObjectArray를 반복하면서 key값과 id값이 일치하는 것에 대해서 findResult에 추가해준다.
                    championObjectArray?.forEach(obj => {
                        if (obj.key == id) findResult.push(obj.id)
                    })
                    return <React.Fragment key={id}>
                        <img 
                            src={`https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${findResult[index]}.png`} 
                            // onError={() => onErrorImg()}
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