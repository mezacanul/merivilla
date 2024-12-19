import { addBlock, deleteBlock, updateBlocks } from "@/store/slices/blocksSlice";
import { useDispatch, useSelector } from "react-redux";

import "react-quill/dist/quill.snow.css";
import { MainBlog } from "@/components/Blog_SAVE/Hero";
import axios from "axios";
import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Container,
    Heading,
    HStack,
    VStack,
    Text,
    Button,
    Textarea,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import hexToRgba from "@/utils/hexToRgba";
import { RxText } from "react-icons/rx";
import { RxTextAlignLeft } from "react-icons/rx";
import { IoImageOutline } from "react-icons/io5";
import { FiYoutube } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { arrayMove } from "@dnd-kit/sortable";
import DragArea from "@/components/common/DragArea";
import { useState, useEffect } from "react";
import DraggableItem from "@/components/common/DraggableItem";
import scaleEffect from "@/utils/scaleEffect";

const data = [
    // { id: 1, type: "heading" },
    // { id: 2, type: "text" },
    // { id: 3, type: "image" },
];

const customShadow = { boxShadow: `0px 1px 4px ${hexToRgba("#000000", 0.4)}` };

export default function NuevoPost() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <FullscreenModal isOpen={isOpen} onClose={onClose} />
            <VStack color={"black"} minH={"85vh"} py={"8rem"}>
                <Container maxW={"90%"}>
                    <Heading ml={"-0.5rem"} fontWeight={"200"} mb={"2rem"}>
                        Crear post
                    </Heading>

                    {/* <BlogEditor /> */}
                    <HStack align={"flex-start"}>
                        <BlogBlocks w={"20%"} />
                        <BlogContent onOpen={onOpen} w={"80%"} />
                    </HStack>
                </Container>
            </VStack>
        </>
    );
}

// Fullscreen Modal Component
const FullscreenModal = ({ isOpen, onClose }) => {
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
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"50rem"}
            closeOnOverlayClick={true}
        >
            <ModalOverlay />
            <ModalContent bg={"transparent"} mx={"5rem"} boxShadow={"none"}>
                {/* <ModalHeader>Fullscreen Modal</ModalHeader> */}
                <ModalCloseButton
                    color={"white"}
                    mx={"8rem"}
                    fontSize={"1.5rem"}
                />

                <ModalBody h={"100%"} py={"0"}>
                    <Box
                        {...customShadow}
                        borderRadius={"2rem"}
                        color={"black"}
                        h={"85vh"}
                        w={"80%"}
                        m={"auto"}
                        overflow={"scroll"}
                        bg={"white"}
                    >
                        <MainBlog
                            img={blogData.img}
                            category={blogData.category}
                            title={blogData.title}
                            description={blogData.desc}
                            text={blogData.text}
                            author={blogData.author}
                            date={blogData.date}
                            imgAuthor={blogData.authorImg}
                            preview={true}
                        />
                    </Box>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    );
};

function BlogBlocks({ w }) {
    const dispatch = useDispatch();

    const handleAddBlock = (type) => {
        const newBlock = {
            id: Date.now(), // Generate unique id
            type: type,
            content: ""
        }
        // console.log(newBlock);
        dispatch(addBlock(newBlock));
    }

    return (
        <VStack w={w} align={"flex-start"}>
            <Text fontWeight={"bold"} size={"lg"}>
                Elementos
            </Text>

            {/* Block Options  */}
            <VStack
                w={"100%"}
                py={"1rem"}
                spacing={"1.5rem"}
                borderBottom={`1px solid ${hexToRgba("#000000", 0.4)}`}
                pb={"2rem"}
            >
                <AddBlockBtn
                    name={"Heading"}
                    type={"heading"}
                    icon={<RxText />}
                    onClick={() => handleAddBlock("heading")}
                />
                <AddBlockBtn
                    name={"Text"}
                    type={"text"}
                    icon={<RxTextAlignLeft />}
                    onClick={() => handleAddBlock("text")}
                />
                <AddBlockBtn
                    name={"Image"}
                    type={"image"}
                    icon={<IoImageOutline />}
                    onClick={() => handleAddBlock("image")}
                />
                <AddBlockBtn
                    name={"Youtube Video"}
                    type={"link"}
                    icon={<FiYoutube />}
                    onClick={() => handleAddBlock("link")}
                />
            </VStack>

            {/* Cover Image  */}
            <VStack
                py={"1rem"}
                align={"flex-start"}
                w={"100%"}
                pb={"10rem"}
                borderBottom={`1px solid ${hexToRgba("#000000", 0.4)}`}
            >
                <Text fontWeight={"bold"} size={"lg"}>
                    Cover Image
                </Text>

                <HStack
                    {...scaleEffect}
                    w={"100%"}
                    {...customShadow}
                    borderRadius={"0.5rem"}
                    px={"1.5rem"}
                    py={"0.5rem"}
                >
                    <Text size={"sm"} w={"40%"}>
                        Subir archivo
                    </Text>
                    <Text
                        size={"sm"}
                        w={"60%"}
                        as={"b"}
                        whiteSpace={"nowrap"}
                        textOverflow={"ellipsis"}
                        overflow={"hidden"}
                    >
                        Ningun archivo seleccionado
                    </Text>
                </HStack>
            </VStack>

            {/* Profile Information  */}
            <VStack align={"flex-end"} w={"100%"} py={"1rem"}>
                <Text size={"sm"} as={"b"}>
                    Jane Doe
                </Text>
                <Text fontWeight={"200"} size={"sm"}>
                    December 19, 2024 at 12:10 AM
                </Text>
                <Text fontWeight={"200"} size={"sm"}>
                    UTC
                </Text>
            </VStack>
        </VStack>
    );
}

function AddBlockBtn({ name, icon, type, onClick }) {
    const handleClick = (e) => {
        e.preventDefault();
        onClick();
    }

    return (
        <HStack
            as={"button"}
            {...scaleEffect}
            {...customShadow}
            w={"100%"}
            p={"5"}
            borderRadius={"1rem"}
            justify={"space-between"}
            onClick={handleClick}
        >
            <HStack>
                <Text size={"xl"}>{icon}</Text>
                <Text fontWeight={"200"}>{name}</Text>
            </HStack>
            <Text>+</Text>
        </HStack>
    );
}

function BlogContent({ w, onOpen }) {
    return (
        <VStack w={w} align={"flex-start"} ml={"1rem"}>
            <Text fontWeight={"bold"} size={"lg"}>
                Titulo
            </Text>

            <BlogEditorInput
                placeholder={"Escribe el titulo de tu blog"}
                type={"text"}
                fontSize="1.2rem" // Adjust placeholder size
                fontWeight="bold"
                sx={{
                    "::placeholder": {
                        //   color: "black"
                    },
                }}
            />

            <BlogEditor />

            <BlogActions onOpen={onOpen} />
        </VStack>
    );
}

function BlogActions({ onOpen }) {
    const btnStyle = {
        bg: "black",
        color: "white",
        transition: "all 0.3s",
        fontSize: "1.2rem",
        size: "lg",
        _hover: {
            transform: "scale(1.04)",
        },
    };

    return (
        <HStack justify={"flex-end"} w={"100%"} spacing={4}>
            <Button {...btnStyle} onClick={onOpen}>
                Show Preview
            </Button>
            <Button {...btnStyle}>Publish</Button>
        </HStack>
    );
}

function BlogEditor() {
    // const [blocks, setBlocks] = useState(data);

    const dispatch = useDispatch();
    const blocks = useSelector((state) => state.blocks);

    // Handle elements sorting with "arrayMove"
    function handleDragEnd(event) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = blocks.findIndex(
                (block) => block.id === active.id
            );
            const newIndex = blocks.findIndex((block) => block.id === over.id);
            dispatch(updateBlocks(arrayMove(blocks, oldIndex, newIndex)))
        }
    }

    return (
        <VStack
            w={"100%"}
            p={"2rem"}
            pb={"10rem"}
            my={"1rem"}
            align={"flex-start"}
            border={`4px dashed ${hexToRgba("#000000", 0.2)}`}
        >
            <Text fontWeight={"bold"} size={"lg"}>
                Document
            </Text>

            {/* Draggable Area  */}
            <DraggableItems>
                <DragArea data={blocks} handleDragEnd={handleDragEnd}>
                    {/* Draggable Blocks  */}
                    {blocks.map((block) => {
                        return (
                            <DraggableItem
                                key={block.id}
                                id={block.id}
                                my={"2rem"}
                            >
                                <DragBlock type={block.type} id={block.id}/>
                                {/* <Button>Drag</Button>
                                {block.type}
                                <Input type="text"/> */}
                            </DraggableItem>
                        );
                    })}

                    {/* <DragBlock type={"heading"} />
                    <DragBlock type={"text"} />
                    <DragBlock type={"image"} /> */}
                </DragArea>
            </DraggableItems>
        </VStack>
    );
}

function DraggableItems({ children }) {
    return (
        <VStack w={"100%"} my={"1rem"} spacing={"2rem"}>
            {children}
        </VStack>
    );
}

function DragBlock({ type, id }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        // console.log(id);
        dispatch(deleteBlock(id));
    }

    return (
        <HStack w={"100%"} align={"center"}>
            <Text size={"xl"}>
                <MdDragIndicator />
            </Text>

            <Flex w={"100%"} mx={"1rem"}>
                {(type == "heading" || type == "link") && (
                    <BlogEditorInput
                        placeholder={type == "heading" ? "Nuevo Encabezado" : "Enter Youtube link"}
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
                        borderColor={hexToRgba("#000000", 0.2)}
                        borderWidth={"2px"}
                        placeholder={"Nuevo Parrafo"}
                        bg={"white"}
                        py={"1.5rem"}
                        h={"10rem"}
                    />
                )}

                {type == "image" && (
                    <Flex
                        align={"center"}
                        justify={"center"}
                        w={"30rem"}
                        h={"20rem"}
                        bg={"light"}
                    >
                        <VStack opacity={0.5}>
                            <Text>300</Text>
                            <Text>x</Text>
                            <Text>200</Text>
                        </VStack>
                    </Flex>
                )}
            </Flex>

            <Text size={"md"} onClick={handleDelete}>
                <FiTrash2 />
            </Text>
        </HStack>
    );
}

// function BlogEditor() {
//     const [content, setContent] = useState("");

//     return (
//         <VStack py={"4rem"} w={"50%"} align={"flex-start"}>
//             <BLogOptionsForm />

//             <Box w={"100%"}>
//                 <Text display={"block"} mb={"1rem"} size={"sm"} as={"b"}>Editor</Text>
//                 <ReactQuill
//                     style={{ height: "10rem" }}
//                     theme="snow"
//                     value={content}
//                     onChange={setContent}
//                     modules={{
//                         toolbar: [
//                             [{ header: [1, 2, 3, false] }],
//                             ["bold", "italic", "underline"],
//                             [/*{ list: "ordered" },*/ { list: "bullet" }],
//                             ["link", "image"],
//                             ["clean"], // Remove formatting
//                         ],
//                     }}
//                 />
//             </Box>
//         </VStack>
//     );
// }

// function BLogOptionsForm() {
//     return (
//         <VStack spacing={5} mb={"3rem"} w={"100%"}>
//             <BlogEditorInput label={"Titulo"} type={"text"} />
//             <BlogEditorInput label={"Descripcion"} type={"text"} />
//         </VStack>
//     )
// }

function BlogEditorInput({ label, placeholder, type, ...props }) {
    return (
        <FormControl>
            <VStack align={"flex-start"}>
                {label && (
                    <FormLabel fontWeight={"bold"} w={"15rem"}>
                        {label}
                    </FormLabel>
                )}

                <Input
                    {...props}
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

// export default NuevoPost;
