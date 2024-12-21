// MessagingInterface.jsx
import {
    Progress,
    Select,
    Box,
    Flex,
    Input,
    Button,
    Icon,
    Text,
    VStack,
    HStack,
} from "@chakra-ui/react";
import {
    BsChevronLeft,
    BsChevronRight,
    BsArrowRight,
    BsTelephone,
    BsFileText,
    BsX,
    BsInfoCircle,
} from "react-icons/bs";
// import { RealTimeChat } from "./RealTimeChat";

const MessagingInterface = () => {
    return (
        <Flex
            minH="100vh"
            maxW="7xl"
            mx="auto"
            bg="gradient-to-b from-purple-900 to-black"
        >
            {/* Side Panel */}
            <Box w="72" bg="gray.800" p={4}>
                {/* LSM Side Tab Content */}
            </Box>

            {/* Main Chat Area */}
            <Flex flex={1} direction="column">
                {/* Header */}
                <Box
                    bg="gray.800"
                    p={4}
                    borderBottom="1px"
                    borderColor="gray.700"
                >
                    <Flex justify="space-between">
                        <VStack align="start">
                            <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color="white"
                            >
                                Lead Name
                            </Text>
                            <Text fontSize="sm" color="gray.400">
                                Product: Product Name
                            </Text>
                        </VStack>

                        <VStack align="end">
                            <Text fontSize="lg" color="purple.400">
                                Product ID
                            </Text>
                            <HStack spacing={2} mt={2}>
                                <Button
                                    size="sm"
                                    p={2}
                                    borderRadius="full"
                                    bg="gray.700"
                                >
                                    <Icon as={BsTelephone} />
                                </Button>
                                <Button
                                    size="sm"
                                    p={2}
                                    borderRadius="full"
                                    bg="gray.700"
                                >
                                    <Icon as={BsFileText} />
                                </Button>
                                <Button
                                    size="sm"
                                    p={2}
                                    borderRadius="full"
                                    bg="gray.700"
                                >
                                    <Icon as={BsX} />
                                </Button>
                                <Button
                                    size="sm"
                                    p={2}
                                    borderRadius="full"
                                    bg="gray.700"
                                >
                                    <Icon as={BsInfoCircle} />
                                </Button>
                                <Button
                                    size="sm"
                                    p={2}
                                    borderRadius="full"
                                    bg="gray.700"
                                >
                                    <Icon as={BsChevronLeft} />
                                </Button>
                            </HStack>
                        </VStack>
                    </Flex>
                </Box>

                {/* Chat Area */}
                <RealTimeChat />

                {/* Input Area */}
                <Box bg="gray.800" p={4} borderTop="1px" borderColor="gray.700">
                    <Flex gap={3}>
                        <Input
                            bg="gray.700"
                            border="none"
                            color="white"
                            placeholder="Type a message..."
                            flex={1}
                        />
                        <Button colorScheme="purple">
                            <Icon as={BsArrowRight} />
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    );
};

// RealTimeChat.jsx
const RealTimeChat = () => {
    return (
        <Box flex={1} p={6} overflow="auto">
            {/* Messages would go here in a map */}

            {/* <Message message={"Example incoming message"}/> */}
            <Flex justify="start" mb={4}>
                <Box maxW="70%" bg="gray.700" p={2} borderRadius="lg">
                    <Text color="white">Example incoming message</Text>
                </Box>
            </Flex>
            <Flex justify="end" mb={4}>
                <Box maxW="70%" bg="purple.600" p={2} borderRadius="lg">
                    <Text color="white">Example outgoing message</Text>
                </Box>
            </Flex>
        </Box>
    );
};

// Message component in RealTimeChat
const Message = ({ message }) => (
    <Flex justify={message.source === 'lead' ? 'start' : 'end'} mb={4}>
      <Box maxW="70%">
        <Box 
          bg={message.source === 'lead' ? 'gray.700' : 'purple.600'} 
          color="white"
          p={2}
          borderRadius="lg"
        >
          <Text>{message.content}</Text>
        </Box>
        <Flex 
          justify={message.source === 'lead' ? 'start' : 'end'} 
          mt={1}
          fontSize="xs"
          color="gray.400"
        >
          <Text>{message.source} | {message.type}</Text>
          <Text ml={2}>{message.timestamp}</Text>
        </Flex>
        {message.status === 'sending' && (
          <Button size="xs" colorScheme="green" mt={2}>
            Send Now
          </Button>
        )}
      </Box>
    </Flex>
  )

// WhatsappTemplateMessage.jsx
const WhatsappTemplateMessage = ({ onMessageSent }) => {
    return (
        <Box bg="gray.800" p={4} borderRadius="md">
            <VStack spacing={4}>
                <Text color="white" fontWeight="bold">
                    Select Template
                </Text>
                <Select bg="gray.700" color="white">
                    <option value="">Select a template</option>
                    <option value="greeting">Greeting</option>
                    <option value="followup">Follow Up</option>
                </Select>
                <Button w="full" colorScheme="purple" onClick={onMessageSent}>
                    Send Template
                </Button>
            </VStack>
        </Box>
    );
};

// LSMSideTab.jsx
const LSMSideTab = ({ interest, stage, lead_origin }) => {
    return (
        <Box w="72" bg="gray.800" p={6}>
            <VStack spacing={6} align="start">
                <Box>
                    <Text color="gray.400">Interest Level</Text>
                    <Progress value={interest} colorScheme="purple" />
                </Box>

                <Box>
                    <Text color="gray.400">Stage</Text>
                    <Text color="white" fontSize="lg">
                        {stage}
                    </Text>
                </Box>

                <Box>
                    <Text color="gray.400">Lead Origin</Text>
                    <Text color="white" fontSize="lg">
                        {lead_origin}
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
};

export { RealTimeChat, MessagingInterface };
