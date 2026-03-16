const fs = require('fs');

const path = 'database/seeders/04_books_seeder.ts';
let content = fs.readFileSync(path, 'utf8');

// Regex to find isbn and coverImageUrl, and replace the coverImageUrl with OpenLibrary ISBN link
// e.g. isbn: "978-0141046303", coverImageUrl: "https://..."
// to match: /isbn:\s*"([^"]+)",\s*coverImageUrl:\s*"[^"]+"/g

content = content.replace(/isbn:\s*"([^"]+)",\s*coverImageUrl:\s*"[^"]+"/g, (match, isbn) => {
    const cleanIsbn = isbn.replace(/-/g, '');
    return `isbn: "${isbn}", coverImageUrl: "https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg"`;
});

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated book seeder cover images!');
