/*
  피드에서 제공되는 기본 피드를 모두 조회했을 때 보이는 모두 확인했습니다 부분
  1. 이전 게물 보기를 클릭하면 다음 피드 게시물 조회
  2. 기본 피드를 확인했을 때  한 번 조회
 */

import React from 'react'
import { styled } from 'styled-components';

function FeedCheck() {
  return (
    <Container>
      <CheckImgBox>
        <CheckImg src='./images/feed-check.png' />
      </CheckImgBox>
      <CheckTitleText>모두 확인했습니다</CheckTitleText>
      <CheckInfoText>최근 3일 동안 새롭게 올라온 게시물을 모두 확인했습니다.</CheckInfoText>
      <CheckBeforeList onClick={() => window.location.reload()}>이전 게시물 보기</CheckBeforeList>
    </Container>
  );
};

export default FeedCheck;

const Container = styled.div`
  width: 468px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7px;
  border-bottom: solid 1px #D8d8d8;
`;

const CheckImgBox = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckImg = styled.img`
  width: 145px;
  height: 120px;
`;

const CheckTitleText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 4px;
`;

const CheckInfoText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #848484;
  font-size: 14px;
  margin-bottom: 3px;
`;

const CheckBeforeList = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: #0080FF;
  font-size: 14px;
`;