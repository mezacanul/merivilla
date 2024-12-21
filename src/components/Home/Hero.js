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
            <Flex {...styles.container} minH={"100vh"} px={{base: "2.5rem", md: "4rem", lg: "7rem", xl: "10rem"}} pt={{base: "8rem", xl: 0}}>
                {/* Overlay  */}
                <Box {...styles.blackOverlay} />

                {/* Hero Relative Content  */}
                <Box zIndex={1}>
                    {/* Titulo  */}
                    <Heading
                        mb={"1rem"}
                        width={{base:"90%"}}
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

                    {/* Texto  */}
                    <Text w={{base: "100%", md: "75%"}} mb={"1.5rem"} size={{md: "md", xl: "lg"}}>
                        Ante una industria competitiva en innovación constante,{" "}
                        <Text size={{md: "md", xl: "lg"}} as={"b"}>
                            Merivilla Co
                        </Text>{" "}
                        te ofrece las herramientas necesarias para no solo
                        adaptarse, sino estar adelante del mercado y llevar tu
                        negocio al siguiente nivel.
                    </Text>

                    {/* Boton  */}
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
                <HeroTestimonial display={{base: "none", xl: "flex"}} version={"desktop"}/>

            </Flex>
        
            <HeroTestimonial display={{base: "flex", xl: "none"}} version={"mobile"}/>
        </>
    );
}

function HeroTestimonial({display, version}) {
    return (
        <>
            {/* Testimonial  */}
            <Stack
                direction={{ base: "column-reverse", xl: "row"}}
                align={"center"}
                {...styles.testimonial.main}
                px={{base: "3rem", md: "11rem", lg: "13rem", xl: "2rem"}}
                py={{ base: "3rem", md: "5rem", lg: "4rem", xl: "2.5rem"}}
                {...(version == "desktop" ? styles.testimonial.desktop : styles.testimonial.mobile)}
                boxShadow={{base: "", xl: "0px 10px 8px rgba(0,0,0,0.3)"}}
                position={{base: "relative", xl: "absolute"}}
                display={display}
            >
                <Box {...styles.testimonialText}>
                    <Text
                        as={"b"}
                        w={"85%"}
                        margin={"auto"}
                        size={{xl: "sm"}}
                    >
                        "Gracias a Merivilla Co, este año nuestro desarrollo
                        será el más vendido en el municipio de Aldea Zamá,
                        Tulum."
                    </Text>
                    <Text size={{xl: "sm"}} fontWeight={400} mt={"1rem"}>
                        CEO de DOGE
                    </Text>
                </Box>

                <Image {...styles.img} src={"face.jpg"} mb={{base: "1.5rem", xl: "0"}}/>
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
