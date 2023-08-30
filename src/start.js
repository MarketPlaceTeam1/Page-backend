import { promisify } from "util";
import { exec } from "child_process";  // Importar directamente de child_process
const execPromise = promisify(exec);

async function deploy() {
  try {
    const { stdout: output1 } = await execPromise("yarn install");
    console.log("Installing dependencies...");
    console.log(output1);

    const { stdout: output2 } = await execPromise("yarn db:migrate");
    console.log("Migrating database...");
    console.log(output2);

    const { stdout: output3 } = await execPromise("yarn db:seed");
    console.log("Seeding database...");
    console.log(output3);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

deploy();

deploy();