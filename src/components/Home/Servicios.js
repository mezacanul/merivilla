import { Box, Circle, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { BsSpeedometer } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";

import { Link } from "@chakra-ui/react";

import SectionLayout from "@/layout/SectionLayout";

export default function Servicios() {
    return (
        <SectionLayout maxW={"container.sm"} color={"black"} py={"7rem"}>
            <Heading size={"2xl"} textAlign={"center"}>
                COMO TE AYUDAMOS
            </Heading>

            {/* Servicios  */}
            <VStack my={"7rem"} spacing={"5rem"}>
                <Servicio
                    direction={"right"}
                    number={1}
                    title={"CONTENIDO EDUCATIVO"}
                    text={
                        "Lorem esse mollit ad laboris. Fugiat consequat labore ut qui in enim sunt esse consequat tempor consectetur veniam. Duis excepteur sint nisi enim est aute commodo nisi commodo ad officia nostrud pariatur."
                    }
                    cta={"VER CONTENIDO"}
                    imgUrl={"serv1.jpg"}
                    bg={"#505784"}
                />

                <Servicio
                    direction={"left"}
                    number={2}
                    title={"CONSULTAS Y GUIANZA"}
                    text={
                        "Lorem esse mollit ad laboris. Fugiat consequat labore ut qui in enim sunt esse consequat tempor consectetur veniam. Duis excepteur sint nisi enim est aute commodo nisi commodo ad officia nostrud pariatur."
                    }
                    cta={"AGENDAR LLAMADA"}
                    imgUrl={"serv2.webp"}
                    bg={"#EBEBEB"}
                />

                <Servicio
                    direction={"right"}
                    number={3}
                    title={
                        <>
                            {"SOFTWARE "}
                            <Text
                                // bgGradient="linear(to-r, #671ac5, #a081ff)"
                                // bgClip="text"
                                fontWeight={"800"}
                                display={"inline"}
                            >
                                VENTAJE
                            </Text>
                        </>
                    }
                    text={
                        "Lorem esse mollit ad laboris. Fugiat consequat labore ut qui in enim sunt esse consequat tempor consectetur veniam. Duis excepteur sint nisi enim est aute commodo nisi commodo ad officia nostrud pariatur."
                    }
                    cta={"VER EL SOFTWARE"}
                    imgUrl={"serv3.webp"}
                    bg={"#505784"}
                />
            </VStack>

            {/* Beneficios  */}
            <HStack justify={"space-around"} my={"3rem"}>
                <Beneficio
                    icon={<BsSpeedometer />}
                    title={"Beneficio 1"}
                    text={"Ea nisi ut amet ea officia eu laborum dolore."}
                />
                <Beneficio
                    icon={<TbWorld />}
                    title={"Beneficio 2"}
                    text={"Ea nisi ut amet ea officia eu laborum dolore."}
                />
                <Beneficio
                    icon={<IoIosPeople />}
                    title={"Beneficio 3"}
                    text={"Ea nisi ut amet ea officia eu laborum dolore."}
                />
            </HStack>
        </SectionLayout>
    );
}

function LinkButton({ children }) {
    return (
        <Link
            href="/target-page"
            fontSize="0.8rem"
            fontWeight={800}
            borderBottom={"1px"}
            transition="all 0.3s ease-out" // Apply transition to the entire Link element
            _hover={{
                transform: "scale(1.05)",
            }}
        >
            {children}
        </Link>
    );
}

function Servicio({ direction, number, title, text, cta, imgUrl, bg }) {
    let img = `url("/${imgUrl}")`;
    let flexDir = direction != "left" ? "row" : "row-reverse";

    return (
        <HStack justify={"center"} position={"relative"} flexDir={flexDir}>
            <Heading
                size={"4xl"}
                fontWeight={800}
                position={"absolute"}
                top={"-3.5rem"}
                {...(direction == "right" ? { left: 0 } : { right: 0 })}
                bgGradient={
                    // "linear-gradient(-45deg, #644609 10%, #f6b431 50%) 1"
                    "linear-gradient(45deg, #9c6a07 0%,#dbb262 80%) 1"
                }
                bgClip={"text"}
            >
                {number}
            </Heading>

            {/* Text Box  */}
            <VStack
                borderRadius={2}
                boxShadow={`${
                    direction == "right" ? "30px" : "-30px"
                } 25px 40px rgba(0,0,0,0.4)`}
                zIndex={2}
                {...(direction == "right" ? { mr: "-4rem" } : { ml: "-4rem" })}
                // mr={"-4rem"}
                bgColor={bg}
                color={bg == "#EBEBEB" ? "black" : "white"}
                w={"50%"}
                py={"2rem"}
                px={"2rem"}
            >
                <Heading fontSize={"lg"} fontWeight={300}>
                    {title}
                </Heading>
                <Text fontSize={"xs"} textAlign={"center"} mb={"0.5rem"}>
                    {text}
                </Text>
                <LinkButton>{cta}</LinkButton>
            </VStack>

            {/* Image Box  */}
            <Box bgImage={img} backgroundSize={"cover"} w={"60%"} h={"22rem"}>
                <Box
                    w={"100%"}
                    h={"100%"}
                    bgColor={bg == "#EBEBEB" ? "#505784" : "#EBEBEB"}
                    opacity={0.65}
                />
            </Box>
        </HStack>
    );
}

function Beneficio({ icon, title, text }) {
    return (
        <VStack>
            <Circle
                mb={"1rem"}
                borderWidth={"0.4rem"}
                borderColor={"#505784"}
                color={"#505784"}
                padding={"1rem"}
                fontSize={"5rem"}
            >
                {icon}
            </Circle>
            <Heading fontSize="xl" textAlign={"center"}>
                {title}
            </Heading>
            <Text textAlign={"center"} width={"80%"}>
                {text}
            </Text>
        </VStack>
    );
}
