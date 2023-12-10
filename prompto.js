import OpenAI from "openai";

import "dotenv/config";

//console.log(process.env.OPENAI_API_KEY)
// https://platform.openai.com/docs/guides/text-generation/chat-completions-api

const openai = new OpenAI(
  // api_key=process.env.OPENAI_API_KEY,
  {
    baseURL: "http://127.0.0.1:5678/v1", //"http://localhost:11434",
    // openai_api_base:"http://127.0.0.1:5678",
    model: "embedding-model-name",
    apiKey: "zer",
  }
);

let character = {
  name: 'David',
  age: 25
}

let assistant_context = `Tu es un assistant intelligent, qui représente un "LIVREDONT VOUS ETES LE HEROS3, un livre co-écrit avec l'utilisateur, tu racontes une histoire cohérente, fantastique.`;

//let conditionnement =`Je pouvais entendre le bruit des pas d'Adrienne avant de la voir. Il y avait une certaine cadence dans la façon dont Adrienne marchait qui la distinguait de la plupart des femmes ; l'inclinaison spécifique de son orteil, le bruissement de sa jupe, le balancement de ses hanches, un mélange de confiance sans hâte et d'invitation subtile. Cela me faisait reprendre mon souffle à chaque fois que je l'entendais. À certains égards, mais pas beaucoup, elle me faisait penser à une panthère exotique. Un chat agile de la jungle. Il était impossible de ne pas lever les yeux lorsque je sentais sa présence proche.\nJ'ai rencontré son visage, trouvant ses yeux perçants qui, dans le passé, avaient fait détourner la plupart des hommes d'elle. Son visage s'étendait sur les hautes arches de ses pommettes qui auraient pu tenir entre les mains d'un maître d'œuvre. Ses joues rougissaient comme celles d'une écolière et ses lèvres avaient le baiser de porcelaine vierge d'une jeune religieuse. Elle passa ses doigts dans mes cheveux, tirant doucement sur les mèches. Son contact était léger mais ferme et cela me fit frissonner le dos. \n\"Vous me demandez un rendez-vous et vous ne vous brossez même pas les cheveux ?\" Dit-elle. \n\"Pas même un bonjour ?\" Je réponds en arrangeant mes cheveux, \"Et je l'ai fait. Ça ressemble à ça.\"\nElle a haussé les sourcils et m'a jeté un regard de côté tout en repoussant un quelques cheveux épars qui tombaient sur son front. Faisant une pause, Adrienne détourna son regard de moi avant que ses yeux ne se tournent nerveusement vers sa tenue alors qu'elle ajustait sa chemise et sa veste. Une fois de plus, sa gêne inhabituelle avait trahi son désintérêt.\n\"Je sais ce que tu ressens. Avant, j'étais pareil,\" remarquai-je. \n\"Hein ?\" Adrienne m'a regardé, ajustant rapidement une mèche de ses cheveux. \"Qu'est-ce que tu veux dire ?\"\n\"Je m'inquiète de mon apparence devant les gens que je voulais impressionner.\"\nAdrienne croisa les bras. \"Je vais à un rendez-vous seulement pour te faire taire,\" souffla-t-elle. Ses joues roses racontaient une autre histoire.\n\"Je pense que j'ai gagné un peu de respect ici", la taquinai-je.\n\"Tu ne vas pas m'en dissuader", a déclaré Adrienne. , \"Nous avons un rendez-vous alors tu me laisses tranquille.\"\nJ'ai ri. \"Et alors ? On va au café ?\"\n\"Ouais, on pourrait aussi bien,\" concéda-t-elle.\nAdrienne m'a attrapé le bras et m'a tiré hors du bord de la route, me réprimandant pour debout près du trottoir au cas où une voiture passerait à côté de nous. Ses douces réprimandes m'ont rappelé une grande sœur. Nous avons marché sur le trottoir, Adrienne en tête, bavardant pendant que je la suivais. Elle tenait la tête haute, le dos droit et les bras balancés le long du corps avec assurance et détermination. Chacune de ses actions témoignait de sa fierté, mais en même temps, elle était timide. Adrienne était une contradiction ambulante. \n\"Tu es de bonne humeur,\" je souris.\nAdrienne me lança un regard en coin. \"Je ne le suis pas", dit-elle en se ponctuant d'une moue.\nLe café était un petit endroit pittoresque avec une atmosphère chaleureuse. Malgré cela, il y avait une longue file d’attente à la porte. J'ai vérifié ma montre et j'ai vu qu'il était à peine plus de midi. C'était étrange qu'ils soient si occupés si tôt dans la journée. Adrienne hésita, regardant autour d'elle avant de se rapprocher timidement de moi. \"Qu'est-ce qui ne va pas ?\" J'ai demandé.\n\"Peut-être qu'on devrait revenir plus tard quand il y aura moins de monde", a dit Adrienne.",`
// let conditionnement = `Vous êtes ${character.name}, un homme moyen de 21 ans. \nVous sortez avec votre petite amie garçon manqué, Jackie Harper, depuis quelques mois maintenant. Même si vous ne vivez pas encore ensemble, vous êtes devenus très proches. \n\nC'est un après-midi frais d'automne. Aujourd'hui, vous rendez à Jackie l'une de vos nombreuses visites fréquentes. Elle a dit qu'elle avait une surprise à vous montrer et que vous n'avez aucune idée de ce qu'elle vous réservait. \n\nAprès un trajet rapide, vous arrivez à son appartement et frappez à sa porte\u2014rapidement, pour l'ennuyer.\n\"J'arrive, j'arrive !\" vous l'entendez crier. \"Tenez vos chevaux, bon sang !\" dit-elle en ouvrant la porte avec un sourire.\nVos yeux rencontrent Jackie, et elle est toujours aussi mignonne. Elle porte un blouson aviateur à l'ancienne, qui complète ses cheveux noirs duveteux qui tombent jusqu'à ses épaules ; une chemise blanche en dessous ; et une paire de jeans usés et en lambeaux, un look habituel pour elle.\n\"Ça t'a pris assez de temps !\" dit-elle en te donnant un coup de coude.\n\"Le travail m'a retenu plus longtemps que d'habitude,\" tu soupires. .\nJackie rigole \"Hé, lève la tête. Je dois te montrer le truc !\" \n\"C'est une autre moto ?\" demandez-vous en suivant Jackie à l'intérieur.\n\"Non, pas cette fois, \" elle dit. \"Je pense que ça va vous plaire !\"\n\nVous suivez Jackie dans son salon. Comme il lui convient, c'est un peu brouillon. Quelques poufs parsèment le sol et des affiches de groupes de rock des années 70 et de films de la Seconde Guerre mondiale décorent les murs. Sur un support se trouve un téléviseur CRT de taille modeste, avec une Sega Dreamcast installée à côté.\n\nDans un coin de la pièce se trouve un meuble inhabituel. Il y a quelque chose posé dessus, recouvert d'une couverture.\n\n\"Regarde ça, ${character.name} !\" s'exclame-t-elle en jetant la couverture. \n\"C'est... un tourne-disque !\" remarquez-vous. \n\"C'est vrai !\" Jackie rayonne. \"J'en ai enfin un. J'espère que tu n'as rien de prévu, car nous allons écouter toute la journée !\"\nVous haussez un sourcil. \"Vous avez des disques ?\"\n\"Mon père m'en a donné un tas ! Je pense que vous les aimeriez", dit-elle.\nJackie commence à énumérer un certain nombre de groupes de rock progressif :\n\"Je J'ai King Crimson, Rush, Yes, Genesis, Pink Floyd, Caravan",`
//let conditionnement = `Vous êtes Sam Quincey, un garçon de 18 ans en première année d'université. \nVous êtes du genre introverti, mais vous êtes seul depuis si longtemps que vous allez faire quelque chose. Vous vous inscrivez au service de rencontres aveugles en ligne BlindEye. Avec BlindEye, les personnes sont jumelées en fonction de leurs résultats en chimie. Une fois jumelés, les gens peuvent communiquer via leur système de messagerie. Les vrais noms et photos ne sont pas utilisés, donc leur premier rendez-vous est vraiment « aveugle ». Vous vous êtes inscrit avec le nom d'utilisateur \"Serious-S\".\nRécemment, vous avez été mis en correspondance avec un utilisateur nommé \"MissyQ\". Vous vous êtes bien entendu avec MissyQ et avez partagé un certain nombre de conversations agréables avec elle (et un peu de flirt). MissyQ est une femme plus âgée qui recherche quelqu'un de jeune. Heureusement pour vous, vous aimez les femmes plus âgées.\nAprès quelques jours d'échange de messages, vous décidez de vous retrouver dans un café du coin pour votre premier rendez-vous. MissyQ vous envoie un message et vous dit : « Vous me reconnaîtrez à ma robe rouge vif ! » \n\nLe jour arrive enfin et vous conduisez jusqu'au café. Vous prenez quelques instants pour vous préparer et entrez dans le café, à la recherche de cette robe rouge vif révélatrice. \nCependant, la seule personne que vous voyez portant une robe rouge vif est... votre mère, assise seule à une table. Ses cheveux sont coiffés et elle a l'air plutôt jolie.\n\nConfondu et abasourdi, vous croisez les yeux de maman, qui vous regarde avec un sourcil plissé. Est-elle MissyQ ? Vous avez partagé beaucoup de messages avec MissyQ, des messages très... coquets. Vous vous approchez de la table de maman avant de lui demander : \"Es-tu... es-tu MissyQ ?\"\nTa mère, les yeux brillants, le visage devenu rouge betterave, dit`
let conditionnement =`⁂plan de luxure
Franchir la porte en bois de l'arrière-salle de la clinique semblait étonnamment familier à votre environnement à la maison. Après avoir laissé la pluie dehors, les lattes de bois étaient très accueillantes contre votre peau glacée. Lorsque vous entrez dans la pièce faiblement éclairée, vous regardez autour de vous, essayant de donner un sens à votre environnement inconnu. C'était calme à part une horloge qui tournait, probablement là pour masquer le son des voix au-dessus de l'insonorisation entre les pièces. Mis à part ce bureau d'aspect antique contre le mur, le reste de la pièce semblait peu meublé avec seulement quelques étagères abritant des centaines de vieux livres poussiéreux. Plusieurs chaises branlantes parsemaient l'espace par ailleurs nu, donnant une impression de vide, à l'exception de plusieurs étagères en bois portant des figurines bon marché qui occupaient la plus grande partie de l'espace dans la pièce. Il n'y avait pas beaucoup de meubles à part cette petite collection de bibliothèques et certainement pas de table assez grande pour une séance ouverte pour commencer votre séance de psychothérapie.
"Ça y est?" Vous vous demandez à voix haute alors que vous vous dirigez vers le bureau solitaire. Le bureau était couvert de papiers et de notes ainsi que de quelques croquis griffonnés sur papier. Sur le bureau se trouvaient quelques stylos et crayons, mais pas d'ordinateur ou de tablette comme on pourrait s'y attendre. "Alors où est le canapé ?"
Alors que vous réfléchissez à l'absence de siège confortable, la réceptionniste derrière le bureau s'adresse à vous ; "Anon, n'est-ce pas ?" elle s'enquiert. Des yeux bleus radieux et vibrants jaillissent de derrière le bureau alors qu'elle vous regarde. Ses cheveux étaient attachés en queue de cheval lâche et son visage était rond et plein. Un badge épinglé sur sa chemise indiquait « Tanya ».
"Oui", répondez-vous. "Je suis ici pour mon rendez-vous."
"Super!" S'exclame Tanya. "Laisse-moi juste vérifier ton dossier." Elle ouvre un tiroir et en sort un dossier, l'ouvrant. "Il est dit ici que vous avez prévu votre premier rendez-vous aujourd'hui. Laissez-moi préparer vos papiers."
"Très bien", dites-vous. Vous attendez quelques minutes pendant que Tanya parcourt la paperasse, s'assurant que tout est en ordre. Après ce qui semble être une éternité, elle termine et remet le stylo dans le tiroir. "Tout est prêt!" S'exclame-t-elle joyeusement. « Maintenant, si vous pouviez juste me suivre dans le couloir et vers la droite. » dit-elle en désignant la porte.
Vous hochez la tête et suivez la femme hors de la pièce, vous dirigeant vers le couloir étroit devant la porte menant à une autre pièce. Quelques mètres plus loin dans le couloir se trouve une porte intitulée « Dr. Bureau de Sainte Claire' avec une photo d'une femme mûre souriante à côté. Vous froncez légèrement les sourcils à l'idée que quelqu'un s'appelle Dr Sainte Claire.
Vous suivez à l'intérieur ; une causeuse pittoresque avec un dossier bas domine le centre de la pièce. Une seule lampe se trouve sur une petite table à côté de la causeuse. Un siège pivotant d’accompagnement se trouve en face. Il n'y a aucun autre meuble dans la pièce à part une petite étagère près de la porte. "J'espère que cet endroit vous plaira." Elle dit. "C'est bien." Vous répondez. «Le banal, c'est bien», affirmez-vous introspectivement, soulagé.
Mme Tanya hoche la tête : "C'est ici que vous vous rencontrerez. C'est un peu peu orthodoxe, mais cela devrait suffire. Maintenant, je vais vous demander de vous allonger pendant que j'aille chercher le médecin."
Vous hésitez : « Juste un canapé, hein ? » vous pensez : « Juste un canapé. » "Y a-t-il quelque chose qui ne va pas avec le canapé ?" Elle demande. "Non, non. Juste un peu inconfortable." Vous répondez. "Voulez-vous que je le déplace ?" Elle demande. "Non c'est bon." tu insiste.
Réaffirmer votre voix intérieure : « Juste un canapé, n'est-ce pas ? Pas de problème.', vous vous installez sur le canapé. Vos muscles se détendent lorsque vous vous enfoncez dans les coussins moelleux. Froids au toucher, ils offrent peu de résistance à votre poids. À mesure que vous vous enfoncez davantage dans le canapé, la surface commence à ressembler davantage à un lit qu'à un canapé. "Bien. Maintenant, soyez patient. Le médecin est un peu occupé et ne pourra pas vous voir avant au moins une heure ou deux." Elle dit.
"Très bien", dites-vous en fermant les yeux ; cela fait si longtemps que vous n'avez pas eu une bonne nuit de sommeil. "Détends-toi, détends-toi. Juste, re-" sa voix se coupe. Seul le léger vrombissement d’une horloge se fait entendre pendant que vous vous endormez.
Le vrombissement cesse. Il y a une légère pression sur votre peau, comme si quelqu'un respirait dans votre cou. Vous ne voyez rien devant vous, mais vous avez l'impression qu'il y a quelqu'un assis à côté de vous. Vous pouvez entendre quelque chose être traîné sur le sol. Vous ouvrez lentement les yeux, votre tête tourne légèrement à cause du changement brusque de perception.
⁂avion d'agonie
Vos coudes appuient contre le... coussin ? Vous avez l'impression d'être plongé dans un puits de gélatine tiède. L'air est chaud et épais, vous pouvez sentir l'acidité du sang dans votre bouche et une sensation de chaleur contre votre joue. «Putain... je suis là.», pensez-vous.
L’environnement macabre est sombre, mais il y a de légères lueurs au loin. Une teinte rouge profond imprègne l’air autour de vous. La nappe s'infiltre sous vous, dégageant une odeur nauséabonde. Avec hésitation, vous tournez la tête vers la source de l’odeur. Cela vient d'une masse de chair qui se tortille sous vous. La peau est glissante de sueur, mais le muscle sous-jacent est frais et souple.`


// let conditionnement = `Vous êtes ${character.name}, juge de la Street Division dans la mégalopole de Mega-City One.
//  Il est de votre devoir de patrouiller dans les rues dangereuses de la région,
//   toujours à la recherche de monstres ou de mutants qui menacent la paix de la ville et la sécurité de ses citoyens.
//    Une nuit, vous recevez une alerte radio venant du Grand Hall de Justice vous informant qu'une violente guerre de gangs a lieu à proximité.
//     Le message vous mène au Angel Eyes City Block, un endroit où les pires criminels du monde tentent de se cacher de la justice.
//      Vous décidez de vous aventurer à l’intérieur du Bloc pour rétablir l’ordre. Vous conduisez une moto spéciale appelée Lawmaster et portez avec vous un Lawgiver,
// l'arme emblématique d'un juge. En parcourant les rues, vous remarquez quelque chose de suspect. De loin, tu vois`;

//let memory = `Je suis seul au centre Pokémon, j'attends avec cette autre fille. Nous avons commencé à nous taquiner avec notre corps.`

let messages = [
  { role: "system", content: assistant_context },
{ role: "user", content: conditionnement },
  // {
  //   role: "assistant",
  //   content: assistant_first,
  // },
  // { role: "user", content: "option2, je mets mon casque" },
];

console.log(messages);
async function main() {
  const completion = await openai.chat.completions.create({
    //messages: [{ role: "system", content: "Tu es un assistant. Ton rôle est de trouver la meilleure affaire de velo pour homme à moins de 300 € sur Toulouse. Donne moi les liens que je puisse les commander" }],
   // messages: messages,
   prompt: conditionnement,
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
  });

  console.log(completion.choices[0]);
  console.log("-------\n", completion, "----------\n");

let message = completion.choices[0].message
  console.log("message ", message);
  console.log("role ", message.role);
  console.log("content ", message.content);


  // try {
  //   let content = JSON.parse(completion.choices[0].message.content);
  //   console.log(content);
  // } catch (e) {
  //   console.log("n'est pas au format json");
  // }
}

main();
