import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const toCsv = (text: string) => {
  return "```csv " + text + " ```";
};

export const runOpenAI = async () => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
Act as a software project manager 
Based on the following tasklist and members that provide by user 
Make sure that every members should be assigned to appropriate workloads
`,
      },
      {
        role: "user",
        content: `
And the deadline for all of task are before or in 30/11/2023 
So please help me to allocate the following task to every single members
Here is the task list
${toCsv(`
No,Title,Assignee,Priority
1,cong viec 1,NG,LOW
2,cong viec 2,NG,LOW
3,cong viec 3,NG,LOW
4,cong viec 4,NG,LOW
5,cong viec 5,NG,LOW
6,cong viec 6,Hữu Đại,LOW
`)}
And here is the member list
${toCsv(`
No,Name
1,Hữu Đại
2,huy
3,Trần Quang Duy
4,Mayad Ahmed
5,Nguyen Huu Van
6,Hudy
`)}
The output should be an csv format as follow and nothing else. Ex:
${toCsv(`
No,Title,Assignee,Duedate,Priority 
1,cong viec 2, Huudai,24/11/2023, LOW 
2,cong viec 3, huy,25/11/2023,LOW 
`)}

`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
};
