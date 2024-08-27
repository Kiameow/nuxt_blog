import fs from 'fs'
import readline from 'readline'
import { fileURLToPath } from 'url'
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, "../content/blogs")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function createNewPost(title) {
    if (!fs.existsSync(targetDir)) {
        console.error(`Target directory ${targetDir} does not exist.`);
        rl.close();
        return;
    }

    let fileName = title.trim().replace(/ /g, '-');
    fileName = fileName.includes(".md") ? fileName : `${fileName}.md`;
    const date = getCurrentDate();
    const frontMatter = `---
title: "${title}"
description: "This description will be used for search results on Google."
date: "${date}"
banner:
    src: "/images/default.jpg"
    alt: "default image"
    caption: ''
categories:
- ""
keywords:
- ""
---`
    try {
        fs.writeFileSync(`${targetDir}/${fileName}`, frontMatter);
        console.log(`New post "${title}" created successfully.`);
        return;
    } catch (error) {
        console.error(error);
        return;
    }
}

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0'); 

    return `${year}-${month}-${day}`;
}

rl.question("Enter the title of the new post: ", (title) => {
    createNewPost(title);
    rl.close();
})

rl.on('close', () => {
    process.exit(0);
});
