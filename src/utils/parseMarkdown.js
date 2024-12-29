import { v4 as uuidv4 } from "uuid"; // Import the UUID generator

export default function parseMarkdown(markdown) {
    const lines = markdown.split("\n");
    const elements = [];
    let currentText = "";

    lines.forEach((line) => {
        line = line.trim();
        const uuid = uuidv4()

        // Handle headings
        if (line.startsWith("##")) {
            if (currentText) {
                const uuid = uuidv4()
                elements.push({ id: uuid, type: "text", content: currentText.trim() });
                currentText = "";
            }
            elements.push({ id: uuid, type: "heading", content: line.replace(/^##\s*/, "") });
        } 
        // Handle images
        else if (line.startsWith("![") && line.includes("](")) {
            if (currentText) {
                const uuid = uuidv4()
                elements.push({ id: uuid, type: "text", content: currentText.trim() });
                currentText = "";
            }
            const imageUrl = line.match(/\((.*?)\)/)[1];
            elements.push({ id: uuid, type: "image", content: imageUrl });
        } 
        // Handle text (including empty lines)
        else {
            if (line || currentText) {
                const uuid = uuidv4()
                currentText += (line ? line : "\n") + " ";
            }
        }
    });

    // Push any remaining text
    if (currentText) {
        const uuid = uuidv4()
        elements.push({ id: uuid, type: "text", content: currentText.trim() });
    }

    return elements;
}
