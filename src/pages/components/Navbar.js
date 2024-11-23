import Link from "../components/common/Link";
import { Flex, Box } from "@chakra-ui/react";

const LinkStyles = (pos) => {
  if(pos == "left"){
    return { me: "1em" }
  } else if (pos == "right") {
    return { ms: "1em"}
  }
}

export default function Navbar() {
    return (
        <Box borderBottom={"1px"}>
            <Flex w={"auto"} justifyContent={"space-between"} py={"1em"} px={"2em"}>
                <Link {...(LinkStyles("left"))} href="/">Merivilla Co.</Link>

                <Box>
                  <Link {...(LinkStyles("right"))} href="/about">About</Link>
                  {/* <Link {...(LinkStyles("right"))} href="/contact">Contact</Link> */}
                  <Link {...(LinkStyles("right"))} href="/api/get">API</Link>
                </Box>
            </Flex>
        </Box>
  )
}
