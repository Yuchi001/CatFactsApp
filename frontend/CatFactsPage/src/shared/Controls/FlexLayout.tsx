import styled from "styled-components";
import {CSSProperties, HTMLProps} from "react";

type FlexLayoutProps = HTMLProps<HTMLDivElement> & {
    $alignItems?: CSSProperties["alignItems"];
    $gap?: string;
    $justifyContent?: CSSProperties["justifyContent"];
};

type RowLayoutProps = FlexLayoutProps & {
    $break?: string;
};

export const Row = styled.div<RowLayoutProps>`
    display: flex;
    flex-direction: row;
    column-gap: ${(props) => props.$gap || 0};
    width: ${(props) => props.width || "100%"};
    height: ${(props) => props.height || "auto"};
    justify-content: ${(props) => props.$justifyContent || "flex-start"};
    align-items: ${(props) => props.$alignItems || "stretch"};

    @media (max-width: ${({$break = "0"}) => $break}) {
        flex-direction: column;
    }
`;

export const Column = styled.div<FlexLayoutProps>`
    display: flex;
    flex-direction: column;
    row-gap: ${(props) => props.$gap || 0};
    width: ${(props) => props.width || "auto"};
    height: ${(props) => props.height || "100%"};
    justify-content: ${(props) => props.$justifyContent || "flex-start"};
    align-items: ${(props) => props.$alignItems || "stretch"};
`;
