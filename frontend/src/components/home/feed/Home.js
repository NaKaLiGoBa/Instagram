/*
  - page state로 게시물 추가 요청 예정
  - FeedList 관련 내용 컴포넌트로 분리 예정

  react-intersection-observer 라이브러리 사용
  - 무한스크롤 (2초 기준 1개씩 추가)

  react-responsive-carousel 라이브러리 사용
  - showArrows: 이전 및 다음 화살표 표시
  - showStatus: 현재 페이지/전체 페이지 표시
  - showThumbs: 엄지 모양 표시
  - dynamicHeight: 고정되지 않는 항목 높이
 */

import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import { useInView } from 'react-intersection-observer';
import { Carousel } from 'react-responsive-carousel';

// icon, dummy, css
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { TbLocation } from "react-icons/tb";
import { BiBookmark } from "react-icons/bi";

import data from './data.json';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import DetailFeed from './DetailFeed';

function Home() {
  const [feedList, setFeedList] = useState(data);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      var timeCurrent = setTimeout(() =>
        handleOnLimitScroll()
        , 500);
    };

    return () => { clearTimeout(timeCurrent); }
  }, [inView])

  const handleOnLimitScroll = () => {
    setFeedList(
      [...feedList,
      {
        postId: 4,
        username: "mintmin",
        profile_image: "./images/nam.jpeg",
        photos: [
          {
            id: 1,
            url: "./images/nam.jpeg"
          },
          {
            id: 2,
            url: "./images/jo.jpeg"
          },
          {
            id: 3,
            url: "./images/jisu.jpeg"
          }
        ],
        like_profile_image: [
          "./images/jisu.jpeg",
          "./images/gd.jpeg",
          "./images/jo.jpeg"
        ],
        content: "오늘 촬영 끝",
        comments: 200
      },
      ]
    );
  };

  return (
    <Container>
      <FeedWrap>
        {
          feedList?.map((list) => {
            return (
              <FeedListBox key={list.id}>
                <FeedListTopBox>
                  <FeedListTopProfileBox>
                    <FeedListTopProfile src={list.profile_image} />
                  </FeedListTopProfileBox>
                  <FeedListTopInfoBox>
                    <FeedListTopUsername>
                      {list.username}
                      <FeedListTopData>
                        • 1일
                      </FeedListTopData>
                    </FeedListTopUsername>
                  </FeedListTopInfoBox>
                </FeedListTopBox>
                <FeedPhotoBox>
                  <Carousel
                    showArrows={true}
                    showStatus={false}
                    showThumbs={false}
                    dynamicHeight={true}
                  >
                    {
                      list.photos.map(({ id, url }) => {
                        return (
                          <FeedPhoto key={id} src={url} />
                        )
                      })
                    }
                  </Carousel>
                </FeedPhotoBox>
                <FeedIconBox>
                  <FeedIconLeftBox>
                    <FeedIconBtn>
                      <AiOutlineHeart />
                    </FeedIconBtn>
                    <FeedIconBtn>
                      <FaRegComment />
                    </FeedIconBtn>
                    <FeedIconBtn>
                      <TbLocation />
                    </FeedIconBtn>
                  </FeedIconLeftBox>
                  <FeedIconRightBox>
                    <FeedIconBtn>
                      <BiBookmark />
                    </FeedIconBtn>
                  </FeedIconRightBox>
                </FeedIconBox>
                <FeedLikeListBox>
                  <FeedLikeList>
                    <FeedLikeUserImg src={list.like_profile_image[0]} />
                    <FeedLikeUserImg2 src={list.like_profile_image[1]} />
                    <FeedLikeUserImg3 src={list.like_profile_image[2]} />
                  </FeedLikeList>
                  <FeedLikeListUsernameBox>
                    <FeedLikeListUsername>
                      {list.username}
                    </FeedLikeListUsername>
                    님&nbsp;
                    <FeedLikeListUsername>
                      여러 명
                    </FeedLikeListUsername>
                    이 좋아합니다
                  </FeedLikeListUsernameBox>
                </FeedLikeListBox>
                <FeedBottomUsernameBox>
                  <FeedBottomUsername>{list.username}</FeedBottomUsername>
                  &nbsp;{list.content}
                </FeedBottomUsernameBox>
                <DetailFeed comments={list.comments} />
                <FeedBottomCommentInput placeholder='댓글 달기...' />
              </FeedListBox>
            );
          })
        }
      </FeedWrap>
      <FeedLoadingBox ref={ref}>loading</FeedLoadingBox>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  input:focus { outline: none; }
`;

const FeedWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeedListBox = styled.div`
  width: 468px;
  display: flex; 
  flex-direction: column;
  border-bottom: solid 1px #D8d8d8;
`;

const FeedListTopBox = styled.div`
  width: 99%;
  height: 70px;
  display: flex;
  align-items: center;
`;

const FeedListTopProfileBox = styled.div`
  width: 8%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeedListTopProfile = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`;

const FeedListTopInfoBox = styled.div`
  width: 85%;
  max-height: 40px;
`;

const FeedListTopUsername = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const FeedListTopData = styled.div`
  height: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #848484;
`;

const FeedPhotoBox = styled.div`
  width: 100%;
  max-height: 585px;
`;

const FeedPhoto = styled.img`
  width: 100%;
  max-height: 585px;
  border-radius: 5px;
  object-fit: fill;
`;

const FeedIconBox = styled.div`
  width: 100%;
  height: 47px;
  margin: 1px;
  display: flex;
  justify-content: space-between;
`;

const FeedIconLeftBox = styled.div`
  width: 23%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FeedIconRightBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const FeedIconBtn = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  cursor: pointer;

  &:hover{  
    background-color: #F2F2F2;
  };
`;

const FeedLikeListBox = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  position: relative;
`;

const FeedLikeList = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const FeedLikeUserImg = styled.img`
  width: 18px;
  height: 15px;
  border-radius: 50%;
  position: absolute;
`;

const FeedLikeUserImg2 = styled.img`
  width: 18px;
  height: 15px;
  border-radius: 50%;
  left: 10px;
  position: absolute;
`;

const FeedLikeUserImg3 = styled.img`
  width: 18px;
  height: 15px;
  border-radius: 50%;
  left: 20px;
  position: absolute;
`;

const FeedLikeListUsernameBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 15px;
`;

const FeedLikeListUsername = styled.div`
  height: 100%;
  display: flex;
  font-size: 15px;
  font-weight: bolder;
  align-items: center;
  cursor: pointer;
`;

const FeedBottomUsernameBox = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 15px;
`;

const FeedBottomUsername = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: bolder;
  cursor: pointer;
`;

const FeedBottomCommentInput = styled.input`
  height: 30px;
  display: flex;
  font-size: 15px;
  border: 0px;
  margin-bottom: 10px;
`;

const FeedLoadingBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
