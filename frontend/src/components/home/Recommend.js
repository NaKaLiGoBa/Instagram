/*
  피드 우측 회원님을 위한 추천
  - 추천 회원들 목록
  - copyright 

  서버 state
  - 나의 프로필 이미지, 사용자명, 이름
  - 추천 대상자 리스트, 프로필 이미지, 공통된 팔로워 리스트( ex. 철수님, 영희님이 필로우합니다.
*/

import React from 'react';
import { styled } from 'styled-components';

function Recommend() {
  return (
    <Container>
      <RecommendUserInfoBox>
        <RecommendUserProfile src='./images/jisu.jpeg' />
        <RecommendUserInfo>
          <RecommendUserNickname>
            mintmin0320
          </RecommendUserNickname>
          <RecommendUsername>
            박하민트
          </RecommendUsername>
        </RecommendUserInfo>
      </RecommendUserInfoBox>
      <RecommendTextBox>
        <RecommendLeftText>
          회원님을 위한 추천
        </RecommendLeftText>
        <RecommendRightText>
          모두 보기
        </RecommendRightText>
      </RecommendTextBox>
      <RecommendFollowListBox>
        <RecommendFollowList>
          <RecommendFollowProfile src='./images/jisu.jpeg' />
          <RecommendFollowInfoBox>
            <RecommendFollowTextBox>
              <RecommendFollowUsername>
                김철수
              </RecommendFollowUsername>
              <RecommendFollowTogetherList>
                zero님, si님이 팔로우합니다
              </RecommendFollowTogetherList>
            </RecommendFollowTextBox>
            <RecommendFollowBtn>
              팔로우
            </RecommendFollowBtn>

          </RecommendFollowInfoBox>
        </RecommendFollowList>

        <RecommendFollowList>
          <RecommendFollowProfile src='./images/jisu.jpeg' />
          <RecommendFollowInfoBox>
            <RecommendFollowTextBox>
              <RecommendFollowUsername>
                김철수
              </RecommendFollowUsername>
              <RecommendFollowTogetherList>
                zero님, si님이 팔로우합니다
              </RecommendFollowTogetherList>
            </RecommendFollowTextBox>
            <RecommendFollowBtn>
              팔로우
            </RecommendFollowBtn>

          </RecommendFollowInfoBox>
        </RecommendFollowList>

        <RecommendFollowList>
          <RecommendFollowProfile src='./images/jisu.jpeg' />
          <RecommendFollowInfoBox>
            <RecommendFollowTextBox>
              <RecommendFollowUsername>
                김철수
              </RecommendFollowUsername>
              <RecommendFollowTogetherList>
                zero님, si님이 팔로우합니다
              </RecommendFollowTogetherList>
            </RecommendFollowTextBox>
            <RecommendFollowBtn>
              팔로우
            </RecommendFollowBtn>

          </RecommendFollowInfoBox>
        </RecommendFollowList>

        <RecommendFollowList>
          <RecommendFollowProfile src='./images/jisu.jpeg' />
          <RecommendFollowInfoBox>
            <RecommendFollowTextBox>
              <RecommendFollowUsername>
                김철수
              </RecommendFollowUsername>
              <RecommendFollowTogetherList>
                zero님, si님이 팔로우합니다
              </RecommendFollowTogetherList>
            </RecommendFollowTextBox>
            <RecommendFollowBtn>
              팔로우
            </RecommendFollowBtn>

          </RecommendFollowInfoBox>
        </RecommendFollowList>

        <RecommendFollowList>
          <RecommendFollowProfile src='./images/jisu.jpeg' />
          <RecommendFollowInfoBox>
            <RecommendFollowTextBox>
              <RecommendFollowUsername>
                김철수
              </RecommendFollowUsername>
              <RecommendFollowTogetherList>
                zero님, si님이 팔로우합니다
              </RecommendFollowTogetherList>
            </RecommendFollowTextBox>
            <RecommendFollowBtn>
              팔로우
            </RecommendFollowBtn>
          </RecommendFollowInfoBox>
        </RecommendFollowList>
        <InstagramInfo>
          <InstagramInfoText>소개•도움말•홍보 센터•채용 정보•개인정보처리방침•</InstagramInfoText>
          <InstagramInfoText>약관 위치 언어 Meta Verified</InstagramInfoText>
        </InstagramInfo>
        <InstagramCopyright>@2023 INSTAGRAM FROM META</InstagramCopyright>

      </RecommendFollowListBox>
    </Container>
  );
};

export default Recommend;

const Container = styled.div`
  width: 320px;
  height: 480px;
  padding-top: 40px;
  padding-left: 10px;
`;

const RecommendUserInfoBox = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
`;

const RecommendUserProfile = styled.img`
  width: 65px;
  height: 53px;
  border-radius: 50%;
  background-color: green;
`;

const RecommendUserInfo = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 18px;
`;

const RecommendUserNickname = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const RecommendUsername = styled.div`
  font-size: 14px;
  color: #848484;
`;

const RecommendTextBox = styled.div`
  width: 100%;
  height: 25px;
  padding-top: 8px;
  display: flex;
  justify-content: space-between;
`;

const RecommendLeftText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #848484;
`;

const RecommendRightText = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

const RecommendFollowListBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecommendFollowList = styled.div`
  width: 320px;
  height: 50px;
  display: flex;
  align-items: center;
`;

const RecommendFollowProfile = styled.img`
  width: 31px;
  height: 31px;
  border-radius: 50%;
  background-color: pink;
`;

const RecommendFollowInfoBox = styled.div`
  width: 289px;
  display: flex;
`;

const RecommendFollowTextBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 8px;
`;

const RecommendFollowUsername = styled.div`
  font-size: 13px;
  font-weight: bold;
`;

const RecommendFollowTogetherList = styled.div`
  font-size: 13px;
  color: #848484;
`;

const RecommendFollowBtn = styled.div`
  width: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 13px;
  color: #0080FF;
  font-weight: 600;
`;

const InstagramInfo = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InstagramInfoText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #BDBDBD;
`;

const InstagramCopyright = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #BDBDBD;
`;