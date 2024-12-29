import { Box, Container, Heading, Image, Text, VStack } from "@chakra-ui/react";
import Markdown from "react-markdown";
import BlogAuthorIcon from "./BlogAuthorIcon";

export default function MainBlog({
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
                <VStack
                    color={"black"}
                    align={"flex-start"}
                    py={"2rem"}
                    w={{ base: "100%", md: "70%" }}
                >
                    <Text
                        mb={"2rem"}
                        color={"rgb(66, 146, 136)"}
                        as={"b"}
                        size={"sm"}
                    >
                        {category}
                    </Text>
                    <Heading mb={"1.5rem"} size={{ base: "md", md: "lg" }}>
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

                <Box mb={"10rem"}>
                    <Markdown
                        urlTransform={(uri) => uri}
                        components={{
                            h2: ({ node, ...props }) => (
                                <Heading my={"2rem"} size={"md"} {...props} color={"black"}/>
                            ),
                            p: ({ node, ...props }) => (
                                <Text my={"2rem"} size={"md"} {...props} color={"black"}/>
                            ),
                            a: ({ node, ...props }) => {
                                console.log({ ...props });
                                return (
                                    <ChakraLink
                                        my={"2rem"}
                                        as={Link}
                                        size={"sm"}
                                        target="_blank"
                                        color={"#001eff"}
                                        {...props}
                                    />
                                );
                            },
                            img: ({ ...props }) => {
                                console.log({ ...props });

                                return (
                                    <Image
                                        my={"3rem"}
                                        w={"50rem"}
                                        h={"35rem"}
                                        objectFit={"cover"}
                                        {...props}
                                    />
                                );
                            },
                        }}
                    >
                        {text}
                    </Markdown>
                </Box>
                {/* <Text color={"black"} mt={"3rem"} mb={"6rem"} whiteSpace="pre-wrap">
                    {text}
                </Text> */}
            </Container>
        </VStack>
    );
}