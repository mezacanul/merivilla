import { Box, Flex, Button, Input } from "@chakra-ui/react";
import DragArea from "../../../components/common/DragArea"
import { useState } from "react";
import { arrayMove, useSortable } from "@dnd-kit/sortable";
import DraggableItem from "../../../components/common/DraggableItem"

const data = [
    { id: 1, type: "heading"},
    { id: 2, type: "text"},
    { id: 3, type: "image"},
];

export default function Test() {
    const [blocks, setBlocks] = useState(data);

    // Handle elements sorting with "arrayMove"
    function handleDragEnd(event) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = blocks.findIndex(block => block.id === active.id);
            const newIndex = blocks.findIndex(block => block.id === over.id);
            setBlocks(arrayMove(blocks, oldIndex, newIndex));
        }
    }

    return (
        <Flex w={"100vw"} h={"85vh"} color={"black"} align={"center"} justify={"center"}>
            <Box border={"1px solid black"} w={"40rem"} h={"auto"} >
                
                <DragArea data={blocks} handleDragEnd={handleDragEnd}>
                    
                    
                    {blocks.map((block) => {
                        return (
                            <DraggableItem key={block.id} id={block.id}>
                                {/* <Button>Drag</Button>
                                {block.type}
                                <Input type="text"/> */}
                            </DraggableItem>
                        )
                    })}

                </DragArea>

            </Box>
        </Flex>
    )
}