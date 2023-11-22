import "dotenv/config";
import { replicateRun } from "./replicate";
import { replicateStreamOutput } from "./replicate/streamOutput";
import { runOpenAI } from "./openai";

(async () => {
  console.log("run");
  await runOpenAI();
  // await replicateStreamOutput();
})();
