import { Button, FormControl, FormErrorMessage, HStack, Text } from "@chakra-ui/react";
import { IoIosShareAlt, IoMdSave } from "react-icons/io";
import { MdRemoveRedEye } from "react-icons/md";
import { useSelector } from "react-redux";

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

export default function BlogActions({ onOpen, formik }) {
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
                {isSubmitting && <Text color={"blue"}>Cargando...</Text>}
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