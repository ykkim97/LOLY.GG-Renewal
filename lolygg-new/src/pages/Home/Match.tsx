import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import styles from "./match.module.css";
import SummonerProfile from "./components/SummonerProfile";
import Proficiency from "./components/Proficiency";
import ActiveGames from "./components/ActiveGames";
import PlayedChampion from "./components/PlayedChampion";
import PersonalKda from "./components/PersonalKda";
import KillRate from "./components/KillRate";
import ParticipantsData from "./components/ParticipantsData";
import MatchDetail from "./components/MatchDetail";
import Background from "../components/Background";

type Props = {
    playerInformation: any;
    proficiency : any;
    gameList : any;
    leagueList :any;
    // onErrorImg,
    nickname : string;
    activeGames : any;
}

const Match = ({ 
    playerInformation, 
    proficiency,
    gameList, 
    leagueList, 
    // onErrorImg,
    nickname,
    activeGames,
} : Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const summonerTeamIdsOfGamelist : string[] = []; // 소환사가 속한 팀의 teamId들을 저장할 summonerTeamIdsOfGamelist 배열 생성
    const killsOfGamelist : any[] = []; // 소환사가 속한 팀의 전체 킬 수들을 저장할 killsOfGamelist 배열 생성
    const summonerTeamIsWin : any[] = []; // 소환사가 속한 팀의 승리 여부들을 저장할 summonerTeamIsWin 배열 생성
    const visibleArr : boolean[] = []; // visible state를 초기화 및 변경하기 위해 사용하는 배열 생성

    const [visible, setVisible] = useState([...visibleArr]); // 매치상세기록이 열려있는지 판단하기위한 state
    const [open, setOpen] = useState(false); // 상세기록컴포넌트를 열고 닫을 때 사용할 state
    const [isClickedActiveGames, setIsClickedActiveGames] = useState(false);

    gameList.map((gameData, index) => {
        visibleArr.push(false)
        gameData.info.participants.map(participant => {
            // gameData안의 각 participant의 summonrName과 디코딩된 searchText값이 대소문자구분없이 같을 경우 
            if (participant.summonerName.toUpperCase() === (decodeURIComponent(nickname)).toUpperCase()) {
                // 검색된 소환사의 teamId를 summonerTeamIdsOfGamelist 배열에 추가 
                summonerTeamIdsOfGamelist.push(participant.teamId)
            }
        })
        gameData.info.teams.map(team => {
            // gameData의 팀들 중에서 검색된 소환사의 teamId를 비교 
            if (team.teamId === summonerTeamIdsOfGamelist[index]) {
                // 해당 팀의 전체 킬 수를 killsOfGamelist 배열에 추가
                // 해당 팀의 승리 여부를 summonerTeamIsWin 배열에 추가
                killsOfGamelist.push(team.objectives.champion.kills)
                summonerTeamIsWin.push(team.win)
            }
        })
    })

    // visible : [false, false, false, false, false, false, false, false, false, false] 초기화
    useEffect(() => {
        setVisible([...visibleArr])
    }, [])

    return (
        <>
            {nickname === '' ?
                <div>
                    <Background />
                </div> : 
                (
                    gameList.length !== 0 ? 
                    <>
                        <h3 className={styles["gameData-title"]}>검색 결과</h3>
                        <SummonerProfile
                            playerInformation={playerInformation}
                            leagueList={leagueList} 
                        />
                        {/* 숙련도 TOP 3 */}
                        <Proficiency proficiency={proficiency}/>

                        {/* 현재 게임 정보 */}
                        <button 
                            onClick={() => { 
                                setIsClickedActiveGames(prev => !prev)
                            }}
                            className={styles['activeGames-button']}
                            title="현재 인게임 정보를 확인하세요!"
                        >인게임 정보</button>
                        {isClickedActiveGames && 
                            <ActiveGames 
                                activeGames={activeGames} 
                            />
                        }

                        {
                            gameList.map((gameData, index) => (
                                <div key={index}>
                                    {/* summonerTeamIsWin 배열의 해당 매치 기록의 승패를 확인하여 className을 변경 */}
                                    <div className={styles[`gameData-${summonerTeamIsWin[index] ? 'win' : 'lose'}-container`]}>
                                        <h4 className={styles['gameData-gamemode']}>{gameData.info.gameMode}</h4>
                                        {/* 플레이한 챔피언 */}
                                        <div className={styles['gameData-champion']}>
                                            <PlayedChampion 
                                                gameData={gameData}
                                                index={index}
                                                // onErrorImg={onErrorImg}
                                                nickname={nickname}
                                            />
                                        </div>
                                        {/* 개인 KDA 기록 */}
                                        <div className={styles['gameData-kda']}>
                                            <PersonalKda 
                                                gameData={gameData}
                                                index={index}
                                                nickname={nickname}
                                            />
                                        </div>
                                        {/* 킬 관여 */}
                                        <div className={styles['gameData-individual']}>
                                            <KillRate 
                                                gameData={gameData}
                                                index={index}
                                                killsOfGamelist={killsOfGamelist}
                                                nickname={nickname}
                                            />
                                        </div>
                                        {/* 참가자 정보 */}
                                        <div className={styles['gameData-team']}>
                                            {/* Team 1 */}
                                            <div className={styles['gameData-team1']}>
                                                <p className={styles['gameData-teamtitle']}>Team 1</p>
                                                <ul>
                                                    {gameData.info.participants.map((participant, index) => {
                                                        if (index < 5) {
                                                            return (
                                                                <React.Fragment key={index}>
                                                                    <ParticipantsData 
                                                                        participant={participant}
                                                                        index={index}
                                                                        // onErrorImg={onErrorImg}
                                                                    />
                                                                </React.Fragment>
                                                            )
                                                        }
                                                    })}
                                                </ul>
                                            </div>
                                            {/* Team 2 */}
                                            <div className={styles['gameData-team2']}>
                                                <p className={styles['gameData-teamtitle']}>Team 2</p>
                                                <ul>
                                                    {gameData.info.participants.map((participant, index) => {
                                                        if (index >= 5 && index < 10) {
                                                            return (
                                                                <React.Fragment key={index}>
                                                                    <ParticipantsData 
                                                                        participant={participant}
                                                                        index={index}
                                                                        // onErrorImg={onErrorImg}
                                                                    />
                                                                </React.Fragment>
                                                            )
                                                        }
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        {/* 상세기록보기 버튼 */}
                                        <div>
                                            <button onClick={() => {
                                                // 클릭할 경우 open을 바꿔줌 (true면 false로, false면 true로)
                                                setOpen(prev => !prev);

                                                // 만약에 open이 true면? 모달창이 열려있다는 뜻
                                                if (open === true) {
                                                    visibleArr[index] = true;
                                                    setVisible([...visibleArr])
                                                    
                                                } else {
                                                    visibleArr[index] = false;
                                                    setVisible([...visibleArr])
                                                }
                                            }} className={styles['match-detail-button']} >
                                                <FaArrowDown />
                                            </button>
                                            
                                        </div>
                                    </div>
                                    
                                    {visible[index] !== true ? // 해당 인덱스가 true일 경우에 상세기록컴포넌트를 보여준다.
                                        null :   
                                        <div>
                                            {/* 매치상세기록 컴포넌트 */}
                                            <MatchDetail 
                                                gameData={gameData}
                                                // onErrorImg={onErrorImg}
                                            />
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </> : null
                )
            }
            
        </>
    )
}

export default Match;