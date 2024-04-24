import styles from "./championInfo.module.css";
import RotationChampions from "./components/RotationChampions";
import championData from "../../assets/data/Champions/ChampionData.ts";
import ChampionListComponent from "./components/ChampionListComponent.tsx";

const ChampionInfo = ( ) => {
    const values = Object.values(championData[0]);
    const championObjectArray = Object.values(values[3]); 
    console.log(championObjectArray)

    return (
        <>
            <h3 className={styles['championInfo-title']}>챔피언</h3>
            {/* 로테이션 챔피언정보 */}
            <div>
                <RotationChampions 
                    // onErrorImg={onErrorImg} 
                    championObjectArray={championObjectArray} 
                />
            </div>
            {/* 챔피언 리스트 */}
            <div className={styles['championInfo-container']}>
                <ChampionListComponent 
                    // onErrorImg={onErrorImg} 
                    championObjectArray={championObjectArray}
                />
            </div>
        </>
    )
}

export default ChampionInfo;