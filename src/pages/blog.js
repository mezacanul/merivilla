import GoldButton from "@/components/common/GoldButton";
import MainBlog from "@/components/common/MainBlog";
import { Circle, HStack, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Blog() {
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data/blog-example.json"); // Relative path to public folder
                const data = response.data;
                console.log(data);

                setBlogData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <MainBlog
                img={blogData.img}
                category={blogData.category}
                title={blogData.title}
                description={blogData.desc}
                text={blogData.text}
                author={blogData.author}
                date={blogData.date}
                imgAuthor={blogData.authorImg}
            />

            <AgendarConsulta author={blogData.author} imgAuthor={blogData.authorImg}/>
        </>
    );
}

export function AgendarConsulta({ author, imgAuthor }){
    return (
        <VStack align={"flex-start"} maxW={"90%"} margin={"auto"} mb={"6rem"}>
            <HStack color={"black"} align={"center"} mb={{base:"1.5rem", md: "1rem"}}>
                <Circle
                    p={{base:"3rem", xl: "5rem"}}
                    bgImage={imgAuthor}
                    bgSize={"cover"}
                    me={"0.5rem"}
                />

                <VStack align={"self-start"} spacing={0}>
                    <Text size={"lg"} as={"b"}>
                        {author}
                    </Text>
                    <Text size={"sm"} >
                        {"Asesor Inmobiliario de Altamar Bienes Raíces"}
                    </Text>
                </VStack>

            </HStack>

            <VStack align={"flex-start"}>
                <Text ms={"1rem"} maxW={"35rem"} mt={"1rem"} mb={"2rem"} color={"black"} size={"sm"}>
                {"Si te gustaría saber mas sobre el ramo inmobiliario y tener una consulta privada que se adapte a las necesidades de tu negocio, contactame a traves de esta pagina."}
                </Text>

                <GoldButton href={"https://calendar.google.com/calendar/"} target={"_blank"}>Agendar Consulta</GoldButton>
            </VStack>
        </VStack>
    )
}