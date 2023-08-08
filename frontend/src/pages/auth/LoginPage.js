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

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // axios를 사용하여 서버로 POST 요청을 보냅니다.
    axios
      .post("/api/v1/auth/signin", {
        email,
        password,
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
          label="Email or username"
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
        <StyledButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          // type="submit"
        >
          Log In
        </StyledButton>
        <Divider />
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            style={{ display: "block", textAlign: "center" }}
          >
            Sign up.
          </Link>
        </Typography>
      </FormContainer>
      <Footer />
    </Box>
  );
}

export default LoginPage;
