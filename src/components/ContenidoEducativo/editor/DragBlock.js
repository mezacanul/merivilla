import { deleteBlock, updateBlockContent } from "@/store/slices/blocksSlice";
import { Box, Button, Flex, HStack, Image, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import BlogEditorInput from "./BlogEditorInput";
import hexToRgba from "@/utils/hexToRgba";
import { RiResetLeftLine } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi";

export default function DragBlock({ type, id, fileStorage }) {
    const dispatch = useDispatch();
    const block = useSelector((state) => state.blocks.find((b) => b.id === id));
    const [preview, setPreview] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const objectUrl = URL.createObjectURL(file); // Generate a temporary URL
            setPreview(objectUrl);
            dispatch(updateBlockContent({ id, content: objectUrl }));
            fileStorage[id] = {};
            fileStorage[id].file = file;
        }
    };

    const handleReset = () => {
        setPreview("");
        dispatch(updateBlockContent({ id, content: "" }));
        delete fileStorage[id];
    };

    useEffect(() => {
        // console.log(block);
    }, [block]);

    const handleDelete = () => {
        // console.log(id);
        dispatch(deleteBlock(id));
        delete fileStorage[id];
    };

    const handleChange = (e) => {
        dispatch(updateBlockContent({ id, content: e.target.value }));
        // console.log(e.target.value);
    };

    return (
        <HStack w={"100%"} align={"center"}>
            <Text size={"xl"}>
                <MdDragIndicator />
            </Text>

            <Flex w={"100%"} mx={"1rem"}>
                {(type == "heading" || type == "link") && (
                    <BlogEditorInput
                        value={block.content}
                        onChange={handleChange}
                        placeholder={
                            type == "heading"
                                ? "Nuevo Encabezado"
                                : "Enter Youtube link"
                        }
                        type={"text"}
                        fontSize={type == "heading" ? "1.2rem" : "1rem"}
                        fontWeight={type == "heading" ? "bold" : "400"}
                        sx={{
                            "::placeholder": {
                                //   color: "black"
                            },
                        }}
                    />
                )}

                {type == "text" && (
                    <Textarea
                        value={block.content}
                        onChange={handleChange}
                        borderColor={hexToRgba("#000000", 0.2)}
                        borderWidth={"2px"}
                        placeholder={"Nuevo Parrafo"}
                        bg={"white"}
                        py={"1.5rem"}
                        h={"10rem"}
                    />
                )}

                {type === "image" && (
                    <VStack align={"flex-start"}>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                            id={`file-${id}`}
                        />
                        {preview && (
                            <Box
                                w={{ base: "25rem", lg: "35rem" }}
                                h={{ base: "20rem", lg: "25rem" }}
                            >
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    objectFit="cover"
                                    w="full"
                                    h="full"
                                />
                            </Box>
                        )}

                        <HStack justify={"space-between"} w={"100%"}>
                            <Button
                                bg={"white"}
                                color={"blue"}
                                _hover={{
                                    color: "white",
                                    bg: "blue",
                                    cursor: "pointer",
                                }}
                                as="label"
                                htmlFor={`file-${id}`}
                            >
                                <Text size={"sm"}>+ Select Image</Text>
                            </Button>

                            {block.content != "" && (
                                <Button
                                    bg={"white"}
                                    color={"blue"}
                                    _hover={{
                                        color: "white",
                                        bg: "blue",
                                        cursor: "pointer",
                                    }}
                                    as="label"
                                    onClick={handleReset}
                                >
                                    <RiResetLeftLine />
                                    <Text ms={"0.5rem"} size={"sm"}>
                                        Reset
                                    </Text>
                                </Button>
                            )}
                        </HStack>
                    </VStack>
                )}
            </Flex>

            <Text size={"md"} onClick={handleDelete}>
                <FiTrash2 />
            </Text>
        </HStack>
    );
}