import { FcSearch } from "react-icons/fc";
import style from "./home.module.css";
import { useEffect, useRef, useState } from "react";
import Match from "./Match";

type Props = {
    searchText : string;
    setSearchText : React.Dispatch<React.SetStateAction<string>>;
    tagLineText : string;
    setTagLineText : React.Dispatch<React.SetStateAction<string>>;
    playerInformation : any[];
    proficiency : any[];
    gameList : any[]; 
    leagueList : any[];
    activeGames : any[];
    getPlayerInformation :() => void;
    getPlayerGames :() => void;
    getPlayerLeague :() => void;
    getProficiency :() => void;
    // onErrorImg,
    getActiveGames :() => void;
}

const Home = ({
    searchText, 
    setSearchText,
    tagLineText,
    setTagLineText,
    playerInformation, 
    proficiency,
    gameList, 
    leagueList,
    activeGames,
    getPlayerInformation,
    getPlayerGames,
    getPlayerLeague,
    getProficiency,
    getActiveGames,
} : Props) => {
    const searchInputRef = useRef(); // 검색창에 focus를 주기위해 useRef()를 사용하여 searchInputRef에 담기
    const [nickname, setNickname] = useState(''); // searchText를 새로 저장하기 위해 nickname을 만듬
    // 검색버튼 onClick 함수
    const searchClick = () => {
        getPlayerInformation();
        getPlayerGames();
        getPlayerLeague();
        getProficiency();
        getActiveGames();
        // 검색할 닉네임을 타이핑하고 클릭을 누를 경우 최종 검색할 닉네임을 nickname에 저장하도록 한다.
        // 이후 nickname값을 Match 컴포넌트에 props로 전달한다.
        setNickname(searchText); 
    }

    // Enter키로도 검색할 수 있도록 하기위한 함수
    const onEnterPress = (e) => {
        if (e.key == 'Enter') {
            searchClick();
        }
    }

    useEffect(() => {
        console.log(searchText,"searchText")
        console.log(tagLineText,"tagLineText")
    }, [searchText, tagLineText])

    return (
        <>
            <div className={style['search-container']}>
                <h1>LOLY.GG</h1>
                <h5>소환사명을 검색하세요!</h5>
                <div>
                    <input 
                        type="text" 
                        className={style['app-searchBox1']}
                        onChange={(e) => {
                            setSearchText((prev) => {
                                return prev = encodeURIComponent(e.target.value);
                            });
                        }}
                        placeholder="소환사명"
                        onKeyPress={onEnterPress}
                        spellCheck="false"
                        // ref={searchInputRef}
                    />
                    <input 
                        type="text"
                        onChange={(e) => {
                            setTagLineText((prev) => {
                                return prev = encodeURIComponent(e.target.value);
                            })
                        }}
                        placeholder="태그 (# 제외)"
                        className={style['app-searchBox2']}
                    />
                    {/* 검색버튼 */}
                    <button type="submit" name="submit" onClick={searchClick} className={style['app-searchButton']} >
                        <FcSearch className={style['app-searchButton-icons']}/>
                    </button>
                </div>
            </div>

            {/* 매치기록 */}
            <div className={style['match-record']}>
                <Match 
                    playerInformation={playerInformation} 
                    proficiency={proficiency}
                    gameList={gameList} 
                    leagueList={leagueList} 
                    // onErrorImg={onErrorImg}
                    nickname={nickname}
                    activeGames={activeGames}
                />
            </div>
        </>
    )
}

export default Home;