import { jwtDecode } from "jwt-decode";
import {
    Flex,
    HStack,
    Text,
    VStack,
    FormControl,
    Input,
    FormLabel,
    Box,
    Button,
    InputGroup,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import GoldButton from "@/components/common/GoldButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/slices/userSlice";

// export async function getServerSideProps(context) {
//     const baseURL = `http://${context.req.headers.host}`;
//     const response = await axios.post(`${baseURL}/api/authentication`, {action: "reload"}, {
//         withCredentials: true,
//     });

//     console.log("response reload: ", response.data.payload);
    

//     // const token = response.data.payload; // Extract token from response
//     // const decoded = jwtDecode(token); // Decode token
//     // // console.log("User information:", decoded); // Access payload
//     // // Example: decoded = { name: 'John', email: 'user@example.com', role: 'admin' }
//     // return decoded;
// }

const loginCall = async (send) => {
    try {
        const response = await axios.post("/api/authentication", send, {
            withCredentials: true,
        });

        const token = response.data.payload; // Extract token from response
        const decoded = jwtDecode(token); // Decode token
        // console.log("User information:", decoded); // Access payload
        // Example: decoded = { name: 'John', email: 'user@example.com', role: 'admin' }
        return decoded;
    } catch (error) {
        console.log(
            // "Login failed:",
            error.response?.data?.message || error.message
        );
        return error.response?.data?.message || error.message;
    }
};

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const user = useSelector((state) => state.user);

    useEffect(() => {
        console.log(user);
    }, []);

    const handleLogin = async () => {
        setIsLoading(true);
        const send = { payload: { email, password }, action: "login" };
        try {
            const decodedToken = await loginCall(send); // Store the decoded token
            if (typeof decodedToken == "string") {
                setErrorMessage(decodedToken);
            } else {
                setErrorMessage("");
                setSuccess(true);
                console.log("Decoded Token:", decodedToken); // Log the decoded token
                dispatch(setUser(decodedToken));
                setTimeout(() => {
                    router.push("/dashboard");
                }, 400);
            }
            // Use the decoded token for later actions
        } catch (error) {
            console.log(error.message); // Handle the error
        }
        setIsLoading(false);
    };

    return (
        <Flex
            justify={"center"}
            align={"center"}
            w={"100vw"}
            h={"100vh"}
            color={"black"}
        >
            {/* Contenedor  */}
            <VStack w={"28rem"} spacing={"2rem"} mt={"-4rem"}>
                {/* Titulo  */}
                <Box>
                    <HStack justify={"center"}>
                        <Text
                            size={{ base: "md", md: "lg", xl: "xl" }}
                            fontWeight={"light"}
                        >
                            Bienvenido a{" "}
                        </Text>
                        <Text
                            size={{ base: "md", md: "lg", xl: "xl" }}
                            as={"b"}
                        >
                            Merivilla.co
                        </Text>
                    </HStack>
                    <Text
                        textAlign={"center"}
                        color={"dark"}
                        w={{ base: "80%", md: "100%" }}
                        m={"auto"}
                    >
                        <Text as={"span"} size={{ base: "sm", xl: "md" }}>
                            Inicia sesión para continuar o puedes crear una
                            cuenta{" "}
                        </Text>
                        <Link href={"/onboard"}>
                            <Text
                                as={"b"}
                                size={{ base: "sm", xl: "md" }}
                                _hover={{
                                    textDecor: "underline",
                                }}
                            >
                                aquí
                            </Text>
                        </Link>
                    </Text>
                </Box>

                {/* Formulario  */}
                <VStack w={{ base: "80%", xl: "100%" }} align={"self-start"}>
                    <InputGroup>
                        <VStack w={"100%"}>
                            <FormControl id="email" mb={4}>
                                <FormLabel fontWeight={"bold"}>Email</FormLabel>
                                <Input
                                    disabled={isLoading}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    borderColor={"dark"}
                                    placeholder="your@email.com"
                                    type="text"
                                    bg={"white"}
                                    py={"1.5rem"}
                                />
                            </FormControl>

                            <FormControl id="password" mb={4}>
                                <FormLabel fontWeight={"bold"}>
                                    Password
                                </FormLabel>
                                <Input
                                    disabled={isLoading}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    borderColor={"dark"}
                                    placeholder="********"
                                    type="password"
                                    bg={"white"}
                                    py={"1.5rem"}
                                />
                            </FormControl>
                        </VStack>
                    </InputGroup>

                    <ChakraLink
                        as={Link}
                        href={"/recuperarcontrasena"}
                        mb={"2rem"}
                        _hover={{
                            textDecor: "underline",
                        }}
                    >
                        Olvide la contraseña
                    </ChakraLink>

                    {!isLoading && success == false && (
                        <GoldButton onClick={handleLogin} alignSelf={"center"}>
                            Iniciar Sesión
                        </GoldButton>
                    )}

                    <Text my={"1rem"} size={"sm"} alignSelf={"center"}>
                        {isLoading && "Cargando..."}
                        {!isLoading && errorMessage != "" && (
                            <Text size={"sm"} as={"span"} color={"red"}>
                                {errorMessage}
                            </Text>
                        )}
                        {!isLoading && success == true && (
                            <Text size={"sm"} as={"span"} color={"green"}>
                                ¡Acceso Exitoso!
                            </Text>
                        )}
                    </Text>
                </VStack>
            </VStack>
        </Flex>
        // <ComingSoon/>
    );
}
