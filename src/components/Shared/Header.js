import { useRouter } from "next/router";
import Link from "next/link";
import { Flex, Box, Text, HStack } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

const LinkStyles = (pos) => {
    if (pos == "left") {
        return { me: "1em" };
    } else if (pos == "right") {
        return { ms: "1em" };
    }
};

export default function Header({onOpen}) {
    const router = useRouter();
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        // console.log(router.asPath);
        
        const handleScroll = () => {
            setScrolling(window.scrollY > 50); // Change this value for different thresholds
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Flex
            alignItems={"center"}
            position={"fixed"}
            width={"100vw"}
            zIndex={10}
            minH={{base:"4rem", lg: "5rem", xl: "6rem"}}
            backgroundColor={"transparent"}
            bg={scrolling ? "#efefef" : "transparent"} // Transition between colors
            color={scrolling || (((router.asPath) != "/") && ((router.asPath) != "/#contacto") && ((router.asPath) != "/blog"))  && ((router.asPath) != "/ventaje") ? "black" : "white"} // Text color based on background
            boxShadow={scrolling ? "lg" : "none"}
            transition="all 0.3s ease"
        >
            <Flex w={"100%"} justifyContent={"space-between"} align={"center"} px={"2em"}>
                <Link
                    style={{ marginRight: "1em" }}
                    {...LinkStyles("left")}
                    href="/"
                >
                    <HStack align={"flex-end"} spacing={0}>
                        <Text size={{base: "sm", xl: "md"}} display={"inline"} fontWeight={800}>
                            MERIVILLA.</Text>
                        <Text size={{base: "sm", xl: "md"}}>CO</Text>
                    </HStack>
                </Link>

                <Text size={{base: "md", md: "lg", lg: "lg", xl: "lg"}} onClick={onOpen}>
                    <HamburgerIcon cursor="pointer" />
                </Text>
            </Flex>
        </Flex>
    );
}
