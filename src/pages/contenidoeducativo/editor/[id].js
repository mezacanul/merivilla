import { Formik, Form, Field } from "formik";
import { useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import { IoMdSave } from "react-icons/io";
import { MdRemoveRedEye } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";

import {
    addBlock,
    deleteBlock,
    updateBlocks,
    updateBlockContent,
} from "@/store/slices/blocksSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import { MainBlog } from "@/components/Blog_SAVE/Hero";
import axios from "axios";
import {
    Image,
    FormControl,
    FormLabel,
    FormErrorMessage,
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
import { RiResetLeftLine } from "react-icons/ri";
import {
    updateCoverImage,
    updateTitle,
    updateNewBlog,
} from "@/store/slices/newBlogSlice";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import { setUser } from "@/store/slices/userSlice";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
    const { id } = context.params; // Access `id` from the dynamic route
    return {
        props: { id },
    };
}

const data = [
    // { id: 1, type: "heading" },
    // { id: 2, type: "text" },
    // { id: 3, type: "image" },
];

// Create a global object to store the files
let fileStorage = {};

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "El titulo debe tener al menos 3 caracteres")
        .required("Escribe un titulo"),
    category: Yup.string()
        .min(4, "La categoria debe tener al menos 4 caracteres")
        .required("Elige una categoria"),
    description: Yup.string()
        .min(10, "La descripcion debe tener al menos 10 caracteres")
        .required("Escribe una breve descripcion"),
    coverImage: Yup.mixed().required("Elige una imagen de portada"),
});

const customShadow = { boxShadow: `0px 1px 4px ${hexToRgba("#000000", 0.4)}` };

export default function Editor({ id }) {
    const user = useSelector((state) => state.user);
    const blocks = useSelector((state) => state.blocks);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const initialValues = {
        title: "",
        category: "",
        description: "",
        coverImage: null,
        content: "",
        author: "Eduardo",
        status: 1,
    };

    useEffect(() => {
        console.log(id);

        const fetchToken = async () => {
            try {
                const response = await axios.post(
                    "/api/authentication",
                    { action: "reload" },
                    {
                        withCredentials: true,
                    }
                );
                if (response.status == 200) {
                    const user = response.data.payload; // Extract token from response
                    // console.log(user);
                    dispatch(setUser(user));
                }
            } catch (error) {
                const status = error.response.status;
                if (status == 403 || status == 401) {
                    router.push("/login");
                }
            }
        };

        fetchToken();
    }, []);

    const uploadAndGetURL = async (file) => {
        try {
            const fileName = `${Date.now()}.jpg`;
            // Get a signed URL from the API
            const { data } = await axios.post("/api/upload", {
                fileName: fileName,
                fileType: file.type,
            });
            console.log(data);

            // Upload the file to S3
            await axios.put(data.uploadURL, file, {
                headers: {
                    "Content-Type": file.type,
                    // "x-amz-acl": "public-read"
                },
            });

            const publicUrl = `https://merivillabucket.s3.us-east-2.amazonaws.com/${fileName}`;
            console.log("File uploaded successfully. Public URL:", publicUrl);
            return publicUrl;
        } catch (error) {
            console.error("Error uploading file:", error);
            return error;
        }
    };

    const handleSubmit = async (values) => {
        console.log("Actual Form SUBMIT");
        let toastContent = {
            status: "",
            title: "",
        };
        // console.log({...(values), content: "", coverImage: "newimage.jpg"});
        // console.log(blocks);
        // console.log(fileStorage.coverImage);
        // return
        try {
            for (const id in fileStorage) {
                const newURL = await uploadAndGetURL(fileStorage[id].file);
                fileStorage[id].signedUrl = newURL;
                // console.log(newURL);
            }
            // console.log(fileStorage);

            const markdown = getMarkdown(blocks, true, fileStorage);
            // console.log(markdown);
            // return;

            // // TO DO:
            // // - Upload images with AWS S3 and get signed URL's
            // // - Save blog with this signed URL's for coverImage and content -> images URI's
            // const payload = { ...values, coverImage: values.coverImage.name };
            // console.log(payload);

            const payload = {
                ...values,
                content: markdown,
                coverImage: fileStorage.coverImage.signedUrl,
            };

            const response = await axios.post(
                "/api/blogs",
                { payload },
                {
                    withCredentials: true,
                }
            );
            if (response.status == 201) {
                console.log(response);
                toastContent.status = "success";
                toastContent.title = `Successfully ${
                    values.status == 1 ? "saved" : "published"
                }! UUID: ${response.data.blogUUID}`;

                // const user = response.data.payload; // Extract token from response
                // // console.log(user);
                // dispatch(setUser(user));
            }
        } catch (error) {
            // const status = error.response.status;
            console.log(error.response);
            toastContent.status = "error";
            toastContent.title = error.response.data.message;
        }

        toast({
            title: toastContent.title,
            status: toastContent.status,
            isClosable: true,
            position: "top-right",
        });
    };

    return (
        <>
            <FullscreenModal isOpen={isOpen} onClose={onClose} />
            <VStack color={"black"} minH={"85vh"} py={"8rem"}>
                <Container maxW={"90%"}>
                    <Heading ml={"-0.5rem"} fontWeight={"200"} mb={"2rem"}>
                        Crear post
                    </Heading>

                    {/* <BlogEditor /> */}
                    <Text display={{ base: "block", md: "none" }}>
                        Esta funcion solo esta disponible en tableta y
                        escritorio.
                    </Text>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formikProps) => {
                            return (
                                <HStack
                                    display={{ base: "none", md: "flex" }}
                                    align={"flex-start"}
                                >
                                    <BlogBlocks
                                        formik={formikProps}
                                        w={"20%"}
                                    />
                                    <BlogContent
                                        formik={formikProps}
                                        onOpen={onOpen}
                                        w={"80%"}
                                    />
                                </HStack>
                            );
                        }}
                    </Formik>
                </Container>
            </VStack>
        </>
    );
}

function getMarkdown(data, save = false, fileStorage = false) {
    let markdown = "";
    // console.log(data);
    console.log("Function: getMarkdown");
    console.log(fileStorage);

    data.forEach((block) => {
        if (block.content != "") {
            switch (block.type) {
                case "heading":
                    markdown += `\n## ${block.content}\n`;
                    break;
                case "text":
                    markdown += `\n${block.content}\n`;
                    break;
                case "image":
                    if (save == true) {
                        // console.log(fileStorage[block.id]);

                        let newUrl = fileStorage[block.id].signedUrl;
                        // let newUrl = "plc";
                        // console.log("FROM switch case(image):", newUrl);
                        markdown += `\n![Title](${newUrl})\n`;
                    } else {
                        markdown += `\n![Title](${block.content})\n`;
                    }
                    break;
                case "link":
                    markdown += `[${block.title}](${block.content})`;
                    break;
                default:
                    break;
            }
        }
        // console.log(block);
    });
    // console.log(markdown);

    return markdown;
}

// Fullscreen Modal Component
const FullscreenModal = ({ isOpen, onClose }) => {
    const blocks = useSelector((state) => state.blocks);
    const newBlog = useSelector((state) => state.newBlog);
    const now = moment();
    const formattedDate = now.format("MMMM D, YYYY [at] h:mm A");
    let markdown = getMarkdown(blocks);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"50rem"}
            closeOnOverlayClick={true}
        >
            <ModalOverlay />
            <ModalContent bg={"transparent"} boxShadow={"none"}>
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
                            img={newBlog.coverImage}
                            category={newBlog.category}
                            title={newBlog.title}
                            description={newBlog.description}
                            // text={"The blogs content"}
                            text={markdown}
                            author={newBlog.author}
                            date={now}
                            imgAuthor={"/face2.jpg"}
                            preview={true}
                        />
                    </Box>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    );
};

function BlogBlocks({ w, formik }) {
    const { errors, touched, setFieldValue } = formik;
    const user = useSelector((state) => state.user);
    const now = moment();
    const formattedDate = now.format("MMMM D, YYYY [at] h:mm A");

    const dispatch = useDispatch();
    const [preview, setPreview] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setFieldValue("coverImage", file);
            const objectUrl = URL.createObjectURL(file); // Generate a temporary URL
            // console.log(objectUrl);
            setPreview(objectUrl);

            dispatch(
                updateNewBlog({
                    attr: "coverImage",
                    content: objectUrl,
                })
            );
            fileStorage["coverImage"] = {};
            fileStorage["coverImage"].file = file;
        }
    };

    const handleAddBlock = (type) => {
        const newBlock = {
            id: Date.now(), // Generate unique id
            type: type,
            content: "",
        };
        // console.log(newBlock);
        dispatch(addBlock(newBlock));
    };

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

                {preview && (
                    <Image
                        src={preview}
                        alt="Preview"
                        objectFit="cover"
                        w="100%"
                        h={"15rem"}
                        // h="full"
                    />
                )}

                <Button
                    as="label"
                    display={"flex"}
                    justifyContent={"space-between"}
                    bg={"white"}
                    {...scaleEffect}
                    w={"100%"}
                    {...customShadow}
                    borderRadius={"0.5rem"}
                    px={"1.5rem"}
                    py={"0.5rem"}
                    align={"center"}
                    htmlFor={"cover-image"}
                    mt={"1rem"}
                    // border={"2px solid red"}
                >
                    <HStack align={"center"}>
                        <Text size={"md"}>
                            <IoImageOutline />
                        </Text>
                        <Text fontWeight={"400"} size={{ md: "xs", lg: "sm" }}>
                            añadir
                        </Text>
                    </HStack>
                    <Text fontWeight={"400"}>+</Text>
                </Button>

                <FormControl isInvalid={errors.coverImage}>
                    <Input
                        name="coverImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            handleImageChange(e, setFieldValue);
                        }}
                        hidden
                        id={`cover-image`}
                    />
                    <FormErrorMessage opacity={1} px={"1rem"} mb={"0.2rem"}>
                        {errors.coverImage}
                    </FormErrorMessage>
                </FormControl>
            </VStack>

            {/* Profile Information  */}
            <VStack align={"flex-end"} w={"100%"} py={"1rem"}>
                <Text size={"sm"} as={"b"}>
                    {user.name}
                </Text>
                <Text fontWeight={"200"} size={"sm"} textAlign={"right"}>
                    {formattedDate}
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
    };

    return (
        <HStack
            as={"button"}
            {...scaleEffect}
            {...customShadow}
            w={"100%"}
            p={"5"}
            borderRadius={"1rem"}
            justify={{ base: "flex-start", lg: "space-between" }}
            onClick={handleClick}
        >
            <HStack>
                <Text size={"xl"}>{icon}</Text>
                <Text display={{ md: "none", lg: "inline" }} fontWeight={"200"}>
                    {name}
                </Text>
            </HStack>
            <Text size={"md"}>+</Text>
        </HStack>
    );
}

function BlogContent({ w, onOpen, formik }) {
    const { errors, touched, setFieldValue } = formik;
    const dispatch = useDispatch();
    const newBlog = useSelector((state) => state.newBlog);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(updateNewBlog({ attr: "author", content: user.name }));
    }, []);

    return (
        <VStack w={w} align={"flex-start"} ml={"1rem"}>
            <Text fontWeight={"bold"} size={"lg"}>
                Titulo
            </Text>

            <VStack w={"100%"}>
                <HStack w={"100%"}>
                    <FormControl isInvalid={errors.title}>
                        <BlogEditorInput
                            name={"title"}
                            value={newBlog.title}
                            onChange={(e) => {
                                setFieldValue("title", e.target.value);
                                dispatch(
                                    updateNewBlog({
                                        attr: "title",
                                        content: e.target.value,
                                    })
                                );
                            }}
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
                        <FormErrorMessage
                            // opacity={1}
                            px={"1rem"}
                            mb={"0.2rem"}
                        >
                            {errors.title}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.category}>
                        <BlogEditorInput
                            name={"category"}
                            value={newBlog.category}
                            onChange={(e) => {
                                setFieldValue("category", e.target.value);
                                dispatch(
                                    updateNewBlog({
                                        attr: "category",
                                        content: e.target.value,
                                    })
                                );
                            }}
                            placeholder={"Selecciona una categoría"}
                            type={"text"}
                            fontSize="1.2rem" // Adjust placeholder size
                        />
                        <FormErrorMessage opacity={1} px={"1rem"} mb={"0.2rem"}>
                            {errors.category}
                        </FormErrorMessage>
                    </FormControl>
                </HStack>

                <FormControl isInvalid={errors.description}>
                    <Textarea
                        name={"description"}
                        value={newBlog.description}
                        onChange={(e) => {
                            setFieldValue("description", e.target.value);
                            dispatch(
                                updateNewBlog({
                                    attr: "description",
                                    content: e.target.value,
                                })
                            );
                        }}
                        // onChange={handleChange}
                        borderColor={hexToRgba("#000000", 0.2)}
                        borderWidth={"2px"}
                        placeholder={
                            "Escribe una breve descripcion del contenido."
                        }
                        bg={"white"}
                        py={"1.5rem"}
                        h={"7rem"}
                    />
                    <FormErrorMessage opacity={1} px={"1rem"} mb={"0.2rem"}>
                        {errors.description}
                    </FormErrorMessage>
                </FormControl>
            </VStack>

            <BlogEditor />

            <BlogActions formik={formik} onOpen={onOpen} />
        </VStack>
    );
}

function BlogActions({ onOpen, formik }) {
    const blocks = useSelector((state) => state.blocks);
    const newBlog = useSelector((state) => state.newBlog);
    const user = useSelector((state) => state.user);
    const { errors, setFieldValue, validateForm, setFieldError, isSubmitting } =
        formik;

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

    const validateBlogLength = (blocks, setFieldError) => {
        if (blocks.length < 2) {
            return false;
        } else {
            let totalText = 0;
            for (const key in blocks) {
                if (blocks[key].type == "text") {
                    totalText += blocks[key].content.length;
                }
            }
            if (totalText < 1500) {
                return false;
            }
        }
        return true;
    };

    const handleSave = () => {
        console.log("Handle SAVE");

        const isValidBlog = validateBlogLength(blocks);
        console.log(isValidBlog);

        if (isValidBlog != true) {
            setFieldError(
                "content",
                "Debes proporcionar suficiente cantidad de contenido para el blog"
            );
            return;
        } else {
            setFieldError("content", false);
        }

        setFieldValue("author", user.name);
        setFieldValue("status", 1);

        formik.submitForm();
    };

    const handleSubmit = () => {
        console.log("Handle PUBLISH");

        const isValidBlog = validateBlogLength(blocks);
        if (isValidBlog != true) {
            setFieldError(
                "content",
                "Debes proporcionar suficiente cantidad de contenido para el blog"
            );
        } else {
            setFieldError("content", false);
        }

        setFieldValue("author", user.name);
        setFieldValue("status", 2);

        formik.submitForm();
    };

    const handlePreview = async () => {
        console.log("Preview function");
        const isValidBlog = validateBlogLength(blocks);
        if (isValidBlog != true) {
            setFieldError(
                "content",
                "Debes proporcionar suficiente cantidad de contenido para el blog"
            );
        } else {
            const errors = await validateForm();
            if (Object.entries(errors).length == 0) {
                setFieldError("content", false);
                onOpen();
            }
        }
    };

    return (
        <FormControl isInvalid={errors.content}>
            <HStack
                justify={"flex-end"}
                w={"100%"}
                spacing={2}
                align={"center"}
            >
                {isSubmitting && (
                    <Text color={"blue"}>Cargando...</Text>
                )}
                {!isSubmitting && (
                    <>
                        <Button
                            {...btnStyle}
                            onClick={handleSave}
                            isLoading={isSubmitting}
                        >
                            Save Draft
                            <Text ml={"0.5rem"} mb={"0.1rem"}>
                                <IoMdSave />
                            </Text>
                        </Button>
                        <Button
                            {...btnStyle}
                            onClick={handlePreview}
                            isLoading={isSubmitting}
                        >
                            Preview
                            <Text ml={"0.5rem"} mb={"0.1rem"}>
                                <MdRemoveRedEye />
                            </Text>
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            isLoading={isSubmitting}
                            {...btnStyle}
                        >
                            Publish
                            <Text ml={"0.5rem"} mb={"0.1rem"}>
                                <IoIosShareAlt />
                            </Text>
                        </Button>
                    </>
                )}
            </HStack>
            <FormErrorMessage
                fontSize={"md"}
                py={"1rem"}
                mb={"0.2rem"}
                display={"flex"}
                justifyContent={"flex-end"}
            >
                {errors.content}
            </FormErrorMessage>
        </FormControl>
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
            dispatch(updateBlocks(arrayMove(blocks, oldIndex, newIndex)));
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
                                <DragBlock type={block.type} id={block.id} />
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

function BlogEditorInput({ label, placeholder, type, ...props }) {
    return (
        // <FormControl>
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
        // </FormControl>
    );
}

// export default NuevoPost;
