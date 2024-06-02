import React from "react";
import Button from "./CustomButton";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 10px;
  }

  .modal-header {
    border-bottom: none;
    background-color: ${({ theme }) => theme.colors.background};
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .modal-body {
    padding: 1rem 0 0 1rem;
    color: ${({ type, theme }) => {
      switch (type) {
        case "warning":
          return "red";
        case "info":
          return "green";
        default:
          return "black";
      }
    }};
  }

  .modal-footer {
    display: flex;
    background-color: ${({ theme }) => theme.colors.background};
    border-top: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const Footer = styled(Modal.Footer)`
  padding: 1rem;
`;

function CustomModal({
  type = "",
  title = "",
  description = "메시지를 입력하세요.",
  onClose,
  show,
}) {
  return (
    <StyledModal
      show={show}
      onHide={onClose}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      type={type}
    >
      {title.length > 0 && (
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
      )}

      <Modal.Body>{description}</Modal.Body>
      <Footer>
        <Button onClick={onClose} width="70px">
          닫기
        </Button>
      </Footer>
    </StyledModal>
  );
}

export default CustomModal;
