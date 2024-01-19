import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import GomokuBoard from "./components/GomokuBoard.tsx";
import Online from "./pages/online.js";
import Main from "./pages/main.js";
import Game from "./pages/game.js";
import Tab from "./pages/friend.js";
import Rank from "./pages/rank.js";
import Profile from "./pages/profile.js";
import NavigationBar from "./NavigationBar.js";
import StatusBar from "./StatusBar.js";
import "./App.css";
import { GOOGLE, KAKAO, GUEST } from "./constants/VARIABLE";
import axios from "axios";
import { URL_POST_TEST } from "./constants/UrlConstants";

function App() {
  const navigate = useNavigate();
  const [isShowMain, setShowMain] = useState(() => {
    // 로컬 스토리지에서 showMain 상태를 불러오기
    const storedShowMain = localStorage.getItem("showMain");
    return storedShowMain ? JSON.parse(storedShowMain) : true;
  });
  const handleButtonClick = (category) => {

    console.log('hi');
    switch (category) {
      case GOOGLE:
        handleGoogleLogin();
        break;
      case KAKAO:
        break;
      case GUEST:
        handleGuestLogin();
        break;
    }
    setShowMain(isShowMain, JSON.stringify(false));
    navigate('/game');
  };
  useEffect(() => {
    // showMain 상태가 변경될 때 로컬 스토리지에 저장
    localStorage.setItem("showMain", JSON.stringify(isShowMain));
  }, [isShowMain]);
  const handleGoogleLogin = () => {
    const url = URL_POST_TEST;
    console.log(URL_POST_TEST);
    axios({
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(`응답: `, response);
        let data = response.data;
        if (response.data) {
          console.log("data", data);
        }
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
      });
  };
  const handleGuestLogin = () => {
    console.log("게스트 로그인 처리합니다");
  };
  return isShowMain ? (
    <Main onButtonClick={handleButtonClick} />
  ) : (
    <div className="App">
      <div className="screen">
        {/* <StatusBar />
        <NavigationBar /> */}
        <Routes>
          <Route path="/Game" element={<Game />} />
          <Route path="/friend" element={<Tab />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/game/offline" element={<GomokuBoard />} />
          <Route path="/game/online" element={<Online />} />
          <Route path="/" element={<Main onButtonClick={handleButtonClick}/>}/>

        </Routes>
      </div>
    </div>
  );
}

/*
  //반응형 함수(?) 일단은 안씀
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  */
export default App;
