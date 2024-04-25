import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ChampionDetailInfo.module.css";
import championData from "../../assets/data/Champions/ChampionData";

type Props = {
    item : any;
}

// 챔피언상세정보 컴포넌트
const ChampionDetailInfo = ({
    item,
    // onErrorImg,
} : Props) => {
    const { id } = useParams();

    // 모든 챔피언의 정보가 들어있는 배열을 championArray에 저장
    const championArray = Object.values(championData[0].data)
    // championArray에서 useParams로 부터 얻은 id값과 챔피언의 key값이 같은 Object를 찾기
    let findChampionObject = championArray.find(champ => champ.key === id); 

    const statsArray = Object.entries(findChampionObject.stats);
    const championDetailArray = [];
    let championDetailEntries = [];
    let spellsArray = [];
    let passiveArray = [];
    let recommendedArray = [];
    let recoSRItemArray = [];
    
    const skillKeys = ['Q','W','E','R']; // 스킬 단축키

    const [skills, setSkills] = useState([]) // 챔피언 스킬 정보
    const [passive, setPassive] = useState({}) // 챔피언 패시브 정보
    const [recoItem, setRecoItem] = useState([]); // 추천 아이템 정보

    // 챔피언세부정보를 요청하는 함수
    const getChampionDetail = async () => {
        // 해당 url으로 ajax요청하여 가공한 후 championDetailEntries에 저장
        // const data = await axios.get(`https://ddragon.leagueoflegends.com/cdn/10.24.1/data/ko_KR/champion/${findChampionObject.id}.json`)
        const data = await axios.get(`https://ddragon.leagueoflegends.com/cdn/14.8.1/data/ko_KR/champion/${findChampionObject.id}.json`)
            .then((response) => response.data)
        championDetailArray.push(data)
        championDetailEntries = Object.values(championDetailArray[0].data)
        
        // championDetailEntries로 부터 스펠, 패시브, 추천아이템 정보를 추출
        spellsArray = championDetailEntries[0].spells;
        passiveArray = championDetailEntries[0].passive;
        recommendedArray = championDetailEntries[0].recommended;

        // mode값이 'CLASSIC'인 것을 찾아서 recoSRItemArray에 저장(일반 5X5게임 기준 추천아이템을 구현하기 위해)
        recoSRItemArray = recommendedArray.find(reco => reco.mode === 'CLASSIC')

        // 각 state를 그에 맞게 변경
        setSkills([...spellsArray]);
        setPassive(passiveArray);
        setRecoItem(recoSRItemArray.blocks);
    }

    useEffect(() => {
        getChampionDetail(); // 챔피언세부정보를 요청하는 함수 실행
    }, [])

    return (
        <>
            <div className={styles['championDetailInfo-profileContainer']}>
                {/* 챔피언명과 챔피언컨셉 및 설명을 표시하는 부분 */}
                <div className={styles['championDetailInfo-profile']}>
                    <img 
                        src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${findChampionObject.id}.png`} 
                        id={styles['championDetailInfo-img']}
                        // onError={onErrorImg}
                        alt={findChampionObject.id}
                    />
                    <h1 id={styles['champion-name']}>{findChampionObject.name}</h1>
                    <h3 id={styles['champion-title']}>{findChampionObject.title}</h3>
                    <div id={styles['champion-blurb']}>{findChampionObject.blurb}</div>
                </div>
                {/* 챔피언의 기본 스탯을 표시하는 부분 */}
                <div className={styles['championDetailInfo-stats']}>
                    {statsArray.map((stat, index) => (
                        <div key={index} className={styles['stats-contents']}>
                            <div>{stat[0]}</div>
                            <div>{stat[1]}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles['championDetailInfo-skillsContainer']}>
                <h2 className={styles['skillsContainer-title']}>스킬 정보</h2>
                {/* 패시브 */}
                <div className={styles['skillsContainer-descriptionBox']}>
                    {/* 패시브 이미지 - passive.image.full값을 이용하여 이미지를 불러옴, 일부데이터는 없는 경우가 있을 수 있음. */}
                    <img 
                        src={`http://ddragon.leagueoflegends.com/cdn/14.8.1/img/passive/${passive.image?.full}`} 
                        className={styles['skillsContainer-img']}
                        // onError={onErrorImg}
                        alt={passive.image?.full}
                    />
                    {/* 패시브 이름과 설명 */}
                    <div className={styles['skillsContainer-description']}>
                        <h4>{passive.name} (Passive)</h4>
                        {passive.description}
                    </div>
                </div>
                {/* Q, W, E, R 스킬 */}
                {skills.map((skill, index) => (
                    <div key={index} className={styles['skillsContainer-descriptionBox']}>
                        {/* 스킬 이미지 - skill.id값을 이용하여 이미지를 불러옴, 일부데이터는 없는 경우가 있을 수 있음. */}
                        <img 
                            src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/spell/${skill.id}.png`} 
                            className={styles['skillsContainer-img']}
                            // onError={onErrorImg}
                            alt={skill.id}
                        />
                        {/* 스킬 이름과 설명 */}
                        <div className={styles['skillsContainer-description']}>
                            <h4>{skill.name} ({skillKeys[index]})</h4>
                            {skill.description}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles['recommendedItem-AllContainer']}>
                <h2 className={styles['recommendedItem-title']}>추천 아이템</h2>
                <div className={styles['recommendedItem-box']}>
                    {recoItem.map((block, index) => {
                        return (
                            // 추천아이템정보가 담겨있는 recoItem을 map으로 반복
                            <div key={index} className={styles['recommendedItem-container']}>
                                <h3 id={styles['item-type']}>{block.type}</h3>
                                {block.items.map((reco, i) => {
                                    // 모든아이템 정보가 담겨있는 item에서 item.data의 key값은 각 아이템의 id값을 나타내고 있음.
                                    let itemName = '';
                                    for (let key in item.data) {
                                        // 추천아이템의 id값인 reco.id와 item.data의 key값을 비교해서 서로 같으면 그 아이템의 이름을 itemName에 저장함.
                                        if (key === reco.id) itemName = item.data[key].name
                                    }

                                    return (
                                        <div className={styles['item-container']} key={i}>
                                            {/* 추천아이템 이미지 */}
                                            <img 
                                                src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/${reco.id}.png`} 
                                                // onError={onErrorImg}
                                                alt={reco.id}
                                            />
                                            {/* 추천아이템 이름 */}
                                            <h5>{itemName}</h5>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
        
    )
}

export default ChampionDetailInfo;