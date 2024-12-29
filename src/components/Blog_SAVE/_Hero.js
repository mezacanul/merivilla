import hexToRgba from "@/utils/hexToRgba";
import moment from "moment";
import {
    Box,
    Heading,
    Text,
    VStack,
    Flex,
    Image,
    HStack,
    Circle,
    SimpleGrid,
    Container,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import MainBlog from "../common/MainBlog";
import BlogsGrid from "../common/BlogsGrid";

export default function Hero() {
    const [blogsData, setBlogsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data/blogs.json"); // Relative path to public folder
                const data = response.data;
                // console.log(data);

                setBlogsData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Intro
                title={"Blog"}
                subtitle={"Latest Insights"}
                text={`Stay updated with the latest trends and insights from
                    our experts. Read our articles on various topics and
                    enhance your knowledge.`}
            />

            <MainBlog
                img={"/merida.jpg"}
                category={"Industry Insights"}
                title={"The Future of SaaS: Trends to Watch in 2023"}
                description={`Discover the latest trends in SaaS that are shaping the
                    future of digital solutions and how your business can
                    benefit.`}
                author={"John Doe"}
                date={"January 15, 2023"}
                imgAuthor={"/face.jpg"}
                mt={"-12.5rem"}
            />

            <BlogsGrid blogsData={blogsData} />
        </>
    );
}

function Intro({ subtitle, title, text }) {
    return (
        <Flex
            w={"100vw"}
            h={"70vh"}
            // bg={"blue"}
            // bgGradient="linear(45deg, #535d72, #a4b4cf)"
            bg={"rgb(66, 146, 136)"}
            align={"center"}
            px={"5rem"}
        >
            <VStack
                align={"flex-start"}
                w={"60%"}
                spacing={"2.5rem"}
                mt={"-5rem"}
            >
                <Text fontSize={"2xl"}>{subtitle}</Text>
                <Heading size={"4xl"}>{title}</Heading>
                <Text fontSize={"3xl"}>{text}</Text>
            </VStack>
        </Flex>
    );
}