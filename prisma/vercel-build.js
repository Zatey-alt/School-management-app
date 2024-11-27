const { execSync } = require("child_process");

try {
  console.log("Running `prisma generate`...");
  execSync("npx prisma generate", { stdio: "inherit" });
} catch (e) {
  console.error("Failed to run `prisma generate`:", e);
  process.exit(1);
}
