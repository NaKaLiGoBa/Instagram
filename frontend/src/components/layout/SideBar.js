/*
  좌측 사이드 메뉴에 해당하는 페이지
  DropUp 메뉴가 포함되어 있다.

  npm i react-icons 라이브러리 설치 필요
*/

import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

import Dropdown from '../../utils/DropDown';

// icon
import { GoHome } from "react-icons/go";
import { AiOutlineCompass, AiOutlineHeart } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { TbLocation } from "react-icons/tb";
import { LuPlusSquare } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { RiMenuFill } from "react-icons/ri";


function SideBar() {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  return (
    <Container>
      <SideWrap>
        <SideLogoBox to='/'>
          <SideTextLogo src='./images/instagram-text-logo.png' />
        </SideLogoBox>
        <SideLinkBox>
          <SideLink>
            <SideLinkIcon><GoHome /></SideLinkIcon>
            <SideLinkTitle>홈</SideLinkTitle>
          </SideLink>
          <SideLink>
            <SideLinkIcon><FiSearch /></SideLinkIcon>
            <SideLinkTitle>검색</SideLinkTitle>
          </SideLink>
          <SideLink>
            <SideLinkIcon><AiOutlineCompass /></SideLinkIcon>
            <SideLinkTitle>탐색 탭</SideLinkTitle>
          </SideLink>
          <SideLink>
            <SideLinkIcon><BiMoviePlay /></SideLinkIcon>
            <SideLinkTitle>릴스</SideLinkTitle>
          </SideLink>
          <SideLink>
            <SideLinkIcon><TbLocation /></SideLinkIcon>
            <SideLinkTitle>메시지</SideLinkTitle>
          </SideLink>
          <SideLink>
            <SideLinkIcon><AiOutlineHeart /></SideLinkIcon>
            <SideLinkTitle>알림</SideLinkTitle>
          </SideLink>
          <SideLink>
            <SideLinkIcon><LuPlusSquare /></SideLinkIcon>
            <SideLinkTitle>만들기</SideLinkTitle>
          </SideLink>
          <SideLink>
            <SideLinkIcon><SideLinkProfile /></SideLinkIcon>
            <SideLinkTitle>프로필</SideLinkTitle>
          </SideLink>
        </SideLinkBox>
        <SettingBox onClick={e => setDropdownVisibility(!dropdownVisibility)}>
          <SettingBoxIcon><RiMenuFill /></SettingBoxIcon>
          <SettingBoxText>
            더 보기
            <Dropdown visibility={dropdownVisibility}>
              <SettingListBox>
                <SettingList>설정</SettingList>
                <SettingList>내 활동</SettingList>
                <SettingList>저장됨</SettingList>
                <SettingList>모드 전환</SettingList>
                <SettingList>문제 신고</SettingList>
                <SettingList>계정 전환</SettingList>
                <SettingList>로그아웃</SettingList>
              </SettingListBox>
            </Dropdown>
          </SettingBoxText>
        </SettingBox>
      </SideWrap>
    </Container>
  );
};

export default SideBar;

const Container = styled.nav`
  width: 17.7%;
  height: 100%;
  display: flex;
  justify-content: center;
  border-right: solid 1px #D8D8D8;
  position: fixed;
`;

const SideWrap = styled.div`
  width: 88%;
  height: 100%;
  padding-top: 8px;
  padding-bottom: 20px;
  padding-left: 11px;
  padding-right: 11px;
  position: relative;
`;

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

const SideLink = styled(Link)`
  width: 220px;
  height: 56px;
  display: flex;
  color: black;
  text-decoration-line: none;

  &:hover{  
    background-color: #ECEBEB;
    border-radius: 10px;
  };
`;

const SideLinkIcon = styled.div`
  width: 17%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
`;

const SideLinkProfile = styled.div`
  width: 70%;
  height: 45%;
  border-radius: 50%;
  background-color: green;
`;

const SideLinkTitle = styled.div`
  width: 83%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 8px;
`;

const SettingBox = styled.div`
  width: 100%;
  height: 4%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;

  &:hover{  
    background-color: #F2F2F2;
  };
`;

const SettingListBox = styled.ul`
  width: 243px;
  position: absolute;
  bottom: 88px;
  left: 15px;
  background-color: #fff;
  border-radius: 10px;
  padding-left: 20px;
`;

const SettingList = styled.li`
  width: 100%;
  height: 58px;
  display: flex;
  align-items: center;
  padding-left: 0px;

  &:hover{  
    background-color: #F2F2F2;
  };
`;

const SettingBoxIcon = styled.div`
  width: 13%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
`;

const SettingBoxText = styled.div`
  width: 83%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 8px;
`;