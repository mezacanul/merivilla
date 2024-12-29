import axios from "axios";
import Contenido from "@/components/ContenidoEducativo/Contenido";
import Hero from "@/components/ContenidoEducativo/Hero";
import Videos from "@/components/ContenidoEducativo/Videos";
import { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { AgendarConsulta } from "../blog";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import MainBlog from "@/components/common/MainBlog";
import BlogCard from "@/components/common/BlogCard";

export async function getServerSideProps(context) {
    console.log("GSSP running");
    const baseURL = `http://${context.req.headers.host}`;
    let blogData = [];
    const { id } = context.query;
    try {
        if (id) {
            blogData = await axios.get(`${baseURL}/api/blogs/`, {
                params: { id },
            });
            // console.log("BLOG DATA 1: ", blogData.data[0]);
        }
        const blogsData = await axios.get(`${baseURL}/api/blogs`);

        return {
            props: {
                blogs: blogsData.data,
                blog: id != null ? blogData.data[0] : [],
            },
        };
    } catch (error) {
        console.error("Error fetching blogs or blog:", error);

        // Return an empty list in case of an error
        return {
            props: {
                blog: [],
                blogs: [],
            },
        };
    }
}

export default function ContenidoEducativo({ blogs, blog }) {
    useEffect(() => {
        console.log(blogs);
        console.log(blog);
    }, []);

    return (
        <>
            {blogs.length > 0 && !blog.uuid && (
                <>
                    <Hero />
                    <Contenido blogs={blogs} />
                    <Videos />
                </>
            )}

            {blog.uuid && (
                <>
                    <MainBlog
                        img={blog.cover_image}
                        category={blog.category}
                        title={blog.title}
                        description={blog.description}
                        text={blog.content}
                        author={blog.author}
                        date={blog.created}
                        imgAuthor={"/face2.jpg"}
                    />

                    <AgendarConsulta
                        author={blog.author}
                        date={blog.date}
                        imgAuthor={"/face2.jpg"}
                    />

                    <Box my={"10rem"} mx={"10rem"}>
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
                            {blogs.map((aBlog, i) => {
                                return (
                                    <SwiperSlide width={"100%"} key={i}>
                                        <BlogCard
                                            m={"auto"}
                                            w={"100%"}
                                            blog={aBlog}
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </Box>
                </>
            )}
        </>
    );
}
