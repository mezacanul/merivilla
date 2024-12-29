import { customShadow } from "@/utils/customShadow";
import scaleEffect from "@/utils/scaleEffect";

const { HStack, Text } = require("@chakra-ui/react");

export default function AddBlockBtn({ name, icon, type, onClick }) {
    const handleClick = (e) => {
        e.preventDefault();
        onClick();
    };

    return (
        <HStack
            as={"button"}
            {...scaleEffect}
            {...customShadow}
            w={"100%"}
            p={"5"}
            borderRadius={"1rem"}
            justify={{ base: "flex-start", lg: "space-between" }}
            onClick={handleClick}
        >
            <HStack>
                <Text size={"xl"}>{icon}</Text>
                <Text display={{ md: "none", lg: "inline" }} fontWeight={"200"}>
                    {name}
                </Text>
            </HStack>
            <Text size={"md"}>+</Text>
        </HStack>
    );
}