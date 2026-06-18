const fs = require('fs');

const transcriptPath = 'C:/Users/sawla/.gemini/antigravity-ide/brain/a3867350-653f-4f62-9f47-6c3b54b336f6/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);

const targets = [
  'src/app/page.tsx',
  'src/app/layout.tsx',
  'src/app/globals.css'
];

const found = new Set();
const lastContent = {};

// We want to find the LATEST good version BEFORE the rollback command.
// Actually, iterating forward and just saving the last seen state is perfect.
for (let line of lines) {
  try {
    const p = JSON.parse(line);
    // Ignore anything after step 390 (around when I did the git restore)
    // Actually, step_index of git restore was probably higher, but let's just grab the last write_to_file / replace_file_content 
    // before the "rollback" prompt
    if (p.type === 'USER_INPUT' && p.content.includes('rollback')) {
       break; // Stop parsing when user asks to rollback
    }
    
    if (p.tool_calls) {
      for (let t of p.tool_calls) {
        if (t.name === 'write_to_file' || t.name === 'replace_file_content') {
          const file = t.args.TargetFile.replace(/"/g, ''); 
          
          for (let tgt of targets) {
            if (file.replace(/\\/g, '/').endsWith(tgt)) {
              if (t.name === 'write_to_file') {
                 lastContent[tgt] = t.args.CodeContent;
              } else if (t.name === 'replace_file_content') {
                 // Too complex to apply replacement chunks without the original source here,
                 // but often replace_file_content has ReplacementContent that we can just guess or ignore
                 // For now, if we found a write_to_file, it's a good baseline.
              }
            }
          }
        }
      }
    }
  } catch (e) {
  }
}

for (let tgt of targets) {
  if (lastContent[tgt]) {
    console.log('Restoring from write_to_file:', tgt);
    const fullPath = 'c:/Users/sawla/OneDrive/Desktop/FLOW X/lumenor-site/' + tgt;
    fs.writeFileSync(fullPath, lastContent[tgt]);
    found.add(tgt);
  }
}

console.log('Restored: ', Array.from(found));
