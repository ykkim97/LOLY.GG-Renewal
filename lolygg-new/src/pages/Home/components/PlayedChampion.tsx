import React, { useEffect } from "react";

type Props = {
    gameData : any;
    index : number;
    // onErrorImg
    nickname : string;
}

// 플레이한 챔피언
const PlayedChampion = ({
    gameData,
    index,
    // onErrorImg,
    nickname,
} : Props) => {
    // useEffect(() => {
    //     console.log(gameData, "gameData")
    // }, [gameData])
    return (
        <>
            {gameData.info.participants.map(participant => {
                // gameData안의 각 participant의 summonrName과 디코딩된 nickname값이 대소문자구분없이 같을 경우 
                if (participant.summonerName.toUpperCase() === (decodeURIComponent(nickname)).toUpperCase()) {
                    return (
                        <div key={index}>
                            <img 
                                src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${participant.championName}.png`} 
                                // onError={onErrorImg} 
                                alt={participant.championName}
                            />
                            <h3>{participant.championName}</h3>
                        </div>
                    )
                }
            })}
        </>
    )
}

export default PlayedChampion;