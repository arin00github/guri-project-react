import { Button, ButtonGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text } from "@chakra-ui/react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onYesClick: () => void;
    message: string;
}

export const ConfirmModal = ({ isOpen, onClose, message, onYesClick }: ConfirmModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay />
            <ModalContent h="220px" data-testid="confirm-modal">
                <ModalBody p={0} flex="0">
                    <Text textAlign="center" py={14} data-testid="confirm-modal-message">
                        {message}
                    </Text>
                </ModalBody>
                <ModalFooter justifyContent="center" alignItems="center" pb={5} pt={2}>
                    <ButtonGroup justifyContent="center" alignItems="center">
                        <Button
                            variant="outline"
                            size="md"
                            onClick={onClose}
                            w="110px"
                            data-testid="confirm-modal-no-btn"
                        >
                            아니오
                        </Button>
                        <Button
                            colorScheme="blue"
                            size="md"
                            onClick={onYesClick}
                            w="110px"
                            data-testid="confirm-modal-yes-btn"
                        >
                            예
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
