export default function getMarkdown(data, save = false, fileStorage = false) {
    let markdown = "";
    // console.log(data);
    // console.log("Function: getMarkdown");
    // console.log(fileStorage);

    data.forEach((block) => {
        if (block.content != "") {
            switch (block.type) {
                case "heading":
                    markdown += `\n## ${block.content}\n`;
                    break;
                case "text":
                    markdown += `\n${block.content}\n`;
                    break;
                case "image":
                    if (save == true) {
                        // console.log(fileStorage[block.id]);

                        let newUrl = fileStorage[block.id].signedUrl;
                        // let newUrl = "plc";
                        // console.log("FROM switch case(image):", newUrl);
                        markdown += `\n![Title](${newUrl})\n`;
                    } else {
                        markdown += `\n![Title](${block.content})\n`;
                    }
                    break;
                case "link":
                    markdown += `[${block.title}](${block.content})`;
                    break;
                default:
                    break;
            }
        }
        // console.log(block);
    });
    // console.log(markdown);

    return markdown;
}