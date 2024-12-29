import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay } from "@chakra-ui/react";

// Fullscreen Modal Component
export default function FullscreenModal({ isOpen, onClose, children }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"50rem"}
            closeOnOverlayClick={true}
        >
            <ModalOverlay />
            <ModalContent bg={"transparent"} boxShadow={"none"}>
                {/* <ModalHeader>Fullscreen Modal</ModalHeader> */}
                <ModalCloseButton
                    color={"white"}
                    mx={"8rem"}
                    fontSize={"1.5rem"}
                />

                <ModalBody h={"100%"} py={"0"}>
                    {children}
                </ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    );
};