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
} from "@chakra-ui/react";
import axios from "axios";
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
    ...props
}) {
    return (
        <VStack px={"5rem"} align={"flex-start"} {...props}>
            <Image
                src={img}
                h={"45rem"}
                w={"100%"}
                m={"auto"}
                objectFit={"cover"}
            />

            <VStack color={"black"} align={"flex-start"} py={"2rem"}>
                <Text
                    mb={"0.5rem"}
                    color={"rgb(66, 146, 136)"}
                    as={"b"}
                    fontSize={"xl"}
                >
                    {category}
                </Text>
                <Heading mb={"0.7rem"} size={"2xl"}>
                    {title}
                </Heading>
                <Text color={"dark"} mb={"1.2rem"} fontSize={"2xl"}>
                    {description}
                </Text>

                <BlogAuthorIcon
                    author={author}
                    date={date}
                    imgAuthor={imgAuthor}
                />
            </VStack>
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

            <VStack align={"self-start"} spacing={0}>
                <Text fontSize={"xl"} as={"b"}>
                    {author}
                </Text>
                <Text fontSize={"xl"}>
                    {date}
                </Text>
            </VStack>
        </HStack>
    );
}

function BlogsGrid({ blogsData }) {
    return (
        // <Flex justify={"center"}>
        <SimpleGrid
            color={"black"}
            columns={[1, 2, 3]}
            px={"5rem"}
            justifyItems="center"
            spacing={"3rem"}
            spacingY={"5rem"}
            pt={"7rem"}
            pb={"10rem"}
        >
            {blogsData.map((blog, index) => {
                const alignment =
                    index % 3 === 0
                        ? "start" // 1st column
                        : index % 3 === 1
                        ? "center" // 2nd column
                        : "end"; // 3rd column

                return <BlogCard blog={blog} justifySelf={alignment} />;
            })}
        </SimpleGrid>
        // </Flex>
    );
}

function BlogCard({ blog, ...props }) {
    return (
        <VStack
            {...props}
            align={"self-start"}
            _hover={{
                transform: "scale(1.03)", // Scale on hover
                cursor: "pointer",
                bg: "rgb(66, 146, 136)",
                color: "white",
                boxShadow: `0px 20px 20px ${hexToRgba("#000000", 0.2)}`,
                ".category": { color: hexToRgba("#FFFFFF", 0.4) },
                ".desc-text": { color: hexToRgba("#FFFFFF", 0.7)}
            }}
            transition="all 0.3s ease-in-out"
        >
            <Image src="merida.jpg" />

            <VStack px={"2rem"} py={"1.5rem"} align={"flex-start"}>
                <VStack align={"flex-start"}>
                    <Text
                        className="category"
                        transition="all 0.3s ease-in-out"
                        mb={"1rem"}
                        color={"rgb(66, 146, 136)"}
                        as={"b"}
                        fontSize={"xl"}
                    >
                        {blog.category}
                    </Text>

                    <Heading>{blog.title}</Heading>
                    <Text className="desc-text" fontSize={"xl"} mb={"2.5rem"} color={hexToRgba("#000000", 0.6)} transition="all 0.3s ease-in-out">
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
