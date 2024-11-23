import { motion } from 'framer-motion';
import { Text, Flex, Center } from "@chakra-ui/react"

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function App() {
  return (
    <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 2, ease: "easeOut" }}
      >
      <Flex justifyContent={"center"} alignItems={"center"} height={"70vh"}>
        <Text>Coming soon...</Text>
      </Flex>
    </motion.div>
  )
}