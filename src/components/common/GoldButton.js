import { Button } from "@chakra-ui/react"
import Link from "next/link"

export default function GoldButton({children, w, href, variant = "solid", ...props}) {
    return (
        <Button
            {...(href ? {as: Link, href: href} : "")}
            variant={"link"} 
            color={"white"}
            {...styles.btn}
            w={w}
            {...props}
            fontSize={{md: "md", xl: "lg"}}
            bgGradient={variant == "solid" ? "linear(45deg, #9c6a07 0%,#dbb262 100%)" : "none"}
            border={variant == "outline" ? "3px solid #dbb262" : ""}
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
        borderRadius: "none",
        paddingBottom: "0.3rem",
        transition: "all 0.4s ease-out",
        _hover:{
            textDecor: "none",
            // borderColor:"white",
            transform: "scale(1.04)",
        },
        px: {base: "1.2rem", xl: "2rem"},
        py: {base: "0.8rem", xl: "1rem"}
    },
}