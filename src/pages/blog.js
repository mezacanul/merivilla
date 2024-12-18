import { MainBlog } from "@/components/Blog_SAVE/Hero";
import GoldButton from "@/components/common/GoldButton";
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

            <AgendarConsulta author={blogData.author} date={blogData.date} imgAuthor={blogData.authorImg}/>
        </>
    );
}

function AgendarConsulta({ author, date, imgAuthor }){
    return (
        <VStack align={"flex-start"} maxW={"90%"} margin={"auto"} mb={"6rem"}>
            <HStack color={"black"} align={"center"} mb={"2rem"}>
                <Circle
                    p={"4rem"}
                    bgImage={imgAuthor}
                    bgSize={"cover"}
                    me={"0.5rem"}
                />

                <VStack align={"self-start"} spacing={0}>
                    <Text size={"lg"} as={"b"}>
                        {author}
                    </Text>
                    <Text size={"sm"} mb={"1rem"}>
                        {"Asesor Inmobiliario de Altamar Bienes Raíces"}
                    </Text>
                </VStack>

            </HStack>

            <VStack align={"flex-start"}>
                <Text maxW={"40rem"} mb={"2rem"} color={"black"}>
                {"Si te gustaría saber mas sobre el ramo inmobiliario y tener una consulta privada que se adapte a las necesidades de tu negocio, contactame a traves de esta pagina."}
                </Text>

                <GoldButton>Agendar Consulta</GoldButton>
            </VStack>
        </VStack>
    )
}