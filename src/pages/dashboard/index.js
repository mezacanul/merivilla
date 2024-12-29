import GoldButton from "@/components/common/GoldButton";
import hexToRgba from "@/utils/hexToRgba";
import {
    Grid,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    FormControl,
    FormLabel,
    Input,
    Box,
    Container,
    Heading,
    VStack,
    HStack,
    Button,
    TableContainer,
    Card,
    Textarea,
    Image,
    SimpleGrid,
} from "@chakra-ui/react";
import { IoPersonCircle } from "react-icons/io5";
import { RiEditBoxLine } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import Collapsible from "@/layout/Collapsible";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { useRouter } from "next/router";
import BlogsGrid from "@/components/common/BlogsGrid";

export async function getServerSideProps(context) {
    console.log("GSSP running");
    const baseURL = `http://${context.req.headers.host}`;
    try {
        const blogsData = await axios.get(`${baseURL}/api/blogs`);

        return {
            props: {
                blogs: blogsData.data,
            },
        };
    } catch (error) {
        console.error("Error fetching blogs or blog:", error);

        // Return an empty list in case of an error
        return {
            props: {
                blogs: [],
            },
        };
    }
}

export default function Index({ blogs }) {
    const [role, setRole] = useState("creador");
    const [blogsData, setBlogsData] = useState([]);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        console.log(user);

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

        const fetchData = async () => {
            try {
                const response = await axios.get("/data/blogs.json"); // Relative path to public folder
                const data = response.data;
                console.log(data);

                setBlogsData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box w={"100vw"} minH={"87vh"} py={"10rem"} color={"black"}>
            <Container maxW={"90%"}>
                {/* Bienvenida */}
                <Box mb={"3rem"}>
                    <Heading mb={"1rem"} size={{ base: "md", md: "lg" }}>
                        Bienvenido {user.name}!
                    </Heading>
                    <Text size={"sm"} w={{ base: "70%", xl: "100%" }}>
                        {"Aquí podrás configurar tu perfil"}
                        {role == "creator" &&
                            ", ver tus blogs y crear nuevos blogs"}
                        {role != "creator" &&
                            " y ver tu lista de blogs favoritos"}
                        {"."}
                    </Text>
                </Box>

                {/* <GoldButton mb={"3rem"} href={"/contenidoeducativo/post/nuevo"}>Crear Nuevo Blog</GoldButton> */}

                {/* Content  */}
                <VStack align={"flex-start"} spacing={"1rem"}>
                    {/* Perfil  */}
                    <Collapsible
                        w={{ base: "100%", xl: "50%" }}
                        title={<Heading size={"md"}>Mi perfil</Heading>}
                    >
                        <PerfilForm />
                    </Collapsible>

                    {/* Mis blogs  */}
                    {role == "creador" && (
                        <Collapsible
                            title={<Heading size={"md"}>Mis blogs</Heading>}
                        >
                            <BlogList blogs={blogs} />
                        </Collapsible>
                    )}

                    {/* Mis blogs favoritos  */}
                    {role == "creador" && (
                        <Collapsible
                            type={"favoritos"}
                            title={
                                <Heading size={"md"}>Blogs favoritos</Heading>
                            }
                        >
                            <BlogFavs blogs={blogs} blogsData={blogsData} />
                        </Collapsible>
                    )}

                    {/* <GoldButton href={"/contenidoeducativo/post/nuevo"}>Crear Nuevo Blog</GoldButton> */}
                </VStack>
            </Container>
        </Box>
    );
}

function BlogCreatorCard({ blog, ...props }) {
    return (
        <HStack
            {...props}
            align={"flex-start"}
            border={"1px solid black"}
            borderRadius={"1rem"}
            overflow={"hidden"}
        >
            <Box
                bgSize={"cover"}
                bgPos={"center"}
                h={"100%"}
                w={"45rem"}
                bgImage={blog.cover_image}
            />

            <VStack
                // w={"45rem"}
                p={"1rem"}
                align={"flex-start"}
                justify={"space-between"}
                h={"100%"}
            >
                <Box>
                    <Text as={"b"}>{blog.title}</Text>
                    <Text
                    mt={"1rem"}
                        size={"sm"}
                        maxH={"10rem"}
                        w={"100%"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                    >
                        {blog.description}
                    </Text>
                </Box>

                <HStack justify={"space-between"} w={"100%"}>
                    <VStack align={"flex-start"} fontSize={"1.2rem"}>
                        <ChakraLink
                            as={Link}
                            href={`/contenidoeducativo?id=${blog.uuid}`}
                        >
                            Ver
                        </ChakraLink>
                        <ChakraLink
                            as={Link}
                            href={`/contenidoeducativo/editor/${blog.uuid}`}
                        >
                            Editar
                        </ChakraLink>
                    </VStack>
                    <VStack p={"1rem"} align={"flex-end"}>
                        <HStack>
                            <AiOutlineStock color="blue" />
                            <Text size={"sm"}>1312</Text>
                        </HStack>
                        <HStack>
                            <FaStar color="orange" />
                            <Text size={"sm"}>229</Text>
                        </HStack>
                    </VStack>
                </HStack>
            </VStack>
        </HStack>
    );
}

function BlogList({ blogs }) {
    return (
        <Box w={"100%"} position={"relative"}>
            <GoldButton mb={"1rem"} href={"/contenidoeducativo/editor/nuevo"}>
                Crear Nuevo Blog
            </GoldButton>

            <SimpleGrid
                mt={"1rem"}
                mb={"3rem"}
                w={"100%"}
                columns={3}
                gap={"4rem"}
            >
                {blogs.map((blog, i) => (
                    <BlogCreatorCard key={i} blog={blog} />
                ))}
            </SimpleGrid>
        </Box>
    );
}

function IconStyled({ icon }) {
    return (
        <Text
            _hover={{ color: "blue", cursor: "pointer" }}
            transition={"all 0.2s"}
        >
            {icon}
        </Text>
    );
}

function PerfilForm() {
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        unsetToken();
    };

    const unsetToken = async () => {
        const response = await axios.post(
            "/api/authentication",
            { action: "logout" },
            {
                withCredentials: true,
            }
        );
        if (response.status == 200) {
            console.log(response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 500);
            // const user = response.data.payload; // Extract token from response
            // dispatch(setUser(user))
        } else {
            console.log("Error logging out");
        }

        // const decoded = jwtDecode(token); // Decode token
        // console.log("decoded: ", decoded);
    };

    return (
        <VStack py={"2rem"} align={"flex-start"} w={"100%"}>
            <PhotoComponent label={"Foto"} />
            <InputComponent
                label={"Nombre"}
                placeholder={"Nombre"}
                type={"text"}
                value={user.name}
            />
            <InputComponent
                label={"Email"}
                placeholder={"Email"}
                type={"text"}
                value={user.email}
            />
            <InputComponent
                label={"Bio"}
                placeholder={"Bio"}
                type={"textarea"}
                value={user.bio}
            />
            <InputComponent
                label={"Rol"}
                placeholder={"Rol"}
                type={"text"}
                value={user.role}
            />
            <InputComponent
                label={"Ubicación"}
                placeholder={"Ubicación"}
                type={"text"}
                value={user.location}
            />
            <InputComponent
                label={"Linkedin"}
                placeholder={"Linkedin"}
                type={"text"}
                value={user.linkedin}
            />
            <InputComponent
                label={"Password"}
                placeholder={"*******"}
                type={"password"}
                value={user.password}
            />
            <GoldButton mt={"2rem"} mb={"0.5rem"} w={"100%"}>
                Guardar Cambios
            </GoldButton>
            <Button
                onClick={handleLogout}
                py={"1.5rem"}
                bg="white"
                color="blue"
                _hover={{ color: "white", bg: "blue" }}
                w={"100%"}
            >
                Cerrar Sesión
            </Button>
        </VStack>
    );
}

function InputComponent({ label, type, placeholder, value }) {
    return (
        <FormControl mb={4}>
            <HStack align={"center"}>
                <FormLabel fontWeight={"bold"} w={"15rem"}>
                    {label}
                </FormLabel>

                {(type == "text" || type == "password") && (
                    <Input
                        value={value}
                        borderColor={hexToRgba("#000000", 0.2)}
                        borderWidth={"2px"}
                        placeholder={placeholder}
                        type={type}
                        bg={"white"}
                        py={"1.5rem"}
                    />
                )}

                {type == "textarea" && (
                    <Textarea
                        value={value}
                        borderColor={hexToRgba("#000000", 0.2)}
                        borderWidth={"2px"}
                        placeholder={placeholder}
                        bg={"white"}
                        py={"1.5rem"}
                        h={"10rem"}
                    />
                )}
            </HStack>
        </FormControl>
    );
}

function PhotoComponent({ label, placeholder }) {
    return (
        <FormControl mb={4}>
            <HStack align={"center"}>
                <FormLabel
                    fontWeight={"bold"}
                    w={{ base: "8rem", md: "15rem" }}
                >
                    {label}
                </FormLabel>

                <HStack
                    align={"center"}
                    justify={"flex-start"}
                    w={"100%"}
                    position={"relative"}
                >
                    <IoPersonCircle color="#D9D9D9" fontSize={"6rem"} />
                    <Input
                        h={"auto"}
                        w={"auto"}
                        p={0}
                        border={"none"}
                        type={"file"}
                        variant="outline"
                        accept="image/*" //
                        opacity={0}
                        // bg={"white"}
                        // py={"1.5rem"}
                    />

                    <Button
                        bg="light"
                        color="black"
                        py={"1rem"}
                        left={"8rem"}
                        position={"absolute"}
                        _hover={{
                            bg: "blue",
                            color: "white",
                        }}
                    >
                        Subir Foto
                    </Button>
                </HStack>
            </HStack>
        </FormControl>
    );
}

function BlogFavs({ blogs }) {
    return <BlogsGrid blogs={blogs} py={"3rem"} />;
}

const items = [
    {
        id: 1,
        name: "Las mejores colonias para comprar casa en Mérida",
        category: "Bienes Raíces",
        fav: 452,
        views: 1234,
    },
    {
        id: 2,
        name: "Costo de vida en Mérida: Guía para compradores de vivienda",
        category: "Bienes Raíces",
        fav: 823,
        views: 987,
    },
    {
        id: 3,
        name: "5 consejos para invertir en bienes raíces en Yucatán",
        category: "Inversiones",
        fav: 367,
        views: 1456,
    },
    {
        id: 4,
        name: "Por qué Mérida es el lugar perfecto para expatriados",
        category: "Relocalización",
        fav: 299,
        views: 876,
    },
    {
        id: 5,
        name: "Cómo elegir la mejor propiedad en el Centro Histórico de Mérida",
        category: "Bienes Raíces",
        fav: 715,
        views: 1309,
    },
    {
        id: 6,
        name: "Casas de lujo en Mérida: Características y precios",
        category: "Bienes Raíces de Lujo",
        fav: 534,
        views: 1593,
    },
    {
        id: 7,
        name: "Impuestos y tarifas al comprar propiedades en Yucatán",
        category: "Finanzas",
        fav: 468,
        views: 1178,
    },
    {
        id: 8,
        name: "¿Es buen momento para comprar terrenos en Yucatán?",
        category: "Inversiones",
        fav: 892,
        views: 1054,
    },
    {
        id: 9,
        name: "Pros y contras de vivir en comunidades privadas en Mérida",
        category: "Estilo de Vida",
        fav: 223,
        views: 1421,
    },
    {
        id: 10,
        name: "Guía para construir la casa de tus sueños en Mérida",
        category: "Construcción",
        fav: 649,
        views: 1647,
    },
];
