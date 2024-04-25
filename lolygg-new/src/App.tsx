import './App.css'
import Layout from './Layout'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import ChampionInfo from './pages/ChampionInfo/ChampionInfo'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ItemInfo from './pages/ItemInfo/ItemInfo'
import ItemDetailInfo from './pages/ItemInfo/ItemDetailInfo'


function App() {
  const [searchText, setSearchText] = useState(''); // 검색문자열
  const [tagLineText, setTagLineText] = useState('') // 유저 태그
  const [playerInformation, setPlayerInformation] = useState([]); // 소환사 정보가 들어갈 Array
  const [gameList, setGameList] = useState([]); // 매치정보가 들어갈 Array
  const [leagueList, setLeagueList] = useState([]); // 소환사 리그정보(티어정보)가 들어갈 Array
  const [item, setItem] = useState([]); // 아이템 정보
  const [proficiency, setProficiency] = useState([]); // 숙련도 정보
  const [activeGames, setActiveGames] = useState([]); // 현재 게임 정보

  // 아이템 정보를 가져오는 함수
  const getItemInfomation = () => {
    axios.get('http://localhost:4000/item')
    .then(response => {
        setItem(response.data);
    })
    .catch(error => console.log(error));
  }

  // 소환사 정보를 가져오는 함수
  const getPlayerInformation = () => {
      axios.get('http://localhost:4000/playerInformation', {params : {searchText : searchText, tagLineText : tagLineText}})
      .then((response) => {
          setPlayerInformation(response.data);
      })
      .catch((error) => console.log(error));
  }

  // 현재 게임 정보를 가져오는 함수
  const getActiveGames = () => {
      axios.get('http://localhost:4000/activegames', {params : {searchText : searchText, tagLineText : tagLineText}})
      .then((response) => {
          setActiveGames(response.data);
      })
      .catch((error) => console.log(error));
  }

  // 소환사의 숙련도 정보를 가져오는 함수
  const getProficiency = () => {
      axios.get('http://localhost:4000/proficiency', {params : {searchText : searchText, tagLineText : tagLineText}})
      .then((response) => {
          setProficiency(response.data);
      })
      .catch((error) => console.log(error));
  }

  // 매치정보를 가져오는 함수
  const getPlayerGames = () => {
      axios.get('http://localhost:4000/past10Games', {params : {searchText : searchText, tagLineText : tagLineText}}) // params 추가(검색기능)
      .then((response) => {
          setGameList(response.data);
      })
      .catch((error) => console.log(error));
  }

  // 소환사 리그정보를 가져오는 함수
  const getPlayerLeague = () => {
      axios.get('http://localhost:4000/tier', {params : {searchText : searchText, tagLineText : tagLineText}})
      .then((response) => {
          setLeagueList(response.data);
      })
      .catch((error) => console.log(error));
  }

  // 이미지 에러 시 처리를 위한 함수
  // const onErrorImg = (e) => {
  //     e.target.src = NoImage;
  // }

  useEffect(() => {
    getItemInfomation();
  }, [])

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <Home 
              searchText={searchText} 
              setSearchText={setSearchText}
              tagLineText={tagLineText}
              setTagLineText={setTagLineText}
              // item={item}
              playerInformation={playerInformation}
              proficiency={proficiency}
              gameList={gameList}
              leagueList={leagueList}
              activeGames={activeGames}
              getPlayerInformation={getPlayerInformation}
              getPlayerGames={getPlayerGames}
              getPlayerLeague={getPlayerLeague}
              // getItemInfomation={getItemInfomation}
              getProficiency={getProficiency}
              getActiveGames={getActiveGames}
              // onErrorImg={onErrorImg}
            />
          }
        >
        </Route>
        <Route
          path="/championInfo"
          element={
            <ChampionInfo
              
            />
          }
        >
        </Route>

        <Route
          path="/item"
          element={
            <ItemInfo
              
            />
          }
        >
        </Route>

        <Route
          path='/item/:id'
          element={
              <ItemDetailInfo 
                  item={item}
              />
          }
      ></Route>

      </Routes>
    </Layout>
  )
}

export default App
