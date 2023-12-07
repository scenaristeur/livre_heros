import OpenAI from "openai";

import 'dotenv/config'

//console.log(process.env.OPENAI_API_KEY) 


const openai = new OpenAI(
   // api_key=process.env.OPENAI_API_KEY,
);

let contexte = `En route pour participer au hackathon interplanétaire sur l'Intelligence Artificielle, le Capitaine Burke, pilote du vaisseau spatial de ton équipe s'est retrouvé contraint de se poser en urgence sur la planète Numerai. A la suite de ce malencontreux accident, tu te retrouves sur la planète NumerAi, une terre inexplorée où entité étrange semble avoir pris possession de la planète entière. Ton objectif sera de découvrir les secrets cachés de cette planète afin de permettre à ton équipe de repartir à temps.`

let template = `
Choisissez votre prochaine action parmi les options suivantes :
1. {Option1}
2. {Option2}
3. {Option3}`

// let format = `
// {
//     message: {id: {texte}, prompt_message: {prompt_message}},
//     options: [
//         {id: 1, texte: }
//     ]
// }`

// et respecter le format 
// ${format}

// let format = `
// {
//     text: {{text de la réponse décrivant la situation}},
//     imagePrompt: {{prompt_sd_situation}},
//     options: {
//         option1: {
//             text: {{option1}},
//             imagePrompt: {{prompt_sd_option1}},
//         },
//         option2: {
//             text: {{option2}},
//             imagePrompt: {{prompt_sd_option2}},
//         },
//         option3: {
//             text: {{option3}},
//             imagePrompt: {{prompt_sd_option3}},
//         }
//     }
// }`
// et respecter la structure de cet exemple: 
// ${format}.
//Tu dois également générer un prompt_sd pour "Stable Diffusion" pour illustrer la situation que tu décris et un autre pour chaque option proposée.
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
  `


let system_prompt = `Avec ce contexte : 
${contexte}
et ce template :
${template}
Essaie de plonger ton interlocuteur dans l'ambiance et de l'inviter à faire des choix pertinents parmis les options que tu lui proposeras.
L'histoire doit être motivante, pertinente, aventureuse.
Ta réponse doit être au format JSON structurée de la même manière que ${example}.
`


async function main() {
  const completion = await openai.chat.completions.create({
    //messages: [{ role: "system", content: "Tu es un assistant. Ton rôle est de trouver la meilleure affaire de velo pour homme à moins de 300 € sur Toulouse. Donne moi les liens que je puisse les commander" }],
    messages:[
        {"role": "system", "content": system_prompt},
        // {"role": "user", "content": "Who won the world series in 2020?"},
        // {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        // {"role": "user", "content": "Where was it played?"}
      ],
    model: "gpt-3.5-turbo-1106",
    response_format:{ "type": "json_object" },
  });

  console.log(completion.choices[0]);
  console.log("-------\n", completion, "----------\n")

  let content = JSON.parse(completion.choices[0].message.content)
  console.log(content)
}

main();


