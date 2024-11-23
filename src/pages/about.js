import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { Flex, Text } from "@chakra-ui/react";

const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
};

export default function About() {
    return (
        <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 2, ease: "easeOut" }}
        >
            <Flex alignItems={"center"}>
                <FaLocationDot fontSize={"0.9em"} />
                <Text ms={"0.5em"}>Mérida, Yuc. México</Text>
            </Flex>
        </motion.div>
    )
}