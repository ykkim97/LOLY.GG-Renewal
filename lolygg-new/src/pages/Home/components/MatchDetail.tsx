import React from "react";
import styles from "./MatchDetail.module.css";

type Props = {
    gameData : any;
}

// 매치 상세기록 컴포넌트
const MatchDetail = ({ gameData } : Props) => {

    return (
        <div>
            {gameData.info.participants.map((participant, index) => {
                // 승리한 팀
                if (participant.win === true) {
                    return  (
                        <div className={styles[`gameData-detail-win-container`]} key={index}>
                            <div className={styles[`detail-list`]}>
                                {/* 소환사가 플레이한 챔피언의 이미지 */}
                                <div className={styles[`participant-img`]}>
                                    <img 
                                        src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${participant.championName}.png`}
                                        className={styles['gameData-championMiniFaceImg']}
                                        // onError={onErrorImg}
                                        alt={participant.championName}
                                    />
                                </div>
                                {/* 소환사명 */}
                                <div className={styles[`participant-name`]}>{participant.summonerName}</div>
                                {/* KDA */}
                                <div className={styles[`participant-kda`]}>{participant.kills}/{participant.deaths}/{participant.assists}</div>
                                {/* 챔피언에 가한 피해량 */}
                                <div className={styles[`participant-total-damage-champions`]}>챔피언 딜량 : {participant.totalDamageDealtToChampions}</div>
                                {/* CS수 */}
                                <div className={styles[`participant-total-minions-killed`]}>CS : {participant.totalMinionsKilled + participant.neutralMinionsKilled}</div>
                                {/* 와드 설치 */}
                                <div className={styles[`participant-total-wards-placed`]}>와드 설치 : {participant.wardsPlaced}</div>
                                {/* 아이템이미지 */}
                                <div className={styles[`participant-item`]}> 
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/${participant.item0}.png`} alt={participant.item0} />
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/${participant.item1}.png`} alt={participant.item1} />
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/${participant.item2}.png`} alt={participant.item2} />
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/${participant.item3}.png`} alt={participant.item3} />
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/${participant.item4}.png`} alt={participant.item4} />
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/${participant.item5}.png`} alt={participant.item5} />
                                </div>
                            </div>
                        </div>
                    )
                }
                // 패배한 팀
                if (participant.win === false) {           
                    return (
                        <div className={styles[`gameData-detail-lose-container`]} key={index}>
                            <div className={styles[`detail-list`]}>
                                {/* 소환사가 플레이한 챔피언의 이미지 */}
                                <div className={styles[`participant-img`]}>
                                    <img 
                                        src={`https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${participant.championName}.png`}
                                        className={styles['gameData-championMiniFaceImg']}
                                        // onError={onErrorImg}
                                        alt={participant.championName}
                                    />
                                </div>
                                {/* 소환사명 */}
                                <div className={styles[`participant-name`]}>{participant.summonerName}</div>
                                {/* KDA */}
                                <div className={styles[`participant-kda`]}>{participant.kills}/{participant.deaths}/{participant.assists}</div>
                                {/* 챔피언에 가한 피해량 */}
                                <div className={styles[`participant-total-damage-champions`]}>챔피언 딜량 : {participant.totalDamageDealtToChampions}</div>
                                {/* CS수 */}
                                <div className={styles[`participant-total-minions-killed`]}>CS : {participant.totalMinionsKilled + participant.neutralMinionsKilled}</div>
                                {/* 와드 설치 */}
                                <div className={styles[`participant-total-wards-placed`]}>와드 설치 : {participant.wardsPlaced}</div>
                                {/* 아이템이미지 */}
                                <div className={styles[`participant-item`]}> 
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/${participant.item0}.png`}  alt={participant.item0}/>
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/${participant.item1}.png`}  alt={participant.item1}/>
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/${participant.item2}.png`}  alt={participant.item2}/>
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/${participant.item3}.png`}  alt={participant.item3}/>
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/${participant.item4}.png`}  alt={participant.item4}/>
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/${participant.item5}.png`}  alt={participant.item5}/>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default MatchDetail;