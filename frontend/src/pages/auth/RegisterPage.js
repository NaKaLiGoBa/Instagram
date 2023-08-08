import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../../components/home/Footer";

const FormContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "300px",
  maxWidth: "300px",
  padding: "16px",
  border: "1px solid #ddd",
  borderRadius: "4px",
});

const StyledTextField = styled(TextField)({
  marginBottom: "16px",
});

const StyledButton = styled(Button)({
  marginBottom: "16px",
  borderRadius: "8px",
});

const LogoImage = styled("img")({
  width: "220px",
  height: "80px",
  marginBottom: "16px",
});

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  //상태 업데이트
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 이메일과 비밀번호 등의 입력값이 비어있는지 확인
    if (!email || !password || !fullname || !username) {
      alert("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Invalid email!");
      return;
    }

    // axios를 사용하여 서버로 POST 요청을 보냅니다.
    axios
      .post("/api/v1/auth/signin", {
        email,
        password,
        fullname,
        username,
      })
      .then((res) => {
        // 서버로부터 받은 응답을 처리하는 로직을 작성합니다.(조건문)
        console.log("서버 응답:", res.data);
      })
      .catch((error) => {
        // 에러 처리 로직을 작성합니다.
        console.error("에러:", error);
      });
  };

  const isValidEmail = (email) => {
    const emailRegex =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    return emailRegex.test(email);
  };

  const fullNameInput = (e) => {
    setFullname(e.target.value);
  };

  const userNameInput = (e) => {
    setUsername(e.target.value);
    // console.log(username);

    if (username.includes("@")) {
      setUsername(username.split("@")[0]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <FormContainer onSubmit={handleSubmit}>
        <LogoImage src="/images/instagram-new-logo.png" alt="Instagram Logo" />

        <StyledTextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
        />
        <StyledTextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
        />
        <StyledTextField
          label="Fullname"
          variant="outlined"
          fullWidth
          value={fullname}
          onChange={fullNameInput}
        />

        <StyledTextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={userNameInput}
        />

        <StyledButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Sign Up
        </StyledButton>
        <Divider />
        <Typography variant="body1" color="textSecondary" gutterBottom>
          You already have an account?{""}
          <Link
            to="/auth/login"
            style={{ display: "block", textAlign: "center" }}
          >
            Log in.
          </Link>
        </Typography>
      </FormContainer>
      <Footer />
    </Box>
  );
}

export default RegisterPage;
