// https://stackoverflow.com/questions/24182097/node-js-endless-loop-function-quit-upon-certain-user-input
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import OpenAI from "openai";

const rl = readline.createInterface({ input, output });

const openai = new OpenAI(
  // api_key=process.env.OPENAI_API_KEY,
  {
    baseURL: "http://127.0.0.1:5678/v1", //"http://localhost:11434",
    // openai_api_base:"http://127.0.0.1:5678",
    model: "embedding-model-name",
    apiKey: "zer",
  }
);

let assistant_context = `Tu es un assistant intelligent, qui représente un "LIVRE DONT VOUS ETES LE HEROS", un livre co-écrit avec l'utilisateur, tu racontes une histoire cohérente, fantastique.`;

// let conditionnement = `⁂plan de luxure
//   Franchir la porte en bois de l'arrière-salle de la clinique semblait étonnamment familier à votre environnement à la maison. Après avoir laissé la pluie dehors, les lattes de bois étaient très accueillantes contre votre peau glacée. Lorsque vous entrez dans la pièce faiblement éclairée, vous regardez autour de vous, essayant de donner un sens à votre environnement inconnu. C'était calme à part une horloge qui tournait, probablement là pour masquer le son des voix au-dessus de l'insonorisation entre les pièces. Mis à part ce bureau d'aspect antique contre le mur, le reste de la pièce semblait peu meublé avec seulement quelques étagères abritant des centaines de vieux livres poussiéreux. Plusieurs chaises branlantes parsemaient l'espace par ailleurs nu, donnant une impression de vide, à l'exception de plusieurs étagères en bois portant des figurines bon marché qui occupaient la plus grande partie de l'espace dans la pièce. Il n'y avait pas beaucoup de meubles à part cette petite collection de bibliothèques et certainement pas de table assez grande pour une séance ouverte pour commencer votre séance de psychothérapie.
//   "Ça y est?" Vous vous demandez à voix haute alors que vous vous dirigez vers le bureau solitaire. Le bureau était couvert de papiers et de notes ainsi que de quelques croquis griffonnés sur papier. Sur le bureau se trouvaient quelques stylos et crayons, mais pas d'ordinateur ou de tablette comme on pourrait s'y attendre. "Alors où est le canapé ?"
//   Alors que vous réfléchissez à l'absence de siège confortable, la réceptionniste derrière le bureau s'adresse à vous ; "Anon, n'est-ce pas ?" elle s'enquiert. Des yeux bleus radieux et vibrants jaillissent de derrière le bureau alors qu'elle vous regarde. Ses cheveux étaient attachés en queue de cheval lâche et son visage était rond et plein. Un badge épinglé sur sa chemise indiquait « Tanya ».
//   "Oui", répondez-vous. "Je suis ici pour mon rendez-vous."
//   "Super!" S'exclame Tanya. "Laisse-moi juste vérifier ton dossier." Elle ouvre un tiroir et en sort un dossier, l'ouvrant. "Il est dit ici que vous avez prévu votre premier rendez-vous aujourd'hui. Laissez-moi préparer vos papiers."
//   "Très bien", dites-vous. Vous attendez quelques minutes pendant que Tanya parcourt la paperasse, s'assurant que tout est en ordre. Après ce qui semble être une éternité, elle termine et remet le stylo dans le tiroir. "Tout est prêt!" S'exclame-t-elle joyeusement. « Maintenant, si vous pouviez juste me suivre dans le couloir et vers la droite. » dit-elle en désignant la porte.
//   Vous hochez la tête et suivez la femme hors de la pièce, vous dirigeant vers le couloir étroit devant la porte menant à une autre pièce. Quelques mètres plus loin dans le couloir se trouve une porte intitulée « Dr. Bureau de Sainte Claire' avec une photo d'une femme mûre souriante à côté. Vous froncez légèrement les sourcils à l'idée que quelqu'un s'appelle Dr Sainte Claire.
//   Vous suivez à l'intérieur ; une causeuse pittoresque avec un dossier bas domine le centre de la pièce. Une seule lampe se trouve sur une petite table à côté de la causeuse. Un siège pivotant d’accompagnement se trouve en face. Il n'y a aucun autre meuble dans la pièce à part une petite étagère près de la porte. "J'espère que cet endroit vous plaira." Elle dit. "C'est bien." Vous répondez. «Le banal, c'est bien», affirmez-vous introspectivement, soulagé.
//   Mme Tanya hoche la tête : "C'est ici que vous vous rencontrerez. C'est un peu peu orthodoxe, mais cela devrait suffire. Maintenant, je vais vous demander de vous allonger pendant que j'aille chercher le médecin."
//   Vous hésitez : « Juste un canapé, hein ? » vous pensez : « Juste un canapé. » "Y a-t-il quelque chose qui ne va pas avec le canapé ?" Elle demande. "Non, non. Juste un peu inconfortable." Vous répondez. "Voulez-vous que je le déplace ?" Elle demande. "Non c'est bon." tu insiste.
//   Réaffirmer votre voix intérieure : « Juste un canapé, n'est-ce pas ? Pas de problème.', vous vous installez sur le canapé. Vos muscles se détendent lorsque vous vous enfoncez dans les coussins moelleux. Froids au toucher, ils offrent peu de résistance à votre poids. À mesure que vous vous enfoncez davantage dans le canapé, la surface commence à ressembler davantage à un lit qu'à un canapé. "Bien. Maintenant, soyez patient. Le médecin est un peu occupé et ne pourra pas vous voir avant au moins une heure ou deux." Elle dit.
//   "Très bien", dites-vous en fermant les yeux ; cela fait si longtemps que vous n'avez pas eu une bonne nuit de sommeil. "Détends-toi, détends-toi. Juste, re-" sa voix se coupe. Seul le léger vrombissement d’une horloge se fait entendre pendant que vous vous endormez.
//   Le vrombissement cesse. Il y a une légère pression sur votre peau, comme si quelqu'un respirait dans votre cou. Vous ne voyez rien devant vous, mais vous avez l'impression qu'il y a quelqu'un assis à côté de vous. Vous pouvez entendre quelque chose être traîné sur le sol. Vous ouvrez lentement les yeux, votre tête tourne légèrement à cause du changement brusque de perception.
//   ⁂avion d'agonie
//   Vos coudes appuient contre le... coussin ? Vous avez l'impression d'être plongé dans un puits de gélatine tiède. L'air est chaud et épais, vous pouvez sentir l'acidité du sang dans votre bouche et une sensation de chaleur contre votre joue. «Putain... je suis là.», pensez-vous.
//   L’environnement macabre est sombre, mais il y a de légères lueurs au loin. Une teinte rouge profond imprègne l’air autour de vous. La nappe s'infiltre sous vous, dégageant une odeur nauséabonde. Avec hésitation, vous tournez la tête vers la source de l’odeur. Cela vient d'une masse de chair qui se tortille sous vous. La peau est glissante de sueur, mais le muscle sous-jacent est frais et souple.`;


//////////
// test avec https://prompts.aidg.club/256
// Doctor Nerve's Fantastic Finds and Marvels Auction House
///////////////


// let name = "Henri"
// let manager = "Bob"

// let prompt =`Votre nom est ${name}, un nouvel employé à la maison de vente aux enchères des découvertes fantastiques et des merveilles du Docteur Nerve ! Votre responsable, ${manager}, vous a demandé de préparer les trois prochains lots pour les enchères. Chacun des artefacts anormaux doit être nettoyé et correctement stocké avant de pouvoir être mis aux enchères. Vous marchez sur le sol de l'entrepôt pendant que vous inspectez votre presse-papiers qui détaille chacun des articles à préparer.

// Le Gaufrier : Ce fer à repasser a une propriété très étrange. Lorsque le fer est chaud, le matériau sur lequel le fer est pressé sera transformé en le même matériau dont sont faites les gaufres Eggo. Par exemple, une chemise repassée avec ce fer deviendrait une chemise faite de gaufres Eggo. Lorsqu'il est éteint, il est totalement inoffensif. Vous regardez et voyez qu’il est actuellement débranché.

// La poupée Jumpscare : Cette poupée apparemment maudite a tendance à changer d'emplacement lorsqu'elle est sans surveillance. Il réapparaîtra dans d'autres endroits à proximité, tombant généralement d'une étagère sur son propriétaire sans méfiance. Il réapparaît toujours dans un endroit qui surprendra son propriétaire ou gardien actuel. A part ça, c’est totalement inoffensif. Il y a une seule note d'un vieil homme décédé d'une crise cardiaque après l'avoir acheté. Vous remarquez que la poupée Jumpscare est déjà absente de son piédestal.

// Le Cygne Noir : Vous pensez vous rappeler qu'il y a eu un film sur ce sujet ou quelque chose comme ça, mais le presse-papiers dit qu'il semble être inspiré d'un très vieux conte de fées. Cette épingle décorative fait croire à tous ceux qui la portent qu'ils peuvent se transformer en oiseau. Il note que la plupart des anciens propriétaires ont chuté jusqu'à la mort. L’ensemble de la broche est recouvert de magnifiques diamants noirs à gros caret.

// "Bonne chance!" dit ${manager} en vous tapotant le dos. "Je pense que je me souviens avoir vu la poupée dans le placard du fond. Je devrais peut-être commencer par là."
// "Merci", dites-vous avec un faible sourire.
// Il est temps de rendre le Docteur Nerve fier ! Vous rassemblez vos produits de nettoyage et vous approchez des trois socles, en réfléchissant par où commencer en premier.`


// let memory = `Mon nom est ${name}. Le nom de mon manager est ${manager}. ${manager} est mon manager. ${manager} a une personnalité autoritaire mais compréhensive ; étant donné la nature étrange des artefacts. Mon travail consiste à préparer les trois objets anormaux pour les enchères. Chaque fois que je touche une anomalie, je suis obligé de l'utiliser.`



//////////////////
// CAptain Marvel Final Flight https://prompts.aidg.club/4103
////////////////
// let name = "Stautor"
// let prompt = `Le radar longue portée de votre vaisseau commence à émettre un bip rapide. Votre cible est à quelques instants. Vous souriez méchamment en vous levant de la chaise et en vous dirigeant vers la zone préparée. Vous êtes ${name}, un humain de sexe masculin né sur Terre mais emmené dans la galaxie plus large par des pirates de l'espace lorsque vous étiez jeune. Ces pirates sont devenus votre famille, vous avez vécu les plus grands braquages et aventures avec eux.
// Puis ELLE est venue. Capitaine Marvel. Carole Danvers. Humaine d'ascendance Kree, elle a acquis un pouvoir inimaginable et est devenue une super-héroïne. Elle est restée sur Terre le plus longtemps possible, mais elle a ensuite décidé qu'elle devait également protéger le reste de la galaxie.
// Votre « famille » célébrait un braquage réussi sur le navire lorsqu'il a traversé la coque en trombe. Vous portiez encore une combinaison EVA lorsque vous avez été aspiré dehors. Mais le reste de l’équipage n’a pas eu cette chance. Vous les avez regardés avec horreur alors qu'ils suffoquaient dans le vide noir et froid, et le capitaine Marvel s'envolait. Aucun remords ni regret.
// Vous avez juré de vous venger d'elle, de lui faire payer ses meurtres. La tuer ne suffisait pas, tu voulais la briser, l'humilier. Après un certain temps, vous avez trouvé la réponse que vous cherchiez dans de vieilles ruines Kree. Un appareil qui rend toute personne possédant l'ADN Kree soumise à son porteur.
// Vous aviez la technologie et l'emplacement, vous deviez ensuite l'attirer vers vous. Ce n’était pas si difficile. Commettez quelques crimes odieux ici et là et vous apprenez bientôt qu'elle a été envoyée pour vous accueillir.
// Vous vous trouvez dans le hangar, les portes s'ouvrent. Soudain, une lumière jaune vif entre dans le hangar et flotte devant vous. Vous souriez alors que la lumière s'estompe pour révéler Captain Marvel. Lorsqu'elle atterrit, l'aura jaune autour de son corps s'estompe et vous pouvez avoir un bon aperçu de son apparence.
// Ses longs cheveux blonds tombent sur ses épaules et descendent dans son dos. Elle a des yeux bleus déterminés et une peau blanche et claire. Un sourire arrogant apparaît sur son visage alors qu'elle pose une main sur sa hanche. Elle porte un body moulant bleu et rouge qui a une fermeture éclair qui fixe son ventre et qui monte jusqu'à son cou. Ses gros seins et son cul gonflé sont joliment mis en valeur. Sur sa poitrine se trouve le symbole de Hala, une étoile jaune.
// "Ça t'a pris suffisamment longtemps." dites-vous finalement alors que vous finissez de regarder la femme. "Vous vouliez certainement attirer mon attention, je suis honoré." Captain Marvel répond d'une voix sarcastique. Vous renfrognez devant le sourire arrogant sur son visage et décidez que vous avez attendu assez longtemps.
// En appuyant sur un bouton, les portes du hangar se ferment. Le sourire narquois de l’héroïne ne s’efface pas. "Vraiment? S’enfermer ici avec moi n’est pas la meilleure idée. dit-elle en tenant ses bras le long du corps et en serrant les poings. Puis deux bracelets jaunes jaillissent du sol et se fixent sur ses poignets. "Qu'est-ce que c'est ?!" » dit la blonde alors qu'elle sent soudain ses pouvoirs s'estomper.
// « En fait, c’est le cas. Maintenant, tu ne peux pas partir. Jamais." vous souriez alors que la lueur jaune autour de Captain Marvel s'estompe complètement. "Maintenant, agenouille-toi." vous déclarez. "Je ne le ferais jamais... euh !?" La blonde grogne de surprise alors que son corps bouge contre sa volonté et se met à genoux.
// "Hmmm. Tellement satisfaisant. La grande Carol Danvers de la Terre. Maintenant à genoux devant un humble pirate de l’espace. tu la nargues. Le visage autrefois arrogant et arrogant de Marvel se remplit désormais de panique et de peur alors qu'elle grimace en essayant de bouger son corps. "Qu'est-ce que tu m'as fait, ${name} ?!" » crie-t-elle et relève la tête pour vous faire face, ses longs cheveux volant autour.
// "Simple. J'ai fabriqué un dispositif de soumission Kree. dites-vous calmement. Les yeux de l’humain à moitié kree s’écarquillent. « Un… dispositif de soumission ? » demande-t-elle, sa voix légèrement hésitante. "Oui. Un ancien appareil utilisé par un Kree fanatique qui pratiquait l'esclavage en abondance. Cet appareil est lié à un « maître » et lorsque l’appareil est fixé autour d’une personne, celle-ci perd son libre arbitre et est à la merci du « maître ». vous souriez en caressant lentement le visage de l’héroïne, sa peau douce au toucher.
// "Ne fais pas ça… tu vas… tu vas…" balbutie le capitaine Marvel avant de simplement dire "Silence". et sa bouche se ferme. "Maintenant, que faire d'abord de mon nouvel esclave ?" vous souriez à la femme impuissante et avez une idée. Toi`


// let prompt = `Ce n’était pas si difficile. Commettez quelques crimes odieux ici et là et vous apprenez bientôt qu'elle a été envoyée pour vous accueillir.
// Vous vous trouvez dans le hangar, les portes s'ouvrent. Soudain, une lumière jaune vif entre dans le hangar et flotte devant vous. Vous souriez alors que la lumière s'estompe pour révéler Captain Marvel. Lorsqu'elle atterrit, l'aura jaune autour de son corps s'estompe et vous pouvez avoir un bon aperçu de son apparence.
// Ses longs cheveux blonds tombent sur ses épaules et descendent dans son dos. Elle a des yeux bleus déterminés et une peau blanche et claire. Un sourire arrogant apparaît sur son visage alors qu'elle pose une main sur sa hanche. Elle porte un body moulant bleu et rouge qui a une fermeture éclair qui fixe son ventre et qui monte jusqu'à son cou. Ses gros seins et son cul gonflé sont joliment mis en valeur. Sur sa poitrine se trouve le symbole de Hala, une étoile jaune.
// "Ça t'a pris suffisamment longtemps." dites-vous finalement alors que vous finissez de regarder la femme. "Vous vouliez certainement attirer mon attention, je suis honoré." Captain Marvel répond d'une voix sarcastique. Vous renfrognez devant le sourire arrogant sur son visage et décidez que vous avez attendu assez longtemps.
// En appuyant sur un bouton, les portes du hangar se ferment. Le sourire narquois de l’héroïne ne s’efface pas. "Vraiment? S’enfermer ici avec moi n’est pas la meilleure idée. dit-elle en tenant ses bras le long du corps et en serrant les poings. Puis deux bracelets jaunes jaillissent du sol et se fixent sur ses poignets. "Qu'est-ce que c'est ?!" » dit la blonde alors qu'elle sent soudain ses pouvoirs s'estomper.
// « En fait, c’est le cas. Maintenant, tu ne peux pas partir. Jamais." vous souriez alors que la lueur jaune autour de Captain Marvel s'estompe complètement. "Maintenant, agenouille-toi." vous déclarez. "Je ne le ferais jamais... euh !?" La blonde grogne de surprise alors que son corps bouge contre sa volonté et se met à genoux.
// "Hmmm. Tellement satisfaisant. La grande Carol Danvers de la Terre. Maintenant à genoux devant un humble pirate de l’espace. tu la nargues. Le visage autrefois arrogant et arrogant de Marvel se remplit désormais de panique et de peur alors qu'elle grimace en essayant de bouger son corps. "Qu'est-ce que tu m'as fait, ${name} ?!" » crie-t-elle et relève la tête pour vous faire face, ses longs cheveux volant autour.
// "Simple. J'ai fabriqué un dispositif de soumission Kree. dites-vous calmement. Les yeux de l’humain à moitié kree s’écarquillent. « Un… dispositif de soumission ? » demande-t-elle, sa voix légèrement hésitante. "Oui. Un ancien appareil utilisé par un Kree fanatique qui pratiquait l'esclavage en abondance. Cet appareil est lié à un « maître » et lorsque l’appareil est fixé autour d’une personne, celle-ci perd son libre arbitre et est à la merci du « maître ». vous souriez en caressant lentement le visage de l’héroïne, sa peau douce au toucher.
// "Ne fais pas ça… tu vas… tu vas…" balbutie le capitaine Marvel avant de simplement dire "Silence". et sa bouche se ferme. "Maintenant, que faire d'abord de mon nouvel esclave ?" vous souriez à la femme impuissante et avez une idée. Toi`



// let memory = `Vous êtes ${name}, un humain de sexe masculin qui a été recueilli par des pirates de l'espace lorsqu'il était enfant et qui a grandi pour devenir membre de leur équipage. Vous avez juré de vous venger du capitaine Marvel pour avoir tué tous les membres de votre équipage que vous considériez comme une famille. Vous êtes déterminé à briser sa volonté et à l’humilier.
// Le capitaine Marvel, de son vrai nom Carol Danvers, est un humain avec l'ADN Kree de la planète Terre. Elle a de longs cheveux blonds, une carrure musclée mais voluptueuse, de gros seins, un cul moelleux, un joli visage, des yeux bleus et des jambes athlétiques. Elle porte un body moulant bleu et rouge qui a une fermeture éclair qui fixe son ventre et qui monte jusqu'à son cou. Ses gros seins et son cul gonflé sont joliment mis en valeur. Sur sa poitrine se trouve le symbole de Hala, une étoile jaune.
// Captain Marvel est un super héros. Ses pouvoirs sont : le vol, la super vitesse, la super force, l'absorption d'énergie, l'invulnérabilité, l'endurance améliorée, la capacité de tirer des faisceaux ou des boules d'énergie photonique et est capable de respirer dans l'espace.
// Le capitaine Marvel est généralement confiant, fier, têtu et impulsif.
// Vous avez piégé le capitaine Marvel sur votre vaisseau à l'aide d'un dispositif de soumission Kree, des bracelets en or qui lui suppriment la capacité de contrôler son propre corps. Vous pouvez ordonner au capitaine Marvel de faire des choses contre sa volonté grâce à l'appareil et elle ne pourra pas vous résister ou se battre.`

/// LA PLAGE 

//let prompt = `Tu te réveilles sur une plage complètement déserte, la chemise ouverte, un corps est posé à côté de toi sur la serviette, une longue chevelure blonde couvre une tête et des épaules qui commencent à s'animer`;


//let memory = `je suis un jeune garçon de 25 ans nommé Bob, je me souviens être allé à une soirée hier, avec Paul et Marius, on a pris l'apéro au "Dojo du Bédo", et on a retrouvé la bande, comme d'habitude, mais après... je ne me souviens plus du tout... Et j'ai mal à la tête...`


// BABY SITER

let name = "John"
let prompt = `Votre nom est ${name} et vous avez été chargé de garder votre nièce de sept ans, Emily, pendant que votre sœur est en vacances. Emily est une enfant sauvage assez énergique et espiègle, et pour couronner le tout, elle a un adorable béguin pour vous. On ne sait pas ce qu'elle va faire.
Vous vous tenez tous les deux devant la porte de votre maison et faites signe à sa mère et à son père de s'éloigner, vous laissant seuls toute la semaine.
C'est un peu intimidant, étant donné que vous êtes un homme célibataire sans enfants, mais vous devez admettre que vous avez hâte d'y être. Après tout, vous n'avez pas vu Emily depuis près de trois ans, et ce sera bien de renouer avec elle maintenant qu'elle est un peu plus âgée et qu'elle a développé une personnalité.
Dès que la voiture de ses parents disparaît de la vue, Emily rit et se précipite chez vous. Vous la suivez en fermant la porte d'entrée derrière vous.`

let memory = `Je suis un homme célibataire sans enfants, mais j'ai gentiment proposé de garder l'enfant de ma sœur, Emily, pendant qu'ils partent en voyage d'une semaine. Qu'est-ce qui pourrait mal se passer?`

let messages = [
  { role: "system", content: assistant_context },
  { role: "user", content: memory },
  { role: "assistant", content: prompt },
//   { role: "user", content: conditionnement },
];

console.log(messages);

async function chat() {
  const completion = await openai.chat.completions.create({
    //messages: [{ role: "system", content: "Tu es un assistant. Ton rôle est de trouver la meilleure affaire de velo pour homme à moins de 300 € sur Toulouse. Donne moi les liens que je puisse les commander" }],
    // messages: messages,
    prompt: JSON.stringify(messages),
    test_single_prompt: true, // au lieu des messages ? le resultat semble mieux formaté
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
  });

  console.log(completion);
  //   console.log("-------\n", completion, "----------\n");

  //   let message = completion.choices[0].message;
  //   console.log("message ", message);
  //   console.log("role ", message.role);
  //   console.log("content ", message.content);
  messages.push({ role: "assistant", content: completion.text });

  // try {
  //   let content = JSON.parse(completion.choices[0].message.content);
  //   console.log(content);
  // } catch (e) {
  //   console.log("n'est pas au format json");
  // }
}

// chat();

do {
  var answer = await rl.question(
    '\nQue fais-tu ? ("del" pour effacer le dernier, (todo une option pour revenir également à ma dernière reponse)"quit" to exit):\n '
  );
  if (answer === "quit") break;

  if (answer === "del") {
    let removed = messages.pop();
    console.log("just removed ", removed);
  } else {
    console.log(`You entered: ${answer}`);
    messages.push({ role: "user", content: answer });
  }
  console.log("avant chat", messages);
  await chat();
  console.log("after chat", messages);
} while (true);

rl.close();
