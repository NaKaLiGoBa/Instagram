import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../home/Footer";
import axios from "axios";

const FeedsContainer = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3개의 열
  grid-gap: 5px; // 그리드 사이의 간격
  margin: 0 auto; // 가운데 정렬
  margin-top: 10px;
`;

const FeedItem = styled.div`
  background-color: #f0f0f0;
  padding-top: 100%; // 1:1 비율
  position: relative; // 내부 이미지를 위한 상대 위치 지정
`;

const FeedImage = styled.img`
  position: absolute; // FeedItem에 상대적으로 위치 지정
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; // 이미지가 비율을 유지하면서 채워집니다.
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
  margin: 0 auto; // 가운데 정렬
`;

const TabItem = styled.div`
  font-size: 12px;
  padding: 2px;
  cursor: pointer;
  text-align: center; // 텍스트 가운데 정렬
  margin: 0 20px 6px 20px;
`;

const Icon = styled.i`
  margin-right: 5px; // 아이콘과 텍스트 사이의 간격
`;

const MyFeeds = () => {
  const dummyimages = [
    "/images/고양이1.png",
    "/images/고양이2.jpg",
    "/images/고양이3.jpg",
    "/images/고양이4.jpg",
    "/images/고양이5.jpg",
    "/images/고양이6.jpg",
    "/images/고양이7.jpg",
    "/images/고양이8.jpg",
    "/images/고양이9.jpg",
  ];

  const [images, setImages] = useState(dummyimages); // 이미지들을 상태로 관리

  useEffect(() => {
    // 백엔드에서 이미지들 가져오기
    axios
      .get("/api/v1/users/${id}/image") // 백엔드의 URL과 엔드포인트를 적절히 설정
      .then((response) => {
        setImages(response.data.images);
        //백엔드에서 받은 이미지로 상태 업데이트
      })
      .catch((error) => {
        console.error("Error fetching feeds", error);
      });
  }, []);

  return (
    <>
      <TabsContainer>
        <TabItem>
          <Icon className="icon-class-name">𓈈</Icon> 게시물
        </TabItem>
        <TabItem>
          <Icon className="icon-class-name">🕶️</Icon> 태그됨
        </TabItem>
      </TabsContainer>
      <FeedsContainer>
        {images.map((image, index) => (
          <FeedItem key={index}>
            <FeedImage src={image} alt={`Feed ${index + 1}`} />
          </FeedItem>
        ))}
      </FeedsContainer>
      <Footer />
    </>
  );
};

export default MyFeeds;
