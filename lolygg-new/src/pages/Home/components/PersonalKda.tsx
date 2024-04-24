import React from "react";

type Props = {
    gameData : any;
    index : number;
    nickname : string;
}

// 개인 KDA 
const PersonalKda = ({
    gameData,
    index,
    nickname,
} : Props) => {
    return (
        <>
            {gameData.info.participants.map(participant => {
                // gameData안의 각 participant의 summonrName과 디코딩된 nickname값이 대소문자구분없이 같을 경우
                if (participant.summonerName.toUpperCase() === (decodeURIComponent(nickname)).toUpperCase()) {
                    return (
                        <div key={index}>
                            {/* KDA */}
                            <h3>{participant.kills}/{participant.deaths}/{participant.assists}</h3>
                            {/* 평점 */}

                            {/* participant.deaths가 0인 경우 평점이 제대로 나오지 않는 현상 발생, 삼항연산자로 0인 경우에 Perfect가 나오게 수정*/}
                            <p>{((participant.deaths === 0 ? "Perfect" : ((participant.kills + participant.assists) / participant.deaths).toFixed(2)))} 평점</p>
                        </div>
                    )
                }
            })}
        </>
    )
}

export default PersonalKda;