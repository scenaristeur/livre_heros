import OpenAI from "openai";


const openai = new OpenAI(
  {
    baseURL: "http://127.0.0.1:5678/v1",//"http://localhost:11434",
 // openai_api_base:"http://127.0.0.1:5678", 
  model:"embedding-model-name",
  apiKey : "zer"}
);



async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "Tu es un assistant. Ton rôle est de trouver la meilleure affaire de velo pour homme à moins de 300 € sur Toulouse. Donne moi les liens que je puisse les commander" }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();

