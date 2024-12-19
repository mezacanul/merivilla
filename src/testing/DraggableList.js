import React from "react";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import {
    restrictToHorizontalAxis,
    restrictToParentElement,
} from "@dnd-kit/modifiers";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, VStack, Text, IconButton, Button, Flex } from "@chakra-ui/react";
import { DragHandleIcon, CloseIcon } from "@chakra-ui/icons";

export default function DraggableList() {
    const [items, setItems] = React.useState(["Tarea 1", "Tarea 2", "Tarea 3"]);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        if (active.id !== over.id) {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            setItems(arrayMove(items, oldIndex, newIndex));
        }
    };

    const handleAddItem = () => {
        const newItem = `Tarea ${items.length + 1}`;
        setItems((prevItems) => [...prevItems, newItem]);
    };

    const handleRemoveItem = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item !== id));
    };

    return (
        <Box p={4} maxW="400px" mx="auto">
            <Button onClick={handleAddItem} colorScheme="blue" mb={4}>
                Add Item
            </Button>
            <DndContext
                sensors={sensors}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
                accessibility={{
                    announcements: false, // Disable accessibility announcements
                    screenReaderInstructions: { draggable: "" }, // Remove default instructions
                }}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    <VStack spacing={4} align="stretch">
                        {items.map((item) => (
                            <SortableItem
                                key={item}
                                id={item}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </VStack>
                </SortableContext>
            </DndContext>
        </Box>
    );
}


const SortableItem = ({ id, onRemove }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Flex
            ref={setNodeRef}
            {...attributes}
            style={style}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            rounded="md"
            shadow="sm"
            p={2}
            mb={2}
            alignItems="center"
            _hover={{ bg: "gray.50" }}
        >
            <IconButton
                {...listeners}
                icon={<DragHandleIcon />}
                aria-label="Drag handle"
                size="sm"
                variant="ghost"
                mr={2}
            />
            <Text flex="1">{id}</Text>
            <IconButton
                icon={<CloseIcon />}
                aria-label="Remove item"
                size="sm"
                colorScheme="red"
                onClick={() => onRemove(id)}
            />
        </Flex>
    );
};