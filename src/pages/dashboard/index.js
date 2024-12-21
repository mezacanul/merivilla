import GoldButton from "@/components/common/GoldButton";
import hexToRgba from "@/utils/hexToRgba";
import { Grid, Text, Table, Thead, Tbody, Tr, Th, Td, FormControl, FormLabel, Input, Box, Container, Heading, VStack, HStack, Button, TableContainer, Card, Textarea } from "@chakra-ui/react";
import { IoPersonCircle } from "react-icons/io5";
import { RiEditBoxLine } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import Collapsible from "@/layout/Collapsible";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import { BlogCard, BlogsGrid } from "@/components/Blog_SAVE/Hero";
import axios from "axios";


export default function Index() {
    const [role, setRole] = useState("creador")
    const [blogsData, setBlogsData] = useState([]);

    useEffect(() => {
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
                    <Heading mb={"1rem"} size={{base:"md", md: "lg"}}>Bienvenido Usuario!</Heading>
                    <Text size={"sm"} w={{base:"70%", xl: "100%"}}>
                        {"Aquí podrás configurar tu perfil"}
                        {role == "creador" && ", ver tus blogs y crear nuevos blogs"}
                        {role != "creador" && " y ver tu lista de blogs favoritos"}
                        {"."}
                    </Text>
                </Box>

                {/* <GoldButton mb={"3rem"} href={"/contenidoeducativo/post/nuevo"}>Crear Nuevo Blog</GoldButton> */}

                {/* Content  */}
                <VStack align={"flex-start"} spacing={"1rem"}>
                    
                    {/* Perfil  */}
                    <Collapsible w={{base:"100%", xl: "50%"}} title={<Heading size={"md"}>Mi perfil</Heading>}>
                        <PerfilForm/>
                    </Collapsible>

                    {/* Mis blogs  */}
                    {role == "creador" && (
                        <Collapsible title={<Heading size={"md"}>Mis blogs</Heading>}>
                            <BlogList/>
                        </Collapsible>
                    )}
                    
                    {/* Mis blogs favoritos  */}
                    {role == "creador" && (
                        <Collapsible type={"favoritos"} title={<Heading size={"md"}>Blogs favoritos</Heading>}>
                            <BlogFavs blogsData={blogsData}/>
                        </Collapsible>
                    )}

                    {/* <GoldButton href={"/contenidoeducativo/post/nuevo"}>Crear Nuevo Blog</GoldButton> */}

                </VStack>
            </Container>
        </Box>
    )
}

function BlogList(){  
    return (
        <Box w={"100%"} position={"relative"}>
            <GoldButton mb={"2rem"} href={"/contenidoeducativo/post/nuevo"}>Crear Nuevo Blog</GoldButton>

            <TableContainer w={"100%"} ml={"-1rem"} overflow={"hidden"}>
                <Table variant="simple" w={"100%"}>
                    <Thead bg={"blue"}>
                        <Tr>
                            <Th w={{base: "10rem", lg: "30rem"}} color={"white"} fontSize="lg">Blog</Th>
                            <Th color={"white"} fontSize="lg">Categoría</Th>
                            <Th color={"white"} fontSize="lg"></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {items.map((item) => (
                        <Tr key={item.id} _hover={{bg: "light"}} transition={"all 0.1s"} fontSize={"xl"}>
                            <Td>
                                <ChakraLink display={"block"} overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"} w={{base: "13rem", lg: "20rem"}} as={Link} href="#">
                                    {item.name}
                                </ChakraLink>
                            </Td>
                            <Td>{item.category}</Td>
                            <Td textAlign={"right"} fontSize={"2xl"}>
                                <HStack spacing={3} justify={"space-between"}>
                                    <IconStyled icon={<RiEditBoxLine/>}/>

                                    <HStack>
                                        <IconStyled icon={<AiOutlineStock/>}/>
                                        <Text fontSize={"sm"}>{item.views}</Text>
                                    </HStack>

                                    <HStack>
                                        <IconStyled icon={<FaStar/>}/>
                                        <Text fontSize={"sm"}>{item.fav}</Text>
                                    </HStack>
                                </HStack>
                            </Td>
                        </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

function IconStyled({icon}){
    return (
        <Text _hover={{color:"blue", cursor: "pointer"}} transition={"all 0.2s"}>
            {icon}
        </Text>
    )
}

function PerfilForm(){
    return (
        <VStack py={"2rem"} align={"flex-start"} w={"100%"}>
            <PhotoComponent label={"Foto"}/>
            <InputComponent label={"Nombre"} placeholder={"Nombre"} type={"text"}/>
            <InputComponent label={"Email"} placeholder={"Email"} type={"text"}/>
            <InputComponent label={"Ubicación"} placeholder={"Ubicación"} type={"text"}/>
            <InputComponent label={"Bio"} placeholder={"Bio"} type={"textarea"}/>
            <InputComponent label={"Linkedin"} placeholder={"Linkedin"} type={"text"}/>
            <InputComponent label={"Password"} placeholder={"*******"} type={"password"}/>
            <GoldButton my={"2rem"} w={"100%"}>Guardar Cambios</GoldButton>
        </VStack>
    )
}

function InputComponent({label, type, placeholder}) {
    return (
        <FormControl id="password" mb={4}>
            <HStack align={"center"}>
                <FormLabel fontWeight={"bold"} w={"15rem"}>
                    {label}
                </FormLabel>
                
                {(type == "text" || type == "password") && (
                    <Input
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
    )
}

function PhotoComponent({label, placeholder}) {
    return (
        <FormControl id="password" mb={4}>
            <HStack align={"center"}>
                <FormLabel fontWeight={"bold"} w={{base: "8rem", md: "15rem"}}>
                    {label}
                </FormLabel>

                <HStack align={"center"} justify={"flex-start"} w={"100%"} position={"relative"} >
                    <IoPersonCircle color="#D9D9D9" fontSize={"6rem"}/>
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
                            color: "white"
                        }}
                    >
                            Subir Foto
                    </Button>
                </HStack>

            </HStack>
        </FormControl>
    )
}

function BlogFavs({blogsData}){  
    return (
        <BlogsGrid blogsData={blogsData} py={"3rem"}>
            <BlogCard/>
        </BlogsGrid>
    )
}

const items = [
    { id: 1, name: "Las mejores colonias para comprar casa en Mérida", category: "Bienes Raíces", fav: 452, views: 1234 },
    { id: 2, name: "Costo de vida en Mérida: Guía para compradores de vivienda", category: "Bienes Raíces", fav: 823, views: 987 },
    { id: 3, name: "5 consejos para invertir en bienes raíces en Yucatán", category: "Inversiones", fav: 367, views: 1456 },
    { id: 4, name: "Por qué Mérida es el lugar perfecto para expatriados", category: "Relocalización", fav: 299, views: 876 },
    { id: 5, name: "Cómo elegir la mejor propiedad en el Centro Histórico de Mérida", category: "Bienes Raíces", fav: 715, views: 1309 },
    { id: 6, name: "Casas de lujo en Mérida: Características y precios", category: "Bienes Raíces de Lujo", fav: 534, views: 1593 },
    { id: 7, name: "Impuestos y tarifas al comprar propiedades en Yucatán", category: "Finanzas", fav: 468, views: 1178 },
    { id: 8, name: "¿Es buen momento para comprar terrenos en Yucatán?", category: "Inversiones", fav: 892, views: 1054 },
    { id: 9, name: "Pros y contras de vivir en comunidades privadas en Mérida", category: "Estilo de Vida", fav: 223, views: 1421 },
    { id: 10, name: "Guía para construir la casa de tus sueños en Mérida", category: "Construcción", fav: 649, views: 1647 },
];    