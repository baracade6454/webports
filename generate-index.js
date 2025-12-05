// generate-index.js
// Automatically builds index.html listing ALL .html files in this folder

const fs = require("fs");
const path = require("path");

const dir = "."; // scan the repo root

// Read all files in repo
const files = fs.readdirSync(dir);

// Filter for HTML games (skip index.html itself)
const gameFiles = files.filter(f => 
  f.toLowerCase().endsWith(".html") && f.toLowerCase() !== "index.html"
);

// Build HTML list items (URL-encode spaces)
const listItems = gameFiles.map(f => {
  const encoded = encodeURIComponent(f);
  // Use filename without extension as link label
  const label = f.replace(".html", "");
  return `<li><a href="${encoded}">${label}</a></li>`;
}).join("\n");

const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>WebPorts Games</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background: #111;
        color: #fff;
        margin: 0;
        padding: 20px;
    }
    h1 {
        text-align: center;
    }
    ul {
        list-style: none;
        padding: 0;
        max-width: 600px;
        margin: auto;
    }
    li {
        background: #222;
        margin: 10px 0;
        padding: 15px;
        border-radius: 8px;
    }
    a {
        color: #4cc3ff;
        font-size: 18px;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
</style>
</head>
<body>
    <h1>WebPorts Games</h1>
    <ul>
        ${listItems}
    </ul>
</body>
</html>
`;

// Write to index.html
fs.writeFileSync("index.html", html);

console.log("index.html created with", gameFiles.length, "games.");
