// simple-migrate.js
import fs from 'fs';
import path from 'path';

// Configuration - adjust these to match your project
const SOURCE_DIR = '../../src/routes/docs';  // Directory containing your markdown files
const TARGET_DIR = '../../src/routes/docs';  // Where to create the new folders

// Create target directory if it doesn't exist
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Get all files in the source directory
const files = fs.readdirSync(SOURCE_DIR);

// Process each file
files.forEach(filename => {
  // Skip non-markdown files
  if (!filename.endsWith('.md')) return;
  
  const sourcePath = path.join(SOURCE_DIR, filename);
  
  // Get the file content
  const content = fs.readFileSync(sourcePath, 'utf8');
  
  // Create folder name (remove .md extension)
  const folderName = filename.replace(/\.md$/, '');
  
  // Skip README.md or handle it specially if needed
  if (folderName === 'README') {
    // You might want to create this as the index page
    // For now we'll just skip it
    console.log(`Skipping README.md`);
    return;
  }
  
  // Create the target folder
  const targetFolder = path.join(TARGET_DIR, folderName);
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }
  
  // Write the +page.md file
  const targetPath = path.join(targetFolder, '+page.md');
  fs.writeFileSync(targetPath, content);
  
  console.log(`Migrated: ${filename} → ${folderName}/+page.md`);
});

console.log('Migration completed!');