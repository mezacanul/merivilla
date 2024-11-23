import NextLink from 'next/link'
import { Link as ChakraLink } from '@chakra-ui/react'

const Link = ({ href, children, ...props }) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <ChakraLink {...props}>
        {children}
      </ChakraLink>
    </NextLink>
  )
}
import { Flex, Box } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
// import Link from 'next/link';
import styles from "./Navbar.module.css"

export default function Navbar() {
    return (
        <Box border={"1px"}>
            <Flex w={"40vw"} justifyContent={"space-between"} py={"1em"} px={"2em"}>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/next-test">Next Test</Link>
                <Flex alignItems={"center"}>
                    <Link href="/live" me={"0.5em"}>Live </Link>
                    <FaCircle color="red" size="0.6rem" />
                </Flex>
                <b> | </b>
                <Link href="/api/get/">Get</Link>
                <Link href="/api/post">Post</Link>
                <Link href="/api/hello">Hello</Link>
            </Flex>
        </Box>
  )
}
