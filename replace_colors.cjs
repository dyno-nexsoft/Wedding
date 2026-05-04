const fs = require('fs');
const path = require('path');

const dir = 'e:/Projects/Wedding/src';

const replacements = [
  { regex: /\[#fdfaf7\]/gi, replacement: 'primary' },
  { regex: /\[#e6d5c3\]/gi, replacement: 'secondary' },
  { regex: /\[#b76e79\]/gi, replacement: 'accent' },
  { regex: /\[#f4a261\]/gi, replacement: 'accent-warm' },
  { regex: /\[#5d4d4a\]/gi, replacement: 'text-main' },
  { regex: /\[#3a2a28\]/gi, replacement: 'text-title' },
  { regex: /\[#2a2a2a\]/gi, replacement: 'text-title' },
  { regex: /\[#4a4a4a\]/gi, replacement: 'text-main' },
  { regex: /#fdfaf7/gi, replacement: 'var(--color-primary)' },
  { regex: /#e6d5c3/gi, replacement: 'var(--color-secondary)' },
  { regex: /#b76e79/gi, replacement: 'var(--color-accent)' },
  { regex: /#f4a261/gi, replacement: 'var(--color-accent-warm)' },
  { regex: /#5d4d4a/gi, replacement: 'var(--color-text-main)' },
  { regex: /#3a2a28/gi, replacement: 'var(--color-text-title)' },
  { regex: /#2a2a2a/gi, replacement: 'var(--color-text-title)' },
  { regex: /#4a4a4a/gi, replacement: 'var(--color-text-main)' }
];

function processDir(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(dir);
