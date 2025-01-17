import React, {useEffect, useState} from "react";

type TextWithHighlightProps = {
    text: string;
};

export const TextWithHighlight: React.FC<TextWithHighlightProps> = ({text}) => {
    const [displayedText, setDisplayedText] = useState<string>("");
    const [, setIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                if (prevIndex < text.length) {
                    setDisplayedText((prevText) => prevText + text[prevIndex]);
                    return prevIndex + 1;
                } else {
                    clearInterval(interval);
                    return prevIndex;
                }
            });
        }, 50);

        return () => clearInterval(interval);
    }, [text]);

    const renderTextWithHighlight = () => {
        const words = displayedText.split(" ");

        return words.map((word, i) => {
            if (word.toLowerCase().includes("cat")) {
                return (
                    <span key={i} style={{color: "#F5F5DC", textDecoration: "underline"}}>
                        {word}{" "}
                    </span>
                );
            } else {
                return <span key={i}>{word}</span>;
            }
        });
    };

    return <div>{renderTextWithHighlight()}</div>;
};
