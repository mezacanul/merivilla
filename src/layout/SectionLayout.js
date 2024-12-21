import { Box, Container, Flex, Stack } from "@chakra-ui/react";

export default function SectionLayout({
    children,
    bg,
    color,
    maxW,
    py = "8rem",
    backdrop,
    backdropColor,
    backdropOpacity,
    ...props
}) {

    return (
        <Stack bg={bg} py={py} color={color} position={"relative"} bgSize={"cover"} {...props} align={"center"}>
            {backdrop && (
                <Box w={"100%"} h={"100%"}
                    position={"absolute"} top={0} left={0}
                    bg={backdropColor} opacity={backdropOpacity}
                    bgSize={"cover"} bgPos={"center"}
                />
            )}
            <Box maxW={maxW} zIndex={5} position={"relative"}>
                {children}
            </Box>
        </Stack>
    );
}
