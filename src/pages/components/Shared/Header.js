import { useRouter } from "next/router";
import Link from "next/link";
import { Flex, Box, Text } from "@chakra-ui/react";
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
            minH={"3rem"}
            alignItems={"center"}
            backgroundColor={"transparent"}
            position={"fixed"}
            width={"100vw"}
            bg={scrolling ? "#efefef" : "transparent"} // Transition between colors
            color={scrolling ? "black" : "white"} // Text color based on background
            boxShadow={scrolling ? "lg" : "none"}
            transition="background-color 0.4s ease, box-shadow 0.3s ease"
        >
            <Flex w={"100%"} justifyContent={"space-between"} px={"2em"}>
                <Link
                    style={{ marginRight: "1em" }}
                    {...LinkStyles("left")}
                    href="/"
                >
                    <Text display={"inline"} fontWeight="bold">
                        MERIVILLA
                    </Text>{" "}
                    CO.
                </Link>

                <Box onClick={onOpen}>
                    <HamburgerIcon w={6} h={6} cursor="pointer" />
                </Box>
            </Flex>
        </Flex>
    );
}
