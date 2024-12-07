import { Text, Flex, Box, Heading, Image, HStack, ring } from "@chakra-ui/react"
import GoldButton from "../common/GoldButton"

export default function Hero(){
    return (
      <Flex {...styles.container} >
        <Box {...styles.blackOverlay}/>
        
        <Box zIndex={1}>
          {/* <Heading fontWeight={"100"} size={"3xl"} width={"45vw"} mb={"1rem"}>REVOLUCIONA TUS VENTAS INMOBILIARIAS EN <Heading display={"inline"} fontWeight={500} size={"3xl"}>2025</Heading></Heading> */}
          <Heading fontWeight={"100"} size={"3xl"} width={"45vw"} mb={"1rem"}>MAXIMIZA TU NEGOCIO INMOBILIARIO EN <Heading display={"inline"} fontWeight={500} size={"3xl"}>2025</Heading></Heading>
          <Text w={"30vw"} mb={"1rem"} fontWeight={"400"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt risus fermentum dui mollis, vitae suscipit mauris hendrerit.</Text>
          <GoldButton>INSCRIBETE HOY</GoldButton>
        </Box>
  
        <HStack {...styles.testimonial} boxShadow={"0px 10px 8px rgba(0,0,0,0.3)"}>
          <Box {...styles.testimonialText}>
            <Text fontSize={"0.9rem"} fontWeight={800} w={"75%"} margin={"auto"}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt risus fermentum dui mollis, vitae suscipit mauris".</Text>
            <Text fontWeight={300} mt={"1rem"}>CEO de DOGE</Text>
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
      // background: "rgba(0, 66, 104, 0.5)"
      background: "#21213b",
      opacity: 0.7
    },
    testimonial: {
      width: "40rem",
      background: "#ffffffd5",
      zIndex: 1,
      color: "black",
      py: "1.5rem",
      px: "1rem",
      position: "absolute",
      bottom: "5rem",
      // right: "25rem",
      right: "50%",
      transform: "translateX(50%)",
      textAlign: "center",
      borderRadius: "0.4rem"
    },
    img: {
      width: "7rem",
      height: "7rem",
      borderRadius: "5rem"
    }
}