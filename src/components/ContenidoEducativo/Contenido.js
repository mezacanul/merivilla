import CustomLayout from "@/layout/CustomLayout";
import {
    HStack,
    Box,
    Heading,
    VStack,
    Text,
    Flex,
    Grid,
} from "@chakra-ui/react";
import Overlay from "../common/Overlay";
import scaleEffect from "@/utils/scaleEffect";
import Link from "next/link";
import { useState } from "react";
import { BlogCard } from "../Blog_SAVE/Hero";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

export default function Contenido({ blogs }) {
    const [blogsData, setBlogsData] = useState([]);

    return (
        <CustomLayout
            bg={"blue"}
            title={"CONTENIDO GRATIS"}
            maxW={"100%"}
            arrowsColor={"white"}
        >
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
                    {blogs.map((blog, i) => {
                        return (
                            <SwiperSlide width={"100%"} key={i}>
                                <BlogCard m={"auto"} w={"100%"} blog={blog} />
                            </SwiperSlide>

                        );
                    })}
                </Swiper>

            </Box>
        </CustomLayout>
    );
}

function CardsContenido({
    title,
    subtitle,
    subtitleColor,
    text,
    date,
    author,
    img,
}) {
    return (
        <VStack
            as={Link}
            href={"/blog"}
            width={"31rem"}
            align={"center"}
            {...scaleEffect}
        >
            {/* Image Box  */}
            <Box
                backgroundImage={`url('${img}')`}
                backgroundSize="cover"
                backgroundPosition={"center"}
                position={"relative"}
                h={{ base: "24rem", xl: "28rem" }}
                p={"2rem"}
            >
                <Overlay color={"light"} opacity={0.4} />
                <Heading
                    fontWeight={"bold"}
                    size={"md"}
                    color={"black"}
                    position={"relative"}
                >
                    {title}
                </Heading>
            </Box>

            {/* Content Box */}
            <VStack
                mt={{ base: "-4rem", xl: "-7.5rem" }}
                position={"relative"}
                bg={"white"}
                color={"black"}
                w={"90%"}
                p={"2rem"}
                // h={"18rem"}
                justifyContent={"space-between"}
                boxShadow={"0px 1.5rem 20px rgba(0,0,0,0.3)"}
            >
                <VStack mb={"3rem"}>
                    <Text as={"b"} color={subtitleColor}>
                        {subtitle}
                    </Text>
                    <Text size={"sm"}>{text}</Text>
                </VStack>

                {/* Footer  */}
                <HStack w={"100%"} justify={"space-between"} fontSize={"xl"}>
                    <Text as="b" size={"sm"}>
                        {date}
                    </Text>
                    <Text as="b" size={"sm"}>
                        {author}
                    </Text>
                </HStack>
            </VStack>
        </VStack>
    );
}
