import styled, {keyframes} from "styled-components";
import {palette} from "../Theme";
import React from "react";

type CircularProgressProps = {
    size?: string;
    reverseColors?: boolean;
};

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

type ColorProps = {
    $primary: string;
    $secondary: string;
    $size?: string;
};

const SpinnerWrapper = styled.div<ColorProps>`
    display: inline-block;
    width: ${(props) => props.$size || "40px"};
    height: ${(props) => props.$size || "40px"};
    border: 5px solid ${(props) => props.$primary};
    border-top: 5px solid ${(props) => props.$secondary};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;

const CircularProgress = ({size, reverseColors = false}: CircularProgressProps) => {
    return (
        <SpinnerWrapper
            $size={size}
            $primary={palette(reverseColors ? "primary" : "secondary").default.background}
            $secondary={palette(reverseColors ? "secondary" : "primary").default.background}
        />
    );
};

export default CircularProgress;
