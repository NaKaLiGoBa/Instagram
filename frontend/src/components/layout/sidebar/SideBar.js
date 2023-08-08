/*
  좌측 사이드 메뉴에 해당하는 페이지
  메뉴 리스트와 더 보기 메뉴를 컴포넌트로 분리
*/

import React from 'react';
import styled from 'styled-components';

import SideMenuList from './SideMenuList';
import SettingMenuList from './SettingMenuList';

function SideBar() {
  return (
    <Container>
      <SideWrap>
        <SideMenuList />
        <SettingMenuList />
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