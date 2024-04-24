import styles from "./SummonerProfile.module.css";
import Emblem_Iron from "../../../assets/data/Emblems/Emblem_Iron.png"
import Emblem_Bronze from "./../../../assets/data/Emblems/Emblem_Bronze.png"
import Emblem_Silver from "./../../../assets/data/Emblems/Emblem_Silver.png"
import Emblem_Gold from "./../../../assets/data/Emblems/Emblem_Gold.png"
import Emblem_Platinum from "./../../../assets/data/Emblems/Emblem_Platinum.png"
import Emblem_Diamond from "./../../../assets/data/Emblems/Emblem_Diamond.png"
import Emblem_Master from "./../../../assets/data/Emblems/Emblem_Master.png"
import Emblem_Grandmaster from "./../../../assets/data/Emblems/Emblem_Grandmaster.png"
import Emblem_Challenger from "./../../../assets/data/Emblems/Emblem_Challenger.png"

type Props = {
    playerInformation : any;
    leagueList : any;
}

// 소환사 프로필 컴포넌트
const SummonerProfile = ({ playerInformation, leagueList } : Props) => {
    const emblemImgs = [{key : "IRON", Emblem : Emblem_Iron}, {key : "BRONZE", Emblem : Emblem_Bronze}, 
        {key : "SILVER", Emblem : Emblem_Silver}, {key : "GOLD", Emblem : Emblem_Gold},
        {key : "PLATINUM", Emblem : Emblem_Platinum}, {key : "DIAMOND", Emblem : Emblem_Diamond},
        {key : "MASTER", Emblem : Emblem_Master}, {key : "GRNADMASTER", Emblem : Emblem_Grandmaster}, 
        {key : "CHALLENGER", Emblem : Emblem_Challenger}];
    
    return (
        <>
            <div className={styles['summonerProfile-container']}>
                <div className={styles['summonerProfile-profile']}>
                    <img 
                        src={`http://ddragon.leagueoflegends.com/cdn/12.21.1/img/profileicon/${playerInformation.profileIconId}.png`} 
                        id={styles["summonerProfileIcon"]}
                        alt={playerInformation.profileIconId}
                    />
                    <div className={styles['summonerProfile-profile-userInfo']}>
                        <h3 id={styles["summonerName"]}>{playerInformation.name}</h3>
                        <h4 id={styles["summonerLevel"]}>Level {playerInformation.summonerLevel}</h4>
                    </div>

                </div>
                {/* 솔로랭크와 자유랭크의 순서를 솔로랭크가 먼저오게 하려고 map을 따로 구현 */}
                <div className={styles['summonerProfile-rankInfo']}>
                    {/* leagueList[0] 배열에서 원소가 없으면 Unranked가 나오게 구현 */}
                    {leagueList && leagueList[0].length === 0 ? <p className={styles['summonerProfile-unRanked']}>Unranked</p> : <p></p>}
                    {/* leagueList[0] 배열의 list 원소들 중에서 솔로랭크와 자유랭크를 구별하기 위해 map을 통해 접근, queueType으로 구별 */}
                    {leagueList && leagueList[0].map((list, index) => {
                        if(list.queueType === "RANKED_SOLO_5x5") {
                            return (
                                <ul className={styles['summonerProfile-soloRank']} key={index}>
                                    {/* 기존의 emblemImgs의 list는 leagueList[0]의 list와 겹치므로 imgList로 변경, 구별된 list로부터 티어 및 리그포인트에 접근하도록 수정 */}
                                    {emblemImgs.map((imgList) => {
                                        if(imgList.key == list.tier) {
                                            return (
                                                <li key={index}>
                                                    <img src={imgList.Emblem} className={styles['emblemImg']} alt={imgList.Emblem} />
                                                </li>
                                            )
                                        }
                                    })}
                                    <li>리그 : 솔로랭크 5X5</li>
                                    <li>티어 : {list.tier} {list.rank}</li>
                                    <li>리그 포인트 : {list.leaguePoints}</li>
                                    <li>{list.wins + list.losses}전 {list.wins}승 {list.losses}패</li>
                                </ul>
                            )
                        }
                    })}
                    {leagueList && leagueList[0].map((list, index) => {
                        {/* leagueList[0] 배열의 list 원소들 중에서 솔로랭크와 자유랭크를 구별하기 위해 map을 통해 접근, queueType으로 구별 */}
                        if(list.queueType === "RANKED_FLEX_SR") {
                            return (
                                <ul className={styles['summonerProfile-freeRank']} key={index}>
                                    {/* 기존의 emblemImgs의 list는 leagueList[0]의 list와 겹치므로 imgList로 변경, 구별된 list로부터 티어 및 리그포인트에 접근하도록 수정 */}
                                    {emblemImgs.map((imgList) => {
                                        if(imgList.key == list.tier) {
                                            return (
                                                <li key={index}>
                                                    <img src={imgList.Emblem} className={styles['emblemImg']} alt={imgList.Emblem}/>
                                                </li>
                                            )
                                        }
                                    })}
                                    <li>리그 : 자유랭크 5X5</li>
                                    <li>티어 : {list.tier} {list.rank}</li>
                                    <li>리그 포인트 : {list.leaguePoints}</li>
                                    <li>{list.wins + list.losses}전 {list.wins}승 {list.losses}패</li>
                                </ul>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default SummonerProfile;