import React from "react";
import { styled } from "styled-components";

import SideBar from "../../components/layout/sidebar/SideBar";
import MyProfile from "../../components/myprofile/MyProfile";
import MyFeeds from "../../components/myprofile/MyFeeds";

function MyProfilePage() {
  return (
    <Container>
      <SideBar />
      <MyProfileWrap>
        <MyProfile />
        <MyFeeds />
      </MyProfileWrap>
    </Container>
  );
}

export default MyProfilePage;

const Container = styled.div`
  width: 100%;
`;

const MyProfileWrap = styled.div`
  margin-left: 17.6%;
`;
