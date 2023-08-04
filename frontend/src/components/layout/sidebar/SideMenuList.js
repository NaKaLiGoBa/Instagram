/* 
  SideBar.js에서 메인으로 노출되는 메뉴를 분류
  SideMenu.js 컴포넌트로 props를 넘겨주는 형식
*/

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SideMenu from '../../common/SideMenu';

// icons
import { GoHome } from "react-icons/go";
import { AiOutlineCompass, AiOutlineHeart } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { TbLocation } from "react-icons/tb";
import { LuPlusSquare } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";

function SideMenuList() {
  return (
    <Fragment>
      <SideLogoBox to='/'>
        <SideTextLogo src='./images/instagram-text-logo.png' />
      </SideLogoBox>
      <SideLinkBox>
        <SideMenu path='/' title='홈'><GoHome /></SideMenu>
        <SideMenu path='/' title='검색'><FiSearch /></SideMenu>
        <SideMenu path='/' title='탐색 탭'><AiOutlineCompass /></SideMenu>
        <SideMenu path='/' title='릴스'><BiMoviePlay /></SideMenu>
        <SideMenu path='/' title='메시지'><TbLocation /></SideMenu>
        <SideMenu path='/' title='알림'><AiOutlineHeart /></SideMenu>
        <SideMenu path='/' title='만들기'><LuPlusSquare /></SideMenu>
        <SideMenu path='/my-profile' title='프로필'><SideLinkProfile /></SideMenu>
      </SideLinkBox>
    </Fragment>
  );
};

export default SideMenuList;

const SideLogoBox = styled(Link)`
  width: 100%;
  height: 74px;
  display: flex;
  align-items: center;
  margin-top: 7px;
`;

const SideTextLogo = styled.img`
  width: 110px;
  height: 47%;
  display: flex;
  align-items: center;
  padding: 3px;
`;

const SideLinkBox = styled.div`
  width: 100%;
  height: 82%;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

const SideLinkProfile = styled.div`
  width: 70%;
  height: 45%;
  border-radius: 50%;
  background-color: green;
`;