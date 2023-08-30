async function deploy() {
  try {
    const { stdout: output1 } = await execPromise("npm install");
    console.log("Installing dependencies...");
    console.log(output1);

    const { stdout: output2 } = await execPromise("npm run db:migrate");
    console.log("Migrating database...");
    console.log(output2);

    const { stdout: output3 } = await execPromise("npm run db:seed");
    console.log("Seeding database...");
    console.log(output3);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

deploy();