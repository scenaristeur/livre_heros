import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  baseURL: "http://127.0.0.1:5678/v1",
  model: "embedding-model-name",
  apiKey: "see https://github.com/scenaristeur/openai2horde",
});

const langue = "français";

//const story_contexte = "L'histoire se passe dans un château.";

// https://aetherroom.club/6493
// const story_contexte = `M'attachant au siège du pilote de mon fidèle robot, j'attrape les joysticks horizontaux de chaque taille de moi et les systèmes informatiques du DX-7 Avenger s'allument, tandis que les différents systèmes entrent en action.

// Tout est prêt. Je teste le mécanisme tournant dans le cockpit sphérique, et il est stable. La console de communication affiche l'ordre de mise en veille et de préparation au lancement.
// Trois autres robots me rejoignent dans la baie de lancement, un GA-22 Defender de la Fédération, un modèle plus ancien mais fidèle et fiable, je devrais pouvoir faire confiance au pilote, la plupart ne sont que des gens ordinaires essayant de protéger leur maison. Deuxièmement, un collègue mercenaire, dans un DX-7 Avenger comme moi. Du bon goût chez les mechs, au moins. Mais tous les mercenaires ne sont pas fidèles à leur client, il faudra se méfier de celui-ci. J'aime penser que je suis légèrement au-dessus de ce niveau de saleté. J'espère.
// Et troisièmement, à ma grande surprise, un Pyshock UU-993. Un humain amélioré, tout simplement génial. Juste ma chance. Les humains ont subi des expérimentations cérébrales, leur conférant un pouvoir psionique, mais aussi de graves sautes d'humeur et des émotions extrêmes. J'espère que le pilote qu'il contient est plus stable que peu importe. Le Psyshock porte les insignes de la One Earth Society. Même sans expérimentation humaine, ces gars sont fous. Des fanatiques religieux dotés d'un pouvoir à la fois politique et financier, s'occupant de ceux qui sont nés dans l'espace, n'ont pas d'âme, accordée uniquement par la Terre Mère au peuple élu né sur la terre sainte de la planète.
// "Bonjour, mon indicatif est Wolf. J'ai hâte de travailler avec vous tous, je vous soutiendrai, s'il vous plaît, ayez le mien." Dis-je, étant donné le silence gênant. Ensuite, mon système d’enceintes reçoit trois connexions.
// La porte de la baie d'atterrissage s'ouvre, j'engage les propulseurs de mon Avenger, et les autres me suivent. Les forces de l'Alliance Stellar utilisent une ceinture d'astéroïdes pour masquer leurs forces, nous devrons y manœuvrer avec précaution et éviter tous leurs robots AN-93 Enforcer qui pourraient tenter de nous tendre une embuscade.`;

let story_contexte = `J'ai sauté dans le bus L2, le bus habituel que la plupart des gens prennent pour traverser la ville.
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
Je sens le chlore qui s'échappe de ses cheveux encore mouillés.`;

// const format = `{ message: "{message}",
//   options: [
//     {
//       Option1: "{option1}"
//     },
//     {
//       Option2: "{option2}"
//     },
//     {
//       Option3: "{option3}"
//     }
//   ]
// }`;

// const template =`
// Avec ce template :
// ---------------
// {Contexte} Vous vous trouvez dans une situation critique. Choisissez votre prochaine action parmi les options suivantes :

// 1. {Option1}
// 2. {Option2}
// 3. {Option3}
// `

// const format = {
//   role: "assistant",
//   content: "{content} + Quelle option choisis-tu ?",
//   options: [
//     {
//       Option1: "{option1}",
//     },
//     {
//       Option2: "{option2}",
//     },
//     {
//       Option3: "{option3}",
//     },
//   ],
// };

const assistant_contexte = `Tu es un assitant virtuel qui agit selon le concept "un livre dont vous êtes le héro".
 En fonction de ses choix, l'utilisateur peux donner au récit une autre orientation. propose lui trois options à chaque fois.
`;
//  Ta réponse DOIT être en ${langue} et rerspecter le schema JSON suivant : ${format}

const system_prompt = assistant_contexte;

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: system_prompt },
      { role: "user", content: story_contexte },
      // {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
      // {"role": "user", "content": "Where was it played?"}
    ],
    model: "gpt-3.5-turbo-1106", // not used with hordde
    //response_format: { type: "json" },
  });

  console.log(completion.choices[0]);
  console.log("-------\n", completion, "----------\n");

  try {
    let content = JSON.parse(completion.choices[0].message.content);
    console.log(content);
  } catch (e) {
    console.log("n'est pas au format json");
  }
}

main();
