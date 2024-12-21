import {
    Text,
    Flex,
    Box,
    Heading,
    Image,
    HStack,
    ring,
    Stack,
} from "@chakra-ui/react";
import GoldButton from "../common/GoldButton";
import { Link as ScrollLink } from "react-scroll";

export default function Hero() {
    return (
        <>
            <Flex {...styles.container} minH={"100vh"} px={["2rem", "2rem", "3rem", "9rem"]} pt={["8rem", "8rem", "8rem", "0"]}>
                {/* Overlay  */}
                <Box {...styles.blackOverlay} />

                {/* Hero Relative Content  */}
                <Box zIndex={1}>
                    <Heading
                        mb={"1rem"}
                        width={["100%", "80vw", "50vw"]}
                        fontWeight={"300"}
                        size={["sm", "sm", "lg"]}
                    >
                        <Heading size={["sm", "sm", "sm", "lg"]} as={"b"} display={"inline"} fontWeight={600}>
                            EVOLUCIONA
                        </Heading>
                        {" "}TU NEGOCIO INMOBILIARIO EN{" "}
                        <Heading size={["sm", "sm", "sm", "lg"]} as={"b"} display={"inline"} fontWeight={600}>
                            2025
                        </Heading>
                    </Heading>
                    <Text w={["100%", "80%", "45vw"]} mb={"3rem"} size={["sm", "sm", "sm", "md"]}>
                        Ante una industria competitiva en innovación constante,{" "}
                        <Text size={["sm", "sm", "sm", "md"]} as={"b"}>
                            Merivilla Co
                        </Text>{" "}
                        te ofrece las herramientas necesarias para no solo
                        adaptarse, sino estar adelante del mercado y llevar tu
                        negocio al siguiente nivel.
                    </Text>
                    <ScrollLink 
                        to={"contacto"} 
                        smooth={true}
                        duration={700} // scroll duration in ms
                        offset={-100} // offset for fixed headers
                    >
                        <GoldButton>INSCRIBETE HOY</GoldButton>
                    </ScrollLink>
                </Box>

                {/* Testimonial  */}
                <HeroTestimonial display={["none", "none", "none", "flex"]} version={"desktop"}/>

            </Flex>
        
            <HeroTestimonial display={["flex", "flex", "flex", "none"]} version={"mobile"}/>
        </>
    );
}

function HeroTestimonial({display, version}) {
    return (
        <>
            {/* Testimonial  */}
            <Stack
                direction={["column-reverse", "column-reverse", "column-reverse", "row"]}
                align={"center"}
                {...styles.testimonial.main}
                px={["3rem", "4rem", "5rem", "2rem"]}
                py={["3rem", "3rem", "3rem", "2.5rem"]}
                {...(version == "desktop" ? styles.testimonial.desktop : styles.testimonial.mobile)}
                boxShadow={["", "", "", "0px 10px 8px rgba(0,0,0,0.3)"]}
                position={["relative", "relative", "relative", "absolute"]}
                display={display}
            >
                <Box {...styles.testimonialText}>
                    <Text
                        as={"b"}
                        size={["xs", "xs", "sm", "sm"]}
                        w={"85%"}
                        margin={"auto"}
                    >
                        "Gracias a Merivilla Co, este año nuestro desarrollo
                        será el más vendido en el municipio de Aldea Zamá,
                        Tulum."
                    </Text>
                    <Text size={["xs", "xs", "sm", "sm"]} fontWeight={400} mt={"1rem"}>
                        CEO de DOGE
                    </Text>
                </Box>

                <Image {...styles.img} src={"face.jpg"} mb={["1.5rem", "1.5rem", "1.5rem", "0"]}/>
            </Stack>
        </>
    )
}

const styles = {
    container: {
        width: "100vw",
        backgroundImage: "url('merida.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        position: "relative",
        alignItems: "center",
        pb: "12.5rem",
    },
    blackOverlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        // background: "rgba(0, 66, 104, 0.5)"
        // background: "#21213b",
        background: "blue",
        opacity: 0.7,
    },
    testimonial: {
        main: {
            background: "#ffffff",
            color: "black",
            textAlign: "center",
            zIndex: 1,
        },
        desktop: {
            width: "50rem",
            bottom: "5rem",
            right: "50%",
            transform: "translateX(50%)",
        },
    },
    img: {
        width: "7rem",
        height: "7rem",
        borderRadius: "5rem",
    },
};
