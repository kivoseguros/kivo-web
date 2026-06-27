import { existsSync, readdirSync, statSync } from "fs";
import { join } from "path";

function listDir(dir, depth = 0, maxDepth = 3) {
  if (depth > maxDepth) return;
  if (!existsSync(dir)) return;
  try {
    const entries = readdirSync(dir);
    const indent = '  '.repeat(depth);
    console.log(indent + dir + '/ (' + entries.length + ' entries)');
    for (const e of entries.slice(0, 30)) {
      const full = join(dir, e);
      try {
        const stat = statSync(full);
        if (stat.isDirectory()) {
          listDir(full, depth + 1, maxDepth);
        } else {
          console.log(indent + '  ' + e + ' (' + stat.size + 'b)');
        }
      } catch {}
    }
  } catch (e) {
    console.log('Error listing ' + dir + ': ' + e.message);
  }
}

console.log('[postbuild] cwd:', process.cwd());
console.log('[postbuild] Scanning build output directories...');
listDir('.vercel');
listDir('.output');
listDir('/vercel/output');

// Also check top-level dirs that might be relevant
const topDirs = ['.vercel/output', '.output', 'dist', '.vercel/output/functions'];
for (const d of topDirs) {
  console.log('[postbuild] ' + d + ' exists:', existsSync(d));
}
