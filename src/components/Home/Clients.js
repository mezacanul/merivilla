import { Box, Heading, Image } from "@chakra-ui/react"
import Marquee from "react-fast-marquee";

export default function Clients(){
    return (
      <Box margin={"auto"} py={"2rem"} bg={"white"}>
        <Marquee>
          <Image src={"/clients/c1.webp"} w={"17rem"} mx={"1rem"}/>
          <Image src={"/clients/c2.webp"} w={"17rem"} mx={"1rem"}/>
          <Image src={"/clients/c4.webp"} w={"17rem"} mx={"1rem"}/>
          <Image src={"/clients/c5.png"} w={"17rem"} mx={"1rem"}/>
          <Image src={"/clients/c6.jpg"} w={"17rem"} mx={"1rem"}/>
          <Image src={"/clients/c7.jpg"} w={"17rem"} mx={"1rem"}/>
          <Image src={"/clients/c8.jpg"} w={"17rem"} mx={"1rem"}/>
          <Image src={"/clients/c9.jpg"} w={"17rem"} mx={"1rem"}/>
          <Image src={"/clients/c10.jpg"} w={"17rem"} mx={"1rem"}/>
          <Image src={"/clients/c11.jpg"} w={"17rem"} mx={"1rem"}/>
          <Image src={"/clients/c12.jpg"} w={"17rem"} mx={"1rem"}/>
        </Marquee>
      </Box>
    )
  }