import hexToRgba from "@/utils/hexToRgba";
import { FormLabel, Input, VStack } from "@chakra-ui/react";

export default function BlogEditorInput({ label, placeholder, type, ...props }) {
    return (
        // <FormControl>
        <VStack align={"flex-start"}>
            {label && (
                <FormLabel fontWeight={"bold"} w={"15rem"}>
                    {label}
                </FormLabel>
            )}

            <Input
                {...props}
                borderColor={hexToRgba("#000000", 0.2)}
                borderWidth={"2px"}
                placeholder={placeholder}
                type={type}
                bg={"white"}
                py={"1.5rem"}
            />
        </VStack>
        // </FormControl>
    );
}