
const fs = require('fs');
const path = require('path');
const fsp = require('fs').promises;


function readJsonSync(filePath) {
    // implementation missing
    try {
        const absolutePath = path.resolve(filePath);
        const fileContent = fs.readFileSync(absolutePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading or parsing JSON file at ${filePath}:`, error);
        throw error;
    }
}

function appendToFileSync(filePath, text) {
    // implementation missing
    try {
        const absolutePath = path.resolve(filePath);

        // ตรวจสอบว่าไฟล์มีเนื้อหาอยู่แล้วหรือไม่
        const existingContent = fs.existsSync(absolutePath)
            ? fs.readFileSync(absolutePath, 'utf-8')
            : '';

        // เพิ่มข้อความพร้อมบรรทัดใหม่
        const updatedContent = existingContent
            ? `${existingContent}\n${text}`
            : text;

        // เขียนกลับไปที่ไฟล์
        fs.writeFileSync(absolutePath, updatedContent, 'utf-8');
    } catch (error) {
        console.error(`Error appending to file at ${filePath}:`, error);
        throw error;
    }
}

async function readJsonAsync(filePath) {
    try {
        const absolutePath = path.resolve(filePath);
        const fileContent = await fsp.readFile(absolutePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
            throw error; // โยนข้อผิดพลาดต่อเพื่อให้เทสต์จับได้
    }
}

function listDirectoryRecursiveSync(filepath) {
    // implementation missing
    const absolutePath = path.resolve(filepath);
    let results = [];

    try {
        const entries = fs.readdirSync(absolutePath, { withFileTypes: true });

        entries.forEach((entry) => {
            const fullPath = path.join(absolutePath, entry.name);
            const relativePath = path.relative(process.cwd(), fullPath);

            if (entry.isDirectory()) {
                // Recursively get children for directories
                const children = listDirectoryRecursiveSync(fullPath);
                results.push({
                    type: 'directory',
                    path: `./${relativePath}`,
                    children: children,
                });
            } else {
                // Add file to results
                results.push({
                    type: 'file',
                    path: `./${relativePath}`,
                });
            }
        });
    } catch (error) {
        console.error(`Error reading directory at ${dirPath}:`, error);
        throw error;
    }

    return results;
}

module.exports = {
    readJsonSync,
    appendToFileSync,
    readJsonAsync,
    listDirectoryRecursiveSync,
};
