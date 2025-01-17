import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

type ModalProps = {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
};

const Modal = ({isOpen, onClose = undefined, children}: ModalProps) => {
    if (!isOpen) return null;

    return <ModalOverlay onClick={onClose}>{children}</ModalOverlay>;
};

export default Modal;
