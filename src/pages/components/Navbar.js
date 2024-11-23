// import Link from "../components/common/Link";
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from "next/link";
import { Flex, Box } from "@chakra-ui/react";
import { useEffect, useState } from 'react';

const LinkStyles = (pos) => {
  if(pos == "left"){
    return { me: "1em" }
  } else if (pos == "right") {
    return { ms: "1em"}
  }
}

export default function Navbar() {
    const router = useRouter();

    const variants = {
      hidden: { opacity: 0 },
      enter: { 
        opacity: 1,
        transition: {
            duration: 2,
            delay: router.pathname == "/" ? 1.4 : 0
        }
    },
      exit: { opacity: 0 },
    };

    return (
      <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <Box borderBottom={"1px"}>
            <Flex w={"auto"} justifyContent={"space-between"} py={"1em"} px={"2em"}>
                <Link style={{marginRight: "1em"}} {...(LinkStyles("left"))} href="/">Merivilla Co.</Link>

                <Box>
                  <Link style={{marginLeft: "1em"}} {...(LinkStyles("right"))} href="/about">About</Link>
                  {/* <Link {...(LinkStyles("right"))} href="/contact">Contact</Link> */}
                  <Link style={{marginLeft: "1em"}} {...(LinkStyles("right"))} href="/api/get">API</Link>
                </Box>
            </Flex>
        </Box>
      </motion.div>
  )
}
