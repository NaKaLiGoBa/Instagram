import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../modal/Modal";

const MainLayout = styled.div`
  padding: 30px 20px 0px;
`;

const Divider = styled.div`
  height: 1px; // 선의 두께
  background-color: #d0d0d0; // 선의 색상
  width: 70%; // 선의 넓이
  margin-top: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-left: -230px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 100px;
`;

const UsernameWrapper = styled.div`
  display: flex;
  align-items: center; // 중앙 정렬
`;

const ProfileButton = styled.button`
  background-color: #f0f0f0; // 인스타그램 색상
  color: black;
  border: none;
  border-radius: 5px; // 동그랗게 만들기
  padding: 8px 16px; // 패딩 조절
  font-size: 14px; // 글자 크기 조절
  margin-left: 10px; // username과의 간격
  cursor: pointer; // 마우스 호버 효과
  transition: 0.3s; // 부드러운 호버 효과
  margin-bottom: 18px;
  font-weight: bold;

  &:hover {
    background-color: #d0d0d0; // 버튼 위에 마우스가 있을 때의 색상
  }
`;

const Username = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  margin-right: 13px;
`;

const Profile = styled.div`
  font-size: 16px;
  margin-bottom: 15px;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const FullName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Bio = styled.div`
  color: #808080;
`;

const userProfile = {
  username: "BestCat_17",
  fullName: "cat",
  bio: "Hello, I am the best cat in the world!!!",
  postsCount: 9,
  followersCount: 100,
  followingCount: 50,
  profileImageURL: "./images/profile.jpg",
};

const MyProfile = () => {
  //true 면 modal이 open 된다.
  const [isModalOpen, setIsModalOpen] = useState(false);
  //변수 초기값
  //열려 있으면 true, 닫혀있으면 false

  const ProfileInfo = ({ userProfile }) => (
    <div style={{ textAlign: "left", fontSize: "15px" }}>
      <UsernameWrapper>
        <Username>{userProfile.username}</Username>
        <ProfileButton>프로필 편집</ProfileButton>
        <ProfileButton>보관된 스토리 보기</ProfileButton>
      </UsernameWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "300px",
        }}
      >
        <Profile>
          Posts <BoldText>{userProfile.postsCount}</BoldText>
        </Profile>
        <Profile>
          Followers <BoldText>{userProfile.followersCount}</BoldText>
        </Profile>
        <Profile>
          Following <BoldText>{userProfile.followingCount}</BoldText>
        </Profile>
      </div>
      <FullName>{userProfile.fullName}</FullName>
      <Bio>{userProfile.bio}</Bio>
    </div>
  );

  return (
    <MainLayout>
      <Container>
        <ProfileWrapper>
          <ProfileImage
            onClick={() => setIsModalOpen(true)}
            src={userProfile.profileImageURL}
            alt="User Profile"
          />
          <ProfileInfo userProfile={userProfile} />
        </ProfileWrapper>
        <Divider />
      </Container>
      {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} /> : null}

      {/* //setIsModalOpen prop 으로 전달 //삼항연산자 */}
      {/* true 일때만 렌더링 되게함 */}
    </MainLayout>
  );
};

export default MyProfile;
