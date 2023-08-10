import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { styled } from 'styled-components';

// icon, mui
import { AiOutlineSmile } from "react-icons/ai";
import { FcAddImage } from "react-icons/fc";
import { LuPlusSquare } from "react-icons/lu";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '840px',
  height: '635px',
  bgcolor: 'background.paper',
  borderRadius: 4,
  outline: 'none',
};

function WriteModal() {
  const InputRef = useRef(null);
  const navigate = useNavigate();

  const handleOnModalClick = () => setState({
    ...state,
    open: !state.open,
    files: [],
    preView: [],
  });
  const [state, setState] = useState({
    open: false,
    userId: '',
    content: '',
    files: [],
    preView: [],
  });

  const formData = new FormData();


  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
    console.log(e.target.value)
  };

  const handleOnImgUpload = async (e) => {
    if (!e.target.files) {
      return;
    };

    setState({
      ...state,
      files: e.target.files,
      preView: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    formData.append('photos', state.files);
    formData.append('content', state.content);

    //Key 확인하기
    for (let key of formData.keys()) {
      console.log("key : " + key);
    };

    /* value 확인하기 */
    for (let value of formData.values()) {
      console.log("value : " + value);
    };

    try {
      const url = `http://localhost:8080/v1/users/${state.userId}/posts`;

      await axios.post(url, formData);

      navigate('/');
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        open: false,
        files: [],
        preView: [],
      });
    };
  };
  console.log(state.files, state.preView)

  return (
    <React.Fragment>
      <ModalBtn onClick={handleOnModalClick}>
        <SideLinkIcon><LuPlusSquare /></SideLinkIcon>
        <SideLinkTitle>만들기</SideLinkTitle>
      </ModalBtn>
      <Modal
        keepMounted
        open={state.open}
        onClose={handleOnModalClick}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} >
          <ModalInfo>새 게시물 만들기</ModalInfo>
          <WriteForm onSubmit={handleOnSubmit}>
            <WriteImgBox>
              {
                state.preView.length === 0 ? ''
                  :
                  <PreViewImg src={state.preView} alt='이미지를 업로드 해주세요.' />
              }
            </WriteImgBox>
            <WriterInfoBox>
              <WriterInfo>
                <WriterProfile />
                <Writer>mintmin0320</Writer>
              </WriterInfo>
              <TextArea type='text' onChange={handleInputChange} name='content' value={state.content} placeholder='문구 입력...' required />
              <ContentInfoBox>
                <AiOutlineSmile size='25px' />
                <ContentInfo>0/2200</ContentInfo>
              </ContentInfoBox>
              <ImgUploadBox>
                <ImgUpload
                  onClick={() => {
                    InputRef.current?.click();
                  }}
                >
                  <FcAddImage />
                </ImgUpload>
                <Input onChange={handleOnImgUpload} type='file' hidden={true} ref={InputRef} multiple='multiple'
                  accept="image/jpg, image/png, image/jpeg" />
              </ImgUploadBox>
              <WriteBtnBox>공유하기</WriteBtnBox>
            </WriterInfoBox>
          </WriteForm>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default WriteModal;

const ModalBtn = styled.div`
  width: 220px;
  height: 56px;
  display: flex;
  color: black;
  text-decoration-line: none;

  &:hover{  
    background-color: #ECEBEB;
    border-radius: 10px;
  };
`;

const SideLinkIcon = styled.div`
  width: 17%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
`;

const SideLinkTitle = styled.div`
  width: 83%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 8px;
`;

const ModalInfo = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 2px #d8d8d8;
  border-radius: 8px 8px 0 0;
  font-weight: 600;
`;

const WriteForm = styled.form`
  width: 100%;
  height: 593px;
  display: flex;
  border-radius: 0 0 8px 8px;
`;

const WriteImgBox = styled.div`
  width: 63%;
  height: 100%;
  border-radius: 0 0 0 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreViewImg = styled.img`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 0 0 0 8px;
`;

const WriterInfoBox = styled.div`
  width: 35.5%;
  height: 100%;
  border-right: solid 2px #d8d8d8;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const WriterInfo = styled.div`
  width: 95%;
  height: 60px;
  display: flex;
  align-items: center;
`;

const WriterProfile = styled.div`
  width: 35px;
  height: 25px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: green;
`;

const Writer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 38%;
  border: 0;
  outline: none;

  &::placeholder{
    font-size: 16px;
    color: #d8d8d8;
  }
`;

const ContentInfoBox = styled.div`
  width: 95%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentInfo = styled.div`
  width: 95px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d8d8d8;
`;

const ImgUploadBox = styled.div`
  width: 100%;
  height: 60px;
  border-top: solid 2px #d8d8d8;
  border-bottom: solid 2px #d8d8d8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgUpload = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  cursor: pointer;

  &:hover{  
    background-color: #ECEBEB;
  };
`;

const Input = styled.input`
  width: 150px;
  height: 30px;
  border: 0;
`;

const WriteBtnBox = styled.button`
  width: 100%;
  height: 60px;
  border: 0;
  border-bottom: solid 2px #d8d8d8;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0064ff;
  cursor: pointer;
  background-color: #fff;

  &:hover{  
    background-color: #ECEBEB;
  };
`;