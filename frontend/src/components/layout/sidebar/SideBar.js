/*
  좌측 사이드 메뉴에 해당하는 페이지
  - 클릭 시 아이콘 변경
  - DropUp 메뉴바 포함
  
  서버 데이터
  - 나의 프로필 이미지

  사이드 메뉴를 컴포넌트로 분리로 간소화 예정

  react-icons 라이브러리 사용
*/

import React, { useState } from 'react'
import styled from 'styled-components'

import Dropdown from '../../../utils/DropDown';

// icons
import { RiMenuFill } from "react-icons/ri";
import NavList from './NavList';

function SideBar() {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  return (
    <Container>
      <SideWrap>
        <NavList />
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
  width: 17.6%;
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