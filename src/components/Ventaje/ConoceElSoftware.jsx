import {
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";
import { IoIosGitNetwork } from "react-icons/io";
import CustomLayout from "@/layout/CustomLayout2";

export default function ConoceElSoftware() {
    return (
        <>
            <CustomLayout number={1} title={"CONOCE EL SOFTWARE"} text={"Olvidate de los reportes, puedes ver todo de tu negocio, digitalmente."} img={"/software.png"}>
                <Detail 
                    title={"CENTRALIZACION"}
                    text={
                        "Olvidate de los reportes, puedes ver todo de tu negocio, digitalmente."
                    }
                    icon={<IoIosGitNetwork />}
                />
                <Detail
                    title={"TIEMPO REAL"}
                    text={
                        "Olvidate de los reportes, puedes ver todo de tu negocio, digitalmente."
                    }
                    icon={<IoIosGitNetwork />}
                />
                <Detail
                    title={"AUTOMATIZACION"}
                    text={
                        "Olvidate de los reportes, puedes ver todo de tu negocio, digitalmente."
                    }
                    icon={<IoIosGitNetwork />}
                />
            </CustomLayout>
        </>
    );
}

function Detail({ title, text, icon }) {
    return (
        <VStack align={"center"} w={"30%"}>
            {/* <Circle bg={"transparent"} p={"4rem"}> */}
            <Heading size={"xl"}>{icon}</Heading>
            {/* </Circle> */}
            <Heading fontWeight={"600"} size={"md"}>
                {title}
            </Heading>
            <Text textAlign={"center"} w={"60%"}>
                {text}
            </Text>
        </VStack>
    );
}