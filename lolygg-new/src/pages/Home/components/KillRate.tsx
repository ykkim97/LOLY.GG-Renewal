import React from "react";
type Props = {
    gameData : any;
    index : number;
    killsOfGamelist : any;
    nickname : string;
}


const KillRate = ({
    gameData,
    index,
    killsOfGamelist,
    nickname
} : Props) => {
    return (
        <>
            {gameData.info.participants.map((participant) => {
                // gameData안의 각 participant의 summonrName과 디코딩된 nickname값이 대소문자구분없이 같을 경우
                if (participant.summonerName.toUpperCase() === (decodeURIComponent(nickname)).toUpperCase()) {
                    return (
                        <div key={index}>
                            {/* 소환사의 킬과 어시스트의 합을 소환사가 속한 팀의 전체 킬수로 나누고, 비율을 구함 */}
                            <p>킬관여 : {((participant.kills + participant.assists) / killsOfGamelist[index] * 100).toFixed(0)}%</p>
                        </div>
                    )
                }
            })}
        </>
    )
}


export default KillRate;