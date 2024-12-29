import { SimpleGrid } from "@chakra-ui/react";
import BlogCard from "./BlogCard";

export default function BlogsGrid({ blogs, py }) {
    return (
        // <Flex justify={"center"}>
        <SimpleGrid
            color={"black"}
            columns={{ base: 1, lg: 2, xl: 3 }}
            justifyItems="center"
            spacing={"3rem"}
            spacingY={"5rem"}
            py={py}
        >
            {blogs.map((blog, index) => {
                const alignment =
                    index % 3 === 0
                        ? "start" // 1st column
                        : index % 3 === 1
                        ? "center" // 2nd column
                        : "end"; // 3rd column

                return (
                    <BlogCard
                        blog={blog}
                        justifySelf={alignment}
                        key={blog.uuid}
                    />
                );
            })}
        </SimpleGrid>
        // </Flex>
    );
}