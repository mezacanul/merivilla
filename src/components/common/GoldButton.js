import { Button } from "@chakra-ui/react"
import Link from "next/link"

export default function GoldButton({children, w, href, ...props}) {
    return (
        <Button 
            {...(href ? {as: Link, href: href} : "")}
            variant={"link"} 
            color={"white"}
            {...styles.btn}
            w={w}
            {...props}
            fontSize={"lg"}
        >
          {children}
        </Button>
    )
}

const styles = {
    btn: {
        boxShadow: "md", // Predefined shadow size (sm, md, lg, xl, etc.)
        // boxShadow: "6px 10px 8px rgba(0,0,0,0.4)",
        // bgGradient:"linear(-45deg, #EAA315 0%,#644609 100%)",
        bgGradient:"linear(45deg, #9c6a07 0%,#dbb262 100%)",
        borderRadius: "none",
        paddingBottom: "0.3rem",
        transition: "all 0.4s ease-out",
        _hover:{
            textDecor: "none",
            // borderColor:"white",
            transform: "scale(1.04)",
        },
        px: "2rem",
        py: "1rem"
    },
}