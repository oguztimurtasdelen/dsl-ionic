#!/usr/bin/env node
/**
 * Usage: npm run page <feature-name> <page-name>
 *
 * Example: npm run page "User Management" "User List"
 * This will create a feature named "User Management" under the modules folder if it doesn't exist, and then create a new page named "user-list" under that feature with component files such as component.ts, component.html, component.scss and component.spec.ts.
 */
const { execSync } = require("child_process");
const fs = require("fs");

const feature = process.argv[2]
  ?.toLowerCase()
  .trim()
  .replace(/\s+/g, "-");

const page = process.argv[3]
  ?.toLowerCase()
  .trim()
  .replace(/\s+/g, "-");

if (!feature || !page) {
  console.error("Usage: npm run page <feature> <page>");
  process.exit(1);
}

const featurePath = `src/app/modules/${feature}`;
const pageBase = `modules/${feature}/pages/${page}`;

try {
  // If feature doesn't exist, create it
  if (!fs.existsSync(featurePath)) {
    console.log(`Feature '${feature}' not found. Creating it first...`);

    execSync(`node scripts/devTools/feature.js ${feature}`, {
      stdio: "inherit",
    });
  }

  console.log(`Creating page '${page}' under '${feature}'`);

  execSync(`ng g component ${pageBase} --standalone`, {
    stdio: "inherit",
  });

  console.log("Page created");
} catch {
  console.error("Generation failed");
  process.exit(1);
}
