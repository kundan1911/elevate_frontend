import React from "react";
import { useDisclosure,HStack, PinInput, PinInputField, Select, Modal, Button, ModalBody, ModalHeader, ModalCloseButton, ModalContent, ModalOverlay, ModalFooter } from "@chakra-ui/react"
// Ensure proper import for 'Lorem' if it's supposed to be imported
// Ensure proper import for other undefined variables if needed

function LevelChoose() {
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <>
      <Button onClick={onOpen}>Trigger modal</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Parking Level</ModalHeader>
          <ModalBody>
            <Select mb={4} placeholder='Select Parking Level'>
              <option value='option1'>Level 1</option>
              <option value='option2'>Level 2</option>
              <option value='option3'>Level 3</option>
            </Select>
            {/* Use appropriate content here */}
            <HStack justifyContent={'center'} width={'100%'} mt={7}>
              <PinInput>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LevelChoose;

