import { addBlock } from "@/store/slices/blocksSlice";
import { updateNewBlog } from "@/store/slices/newBlogSlice";
import hexToRgba from "@/utils/hexToRgba";
import { Button, FormControl, FormErrorMessage, HStack, Image, Input, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBlockBtn from "./AddBlockBtn";
import { IoImageOutline, IoImagesOutline } from "react-icons/io5";
import { RxText, RxTextAlignLeft } from "react-icons/rx";
import { FiYoutube } from "react-icons/fi";
import scaleEffect from "@/utils/scaleEffect";
import { customShadow } from "@/utils/customShadow";
import { v4 as uuidv4 } from 'uuid';


export default function BlocksPanel({ w, formik, fileStorage }) {
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
        const uuid = uuidv4();
        const newBlock = {
            id: uuid, // Generate unique id
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
                    icon={<IoImagesOutline />}
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