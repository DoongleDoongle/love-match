import { Message, useToaster } from "rsuite";
import styled from "styled-components";

const Toaster = styled(Message)`
  width: 100%;
  border-radius: 0;
  position: absolute;
  top: ${({ theme }) => theme.header.height};
  left: 0;
  z-index: 1000; // 필요한 경우 더 높게 설정
  margin: 0;
`;

export default Toaster;
