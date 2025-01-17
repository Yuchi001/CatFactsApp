import React, {useState} from "react";
import CatLogo from "../../assets/cat-logo.png";
import Typography from "../../shared/Controls/Typography";
import {Column, Row} from "../../shared/Controls/FlexLayout";
import Button from "../../shared/Controls/Button";
import {MethodName, useCatFacts} from "../../shared/hooks/useCatFacts";
import {GameOverModal} from "./../GameOverModal/GameOverModal";
import {EnoughModal} from "./../EnoughModal/EnoughModal";
import {DownloadButton} from "./DownloadButton";

export const MainPage = () => {
    const [currentFact, setCurrentFact] = useState<string>("");
    const {isLoading, tryToWin, win, savedFacts, getCatFact, currentStacks, lose} = useCatFacts();
    const [enoughModalOpen, setEnoughModalOpen] = useState<boolean>(false);

    const downloadFactsAsTxt = () => {
        const factsAsText = savedFacts.join("\n");
        const blob = new Blob([factsAsText], {type: "text/plain"});
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "saved_facts.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Column $gap="30px" $alignItems="center" style={{marginTop: "50px"}}>
            <Row $alignItems="center" $justifyContent="center">
                <img width="320px" height="auto" src={CatLogo} alt="Cat image logo" />
                <Typography fontSize="120px" text="Cat Casino" alignText="center" />
            </Row>
            <Column width="500px" $alignItems="center" $justifyContent="center">
                {currentFact && <Typography text="Your fact:" fontSize="30px" />}
                <Typography alignText="center" text={currentFact} />
            </Column>
            <Row $gap="20px" $alignItems="center" $justifyContent="center">
                <Button
                    isLoading={
                        isLoading.isLoading && isLoading.loadingID === MethodName.GetRandomFact
                    }
                    width="300px"
                    height="100px"
                    onClick={async () => {
                        const fact = await getCatFact();
                        setCurrentFact(fact.fact);
                    }}
                >
                    Hit me!
                </Button>
                <Button
                    isLoading={isLoading.isLoading && isLoading.loadingID === MethodName.TryWin}
                    width="300px"
                    height="100px"
                    onClick={() => setEnoughModalOpen(true)}
                >
                    Enough!
                </Button>
            </Row>
            <Column width="500px" $alignItems="center" $justifyContent="center">
                <Typography text={`Current Stacks: ${currentStacks}`} />
                <Row $alignItems="center" $justifyContent="center">
                    {savedFacts.length > 0 && (
                        <DownloadButton size="24px" onClick={downloadFactsAsTxt} />
                    )}
                    <Typography text={`Saved facts: ${savedFacts.length}`} />
                </Row>
            </Column>
            <GameOverModal clearData={lose} currentStacks={currentStacks} />
            <EnoughModal
                tryToWin={tryToWin}
                open={enoughModalOpen}
                setOpen={setEnoughModalOpen}
                lose={lose}
                win={win}
            />
        </Column>
    );
};
