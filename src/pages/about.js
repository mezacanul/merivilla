import { FaLocationDot } from "react-icons/fa6";
import { Flex, Text } from "@chakra-ui/react";

export default function About() {
    return (
        <Flex alignItems={"center"}>
            <FaLocationDot />
            <Text ms={"0.5em"}>Mérida, Yuc. México</Text>
        </Flex>
    )
}