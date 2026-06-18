const fs = require('fs');

const transcriptPath = 'C:/Users/sawla/.gemini/antigravity-ide/brain/a3867350-653f-4f62-9f47-6c3b54b336f6/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);

const targets = [
  'src/components/loading/LoadingExperience.tsx',
  'src/components/three/ParticleField.tsx',
  'src/components/three/shaders/particles.vert',
  'src/components/three/shaders/particles.frag',
  'src/lib/utils.ts'
];

const found = new Set();

// Iterate forward from the start to find the FIRST write_to_file for these files
for (let line of lines) {
  try {
    const p = JSON.parse(line);
    if (p.tool_calls) {
      for (let t of p.tool_calls) {
        if (t.name === 'write_to_file') {
          const file = t.args.TargetFile.replace(/"/g, ''); // cleanup any quotes
          
          for (let tgt of targets) {
            // Check if file path ends with target
            if (file.replace(/\\/g, '/').endsWith(tgt) && !found.has(tgt)) {
              console.log('Restoring', tgt);
              // Ensure directory exists
              fs.mkdirSync(require('path').dirname(file), { recursive: true });
              fs.writeFileSync(file, t.args.CodeContent);
              found.add(tgt);
            }
          }
        }
      }
    }
  } catch (e) {
    // Ignore JSON parse errors on truncated lines
  }
}

console.log('Restored: ', Array.from(found));
