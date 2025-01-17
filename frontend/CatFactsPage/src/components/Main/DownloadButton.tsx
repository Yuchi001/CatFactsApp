import React, {CSSProperties, useState} from "react";
import Button from "../../shared/Controls/Button";
import {DownloadSVG} from "../../assets/svg/DownloadSVG";

type IconButtonProps = {
    size: CSSProperties["height"];
    onClick: () => void;
};
export const DownloadButton = ({size, onClick}: IconButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Button
            onClick={onClick}
            variant="secondary"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <DownloadSVG size={size} color={isHovered ? "#f5f5dc" : "black"} />
        </Button>
    );
};
