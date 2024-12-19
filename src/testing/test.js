// import { Box, Text } from "@chakra-ui/react";
// import dynamic from "next/dynamic";

// const DraggableList = dynamic(() => import("./draggable").then((mod) => mod.DraggableList), { ssr: false });

// export default function Main() {
//   return (
//     <Box w={"100vw"} h={"90vh"} color={"black"} p={"8rem"}>
//         <Text>Test</Text>
//       <DraggableList />
//     </Box>
//   );
// }

'use client'
import React, { useState } from "react";
import dynamic from 'next/dynamic'

// Dynamically import the draggable component
const DraggableList = dynamic(() => import('../../../components/common/DraggableList'), {
    ssr: false // Disable server-side rendering
})

export default function DraggableContent() {
    return <DraggableList />
}