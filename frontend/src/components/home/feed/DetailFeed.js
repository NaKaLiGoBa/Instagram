import * as React from 'react';
import { styled } from 'styled-components';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '68%',
  height: '94%',
  bgcolor: 'background.paper',
  borderRadius: 1,
  display: 'flex',
  outline: 'none',
};

function DetailFeed({ comments }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <ModalBtn onClick={handleOpen}>댓글 {comments}개 모두 보기</ModalBtn>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} >
          <DetailImg src='./images/jisu.jpeg' />
          <CommentBox>
            <WriterInfoBox>
              <WriterImgBox>
                <ProfileImg src='./images/jisu.jpeg' />
              </WriterImgBox>
              <ProfileUsername>mintmin0320</ProfileUsername>
            </WriterInfoBox>
            <CommentList>
            </CommentList>
            <DetailInfoBox>
            </DetailInfoBox>
          </CommentBox>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default DetailFeed;

const ModalBtn = styled.div`
  width: 140px;
  height: 24px;
  display: flex;
  font-size: 15px;
  color: #848484;
  cursor: pointer;
`;

const DetailImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 4px;

  @media screen and (max-width: 1500px) {
    width: 57%;
  };
`;

const CommentBox = styled.div`
  width: 38%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1500px) {
    width: 43%;
  };
`;

const WriterInfoBox = styled.div`
  width: 95%;
  height: 80px;
  display: flex;
  align-items: center;
`;

const WriterImgBox = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid transparent;
  background-image: linear-gradient(#fff, #fff), 
  linear-gradient(to right, red 0%,  orange 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const ProfileImg = styled.img`
  width: 27px;
  height: 27px;
  border-radius: 50%;
`;

const ProfileUsername = styled.div`
  font-size: 13px;
  font-weight: bold;
  padding-left: 8px;
`;

const CommentList = styled.div`
  width: 100%;
  height: 100%;
  border-top: solid 1px #F2F2F2;
  border-bottom: solid 1px #F2F2F2;
`;



const DetailInfoBox = styled.div`
  width: 100%;
  height: 160px;
`;