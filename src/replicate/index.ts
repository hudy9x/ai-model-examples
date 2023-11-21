import Replicate from "replicate";

const REPLICATE_API_TOPKEN = "r8_QBCBT3WeIf2A66Ap23JmD6PfhcWajDB4aXWPj";

const replicate = new Replicate({
  auth: REPLICATE_API_TOPKEN,
});

export const replicateRun = async () => {
  console.log('running ')
  const output = await replicate.run(
    "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
    {
      input: {
        prompt: `
As an experienced project manager, you are given the following information about a project:

Team members: DaiNh, DongNV, DaoNQ, DuyTQ
Current task list:
Task 1 - DaiNh - 18/11/2023
Task 2 - DongNV - 19/11/2023
Task 4 - DuyTQ - 22/11/2023
Task 5 - DaiNh - 20/11/2023
New task list:
Task 3 - Difficulty 1 - LOW
Task 12 - Difficulty 2 - URGENT
Task 7 - Difficulty 3 - LOW
Task 9 - Difficulty 5 - LOW
Task 11 - Difficulty 4 - HIGH
You are asked to assign the new tasks to the team members based on difficulty and priority. The following requirements must be met:

The workload must be evenly distributed among the team members.
No one member should be assigned too much work.
Higher priority tasks should be completed first.
Tasks with lower difficulty should have shorter deadlines, while tasks with higher difficulty should have longer deadlines.
Deadlines should be set in a reasonable manner, but all new tasks must be completed by 28/11/2023.
The results should be presented in a table with the following columns:

Task number
Task name
Assigned to
Deadline
Priority

The tasks with higher priority should be listed first, followed by the tasks with lower priority. 
The results should include both the current tasks and the new tasks. 
Current tasks with no priority should be assigned a default priority of LOW.

Finally, you are asked to summarize the total workload for each team member. 
This should also be presented in a json array with the following columns: task number, task name, assigned to, Deadline, Priority
`,
        system_prompt: `You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.

If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.`,
      },
    }
  );

  if (Array.isArray(output)) {
    console.log(output.join(""));
  }
};
