// 20 concurrent sandboxes
// 1h session length
// 10GB disk per sandbox
// 8 vCPU max
// 8GB RAM max

import { Sandbox } from "e2b";
// import "dotenv/config";

const url = process.env.URL;
const apiKey = process.env.E2B_API_KEY;
const sandboxCount = 20;

for (let i = 0; i < sandboxCount; i++) {
  try {
    const sandbox = await Sandbox.create("desktop", {
      apiKey: apiKey,
      timeoutMs: 60 * 60 * 1000, // 1 hour session length
    });

    const result = await sandbox.commands.run(`
    google-chrome \
    --headless \
    --no-sandbox \
    --disable-gpu \
    --disable-dev-shm-usage \
    --disable-background-networking \
    --disable-default-apps \
    --disable-sync \
    --user-data-dir=/tmp/chrome-profile \
    '${url}' \
    >/tmp/chrome.log 2>&1 &
  `);

    console.log(result.stdout);
    console.log(`Success - ${i + 1}`);
  } catch (e) {
    console.log(`Error - ${i + 1}`);
  }
}
