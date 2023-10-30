import { Button, ButtonGroup, Modal, ModalBody, ModalContent, Text, ModalFooter, ModalOverlay } from "@chakra-ui/react";

interface ResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    onYesClick: () => void;
    message: string;
}

export const ResultModal = ({ isOpen, onClose, message, onYesClick }: ResultModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay />
            <ModalContent h="220px" data-testid="result-modal">
                <ModalBody p={0} flex="0">
                    <Text textAlign="center" py={14} data-testid="result-modal-message">
                        {message}
                    </Text>
                </ModalBody>
                <ModalFooter justifyContent="center" alignItems="center" pb={5} pt={2}>
                    <ButtonGroup justifyContent="center" alignItems="center">
                        <Button colorScheme="blue" size="md" onClick={onYesClick} data-testid="result-modal-btn">
                            확인
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
