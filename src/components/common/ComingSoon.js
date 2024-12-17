const { Text, Flex } = require("@chakra-ui/react");

export default function ComingSoon() {
    return (
        <Flex w={"100vw"} h={"85vh"} justify={"center"} align={"center"}>
            <Text color={"black"}>
                Coming soon...
            </Text>
        </Flex>
    )
}