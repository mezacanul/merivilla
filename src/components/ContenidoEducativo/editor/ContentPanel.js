import { updateNewBlog } from "@/store/slices/newBlogSlice";
import { FormControl, FormErrorMessage, HStack, Text, Textarea, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogEditorInput from "./BlogEditorInput";
import hexToRgba from "@/utils/hexToRgba";
import BlogEditor from "./BlogEditor";
import BlogActions from "./BlogActions";

export default function ContentPanel({ w, onOpen, formik, fileStorage }) {
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

            <BlogEditor fileStorage={fileStorage}/>

            <BlogActions formik={formik} onOpen={onOpen} />
        </VStack>
    );
}