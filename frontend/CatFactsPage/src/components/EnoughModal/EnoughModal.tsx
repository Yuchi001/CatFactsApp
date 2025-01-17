import React, {useEffect, useState} from "react";
import Modal from "../../shared/Controls/Modal";
import Card from "../../shared/Controls/Card";
import Typography from "../../shared/Controls/Typography";
import {Row} from "../../shared/Controls/FlexLayout";
import Button from "../../shared/Controls/Button";
import {Score} from "../../shared/hooks/useCatFacts";

type ModalProps = {
    lose: () => void;
    win: () => void;
    tryToWin: () => Promise<Score>;
    setOpen: (open: boolean) => void;
    open: boolean;
};
export const EnoughModal = ({lose, win, tryToWin, setOpen, open}: ModalProps) => {
    const [res, setRes] = useState<Score | undefined>(undefined);

    useEffect(() => {
        if (!open) return;
        tryToWin().then((r) => setRes(r));
    }, [open]);

    if (!res) return <></>;

    return (
        <Modal isOpen={open}>
            <Card $gap="20px" height="auto" width="300px">
                <Typography
                    width="100%"
                    fontWeight="bold"
                    fontSize="50px"
                    alignText="center"
                    text={res.won ? "Congratulations!" : "Game Over!"}
                />
                <Typography
                    text={
                        res.won
                            ? "You won! Keep it up and of course, gamble more!"
                            : "You lost! Hovever you can always try again :)"
                    }
                />
                <Typography
                    text={`Computer gambled ${res.facts.length} facts, and scored ${res.catness} catness points!`}
                />
                <Row>
                    <Button
                        height="70px"
                        fullWidth
                        onClick={() => {
                            setOpen(false);
                            const func = res.won ? win : lose;
                            func();
                            setRes(undefined);
                        }}
                    >
                        {res.won ? "Go next!" : "Try again!"}
                    </Button>
                </Row>
            </Card>
        </Modal>
    );
};
