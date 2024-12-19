import { useState } from "react";
import { Text, Box, Button, Collapse, HStack } from "@chakra-ui/react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";


export default function Collapsible({ title, children, w, type = "default"}) {
  const [isOpen, setIsOpen] = useState((type == "default") ? false : true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Box w={w}>
      {<Button onClick={toggle} mb={4} bg={"none"} p={"0"} _hover={{bg: "inherit"}}>
        <HStack spacing={"1rem"}>
            {title} 
            <Text>
                {isOpen ? <TiArrowSortedUp/> : <TiArrowSortedDown/>}
            </Text>
        </HStack>
      </Button>}

      <Collapse in={isOpen} animateOpacity>
        <Box py={4}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}