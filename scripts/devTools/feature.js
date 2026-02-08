#!/usr/bin/env node

const { execSync } = require("child_process");

const feature = process.argv[2]
  ?.toLowerCase()
  .trim()
  .replace(/\s+/g, "-");

if (!feature) {
  console.error("Feature name required");
  process.exit(1);
}

const base = `modules/${feature}`;

try {
  console.log(`Creating feature: ${feature}`);

  execSync(`ng g service ${base}/${feature}`, { stdio: "inherit" });
  execSync(`ng g interface ${base}/${feature}.model`, { stdio: "inherit" });

  console.log("Feature created");
} catch {
  console.error("Generation failed");
  process.exit(1);
}
