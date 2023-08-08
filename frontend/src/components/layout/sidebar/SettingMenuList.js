/*
  더 보기 메뉴 컴포넌트
*/

import React, { useState } from 'react';
import styled from 'styled-components';

import Dropdown from '../../../utils/DropDown';

// icons
import { RiMenuFill } from "react-icons/ri";

function SettingMenuList() {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  return (
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
  );
};

export default SettingMenuList;

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