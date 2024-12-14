import { Box } from "@chakra-ui/react";

export default function Overlay({ color, opacity = 0.7 }) {
    return (
        <Box
            position={"absolute"}
            width="100%"
            height="100%"
            top="0"
            left="0"
            background={color}
            opacity={opacity}
        />
    );
}
