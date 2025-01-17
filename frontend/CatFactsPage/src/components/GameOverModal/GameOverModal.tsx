import React, {useEffect, useState} from "react";
import Modal from "../../shared/Controls/Modal";
import Card from "../../shared/Controls/Card";
import Typography from "../../shared/Controls/Typography";
import {Row} from "../../shared/Controls/FlexLayout";
import Button from "../../shared/Controls/Button";

type ModalProps = {
    currentStacks: number;
    clearData: () => void;
};
export const GameOverModal = ({currentStacks, clearData}: ModalProps) => {
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (currentStacks <= 9 || open) return;
        setOpen(true);
    }, [currentStacks]);

    return (
        <Modal isOpen={open}>
            <Card $gap="20px" height="auto" width="300px">
                <Typography
                    width="100%"
                    fontWeight="bold"
                    fontSize="50px"
                    alignText="center"
                    text="Game Over!"
                />
                <Typography text="You lost! Hovever you can always try again :)" />
                <Row>
                    <Button
                        height="70px"
                        fullWidth
                        onClick={() => {
                            clearData();
                            setOpen(false);
                        }}
                    >
                        Try Again
                    </Button>
                </Row>
            </Card>
        </Modal>
    );
};
