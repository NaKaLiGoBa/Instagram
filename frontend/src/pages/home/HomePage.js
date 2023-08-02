import React from 'react';
import { styled } from 'styled-components';

import Home from '../../components/home/Home';
import SideBar from '../../components/layout/SideBar';
import StoryList from '../../components/home/StoryList';

function HomePage() {
  return (
    <Container>
      <SideBar />
      <HomeContent>
        <StoryList />
        <Home />
      </HomeContent>
    </Container>
  )
}

export default HomePage;

const Container = styled.div`
  width: 100%;
`;

const HomeContent = styled.div`
  width: 53.5%;
  padding-left: 17.7%;
  
`;