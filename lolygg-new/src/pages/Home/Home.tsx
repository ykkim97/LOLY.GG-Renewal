import style from "./home.module.css";

const Home = () => {
    return (
        <>
            <div className={style['search-container']}>
                <h1>LOLY.GG</h1>
                <h5>소환사를 검색하세요!</h5>
                {/* 소환사 검색창 */}
                <input 
                    type="text" 
                    className={style['app-searchBox']}
                    onChange={(e) => {
                        // setSearchText((prev) => {
                        //     return prev = encodeURIComponent(e.target.value);
                        // });
                    }}
                    // onKeyPress={onEnterPress}
                    spellCheck="false"
                    // ref={searchInputRef}
                />
                {/* 검색버튼 */}
                <button type="submit" name="submit" onClick={() => {}} className={style['app-searchButton']} >
                    {/* <FcSearch className={style['app-searchButton-icons']}/>검색 */}
                    검색
                </button>
            </div>
        </>
    )
}

export default Home;