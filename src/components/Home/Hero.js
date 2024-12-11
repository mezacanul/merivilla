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

export default function Hero() {
    return (
        <Flex {...styles.container}>
            <Box {...styles.blackOverlay} />

            <Box zIndex={1}>
                <Heading
                    fontWeight={"200"}
                    size={"4xl"}
                    mb={"1rem"}
                    width={"50vw"}
                >
                    <Text display={"inline"} fontWeight={600} size={"3xl"}>
                        EVOLUCIONA
                    </Text>
                    {" "}TU NEGOCIO INMOBILIARIO EN{" "}
                    <Text display={"inline"} fontWeight={600} size={"3xl"}>
                        2025
                    </Text>
                </Heading>
                <Text fontSize={"2xl"} w={"45vw"} mb={"3rem"} fontWeight={"400"}>
                    Ante una industria competitiva en innovación constante,{" "}
                    <Text fontWeight={600} as={"span"}>
                        Merivilla Co
                    </Text>{" "}
                    te ofrece las herramientas necesarias para no solo
                    adaptarse, sino estar adelante del mercado y llevar tu
                    negocio al siguiente nivel.
                </Text>
                <GoldButton fontSize={"xl"}>INSCRIBETE HOY</GoldButton>
            </Box>

            <HStack
                {...styles.testimonial}
                boxShadow={"0px 10px 8px rgba(0,0,0,0.3)"}
            >
                <Box {...styles.testimonialText}>
                    <Text
                        fontSize={"xl"}
                        fontWeight={800}
                        w={"85%"}
                        margin={"auto"}
                    >
                        "Gracias a Merivilla Co, este año nuestro desarrollo
                        será el más vendido en el municipio de Aldea Zamá,
                        Tulum."
                    </Text>
                    <Text fontSize={"xl"} fontWeight={400} mt={"1rem"}>
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
