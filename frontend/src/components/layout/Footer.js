import styled from "styled-components";

const FooterWrapper = styled.div`
  color: #808080; // 연한 회색 색상
  font-size: 12px; // 작은 글씨 크기
  text-align: center; // 텍스트를 가운데로 정렬
  margin: 20px 20px;
  bottom: 0;
`;

const Footer = () => {
  return <FooterWrapper>© 2023 Instagram from Meta</FooterWrapper>;
};

export default Footer;
