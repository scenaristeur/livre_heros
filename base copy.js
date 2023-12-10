import OpenAI from "openai";

import "dotenv/config";

//console.log(process.env.OPENAI_API_KEY)
// https://platform.openai.com/docs/guides/text-generation/chat-completions-api


const openai = new OpenAI(
  // api_key=process.env.OPENAI_API_KEY,
  {
    baseURL: "http://127.0.0.1:5678/v1",//"http://localhost:11434",
 // openai_api_base:"http://127.0.0.1:5678", 
  model:"embedding-model-name",
  apiKey : "zer"}
);

let example = `{
  message: "{message}",
  options: [
    {
      Option1: "{option1}"
    },
    {
      Option2: "{option2}"
    },
    {
      Option3: "{option3}"
    }
  ]
}
`;

let conditionnement = `You are a helpful assistant. You response should be in JSON format according to this template : 
-----------
${example}
-----------`
// reponse au bon format avec aphrodite/jebcarter/psyonic-cetacean-20B

let messages=[
  {"role": "system", "content": conditionnement},
  {"role": "user", "content": "Who won the world series in 2020?"},
  {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
  {"role": "user", "content": "Where was it played?"}
]

console.log(messages)
async function main() {
  const completion = await openai.chat.completions.create({
    //messages: [{ role: "system", content: "Tu es un assistant. Ton rôle est de trouver la meilleure affaire de velo pour homme à moins de 300 € sur Toulouse. Donne moi les liens que je puisse les commander" }],
   messages: messages,
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
  });

  console.log(completion.choices[0]);
  console.log("-------\n", completion, "----------\n");

  try{
    let content = JSON.parse(completion.choices[0].message.content);
    console.log(content);
  }catch(e){
    console.log("n'est pas au format json")
  }

}

main();
