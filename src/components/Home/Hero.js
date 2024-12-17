import {
    Text,
    Flex,
    Box,
    Heading,
    Image,
    HStack,
    ring,
} from "@chakra-ui/react";
import GoldButton from "../common/GoldButton";
import { Link as ScrollLink } from "react-scroll";

export default function Hero() {
    return (
        <Flex {...styles.container}>
            <Box {...styles.blackOverlay} />

            <Box zIndex={1}>
                <Heading
                    mb={"1rem"}
                    width={"50vw"}
                    fontWeight={"300"}
                >
                    <Heading as={"b"} display={"inline"} fontWeight={600}>
                        EVOLUCIONA
                    </Heading>
                    {" "}TU NEGOCIO INMOBILIARIO EN{" "}
                    <Heading as={"b"} display={"inline"} fontWeight={600}>
                        2025
                    </Heading>
                </Heading>
                <Text w={"45vw"} mb={"3rem"}>
                    Ante una industria competitiva en innovación constante,{" "}
                    <Text as={"b"}>
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

            <HStack
                {...styles.testimonial}
                boxShadow={"0px 10px 8px rgba(0,0,0,0.3)"}
            >
                <Box {...styles.testimonialText}>
                    <Text
                        as={"b"}
                        size={"sm"}
                        w={"85%"}
                        margin={"auto"}
                    >
                        "Gracias a Merivilla Co, este año nuestro desarrollo
                        será el más vendido en el municipio de Aldea Zamá,
                        Tulum."
                    </Text>
                    <Text size={"sm"} fontWeight={400} mt={"1rem"}>
                        CEO de DOGE
                    </Text>
                </Box>

                <Image {...styles.img} src={"face.jpg"} />
            </HStack>
        </Flex>
    );
}

const styles = {
    container: {
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('merida.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        position: "relative",
        alignItems: "center",
        paddingLeft: "9rem",
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
        width: "50rem",
        background: "#ffffff",
        zIndex: 1,
        color: "black",
        py: "2.5rem",
        px: "2rem",
        position: "absolute",
        bottom: "5rem",
        // right: "25rem",
        right: "50%",
        transform: "translateX(50%)",
        textAlign: "center",
        // borderRadius: "0.4rem",
    },
    img: {
        width: "7rem",
        height: "7rem",
        borderRadius: "5rem",
    },
};
