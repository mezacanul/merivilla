import CustomLayout from "@/layout/CustomLayout";
import { Text, Box, Circle, Heading, HStack, VStack } from "@chakra-ui/react";
import { PiCrownSimpleFill } from "react-icons/pi";
import Overlay from "../common/Overlay";
import scaleEffect from "@/utils/scaleEffect";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

export default function Videos() {
    return (
        <CustomLayout
            maxW="100%"
            bg={"white"}
            title={<CustomTitle />}
            arrowsCrolor="black"
        >
            {/* <HStack my={{base:"3rem", xl: "6rem"}} justify={"center"} w={"100%"} px={"1rem"}> */}
            <Box my={"5rem"}>
                <Swiper
                    style={{ overflow: "initial" }}
                    navigation
                    loop={true}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        // modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={false}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {/* {blogs.map((blog, i) => {
                        return ( */}
                    <SwiperSlide width={"100%"}>
                        <VideoCards
                            title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                            category={"VENTAS Y MARKETING"}
                            date={"01/01/2025"}
                            author={"John Doe"}
                            img={"serv1.jpg"}
                        />
                    </SwiperSlide>
                    <SwiperSlide width={"100%"}>
                        <VideoCards
                            title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                            category={"VENTAS Y MARKETING"}
                            date={"01/01/2025"}
                            author={"John Doe"}
                            img={"serv2.webp"}
                        />
                    </SwiperSlide>
                    <SwiperSlide width={"100%"}>
                        <VideoCards
                            title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                            category={"VENTAS Y MARKETING"}
                            date={"01/01/2025"}
                            author={"John Doe"}
                            img={"blog2.jpg"}
                        />
                    </SwiperSlide>
                    <SwiperSlide width={"100%"}>
                        <VideoCards
                            title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                            category={"VENTAS Y MARKETING"}
                            date={"01/01/2025"}
                            author={"John Doe"}
                            img={"blog2.webp"}
                        />
                    </SwiperSlide>
                    <SwiperSlide width={"100%"}>
                        <VideoCards
                            title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                            category={"VENTAS Y MARKETING"}
                            date={"01/01/2025"}
                            author={"John Doe"}
                            img={"blog3.jpg"}
                        />
                    </SwiperSlide>

                    {/* );
                    })} */}
                </Swiper>
            </Box>

            {/* <VideoCards
                    title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                    category={"VENTAS Y MARKETING"}
                    date={"01/01/2025"}
                    author={"John Doe"}
                    img={"serv1.jpg"}
                />

                <VideoCards
                    title={"5 METRICAS QUE DEBES ESTAR USANDO"}
                    category={"VENTAS Y MARKETING"}
                    date={"01/01/2025"}
                    author={"John Doe"}
                    img={"serv1.jpg"}
                /> */}

            {/* </HStack> */}
        </CustomLayout>
    );
}

function VideoCards({ title, category, date, author, img }) {
    return (
        <VStack
            // {...scaleEffect}
            position={"relative"}
            py={"2rem"}
            px={"2rem"}
            w={{ base: "20rem", md: "32rem", lg: "36rem" }}
            bg={`url('${img}')`}
            bgSize={"cover"}
            boxShadow={"0px 1.5rem 20px rgba(0,0,0,0.3)"}
        >
            <Overlay color={"blue"} opacity={0.4}/>
            <VStack
                justify={"space-between"}
                position={"relative"}
                color={"white"}
                h={{ base: "22rem", md: "28rem" }}
            >
                <VStack align={"flex-start"}>
                    <Heading fontWeight={"bold"} size={"md"}>
                        {title}
                    </Heading>
                    <Text size={"sm"}>{category}</Text>
                </VStack>

                <HStack
                    justify={"space-between"}
                    align={"center"}
                    w={"100%"}
                    fontSize={"2xl"}
                >
                    <HStack>
                        <Circle
                            bgGradient="linear(45deg, #9c6a07 0%,#dbb262 100%)"
                            display={"inline-flex"}
                            p={"0.4rem"}
                            mr={"0.3rem"}
                        >
                            <PiCrownSimpleFill
                                fontSize={"1.5rem"}
                                color="white"
                            />
                        </Circle>
                        <Text size={"sm"} as={"b"}>
                            {date}
                        </Text>
                    </HStack>
                    <Text size={"sm"} as={"b"}>
                        {author}
                    </Text>
                </HStack>
            </VStack>
        </VStack>
    );
}

function CustomTitle() {
    return (
        <HStack
            color={"black"}
            justify={"flex-start"}
            align={{ base: "flex-end", md: "center" }}
        >
            <Heading as={"span"}>VIDEOS EDUCATIVOS</Heading>
            <Circle
                bgGradient="linear(45deg, #9c6a07 0%,#dbb262 100%)"
                display={"inline-flex"}
                p={"0.4rem"}
                ml={"1rem"}
                mb={"0.4rem"}
            >
                <Text size={{ base: "sm", md: "md", xl: "xl" }}>
                    <PiCrownSimpleFill color="white" />
                </Text>
            </Circle>
        </HStack>
    );
}
