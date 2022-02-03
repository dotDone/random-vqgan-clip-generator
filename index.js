const {
  readFileSync,
  writeFileSync,
  readdirSync,
  rmSync,
  existsSync,
  mkdirSync,
} = require("fs");

const takenPhrases = {};
let idx = 10;

function randInt(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomParams() {
  const adjectives =
    "fired trashy tubular nasty jacked swol buff ferocious firey flamin agnostic artificial bloody crazy cringey crusty dirty eccentric glutinous harry juicy simple stylish awesome creepy corny freaky shady sketchy lame sloppy hot intrepid juxtaposed killer ludicrous mangy pastey ragin rusty rockin sinful shameful stupid sterile ugly vascular wild young old zealous flamboyant super sly shifty trippy fried injured depressed anxious clinical".split(
      " "
    );
  const nouns =
    "bowls cars phones hats dogs cats penis hands trees monkeys elephant bottles jesters lollipops tubas waterslides".split(
      " "
    );
  const determiner = [
    "some",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "a group of",
    "a gaggle of",
    "a horde of",
  ];
  const styles = [
    "Salvador Dalli",
    "Picasso",
    "Van Gogh",
    "Bob Ross",
    "The Simpsons",
    "Fortnite",
    "Jackson Pollock",
  ];
  const flowers = [
    { name: "rose", path: "./img/rose.jpg" },
    { name: "lily", path: "./img/lily.jpg" },
    { name: "orchid", path: "./img/orchid.jpg" },
    { name: "tulip", path: "./img/tulip.jpg" },
  ];

  const init_images = [
    { name: "galaxy", path: "./img/galaxy.jpg" },
    { name: "carpark", path: "./img/carpark.jpg" },
    { name: "mona lisa", path: "./img/monalisa.jpg" },
    { name: "stock family", path: "./img/stockfamily.jpg" },
  ];

  const randDeterminer = randElement(determiner);
  const randAdjective = randElement(adjectives);
  const randNoun = randElement(nouns);
  const randStyle = randElement(styles);
  const randFlower = randElement(flowers);
  const randInitImage = randElement(init_images);
  const iterations = randInt(1000, 100);

  const name = `${randDeterminer} ${randAdjective} ${randNoun}`;
  const phrase = `${randDeterminer} ${randAdjective} ${randNoun} in the style of ${randStyle}`;

  const params = {
    name: name,
    phrase: phrase,
    flower: randFlower,
    initImage: randInitImage,
    iterations: iterations,
  };

  if (takenPhrases[phrase] || !phrase) {
    return getRandomParams();
  } else {
    takenPhrases[phrase] = phrase;
    return params;
  }
}

function generate(idx) {
  const params = getRandomParams();

  const meta = {
    name: params.name,
    description: params.phrase,
    image: `${idx}.png`,
    attributes: [
      { flower: params.flower.name },
      { iterations: params.iterations },
      { initImage: params.initImage.name },
    ],
  };

  writeFileSync(`./out/${idx}.json`, JSON.stringify(meta));
  writeFileSync(`./out/${idx}-params.json`, JSON.stringify(params));
}

if (!existsSync("./out")) {
  mkdirSync("./out");
}

readdirSync("./out").forEach((f) => rmSync(`./out/${f}`));

do {
  generate(idx);
  idx--;
} while (idx >= 0);
