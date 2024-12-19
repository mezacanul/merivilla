// "use client";
import React, { useEffect, useState } from "react";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    TouchSensor,
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button, Box, Text } from "@chakra-ui/react";
import {
    restrictToVerticalAxis,
    restrictToParentElement,
} from "@dnd-kit/modifiers";

export default function DragArea({ data, handleDragEnd, children }) {
    // Manage mounted state to deal with SSR from Next.js
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Asssign and configure sensors 
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor)
    );

    if (!isMounted) return null;

    return (
        <Box color={"black"} p={"4"} w={"100%"}>
            <DndContext
                sensors={sensors}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext
                    items={data}
                    strategy={verticalListSortingStrategy}
                >
                    {children}
                    {/* {data.map((id) => (
                        <DraggableItem key={id} id={id} />
                    ))} */}
                </SortableContext>
            </DndContext>
        </Box>
    );
}

// function DraggableItem({ id }) {
//     const { attributes, listeners, setNodeRef, transform, transition } =
//         useSortable({ id });

//     const style = {
//         transform: transform
//             ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
//             : undefined,
//         transition,
//     };

//     return (
//         <Box
//             ref={setNodeRef}
//             p={4}
//             bg="white"
//             mb={2}
//             border="1px solid gray"
//             style={style}
//             _hover={{ bg: "gray.50" }}
//             display="flex"
//             alignItems="center"
//             gap={4}
//         >
//             <Button {...attributes} {...listeners} size="sm" cursor="grab">
//                 ⋮⋮
//             </Button>
//             {id}
//         </Box>
//     );
// }
