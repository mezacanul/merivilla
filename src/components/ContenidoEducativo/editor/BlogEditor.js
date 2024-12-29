import DragArea from "@/components/common/DragArea";
import DraggableItem from "@/components/common/DraggableItem";
import { updateBlocks } from "@/store/slices/blocksSlice";
import hexToRgba from "@/utils/hexToRgba";
import { Text, VStack } from "@chakra-ui/react";
import { arrayMove } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import DragBlock from "./DragBlock";

export default function BlogEditor({fileStorage}) {
    // const [blocks, setBlocks] = useState(data);

    const dispatch = useDispatch();
    const blocks = useSelector((state) => state.blocks);

    // Handle elements sorting with "arrayMove"
    function handleDragEnd(event) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = blocks.findIndex(
                (block) => block.id === active.id
            );
            const newIndex = blocks.findIndex((block) => block.id === over.id);
            dispatch(updateBlocks(arrayMove(blocks, oldIndex, newIndex)));
        }
    }

    return (
        <VStack
            w={"100%"}
            p={"2rem"}
            pb={"10rem"}
            my={"1rem"}
            align={"flex-start"}
            border={`4px dashed ${hexToRgba("#000000", 0.2)}`}
        >
            <Text fontWeight={"bold"} size={"lg"}>
                Document
            </Text>

            {/* Draggable Area  */}
            <DraggableItems>
                <DragArea data={blocks} handleDragEnd={handleDragEnd}>
                    {/* Draggable Blocks  */}
                    {blocks.map((block) => {
                        return (
                            <DraggableItem
                                key={block.id}
                                id={block.id}
                                my={"2rem"}
                            >
                                <DragBlock type={block.type} id={block.id} fileStorage={fileStorage}/>
                                {/* <Button>Drag</Button>
                                {block.type}
                                <Input type="text"/> */}
                            </DraggableItem>
                        );
                    })}

                    {/* <DragBlock type={"heading"} />
                    <DragBlock type={"text"} />
                    <DragBlock type={"image"} /> */}
                </DragArea>
            </DraggableItems>
        </VStack>
    );
}

function DraggableItems({ children }) {
    return (
        <VStack w={"100%"} my={"1rem"} spacing={"2rem"}>
            {children}
        </VStack>
    );
}