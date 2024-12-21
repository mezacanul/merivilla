import hexToRgba from "@/utils/hexToRgba";
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
import { useEffect, useState } from "react";

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

function MainBlog({
    img,
    category,
    title,
    description,
    author,
    date,
    imgAuthor,
    text,
    preview = false,
    ...props
}) {
    return (
        <VStack align={"flex-start"} {...props} minH={"60vh"}>
            <Image
                src={img}
                h={preview == false ? "40rem" : "32rem"}
                w={"100%"}
                m={"auto"}
                objectFit={"cover"}
                objectPosition={"center"}
            />

            <Container maxW={"90%"}>

                <VStack color={"black"} align={"flex-start"} py={"2rem"} w={{base:"100%", md: "70%"}}>
                    <Text
                        mb={"2rem"}
                        color={"rgb(66, 146, 136)"}
                        as={"b"}
                        size={"sm"}
                    >
                        {category}
                    </Text>
                    <Heading mb={"1.5rem"} size={{base:"md", md: "lg"}}>
                        {title}
                    </Heading>
                    <Text color={"dark"} mb={"2rem"} size={"sm"}>
                        {description}
                    </Text>

                    <BlogAuthorIcon
                        author={author}
                        date={date}
                        imgAuthor={imgAuthor}
                    />
                </VStack>

                <Text color={"black"} mt={"3rem"} mb={"6rem"} whiteSpace="pre-wrap">
                    {text}
                </Text>
            </Container>
        </VStack>
    );
}

function BlogAuthorIcon({ author, date, imgAuthor }) {
    return (
        <HStack>
            <Circle
                p={"2rem"}
                bgImage={imgAuthor}
                bgSize={"cover"}
                me={"0.5rem"}
            />

            <VStack align={"self-start"} spacing={0} color={{base:"black"}}>
                <Text size={"sm"} as={"b"} className="blogAuthorIcon">
                    {author}
                </Text>
                <Text size={"sm"} className="blogAuthorIcon">
                    {date}
                </Text>
            </VStack>
        </HStack>
    );
}

function BlogsGrid({ blogsData, py }) {
    return (
        // <Flex justify={"center"}>
        <SimpleGrid
            color={"black"}
            columns={{base: 1, lg: 2, xl: 3}}
            justifyItems="center"
            spacing={"3rem"}
            spacingY={"5rem"}
            py={py}
        >
            {blogsData.map((blog, index) => {
                const alignment =
                    index % 3 === 0
                        ? "start" // 1st column
                        : index % 3 === 1
                        ? "center" // 2nd column
                        : "end"; // 3rd column

                return <BlogCard blog={blog} justifySelf={alignment} key={blog.title}/>;
            })}
        </SimpleGrid>
        // </Flex>
    );
}

function BlogCard({ blog, ...props }) {
    return (
        <VStack
            as={Link}
            href={"/blog"}
            bg={{base: "white"}}
            color={{base:"white"}}
            {...props}
            align={"self-start"}
            _hover={{
                transform: "scale(1.03)", // Scale on hover
                cursor: "pointer",
                bg: "rgb(66, 146, 136)",
                color: "white",
                boxShadow: `0px 20px 20px ${hexToRgba("#000000", 0.2)}`,
                ".category": { color: hexToRgba("#FFFFFF", 0.4) },
                ".title": { color: "white" },
                ".desc-text": { color: hexToRgba("#FFFFFF", 0.7)},
                ".blogAuthorIcon": { color: hexToRgba("#FFFFFF", 0.7)}
            }}
            transition="all 0.3s ease-in-out"
        >
            <Image h={"16rem"} w={"100%"} objectFit={"cover"} src={blog.img}/>

            <VStack px={{base:"1rem", md: "2.5rem"}} py={"1.5rem"} align={"flex-start"}>
                <VStack align={"flex-start"}>
                    <Text
                        className="category"
                        transition="all 0.3s ease-in-out"
                        mb={"1rem"}
                        color={"rgb(66, 146, 136)"}
                        as={"b"}
                        size={"sm"}
                    >
                        {blog.category}
                    </Text>

                    <Text className="title" color={{base:"black"}} size={"lg"} lineHeight={"1.3"}>{blog.title}</Text>
                    <Text className="desc-text" size={"sm"} mb={"1.5rem"} color={hexToRgba("#000000", 0.6)} transition="all 0.3s ease-in-out">
                        {blog.description}
                    </Text>
                </VStack>

                <BlogAuthorIcon
                    author={blog.author}
                    date={blog.date}
                    imgAuthor={blog.authorImg}
                />
            </VStack>
        </VStack>
    );
}

export { MainBlog, BlogAuthorIcon, BlogCard, BlogsGrid }