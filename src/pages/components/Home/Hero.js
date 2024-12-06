import { Text, Flex, Box, Heading, Image, HStack } from "@chakra-ui/react"
import GoldButton from "../common/GoldButton"

export default function HeroSection(){
    return (
      <Flex {...styles.container} >
        <Box {...styles.blackOverlay}/>
        
        <Box zIndex={1}>
          <Heading fontWeight={"200"} size={"3xl"} width={"45vw"} mb={"1rem"}>REVOLUCIONA TUS VENTAS INMOBILIARIAS EN 2024</Heading>
          <Text w={"30vw"} mb={"1rem"} fontWeight={"400"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt risus fermentum dui mollis, vitae suscipit mauris hendrerit.</Text>
          <GoldButton>INSCRIBETE HOY</GoldButton>
        </Box>
  
        <HStack {...styles.testimonial} boxShadow={"0px 10px 8px rgba(0,0,0,0.3)"}>
          <Box {...styles.testimonialText}>
            <Text>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt risus fermentum dui mollis, vitae suscipit mauris".</Text>
            <Text fontWeight={600}>Name, CEO</Text>
          </Box>
  
          <Image {...styles.img} src={"face.jpg"}/>
        </HStack>
      </Flex>
    )
}

  const styles = {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundImage: "url('merida.jpg')",
      backgroundSize:"cover",
      backgroundPosition:"bottom",
      backgroundRepeat:"no-repeat",
      position: "relative",
      alignItems: "center",
      paddingLeft: "4rem",
      pb: "5rem"
    },
    blackOverlay: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0", left: "0",
      background: "rgba(0, 66, 104, 0.5)"
    },
    testimonial: {
      width: "40rem",
      background: "#ffffffb7",
      zIndex: 1,
      color: "black",
      py: "1.5rem",
      px: "1rem",
      position: "absolute",
      bottom: "5rem",
      right: "25rem",
      textAlign: "center",
      borderRadius: "0.4rem"
    },
    img: {
      width: "7rem",
      height: "7rem",
      borderRadius: "5rem"
    }
}