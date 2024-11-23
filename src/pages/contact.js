import Link from "./components/common/Link";
import { TbWorld } from "react-icons/tb";
import { FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Flex } from "@chakra-ui/react";

export default function Contact() {
    return (
        <>
            <Flex alignItems={"center"} mb={"0.5em"}>
                <IoMail size={"0.9em"}/>
                <Link href={"/"} ms={"0.5em"}>contacto@merivilla.co</Link>
            </Flex>
            <Flex alignItems={"center"} mb={"0.5em"}>
                <FaPhone size={"0.9em"}/>
                <Link href={"/"} ms={"0.5em"}>123-456-7890</Link>
            </Flex>
            <Flex alignItems={"center"} mb={"0.5em"}>
                <TbWorld size={"1em"}/>
                <Link href={"/"} ms={"0.5em"}>Mérida, Yuc.</Link>
            </Flex>
        </>
    )
}