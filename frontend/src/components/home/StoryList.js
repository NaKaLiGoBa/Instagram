import React from 'react';
import styled from 'styled-components';

function StoryList() {

  return (
    <Container>
      <StoryListWrap>
        <StoryListBox>
          <StoryListImgBox>
            <StoryListImg src='./images/jisu.jpeg' />
          </StoryListImgBox>
          <StoryListUsername>
            Jisu
          </StoryListUsername>
        </StoryListBox>

        <StoryListBox>
          <StoryListImgBox>
            <StoryListImg src='./images/jisu.jpeg' />
          </StoryListImgBox>
          <StoryListUsername>
            Jisu
          </StoryListUsername>
        </StoryListBox>

        <StoryListBox>
          <StoryListImgBox>
            <StoryListImg src='./images/jisu.jpeg' />
          </StoryListImgBox>
          <StoryListUsername>
            Jisu
          </StoryListUsername>
        </StoryListBox>

        <StoryListBox>
          <StoryListImgBox>
            <StoryListImg src='./images/jisu.jpeg' />
          </StoryListImgBox>
          <StoryListUsername>
            Jisu
          </StoryListUsername>
        </StoryListBox>

        <StoryListBox>
          <StoryListImgBox>
            <StoryListImg src='./images/jisu.jpeg' />
          </StoryListImgBox>
          <StoryListUsername>
            Jisu
          </StoryListUsername>
        </StoryListBox>

        <StoryListBox>
          <StoryListImgBox>
            <StoryListImg src='./images/jisu.jpeg' />
          </StoryListImgBox>
          <StoryListUsername>
            Jisu
          </StoryListUsername>
        </StoryListBox>

        <StoryListBox>
          <StoryListImgBox>
            <StoryListImg src='./images/jisu.jpeg' />
          </StoryListImgBox>
          <StoryListUsername>
            Jisu
          </StoryListUsername>
        </StoryListBox>

        <StoryListBox>
          <StoryListImgBox>
            <StoryListImg src='./images/jisu.jpeg' />
          </StoryListImgBox>
          <StoryListUsername>
            Jisu
          </StoryListUsername>
        </StoryListBox>


      </StoryListWrap>
    </Container>
  );
};

export default StoryList;

const Container = styled.div`
  width: 100%;
  height: 117px;
  display: flex;
  justify-content: center;;
`;

const StoryListWrap = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  margin-top: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
  align-items: center;
  justify-content: space-between;
  
`;

const StoryListBox = styled.div`
  width: 66px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StoryListUsername = styled.div`
  width: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding-top: 5px;
`;

const StoryListImgBox = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(#fff, #fff), 
  linear-gradient(to right, red 0%,  orange 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const StoryListImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;