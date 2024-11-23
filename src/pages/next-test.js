import { useState } from "react"
import { Heading, Button } from "@chakra-ui/react"

export default function NextTest() {
    const [ title, setTitle ] = useState("Hello Next JS!")
  
    function changeTitle() {
      let strings = [
        "Hello World!",
        "Hello Next JS!"
      ]
  
      if(title == strings[0]) {
        setTitle(strings[1])
      } else {
        setTitle(strings[0])
      }
    }
  
    return (
      <>
        <Heading size={"lg"} mb={4}>{title}</Heading>
        <Button 
          onClick={changeTitle} 
          size={"sm"}
          colorScheme={"gray"}
          variant={"solid"}
        >
            Click me
        </Button>
      </>
    )
  }