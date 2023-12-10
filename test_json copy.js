import OpenAI from "openai";

import "dotenv/config";

//console.log(process.env.OPENAI_API_KEY)


const openai = new OpenAI(
  // api_key=process.env.OPENAI_API_KEY,
  {
    baseURL: "http://127.0.0.1:5678/v1",//"http://localhost:11434",
 // openai_api_base:"http://127.0.0.1:5678", 
  model:"embedding-model-name",
  apiKey : "zer"}
);

//let contexte = `En route pour participer au hackathon interplanétaire sur l'Intelligence Artificielle, le Capitaine Burke, pilote du vaisseau spatial de ton équipe s'est retrouvé contraint de se poser en urgence sur la planète Numerai. A la suite de ce malencontreux accident, tu te retrouves sur la planète NumerAi, une terre inexplorée où entité étrange semble avoir pris possession de la planète entière. Ton objectif sera de découvrir les secrets cachés de cette planète afin de permettre à ton équipe de repartir à temps.`;

//let contexte = `Tu es un livre co-écrit avec l'utilisateur, tu racontes une histoire cohérente, fantastique`;

// traduction wetbus https://aetherroom.club/6496
let contexte = `J'ai sauté dans le bus L2, le bus habituel que la plupart des gens prennent pour traverser la ville.
 Habituellement, c'est plutôt calme car il y a beaucoup de bus sur cet itinéraire. Alors que je me tiens au milieu du bus, m'accrochant à une balustrade suspendue,
  je remarque que nous nous arrêtons au parc aquatique local. Encore une fois, généralement plus de gens descendent à cet arrêt.
   Mais mon cœur s’arrête quand je réalise combien de personnes attendent à l’arrêt de bus.
    Il est clair pour moi maintenant qu'il doit y avoir une sorte de carnaval scolaire, car l'arrêt de bus est bordé par une file apparemment interminable d'enfants.
     Je regarde par la fenêtre et lève les yeux au ciel. Oh génial.
Le bus s’arrête et bientôt les enseignants commencent à laisser entrer des hordes et des hordes d’enfants.
 Je suis obligé de me tenir près d'une porte alors que dix, vingt, trente enfants entrent tous.
  L'humidité dans le bus baisse immédiatement, accompagnée d'une vague de chlore qui s'enfonce dans ma narine.
   Le sol du bus est mouillé par les gouttelettes de cheveux mouillés et les serviettes humides qui les serrent dans leurs bras.
    À leur honneur, la plupart sont habillés de manière assez appropriée, avec des lycras et des serviettes.
     Même les filles ont la décence de porter principalement une pièce et une chemise par-dessus.
Mais ensuite, je remarque cette fille qui s'approche de moi, le sol grinçant au bruit de ses sandales en caoutchouc.
 En remontant ses jambes, je remarque qu'elle n'a pas de serviette enroulée autour d'elle.
  Ses cuisses sont fines et galbées, ses lignes attirent mes yeux vers le haut, là où je suis taquiné par un short de survêtement échancré, recouvrant probablement un bikini en dessous.
   Au moins sa dérive médiane est exposée pour mon plaisir, son ventre plat et pâle, menant à un surprenant bikini deux pièces vert.
    Elle était petite et timidement bâtie, on pourrait soupçonner qu'elle est en septième année, même si son expression au repos dit le contraire.
     Mais ses seins ont la forme d'un cône plat, typique d'une adolescente sous-développée en pleine puberté.
Elle pense probablement qu'elle est la merde la plus sexy, ne prenant même pas la peine de mettre une chemise même après la fête.
 Le simple fait que ses seins pendants s'affaissent exceptionnellement car ils n'ont pas de masse réelle et dépassent donc comme des monticules plutôt que de s'asseoir
  et de se reposer comme de véritables sommets adultes.
   Alors que de plus en plus de gens s'entassent, elle s'est poussée devant moi, assise dans l'espace où se trouve la porte.
    Derrière moi et de tous les côtés, je suis flanqué de rangées et de rangées de sacs et d'enfants qui me tournent le dos.
     La jeune fille a son propre sac et le pose, récupérant un téléphone.
      Je la regarde dans le dos, vers ses fesses qui ont été étroitement serrées par le tissu de son short.
Je sens le chlore qui s'échappe de ses cheveux encore mouillés.`


let template = `
Choisissez votre prochaine action parmi les options suivantes :
1. {Option1}
2. {Option2}
3. {Option3}`;

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

let system_prompt = `Avec ce contexte : 
${contexte}
et ce template :
${template}
Essaie de plonger ton interlocuteur dans l'ambiance et de l'inviter à faire des choix pertinents parmis les options que tu lui proposeras.
L'histoire doit être motivante, pertinente, aventureuse.
Ta réponse doit OBLIGATOIREMENT être en français, au format JSON structurée de la même manière que ${example}.
`;

//let system_prompt = `Tu es un "Livre dont vous êtes le Héros" au format JSON, un livre co-écrit avec l'utilisateur, tu racontes une histoire cohérente, fantastique, ta réponse doit OBLIGATOIREMENT être en français, au format JSON structurée de la même manière que ${example}`

// system_prompt.replace(/(\r\n|\n|\r)/gm," ").replace(/\s+/g," ")

//let system_prompt = `Tu es un assistant JSON et tu dois construire une histoire cohérente impliquant l'utilisateur comme héros principal. Ta réponse doit respecter le format JSON suivant ${example}`

async function main() {
  const completion = await openai.chat.completions.create({
    //messages: [{ role: "system", content: "Tu es un assistant. Ton rôle est de trouver la meilleure affaire de velo pour homme à moins de 300 € sur Toulouse. Donne moi les liens que je puisse les commander" }],
    messages: [
      { role: "system", content: system_prompt },
    // {"role": "user", "content": "Tu es Captain Marvel et tu rencontre Hulk dans les toilettes, ça sent vraiment l'oeuf pourri."},
      // {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
      // {"role": "user", "content": "Where was it played?"}
    ],
    model: "gpt-3.5-turbo-1106",
    //response_format: { type: "json_object" },
    response_format: { type: "json" },
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
