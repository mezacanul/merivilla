import { Box, Container, HStack, Text } from "@chakra-ui/react";
import { ChakraNextLink as Link } from "../common/ChakraNextLink";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Divider = () => {
    return <Text fontWeight={"600"} _hover={{cursor: "default"}}>|</Text>;
};

export default function Footer() {
    const router = useRouter();
    const [useFooter, setUseFooter] = useState(true)

    useEffect(() => {
        console.log(router.asPath);
        
        if(router.asPath == "/login"){
            setUseFooter(false)
        } else {
            setUseFooter(true)
        }
    }, [router.asPath]);
    
    return (
        <>
            {useFooter == true && 
                (<Box bg={"black"} px={"6rem"} pt={"3rem"} pb={"3rem"}>
                    <Container maxW={"container.xl"}>
                        <HStack
                            justify={"center"}
                            spacing={"0.8rem"}
                            mb={"2rem"}
                        >
                            <Link href={"privacidad"}>POLITICA DE PRIVACIDAD</Link>
                            <Divider />
                            <Link href={"uso"}>TERMINOS DE USO</Link>
                            <Divider />
                            <Link href={"trabajo"}>TRABAJO</Link>
                            <Divider />
                            <Text
                                bgGradient="linear(to-r, #671ac5, #a081ff)"
                                bgClip="text"
                                as={"b"}
                            >
                                <Link href={"ventaje"}>VENTAJE</Link>
                            </Text>
                        </HStack>
                        {/* <Text fontSize={"0.9rem"} textAlign={"center"}>Merivilla 2024 ©</Text> */}
                    </Container>
                </Box>)
            }
        </>
    );
}
