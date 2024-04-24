import React, { useEffect } from "react";
import styles from "./ActiveGames.module.css";
import ChampionData from "../../../assets/data/Champions/ChampionData";
import ActiveGamesDetail from "./ActiveGamesDetail";

type Props = {
    activeGames : any;
}

const ActiveGames = ({
    activeGames,
    // onErrorImg,
} : Props) => {

    const championDataArray : any[] = Object.values(ChampionData[0].data); // 모든챔피언데이터 Object를 Array로 변환
    const bannedChampionArray : any[] = []; // 밴된 챔피언 이미지경로값을 담을 Array

    return (
        <div>
            {typeof activeGames !== 'object' 
                ? <div className={styles['activeGames-Container']}>현재 게임중이 아닙니다.</div> 
                : <div className={styles['activeGames-Container']}>
                    {/* 게임 모드 */}
                    <h3 id={styles['gameMode']}>
                        {activeGames.gameMode}
                    </h3>
                    {/* 밴픽 */}
                    <div className={styles['banned-Container']}>
                        <h3>밴픽</h3>
                        {activeGames.bannedChampions?.map((champion, index) => {
                            championDataArray.forEach((obj) => {
                                if (obj.key == champion.championId) {
                                    bannedChampionArray.push(obj.image.full);
                                }
                            })
                            return (
                                <img 
                                    src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${bannedChampionArray[index]}`}
                                    // onError={onErrorImg}
                                    className={styles['banned-Champions']}
                                    key={index}
                                />
                            )
                        })}
                    </div>
                    {/* 참가자 정보 */}
                    <ActiveGamesDetail 
                        activeGames = {activeGames}
                        // onErrorImg = {onErrorImg}
                    />
                </div>
            }
        </div>
    )
}

export default ActiveGames;