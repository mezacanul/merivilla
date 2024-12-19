import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { FormControl, FormLabel, Input, Box, Container, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import hexToRgba from "@/utils/hexToRgba";

// Dynamically load Quill.js to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function NuevoPost() {
    return (
        <VStack color={"black"} minH={"85vh"} py={"8rem"}>
            <Container maxW={"90%"}>
                <Heading>Crear post</Heading>

                <BlogEditor />
            </Container>
        </VStack>
    );
}

function BlogEditor() {
    const [content, setContent] = useState("");

    return (
        <VStack py={"4rem"} w={"50%"} align={"flex-start"}>
            <BLogOptionsForm />

            <Box w={"100%"}>
                <Text display={"block"} mb={"1rem"} size={"sm"} as={"b"}>Editor</Text>
                <ReactQuill
                    style={{ height: "10rem" }}
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={{
                        toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            ["bold", "italic", "underline"],
                            [/*{ list: "ordered" },*/ { list: "bullet" }],
                            ["link", "image"],
                            ["clean"], // Remove formatting
                        ],
                    }}
                />
            </Box>
        </VStack>
    );
}

function BLogOptionsForm() {
    return (
        <VStack spacing={5} mb={"3rem"} w={"100%"}>
            <BlogEditorInput label={"Titulo"} type={"text"} />
            <BlogEditorInput label={"Descripcion"} type={"text"} />
        </VStack>
    )
}

function BlogEditorInput({label, placeholder, type}) {
    return (
        <FormControl>
            <VStack align={"flex-start"}>
                <FormLabel fontWeight={"bold"} w={"15rem"}>
                    {label}
                </FormLabel>

                <Input
                    borderColor={hexToRgba("#000000", 0.2)}
                    borderWidth={"2px"}
                    placeholder={placeholder}
                    type={type}
                    bg={"white"}
                    py={"1.5rem"}
                />
            </VStack>
        </FormControl>
    );
}

export default NuevoPost;
