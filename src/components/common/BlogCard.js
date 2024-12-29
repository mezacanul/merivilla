import hexToRgba from "@/utils/hexToRgba";
import { Image, Text, VStack } from "@chakra-ui/react";
import BlogAuthorIcon from "./BlogAuthorIcon";
import Link from "next/link";

export default function BlogCard({ blog, href, ...props }) {
    // const formattedDate = Date.now().format("MMMM D, YYYY [at] h:mm A");

    return (
        <VStack
            as={Link}
            href={`/contenidoeducativo?id=${blog.uuid}`}
            bg={{ base: "white" }}
            color={{ base: "white" }}
            {...props}
            align={"self-start"}
            _hover={{
                // transform: "scale(1.03)", // Scale on hover
                cursor: "pointer",
                bg: "rgb(66, 146, 136)",
                color: "white",
                boxShadow: `0px 20px 20px ${hexToRgba("#000000", 0.2)}`,
                ".category": { color: hexToRgba("#FFFFFF", 0.4) },
                ".title": { color: "white" },
                ".desc-text": { color: hexToRgba("#FFFFFF", 0.7) },
                ".blogAuthorIcon": { color: hexToRgba("#FFFFFF", 0.7) },
            }}
            transition="all 0.3s ease-in-out"
        >
            <Image
                h={"16rem"}
                w={"100%"}
                objectFit={"cover"}
                src={blog.cover_image}
            />

            <VStack
                px={{ base: "1rem", md: "2.5rem" }}
                py={"1.5rem"}
                align={"flex-start"}
            >
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

                    <Text
                        className="title"
                        color={{ base: "black" }}
                        size={"lg"}
                        lineHeight={"1.3"}
                        transition="all 0.3s ease-in-out"
                    >
                        {blog.title}
                    </Text>
                    <Text
                        className="desc-text"
                        size={"sm"}
                        mb={"1.5rem"}
                        color={hexToRgba("#000000", 0.6)}
                        transition="all 0.3s ease-in-out"
                    >
                        {blog.description}
                    </Text>
                </VStack>

                <BlogAuthorIcon
                    transition="all 0.3s ease-in-out"
                    author={blog.author}
                    date={blog.created}
                    imgAuthor={"face2.jpg"}
                />
            </VStack>
        </VStack>
    );
}