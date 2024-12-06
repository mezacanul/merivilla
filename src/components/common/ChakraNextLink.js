import NextLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

function ChakraNextLink({ children, bg, color, href }) {
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
                {children}
            </ChakraLink>
        </>
    );
}

export { ChakraNextLink };
