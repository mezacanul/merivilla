import { Circle, HStack, Text, VStack } from "@chakra-ui/react";
import moment from "moment";

export default function BlogAuthorIcon({ author, date, imgAuthor }) {
    return (
        <HStack>
            <Circle
                p={"2rem"}
                bgImage={imgAuthor}
                bgSize={"cover"}
                me={"0.5rem"}
            />

            <VStack align={"self-start"} spacing={0} color={{ base: "black" }}>
                <Text size={"sm"} as={"b"} className="blogAuthorIcon">
                    {author}
                </Text>
                <Text size={"sm"} className="blogAuthorIcon">
                    {moment(date).format(
                        "MMMM D, YYYY [at] h:mm A"
                    )}
                </Text>
            </VStack>
        </HStack>
    );
}