import { Button } from "@chakra-ui/react"

export default function GoldButton({children, w}) {
    return (
        <Button 
          variant={"link"} 
          color={"white"}
          {...styles.btn}
          w={w}
        >
          {children}
        </Button>
    )
}

const styles = {
    btn: {
        // background: "rgba(188, 160, 0, 1)",
        // bgGradient:"linear(to-r, #EAA315, #745009)",
        boxShadow: "md", // Predefined shadow size (sm, md, lg, xl, etc.)
        boxShadow: "6px 10px 8px rgba(0,0,0,0.4)",
        // border:"2px",
        // borderColor:"transparent",
        bgGradient:"linear(45deg, #EAA315 0%,#644609 100%)",
        borderRadius: "none",
        paddingBottom: "0.3rem",
        _hover:{
            textDecor: "none",
            // borderColor:"white",
            transform: "scale(1.03)",
        },
        px: 4,
        py: 3
    },
}