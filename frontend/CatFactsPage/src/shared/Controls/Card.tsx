import React, {CSSProperties, FC, HTMLProps, ReactNode} from "react";
import styled from "styled-components";
import {Column} from "./FlexLayout";

type CardProps = HTMLProps<HTMLDivElement> & {
    children: ReactNode;
    height: CSSProperties["height"];
    $gap?: string;
};

const CardStyled = styled.div<CardProps>`
    background-color: #ffa07a;
    padding: 40px 68px;
    border-radius: 10px;
    border-style: solid;
    border-width: 5px;
    height: ${(props) => props.height || "min-content"};
    width: ${(props) => props.width || "min-content"};
`;

const Card: FC<CardProps> = ({...props}) => {
    return (
        <CardStyled {...props}>
            <Column $gap={props.$gap}>{props.children}</Column>
        </CardStyled>
    );
};

export default Card;
