import React, {CSSProperties, FC, HTMLAttributes, ReactNode} from "react";
import styled from "styled-components";

type TypographyProps = HTMLAttributes<HTMLDivElement> & {
    text: string;
    alignText?: "left" | "center" | "right";
    fontSize?: CSSProperties["fontSize"];
    fontWeight?: CSSProperties["fontWeight"];
    width?: CSSProperties["width"];
};

type StyledTypographyProps = HTMLAttributes<HTMLDivElement> & {
    $alignItems: CSSProperties["alignItems"];
    $fontSize?: CSSProperties["fontSize"];
    $fontWeight?: CSSProperties["fontWeight"];
    $width?: CSSProperties["width"];
};

const StyledTypography = styled.div<StyledTypographyProps>`
    width: ${(props) => props.$alignItems};
    position: relative;
    display: flex;
    text-align: ${(props) => props.$alignItems};
    justify-content: ${(props) => props.$alignItems};
    font-size: ${(props) => props.$fontSize};
    font-weight: ${(props) => props.$fontWeight};
    color: ${(props) => props.color};
`;

const Typography: FC<TypographyProps> = ({
    alignText = "left",
    fontWeight = "normal",
    fontSize = "16px",
    width = "min-content",
    ...props
}) => {
    const tryUpperCase = (): ReactNode => {
        return props.text.length <= 0 ? "" : props.text[0].toUpperCase() + props.text.substring(1);
    };

    return (
        <StyledTypography
            $width={width}
            $fontWeight={fontWeight}
            $fontSize={fontSize}
            $alignItems={alignText}
        >
            {tryUpperCase()}
        </StyledTypography>
    );
};

export default Typography;
