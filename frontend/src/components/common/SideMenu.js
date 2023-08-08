/*
  NavList.js에서 path, title, children(아이콘)을 전달받는 컴포넌트
*/

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function SideMenu({ path, title, children }) {
  return (
    <SideLink to={path}>
      <SideLinkIcon>{children}</SideLinkIcon>
      <SideLinkTitle>{title}</SideLinkTitle>
    </SideLink>
  );
};

export default SideMenu;

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

const SideLinkTitle = styled.div`
  width: 83%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 8px;
`;