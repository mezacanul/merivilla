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
        console.log(router.asPath);
        
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
            zIndex={10}
            minH={"6rem"}
            alignItems={"center"}
            backgroundColor={"transparent"}
            position={"fixed"}
            width={"100vw"}
            bg={scrolling ? "#efefef" : "transparent"} // Transition between colors
            color={scrolling || (((router.asPath) != "/") && ((router.asPath) != "/#contacto") && ((router.asPath) != "/blog")) ? "black" : "white"} // Text color based on background
            boxShadow={scrolling ? "lg" : "none"}
            transition="background-color 0.4s ease, box-shadow 0.3s ease"
        >
            <Flex w={"100%"} justifyContent={"space-between"} align={"center"} px={"2em"}>
                <Link
                    style={{ marginRight: "1em" }}
                    {...LinkStyles("left")}
                    href="/"
                >
                    <HStack align={"flex-end"} spacing={0}>
                        <Text display={"inline"} fontWeight={800}>
                            MERIVILLA.</Text>
                        <Text>CO</Text>
                    </HStack>
                </Link>

                <Text size={["md", "sm", "md", "lg"]} onClick={onOpen}>
                    <HamburgerIcon cursor="pointer" />
                </Text>
            </Flex>
        </Flex>
    );
}
