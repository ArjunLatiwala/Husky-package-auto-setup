#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectRoot = process.env.INIT_CWD || process.cwd();

try {
  console.log("Setting up Husky (v9)...");

  if (!fs.existsSync(path.join(projectRoot, ".git"))) {
    console.log("Git not initialized. Run 'git init' first.");
    process.exit(1);
  }

  if (fs.existsSync(path.join(projectRoot, ".husky"))) {
    console.log("Husky already initialized. Skipping.");
    process.exit(0);
  }

  execSync("npm install husky --save-dev", {
    stdio: "inherit",
    cwd: projectRoot,
  });
  execSync("npx husky init", { stdio: "inherit", cwd: projectRoot });

  console.log("Husky installed successfully!");
} catch (err) {
  console.error("Error:", err.message);
}
