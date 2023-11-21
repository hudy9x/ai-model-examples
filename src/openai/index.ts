import { OpenAI } from "openai";
const OPENAI_API_KEY = "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"

const openai = new OpenAI(
  {
    apiKey: OPENAI_API_KEY
  }
)

export const runOpenAI = async () => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo"
  })

  console.log((completion.choices[0]))
}



