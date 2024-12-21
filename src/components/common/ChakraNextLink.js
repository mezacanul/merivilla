import NextLink from "next/link";
import { Link as ChakraLink, Text } from "@chakra-ui/react";

function ChakraNextLink({ children, bg, color, href, ...props }) {
    return (
        <>
            <ChakraLink
                as={NextLink}
                href={href}
                bg={bg}
                color={color}
                borderBottom={"1px"}
                borderColor={"transparent"}
                _hover={{
                    textDecor: "none",
                    borderColor: "white",
                }}
                >
                <Text {...props}>
                    {children}
                </Text>
            </ChakraLink>
        </>
    );
}

export { ChakraNextLink };
