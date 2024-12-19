import { Box, Button } from "@chakra-ui/react"
import { useSortable } from "@dnd-kit/sortable"

export default function DraggableItem({ id, my, children }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    // const { attributes, setNodeRef, transform, transition } =
    //     useSortable({ id });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        transition,
    };

    return (
        <Box
            ref={setNodeRef}
            style={style}
            _hover={{ transform: "scale(1.01)", zIndex: 2 }}
            transition={"all 0.2s"}
            {...attributes}
            {...listeners}
            my={my}
            // p={4}
            // bg="white"
            // mb={2}
            // border="1px solid gray"
            // display="flex"
            // alignItems="center"
            // gap={4}
        >
            {children}
            {/* <Button {...listeners} size="sm" cursor="grab">
                ⋮⋮
            </Button>
            {id} */}
        </Box>
    );
}
