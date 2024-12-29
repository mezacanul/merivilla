import { v4 as uuidv4 } from "uuid"; // Import the UUID generator
import { Formik, Form, Field } from "formik";
import { useToast } from "@chakra-ui/react";
import * as Yup from "yup";

import { updateBlocks } from "@/store/slices/blocksSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import {
    Box,
    Container,
    Heading,
    HStack,
    VStack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { updateNewBlog } from "@/store/slices/newBlogSlice";
import moment from "moment";
import { setUser } from "@/store/slices/userSlice";
import parseMarkdown from "@/utils/parseMarkdown";
import FullscreenModal from "@/components/common/FullScreenModal";
import MainBlog from "@/components/common/MainBlog";
import BlocksPanel from "@/components/ContenidoEducativo/editor/BlocksPanel";
import { customShadow } from "@/utils/customShadow";
import ContentPanel from "@/components/ContenidoEducativo/editor/ContentPanel";
import getMarkdown from "@/utils/getMarkdown";

export async function getServerSideProps(context) {
    console.log("GSSP running");
    const baseURL = `http://${context.req.headers.host}`;
    let blogData = [];
    const { id } = context.params;
    try {
        if (id != "nuevo") {
            blogData = await axios.get(`${baseURL}/api/blogs/`, {
                params: { id },
            });
            // console.log("BLOG DATA 1: ", blogData.data[0]);
        }

        return {
            props: {
                blog: id != "nuevo" ? blogData.data[0] : [],
            },
        };
    } catch (error) {
        console.error("Error fetching blogs or blog:", error);

        // Return an empty list in case of an error
        return {
            props: {
                blog: [],
            },
        };
    }
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

export default function Editor({ blog }) {
    const user = useSelector((state) => state.user);
    const blocks = useSelector((state) => state.blocks);
    // const newBlog = useSelector((state) => state.blocks);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const newBlog = useSelector((state) => state.newBlog);
    const now = moment();
    const formattedDate = now.format("MMMM D, YYYY [at] h:mm A");
    let markdown = getMarkdown(blocks);

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
        // console.log("BLOG: ", blog);
        if (blog.length > 0) {
            dispatch(updateNewBlog({ attr: "title", content: blog.title }));
            dispatch(
                updateNewBlog({ attr: "category", content: blog.category })
            );
            dispatch(
                updateNewBlog({
                    attr: "description",
                    content: blog.description,
                })
            );
            dispatch(
                updateNewBlog({ attr: "coverImage", content: blog.cover_image })
            );
            dispatch(updateNewBlog({ attr: "author", content: blog.author }));
            // console.log("CONTENT: ", blog.content);
            let parsedContent = parseMarkdown(blog.content);
            console.log("PARSED: ", parsedContent);
            dispatch(updateBlocks(parsedContent));
        }

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
        const uuid = uuidv4();
        try {
            const fileName = `${uuid}.jpg`;
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
            <FullscreenModal isOpen={isOpen} onClose={onClose}>
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
            </FullscreenModal>

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
                                    <BlocksPanel
                                        fileStorage={fileStorage}
                                        formik={formikProps}
                                        w={"20%"}
                                    />
                                    <ContentPanel
                                        formik={formikProps}
                                        onOpen={onOpen}
                                        w={"80%"}
                                        fileStorage={fileStorage}
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

// export default NuevoPost;
