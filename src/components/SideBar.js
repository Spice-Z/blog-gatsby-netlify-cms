import React from "react";
import styled from "styled-components";
import rabio from "../img/rab.jpg";
import github from "../img/github-icon.svg";
import twitter from "../img/twitter-icon.svg";
import qiita from "../img/qiita.png";

const SideBarContents = styled.div`
  width: 30%;
  height: auto;
  box-sizing: border-box;
  padding: 28px;
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .sideBarSubTitle {
    font-size: 1.3rem;
    font-weight: bold;
  }
  .profile {
    width: 100%;
  }
  .profile-img {
    width: 60%;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
  }
  .sns-links {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .sns-links h2 {
    width: 100%;
  }
  .sns-links img {
    width: 40px;
    border-radius: 50%;
    margin-right: 7px;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 7px;
    margin-top: 0;
  }
`;

const SideBar = () => (
  <SideBarContents>
    <div className="profile">
      <img className="profile-img" src={rabio} alt="らびお" />
      <h2 className="sideBarSubTitle">自己紹介</h2>
      <p>
        すぱいすと言います。
        <br/>
        名古屋に住むweb系エンジニア系学生です。
        <br />
        来年から東京でフロントエンドエンジニアなんです。
        <br />
        アイコンは実家で飼っているうさぎ。
        <br />
      </p>
    </div>
    <div className="sns-links">
      <h2 className="sideBarSubTitle">Follow me ?</h2>
      <a
        href="https://github.com/Spice-Z"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={github} alt="github" />
      </a>
      <a
        href="https://twitter.com/rabspice"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={twitter} alt="twitter" />
      </a>
      <a
        href="https://qiita.com/spice"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={qiita} alt="qiita" />
      </a>
    </div>
  </SideBarContents>
);

export default SideBar;
