// 구현 코드

import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import styles from './NaverLogin.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const LoginBox = styled.div`
    width: 100%;
    height: 300px;
    // border: 1px solid black;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
`

// 기존 로그인 버튼이 아닌 커스텀을 진행한 로그인 버튼만 나타내기 위해 작성
const NaverIdLogin = styled.div`
	display: none;
`

const NaverLoginBtn = styled.button`
	display: flex;
	align-items: center;
	width: 250px;
	height: 56px;
	background-color: #03c75a;
	border-radius: 6px;
    border: none;
    cursor: pointer;
`

// 로그인 버튼 사용가이드 링크를 들어가면 이미지를 받아 이렇게 적용이 가능하다 ! 
const NaverIcon = styled.div`
	width: 90%;
	height: 90%;
	margin-left: 10px;
	background: url('/login/btnG_complete.png') no-repeat center;
	background-size: cover;

`

const NaverLogin = ()  => {
    const navigate = useNavigate();
    const naverRef = useRef()
	const { naver } = window
	const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID; 
	const NAVER_CALLBACK_URL = import.meta.env.VITE_NAVER_CALLBACK_URL;
	const NAVER_CLIENT_SECRET = import.meta.env.VITE_NAVER_CLIENT_SECRET;

	const initializeNaverLogin = () => {
		const naverLogin = new naver.LoginWithNaverId({
			clientId: NAVER_CLIENT_ID,
			callbackUrl: 'http://localhost:5173/login',
            clientSecret: NAVER_CLIENT_SECRET,
          // 팝업창으로 로그인을 진행할 것인지?           
			isPopup: false,
          // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
			loginButton: { color: 'green', type: 3, height: 58 },
			callbackHandle: true,
		})
		naverLogin.init();
    
        naverLogin.getLoginStatus(async function (status) {
                if (status) {
                    const userid = naverLogin.user.getEmail()
                    const username = naverLogin.user.getName()
                }
            })     
        }

        const userAccessToken = () => {
            window.location.href.includes('access_token') && getToken()
        }

        const getToken = () => {
            const token : string | null = new URLSearchParams(window.location.hash.substring(1)).get('access_token')
        }

        // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
        useEffect(() => {
            initializeNaverLogin()
            userAccessToken()
        }, [])

         // handleClick 함수 onClick 이벤트 발생 시 useRef 를 통해 지정한 naverRef 항목이 클릭 된다.
        // current 를 통해 아래 div 태그의 ref={} 속성을 줄 수 있다. ( 자세한 내용은 공식문서를 확인하자. )
        const handleNaverLogin = () => {
            naverRef.current.children[0].click()
        }

        useEffect(() => {
            if (window.location.href.includes('access_token')) {
                window.localStorage.setItem('token', window.location.href.split('=')[1].split('&')[0]?? 'none');
                navigate('/');
            };
        }, [])

	return (
		<div className={styles.container}>
            <div className={styles.loginBoxContainer}>
                <h2 className={styles.loginPageTitle}>로그인</h2>
                <h5 className={styles.loginPageDesc}>네이버계정으로 간편하게 로그인 할 수 있어요!</h5>
                <LoginBox>
                    <NaverIdLogin ref={naverRef} id="naverIdLogin" />
                    <NaverLoginBtn onClick={handleNaverLogin}>
                        <NaverIcon alt="navericon" />
                    </NaverLoginBtn>
                    <ArrowBackIcon className={styles.backButton} onClick={() => navigate(-1)}/>
                </LoginBox>
            </div>
		</div>
	)
}

export default NaverLogin;


