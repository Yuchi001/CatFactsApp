import React, {ButtonHTMLAttributes, CSSProperties, ReactNode} from "react";
import {Palette, palette, PaletteType} from "../Theme";
import CircularProgress from "./CircularProgress";
import styled from "styled-components";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    height?: CSSProperties["height"];
    width?: CSSProperties["width"];
    fullWidth?: boolean;
    variant?: PaletteType;
    startDecorator?: ReactNode;
    outlineColor?: string;
    isLoading?: boolean;
};

type WrapperProps = {
    $height: CSSProperties["height"];
    $width: CSSProperties["width"];
    $palette: Palette;
    $outlineColor: CSSProperties["color"] | undefined;
    $variant: PaletteType;
};

const ButtonWrapper = styled.button<WrapperProps>`
    background-color: transparent;
    color: black;
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    box-shadow: none;
    font-size: 2em;
    font-family: "Comic Sans MS", cursive, sans-serif;
    font-weight: bold;
    border-style: solid;
    border-radius: 5px;
    border-width: ${({$variant}) => ($variant === "primary" ? "5px" : "0px")};
    opacity: ${({disabled = false}) => (disabled ? "25%" : "100%")};
    display: flex;
    column-gap: 5px;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: pointer;
        color: #f5f5dc;
        border-color: #f5f5dc;
    }
`;

const Button = ({
    children,
    isLoading = false,
    variant = "primary",
    width = "min-content",
    height = "48px",
    fullWidth = false,
    startDecorator = undefined,
    outlineColor = undefined,
    ...props
}: ButtonProps) => {
    return (
        <ButtonWrapper
            $height={height}
            $width={fullWidth ? "100%" : width}
            $outlineColor={outlineColor}
            $palette={palette(variant)}
            $variant={variant}
            {...props}
        >
            {startDecorator}
            {isLoading ? <CircularProgress size={`calc(${height} / 2)`} /> : children}
        </ButtonWrapper>
    );
};

export default Button;
