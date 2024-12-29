import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import GoldButton from "../common/GoldButton";
import blueGradient from "@/styles/blueGradient";
import { FaHouseUser } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { TbBuildingSkyscraper } from "react-icons/tb";

export default function Hero() {
    return (
        <Flex
            direction="column"
            justifyContent={"center"}
            align={"center"}
            w={"100vw"}
            // h={"100vh"}
            {...blueGradient}
            pt={"15rem"}
            pb={"10rem"}
        >
            {/* Title  */}
            <VStack mt={"-5rem"}>
                <Heading letterSpacing={"1rem"} size={"xl"} fontWeight={"200"}>
                    <Heading
                        as={"b"}
                        fontWeight={"700"}
                        bgGradient={
                            // "linear-gradient(-45deg, #644609 10%, #f6b431 50%) 1"
                            "linear-gradient(45deg, #9c6a07 0%, #dbb262 50%)"
                        }
                        bgClip={"text"}
                    >
                        3
                    </Heading>
                    {" ARMA TU "}
                    <Heading as={"b"} fontWeight={"700"}>
                        VENTAJE
                    </Heading>
                </Heading>
                <Text my={"1rem"} fontWeight={"400"}>
                    Como se vera tu equipo de VENTAJE
                </Text>
            </VStack>

            {/* Onboarding Screen  */}
            <VStack bg={"black"} p={"3rem"} my={"4rem"} w={"60%"}>
                <Text>
                    QUE MODELO TE IDENTIFICA MAS DENTRO DEL AMBITO INMOBILIARIO
                </Text>
                <HStack my={"4rem"} justify={"space-between"} w={"100%"}>
                    <Opcion title={"Broker o Asesor"} icon={<FaHouseUser />} />
                    <Opcion
                        title={"Desarrollador"}
                        icon={<FaMapLocationDot />}
                    />
                    <Opcion
                        title={"Constructor"}
                        icon={<TbBuildingSkyscraper />}
                    />
                </HStack>
                <HStack justify={"space-between"} w={"100%"}>
                    <Text>1 | 10</Text>
                    <Text>SIGUIENTE {">"}</Text>
                </HStack>
            </VStack>

            {/* Actions  */}
            <HStack spacing={"2rem"}>
                <GoldButton>AGENDAR DEMO</GoldButton>
                <GoldButton variant="outline">CONTACTAR HOY</GoldButton>
            </HStack>
        </Flex>
    );
}

function Opcion({ title, icon }) {
    return (
        <VStack
            border={"5px solid white"}
            w={"30%"}
            pt={"7rem"}
            pb={"2rem"}
            _hover={{
                border: "5px solid lightBlue",
                cursor: "pointer",
                ".hoverBlue": { color: "lightBlue" },
            }}
            transition={"all 0.3s"}
        >
            <Heading
                className="hoverBlue"
                size={"xl"}
                transform={"scale(2)"}
                mb={"4rem"}
                transition={"all 0.3s"}
            >
                {icon}
            </Heading>
            <Text className="hoverBlue" size={"lg"} transition={"all 0.3s"}>
                {title}
            </Text>
        </VStack>
    );
}
