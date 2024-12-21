import { Box, Circle, Container, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { HiMiniArrowsPointingIn } from "react-icons/hi2";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
// import { IoIosPeople } from "react-icons/io";

import { Link } from "@chakra-ui/react";

import SectionLayout from "@/layout/SectionLayout";

export default function Servicios() {
    return (
        <>
            <SectionLayout maxW={["100vw", "container.lg"]} color={"black"} py={"4rem"} px={["2rem", "0"]}>
                <Heading textAlign={"center"} >
                    COMO TE AYUDAMOS
                </Heading>

                {/* Servicios  */}
                <VStack my={"6rem"} spacing={"6rem"}>
                    <Servicio
                        direction={"right"}
                        number={1}
                        title={"CONTENIDO EDUCATIVO"}
                        text={
                            "Accede a más de 100 piezas de contenido diseñadas específicamente para impulsar tu negocio. Desde estrategias de marketing y ventas hasta finanzas y más, nuestro equipo está actualizado con las técnicas más efectivas y modernas del mercado."
                        }
                        cta={"VER CONTENIDO"}
                        href={"/contenidoeducativo"}
                        imgUrl={"serv2.webp"}
                        bg={"blue"}
                    />

                    <Servicio
                        direction={"left"}
                        number={2}
                        title={"CONSULTAS Y GUIANZA"}
                        text={
                            "Conéctate con nuestros expertos para recibir asesoramiento y capacitación. Te ayudaremos a identificar tus retos y crear un plan de acción personalizado para que obtengas resultados efectivos en cualquier área de tu negocio."
                        }
                        cta={"AGENDAR LLAMADA"}
                        href={"/consultoria"}
                        imgUrl={"serv1.jpg"}
                        bg={"light"}
                    />

                    <Servicio
                        direction={"right"}
                        number={3}
                        title={
                            <>
                                {"SOFTWARE "}
                                <Text as={"b"} display={"inline"}>
                                    VENTAJE
                                </Text>
                            </>
                        }
                        text={
                            <>
                                {"La plataforma más avanzada del mercado inmobiliario. Con herramientas de automatización, centralización y un equipo dedicado, "}
                                <Text size={"sm"} as={"b"} display={"inline"}>
                                    Ventaje
                                </Text>
                                {" te permitirá lograr más con menos inversión. Una vez que lo pruebes, no querrás volver atrás."}
                            </>
                        }
                        cta={"VER EL SOFTWARE"}
                        href={"/ventaje"}
                        imgUrl={"ventaje.png"}
                        bg={"blue"}
                    />
                </VStack>

                {/* Beneficios  */}
                {/* <HStack justify={"space-around"} my={"3rem"}>
                    <Beneficio
                        icon={<IoPeopleSharp />}
                        title={"EQUIPO PERSONALIZAD"}
                        text={"Te asignamos un equipo altamente capacitado de Merivilla Co."}
                    />
                    <Beneficio
                        icon={<HiMiniArrowsPointingIn />}
                        title={"ADMINISTRA"}
                        text={"Todos los aspectos de tu negocio desde una plataforma centralizada en tiempo real."}
                    />
                    <Beneficio
                        icon={<FaMoneyBillTrendUp />}
                        title={"OPTIMIZA"}
                        text={"Toma el control, reduce tus gastos, tiempo, y aun te daremos mas resultados."}
                    />
                </HStack> */}
            </SectionLayout>

            {/* Beneficios  */}
            <Container maxW={"container.xl"} color={"black"} mt={"-8rem"} mb={"7rem"}>
                <Stack justify={"space-around"} my={"3rem"} align={["center", "flex-start"]} direction={["column", "row"]}>
                    <Beneficio
                        icon={<IoPeopleSharp />}
                        title={"EQUIPO PERSONALIZADO"}
                        text={"Te asignamos un equipo altamente capacitado de Merivilla Co."}
                    />

                    <Beneficio
                        icon={<HiMiniArrowsPointingIn />}
                        title={"ADMINISTRA"}
                        text={"Todos los aspectos de tu negocio desde una plataforma centralizada en tiempo real."}
                    />
                    
                    <Beneficio
                        icon={<FaMoneyBillTrendUp />}
                        title={"OPTIMIZA"}
                        text={"Toma el control, reduce tus gastos, tiempo, y aun te daremos mas resultados."}
                    />
                </Stack>
            </Container>
        </>
    );
}

function LinkButton({ children, href, ...props }) {
    return (
        <Link
            href={href}
            fontSize="0.8rem"
            fontWeight={800}
            borderBottom={"1px"}
            transition="all 0.3s ease-out" // Apply transition to the entire Link element
            _hover={{
                transform: "scale(1.05)",
            }}
            {...props}
        >
            {children}
        </Link>
    );
}

function Servicio({ direction, number, title, text, cta, imgUrl, bg, href }) {
    let img = `url("/${imgUrl}")`;
    let flexDir = direction != "left" ? "row" : "row-reverse";

    return (
        <Stack justify={"center"} position={"relative"} direction={["column-reverse", "column-reverse", "column-reverse", flexDir]} align={"center"}>
            {/* Floating Number */}
            <Heading
                size={["xl", "xl", "xl", "xl"]}
                fontWeight={"bold"}
                position={"absolute"}
                zIndex={10}
                top={"-3.5rem"}
                {...(direction == "right" ? { left: [0, "3.5rem", "8rem", 0] } : { right: [0, "3.5rem", "8rem", 0] })}
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
                mt={["-5rem", "-5rem", "-8rem", "0"]}
                borderRadius={2}
                boxShadow={["0", `${
                    direction == "right" ? "30px" : "-30px"
                } 25px 40px rgba(0,0,0,0.4)`]}
                zIndex={2}
                {...(direction == "right" ? { mr: ["0", "0", "0", "-4rem"] } : { ml: ["0", "0", "0", "-4rem"] })}
                // mr={"-4rem"}
                bgColor={bg}
                color={bg == "light" ? "black" : "white"}
                w={["90%", "65%", "55%", "45%"]}
                py={["2.5rem", "2.5rem", "2.5rem", "3.5rem"]}
                px={"2rem"}
            >
                <Text size={["sm", "sm", "md", "md"]} mb={"0.7rem"} textAlign={"center"}>
                    {title}
                </Text>
                <Text size={["xs", "xs", "sm", "sm"]} textAlign={"center"} mb={"0.5rem"}>
                    {text}
                </Text>
                <LinkButton href={href}>
                    <Text textAlign={"center"} size={["xs", "xs", "md", "sm"]}>
                        {cta}
                    </Text>
                </LinkButton>
            </VStack>

            {/* Image Box  */}
            <Box bgImage={img} backgroundSize={"cover"} w={["100%", "80%", "70%", "50%"]} h={["20rem", "25rem", "28rem", "30rem"]}>
                <Box
                    w={"100%"}
                    h={"100%"}
                    bgColor={bg == "light" ? "blue" : "light"}
                    opacity={0.65}
                />
            </Box>
        </Stack>
    );
}

function Beneficio({ icon, title, text }) {
    return (
        <VStack w={["90%", "33%"]}>
            <Circle
                mb={["0", "1rem"]}
                // borderWidth={"0.7rem"}
                // borderColor={"blue"}
                borderColor={"transparent"}
                color={"softBlue"}
                padding={"2rem"}
                fontSize={"5rem"}
            >
                {icon}
            </Circle>
            <Text size={["sm", "xs", "sm", "lg"]} as={"b"} textAlign={"center"} width={"80%"} mb={"0.6rem"}>
                {title}
            </Text>
            <Text size={"sm"} textAlign={"center"} width={"75%"}>
                {text}
            </Text>
        </VStack>
    );
}
