import CustomLayout from "@/layout/CustomLayout";
import { HStack, Box, Heading, VStack, Text, Flex } from "@chakra-ui/react";
import Overlay from "../common/Overlay";
import scaleEffect from "@/utils/scaleEffect";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Contenido() {
    const [blogsData, setBlogsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data/blogs.json"); // Relative path to public folder
                const data = response.data;
                console.log(data.slice(1,4));

                setBlogsData(data.slice(1,4));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <CustomLayout bg={"blue"} title={"CONTENIDO GRATIS"} maxW={"100%"} arrowsColor={"white"}>
            {/* <Box w={"80%"}> */}
                <HStack my={"6rem"} justify={"space-between"} w={"100%"} px={"5rem"}>

                    {blogsData.map((blog)=>{
                        return (
                            <CardsContenido 
                                key={blog.title}
                                title={blog.title}
                                subtitle={blog.category}
                                subtitleColor={"blue"}
                                text={blog.description}
                                date={"01/01/2025"}
                                author={blog.author}
                                img={blog.img}
                            />
                        )
                    })}
                    {/* <CardsContenido 
                        title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                        subtitle={"VENTAS Y MARKETING"}
                        subtitleColor={"blue"}
                        text={`Aqui aprenderas cosas mucho antes que nadie, refinete
                            con nuestro contenido y estaras adelante de tu
                            competicion.`}
                        date={"01/01/2025"}
                        author={"John Doe"}
                        img={"blog2.webp"}
                    />
                    
                    <CardsContenido 
                        title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                        subtitle={"VENTAS Y MARKETING"}
                        subtitleColor={"orange"}
                        text={`Aqui aprenderas cosas mucho antes que nadie, refinete
                            con nuestro contenido y estaras adelante de tu
                            competicion.`}
                        date={"01/01/2025"}
                        author={"John Doe"}
                        img={"blog2.webp"}
                    />
                    
                    <CardsContenido 
                        title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                        subtitle={"VENTAS Y MARKETING"}
                        subtitleColor={"blue"}
                        text={`Aqui aprenderas cosas mucho antes que nadie, refinete
                            con nuestro contenido y estaras adelante de tu
                            competicion.`}
                        date={"01/01/2025"}
                        author={"John Doe"}
                        img={"blog2.webp"}
                    /> */}
                </HStack>
            {/* </Box> */}
        </CustomLayout>
    );
}

function CardsContenido({title, subtitle, subtitleColor, text, date, author, img}) {
    return (
        <VStack as={Link} href={"/blog"} width={"31rem"} align={"center"} {...scaleEffect}>
            {/* Image Box  */}
            <Box
                // backgroundImage="url('serv2.webp')"
                backgroundImage={`url('${img}')`}
                backgroundSize="cover"
                position={"relative"}
                h={"28rem"}
                p={"2rem"}
            >
                <Overlay color={"light"} opacity={0.4} />
                <Heading fontWeight={"bold"} size={"md"} color={"black"} position={"relative"}>
                    {title}
                </Heading>
            </Box>

            {/* Content Box */}
            <VStack
                mt={"-7.5rem"}
                position={"relative"}
                bg={"white"}
                color={"black"}
                w={"90%"}
                p={"2rem"}
                // h={"18rem"}
                justifyContent={"space-between"}
                boxShadow={"0px 1.5rem 20px rgba(0,0,0,0.3)"}
            >
                <VStack mb={"3rem"}>
                    <Text as={"b"} color={subtitleColor}>{subtitle}</Text>
                    <Text size={"sm"}>
                        {text}
                    </Text>
                </VStack>

                {/* Footer  */}
                <HStack w={"100%"} justify={"space-between"} fontSize={"xl"}>
                    <Text as="b" size={"sm"}>{date}</Text>
                    <Text as="b" size={"sm"}>{author}</Text>
                </HStack>
            </VStack>
        </VStack>
    );
}
