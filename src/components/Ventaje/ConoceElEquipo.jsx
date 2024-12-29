import { Heading, Text, VStack } from "@chakra-ui/react";
import { IoIosGitNetwork } from "react-icons/io";
import CustomLayout from "@/layout/CustomLayout2";

export default function ConoceElSoftware() {
    return (
        <>
            <CustomLayout
                direction={"left"}
                number={2}
                title={"CONOCE A TU EQUIPO"}
                text={
                    "Este es tu vendedor y es mitad humano mitad AI. Mas tu asistente AI + tu representativo de Merivilla."
                }
                img={"/man.png"}
            >
                <Detail
                    title={"250%"}
                    subtitle={"GASTOS"}
                    text={
                        "La inmobiliaria promedia gasta X en equipo de vendedores redujimos este costo, salarios"
                    }
                    footer={"De 50,000 a 20,000"}
                />
                <Detail
                    title={"350%"}
                    subtitle={"CIERRES"}
                    text={
                        "Incremento gracias a nuestras herramientas de Inteligencia Artificial"
                    }
                    footer={"Del 2% al 6%"}
                />
                <Detail
                    title={"450%"}
                    subtitle={"COMISIONES"}
                    text={
                        "Esta cantidad te ahorras cada vez que hacemos una venta"
                    }
                    footer={"Del 10% a 2%"}
                />
            </CustomLayout>
        </>
    );
}

function Detail({ title, subtitle, text, footer }) {
    return (
        <VStack align={"center"} w={"30%"}>
            <Heading mb={"2rem"} size={"xl"} fontWeight={800}>
                {title}
            </Heading>
            <Heading fontWeight={"600"} size={"md"}>
                {subtitle}
            </Heading>
            <Text mb={"1rem"} textAlign={"center"} w={"80%"}>
                {text}
            </Text>
            <Text size={"lg"} textAlign={"center"} w={"80%"}>
                {footer}
            </Text>
        </VStack>
    );
}
