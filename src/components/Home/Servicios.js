import { Box, Circle, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { HiMiniArrowsPointingIn } from "react-icons/hi2";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
// import { IoIosPeople } from "react-icons/io";

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
                        "Accede a más de 100 piezas de contenido diseñadas específicamente para impulsar tu negocio. Desde estrategias de marketing y ventas hasta finanzas y más, nuestro equipo está actualizado con las técnicas más efectivas y modernas del mercado."
                    }
                    cta={"VER CONTENIDO"}
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
                    imgUrl={"serv1.jpg"}
                    bg={"light"}
                />

                <Servicio
                    direction={"right"}
                    number={3}
                    title={
                        <>
                            {"SOFTWARE "}
                            <Text as={"span"} fontWeight={"800"} display={"inline"}>
                                VENTAJE
                            </Text>
                        </>
                    }
                    text={
                        <>
                            {"La plataforma más avanzada del mercado inmobiliario. Con herramientas de automatización, centralización y un equipo dedicado, "}
                            <Text as={"span"} fontWeight={"800"} display={"inline"}>
                                Ventaje
                            </Text>
                            {" te permitirá lograr más con menos inversión. Una vez que lo pruebes, no querrás volver atrás."}
                        </>
                    }
                    cta={"VER EL SOFTWARE"}
                    imgUrl={"ventaje.png"}
                    bg={"blue"}
                />
            </VStack>

            {/* Beneficios  */}
            <HStack justify={"space-around"} my={"3rem"}>
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
                color={bg == "light" ? "black" : "white"}
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
                    bgColor={bg == "light" ? "blue" : "light"}
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
                borderWidth={"0.7rem"}
                borderColor={"blue"}
                color={"softBlue"}
                padding={"2rem"}
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
