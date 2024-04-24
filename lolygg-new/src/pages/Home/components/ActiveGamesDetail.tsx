import React, { useEffect, useState } from "react";
import styles from "./ActiveGamesDetail.module.css";
import axios from 'axios';
import ChampionData from "../../../assets/data/Champions/ChampionData";
// import SpellData from "../../../assets/data/Spells/SpellData";

type Props = {
    activeGames : any;
}

const ActiveGamesDetail = ({
    activeGames,
} : Props) => {
    const championDataArray = Object.values(ChampionData[0].data); // 모든챔피언데이터 Object를 Array로 변환
    const spellDataArray = Object.values(SpellData[0].data); // 모든 스펠정보가 담긴 배열

    console.log(spellDataArray, "스펠 데이터")

    const playingSummonerId = []; // 플레이중인 소환사의 ID를 담을 Array
    const playingChampionArray = []; // 플레이중인 챔피언을 담을 Array
    const spell1Array = []; // 스펠1을 담울 Array
    const spell2Array = []; // 스펠2를 담을 Array
    
    const [activePlayersTier, setActivePlayersTier] = useState(); // 현재 게임 정보
    
    // 참가자들의 각 summonerId을 playingSummonerId 배열에 추가
    activeGames.participants?.forEach((participant, index) => {
        playingSummonerId?.push(participant.summonerId);
    })
    
    // 인게임 플레이어들의 티어를 가져오는 함수 (현재 문제있음)
    const getActivePlayersLeague = () => {
        axios.get('http://localhost:4000/activePlayersTier', {params : {playingSummonerId : playingSummonerId}})
        .then((response) => {
            return response.data;
        })
        .then(result => {
            setActivePlayersTier(result);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        // 현재 getActivePlayersLeague함수호출에 문제가 있어 실행 중지함.
        // getActivePlayersLeague() 
        
        // console.log(activePlayersTier, "activePlayersTier")
        // console.log(activeGames, "activeGames")
    }, [])

    return (
        <div>
            {/* 참가자 정보 */}
            {activeGames.participants?.map((participant, index) => {
                
                championDataArray.forEach((obj) => {
                    if (obj.key == participant.championId) {
                        playingChampionArray.push(obj.image.full);
                    }
                })

                spellDataArray.forEach((obj) => {
                    if (obj.key == participant.spell1Id) {
                        spell1Array.push(obj.image.full);
                    }
                })

                spellDataArray.forEach((obj) => {
                    if (obj.key == participant.spell2Id) {
                        spell2Array.push(obj.image.full);
                    }
                })

                return (
                    <div className={styles['participant-Container']} key={index}>
                        {participant.teamId === 100 ? <h4 className={styles['team-blue']}>블루팀</h4> : <h4 className={styles['team-red']}>레드팀</h4>}
                        <img 
                            src={`https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${playingChampionArray[index]}`}
                            onError={onErrorImg}
                            className={styles['playing-Champions']}
                        />
                        <section className={styles['spell-section']}>
                            <img 
                                src={`https://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/${spell1Array[index]}`}
                                onError={onErrorImg}
                                className={styles['spell']}
                            />
                            <img 
                                src={`https://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/${spell2Array[index]}`}
                                onError={onErrorImg}
                                className={styles['spell']}
                            />
                        </section>
                        <div className={styles[`participant-name`]}>{participant.summonerName}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default ActiveGamesDetail;