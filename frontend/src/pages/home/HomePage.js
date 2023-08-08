import React from 'react';
import { styled } from 'styled-components';

import Home from '../../components/home/feed/Home';
import SideBar from '../../components/layout/sidebar/SideBar';
import StoryList from '../../components/home/story/StoryList';
import Recommend from '../../components/home/recommend/Recommend';

function HomePage() {
  return (
    <Container>
      <SideBar />
      <HomeWrap>
        <FeedContent>
          <StoryList />
          <Home />
        </FeedContent>
        <Recommend />
      </HomeWrap>
    </Container>
  )
}

export default HomePage;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const HomeWrap = styled.div`
  width: 100%;
  margin-left: 17.6%;
  display: flex;
  justify-content: center;
`;

const FeedContent = styled.div`
  width: 630px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-right: 64px;
`;