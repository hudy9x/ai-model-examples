import { replicateRun } from "./replicate";
import { replicateStreamOutput } from "./replicate/streamOutput";

(async () => {
  await replicateStreamOutput();
})();
