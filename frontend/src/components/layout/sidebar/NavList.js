import React, { Fragment } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

// icons
import { GoHome } from "react-icons/go";
import { AiOutlineCompass, AiOutlineHeart } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { TbLocation } from "react-icons/tb";
import { LuPlusSquare } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";

function NavList() {
  return (
    <Fragment>
      <SideLogoBox to='/'>
        <SideTextLogo src='./images/instagram-text-logo.png' />
      </SideLogoBox>
      <SideLinkBox>
        <SideLink to='/'>
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
        <SideLink to='/my-profile'>
          <SideLinkIcon ><SideLinkProfile /></SideLinkIcon>
          <SideLinkTitle>프로필</SideLinkTitle>
        </SideLink>
      </SideLinkBox>
    </Fragment>
  );
};

export default NavList;

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