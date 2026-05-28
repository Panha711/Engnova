import { PrismaClient, Level, LessonType, Skill } from "@prisma/client";
import bcrypt from "bcryptjs";
import { extraVocab } from "./vocab";
import { grammarLessons } from "./grammar/lessons";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database…");

  // --- Demo user ---
  const passwordHash = await bcrypt.hash("password123", 10);
  const demo = await prisma.user.upsert({
    where: { email: "demo@engnova.dev" },
    update: {},
    create: {
      email: "demo@engnova.dev",
      name: "Demo Learner",
      passwordHash,
      profile: {
        create: {
          level: Level.BEGINNER,
          dailyGoal: 30,
          currentStreak: 3,
          longestStreak: 7,
          lastActiveOn: new Date(),
          bio: "Learning English one day at a time.",
        },
      },
    },
  });

  // --- Vocabulary ---
  const vocab = [
    {
      word: "abundant",
      meaning: "existing in large quantities; plentiful",
      meaningKh: "ច្រើន; ដុលដម",
      example: "The region has abundant rainfall in the summer.",
      pronunciation: "/əˈbʌn.dənt/",
      partOfSpeech: "adjective",
      level: Level.INTERMEDIATE,
    },
    {
      word: "benevolent",
      meaning: "well-meaning and kindly",
      meaningKh: "មេត្តាធម៌; ល្អចិត្ត",
      example: "A benevolent smile crossed her face.",
      pronunciation: "/bəˈnev.ə.lənt/",
      partOfSpeech: "adjective",
      level: Level.ADVANCED,
    },
    {
      word: "curious",
      meaning: "eager to know or learn something",
      meaningKh: "ចង់ដឹងចង់ឃើញ",
      example: "She was curious about the new neighbor.",
      pronunciation: "/ˈkjʊə.ri.əs/",
      partOfSpeech: "adjective",
      level: Level.BEGINNER,
    },
    {
      word: "diligent",
      meaning: "showing care and conscientiousness in one's work",
      meaningKh: "ឧស្សាហ៍ព្យាយាម; យកចិត្តទុកដាក់",
      example: "He is a diligent student.",
      pronunciation: "/ˈdɪl.ɪ.dʒənt/",
      partOfSpeech: "adjective",
      level: Level.INTERMEDIATE,
    },
    {
      word: "eloquent",
      meaning: "fluent or persuasive in speaking or writing",
      meaningKh: "និយាយល្អ; ពាក្យស្អាត",
      example: "Her eloquent speech moved the crowd.",
      pronunciation: "/ˈel.ə.kwənt/",
      partOfSpeech: "adjective",
      level: Level.ADVANCED,
    },
    {
      word: "frequent",
      meaning: "occurring or done many times at short intervals",
      meaningKh: "ញឹកញាប់",
      example: "He is a frequent visitor to the library.",
      pronunciation: "/ˈfriː.kwənt/",
      partOfSpeech: "adjective",
      level: Level.BEGINNER,
    },
    {
      word: "generous",
      meaning: "showing a readiness to give more than is expected",
      meaningKh: "ឧត្តមានុគ្គល; ក្លាយធៀប",
      example: "She made a generous donation.",
      pronunciation: "/ˈdʒen.ər.əs/",
      partOfSpeech: "adjective",
      level: Level.BEGINNER,
    },
    {
      word: "hesitant",
      meaning: "tentative, unsure, or slow in acting or speaking",
      meaningKh: "ទឺយ; រអាររអើល",
      example: "He was hesitant to accept the offer.",
      pronunciation: "/ˈhez.ɪ.tənt/",
      partOfSpeech: "adjective",
      level: Level.INTERMEDIATE,
    },
  ];

  const bedroomVocab = [
    {
      word: "bed",
      meaning: "a piece of furniture for sleeping on",
      meaningKh: "គ្រាប់",
      example: "She made the bed before breakfast.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "headboard",
      meaning: "the upright panel at the head of a bed",
      meaningKh: "ក្តារក្បាលគ្រាប់",
      example: "They bought a wooden headboard for the guest room.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "pillow",
      meaning: "a soft cushion used to support the head in bed",
      meaningKh: "ខ្នើយ",
      example: "He fluffed his pillow and went back to sleep.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "pillowcase",
      meaning: "a removable cover for a pillow",
      meaningKh: "ស្រោមខ្នើយ",
      example: "Wash the pillowcases every week.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "fitted sheet",
      meaning: "a sheet with elastic edges that fits tightly over a mattress",
      meaningKh: "សន្លឹកពេញក្បាលគ្រាប់",
      example: "Put the fitted sheet on the mattress first.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "flat sheet",
      meaning: "a rectangular sheet that lies on top of the fitted sheet",
      meaningKh: "សន្លឹករាប",
      example: "Tuck the flat sheet under the mattress at the foot of the bed.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "blanket",
      meaning: "a large piece of warm fabric used on a bed",
      meaningKh: "ភួយ",
      example: "Pull up the blanket if you feel cold.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "electric blanket",
      meaning: "a blanket with built-in heating wires",
      meaningKh: "ភួយអគ្គិសនី",
      example: "She turned on the electric blanket on winter nights.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "dust ruffle",
      meaning: "a decorative fabric skirt that hangs around the base of a bed",
      meaningKh: "កំរាលបិទបាំងផ្នែកខាងក្រោមគ្រាប់",
      example: "The dust ruffle matched the bedspread.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "bedspread",
      meaning: "a decorative cover spread over a bed",
      meaningKh: "កំរាលគ្រាប់",
      example: "They chose a light blue bedspread for the room.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "comforter",
      meaning: "a thick, quilted bed covering (also called a quilt)",
      meaningKh: "ភួយយីវ",
      example: "Store the comforter in a closet during summer.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "footboard",
      meaning: "the upright panel at the foot of a bed",
      meaningKh: "ក្តារជើងគ្រាប់",
      example: "The antique bed had a carved footboard.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "blinds",
      meaning: "window coverings made of horizontal or vertical slats",
      meaningKh: "ចំហៀងបង់ពន្លឺ",
      example: "Close the blinds before you go to sleep.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "nightstand",
      meaning: "a small table beside a bed (also called a night table)",
      meaningKh: "តុក្បែរគ្រាប់",
      example: "Her phone is charging on the nightstand.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "alarm clock",
      meaning: "a clock that rings at a set time to wake someone up",
      meaningKh: "នាឡិការោទិ៍",
      example: "The alarm clock went off at six o'clock.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "clock radio",
      meaning: "a radio combined with an alarm clock",
      meaningKh: "វិទ្យុនិងនាឡិកា",
      example: "He listens to the news on his clock radio every morning.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "chest of drawers",
      meaning: "a piece of bedroom furniture with drawers for clothes",
      meaningKh: "ទ្រូងថត",
      example: "Fold your T-shirts and put them in the chest of drawers.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "mirror",
      meaning: "a reflective glass surface used for looking at yourself",
      meaningKh: "កញ្កែវ",
      example: "She checked her hair in the mirror.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "jewelry box",
      meaning: "a small box for storing rings, necklaces, and other jewelry",
      meaningKh: "ប្រអប់គ្រឿងអលង្ការ",
      example: "She keeps her earrings in a jewelry box on the dresser.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "dresser",
      meaning: "a bedroom cabinet with drawers for clothes (also called a bureau)",
      meaningKh: "ទ្រូងខ្ចី",
      example: "Hang coats in the closet and fold shirts in the dresser.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "twin bed",
      meaning: "a bed sized for one person (about 39 inches wide)",
      meaningKh: "គ្រាប់តូច (មនុស្សម្នាក់)",
      example: "The children's room has two twin beds.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "mattress",
      meaning: "the thick, soft pad you sleep on",
      meaningKh: "ពពុះ",
      example: "This mattress is too firm for my back.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "box spring",
      meaning: "a cloth-covered frame with springs that supports a mattress",
      meaningKh: "ស៊ុមពន្លៃគ្រាប់",
      example: "Place the mattress on top of the box spring.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "double bed",
      meaning: "a bed for two people, smaller than a queen (also called a full bed)",
      meaningKh: "គ្រាប់ទ្វេ",
      example: "The hotel room has one double bed.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "queen-size bed",
      meaning: "a bed wider than a double, typically 60 inches across",
      meaningKh: "គ្រាប់ទំហំដេក្វីន",
      example: "They upgraded to a queen-size bed last year.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "king-size bed",
      meaning: "a bed wider than a queen, typically 76 inches across",
      meaningKh: "គ្រាប់ទំហំឃីង",
      example: "A king-size bed needs a larger bedroom.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "bunk bed",
      meaning: "two beds stacked one above the other",
      meaningKh: "គ្រាប់ពីរជាន់",
      example: "The kids share a bunk bed in their room.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "trundle bed",
      meaning: "a low bed on wheels stored under another bed",
      meaningKh: "គ្រាប់រុករើ (ក្រោមគ្រាប់)",
      example: "Pull out the trundle bed when guests stay over.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "sofa bed",
      meaning: "a sofa that folds out into a bed (also called a convertible sofa)",
      meaningKh: "សាឡុងគ្រាប់",
      example: "We sleep on the sofa bed in the living room.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "daybed",
      meaning: "a couch that can be used as a bed during the day",
      meaningKh: "គ្រាប់ពេលថ្ងៃ",
      example: "The daybed in the office doubles as a guest bed.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "cot",
      meaning: "a narrow, portable bed, often used for camping or guests",
      meaningKh: "គ្រាប់យុទ្ធនាការ",
      example: "He set up a cot in the corner of the room.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "waterbed",
      meaning: "a bed with a mattress filled with water",
      meaningKh: "គ្រាប់ទឹក",
      example: "Waterbeds were popular in the 1980s.",
      partOfSpeech: "noun",
      level: Level.ADVANCED,
    },
    {
      word: "canopy bed",
      meaning: "a bed with posts and fabric draped overhead",
      meaningKh: "គ្រាប់មានវាំងនន់",
      example: "The canopy bed gave the room a romantic look.",
      partOfSpeech: "noun",
      level: Level.ADVANCED,
    },
    {
      word: "hospital bed",
      meaning: "an adjustable bed used in hospitals or home care",
      meaningKh: "គ្រាប់មន្ទីរពេទ្យ",
      example: "The nurse raised the head of the hospital bed.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
  ];

  const kitchenVocab = [
    {
      word: "dishwasher",
      meaning: "a machine that washes dishes automatically",
      meaningKh: "ម៉ាស៊ីនលាងចាន",
      example: "Load the plates into the dishwasher after dinner.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "dishwasher detergent",
      meaning: "soap or powder used in a dishwasher",
      meaningKh: "សាប៊ូលាងចាន (សម្រាប់ម៉ាស៊ីន)",
      example: "Add dishwasher detergent before you start the cycle.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "dishwashing liquid",
      meaning: "liquid soap for washing dishes by hand",
      meaningKh: "សាប៊ូលាងចាន (លាងដៃ)",
      example: "Squirt a little dishwashing liquid into the sink.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "faucet",
      meaning: "a device that controls the flow of water from a pipe",
      meaningKh: "ក្បាលទឹក; កុងទឹក",
      example: "Turn off the faucet when you brush your teeth.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "kitchen sink",
      meaning: "a basin with a drain for washing dishes and food in the kitchen",
      meaningKh: "លិចផ្ទុកមាត់ផ្ទះបាយ",
      example: "She soaked the pots in the kitchen sink.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "garbage disposal",
      meaning: "a device under the sink that grinds food waste",
      meaningKh: "ម៉ាស៊ីនកៀរសំណល់អាហារ",
      example: "Run the garbage disposal after rinsing the plates.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "sponge",
      meaning: "a soft porous material used for washing and cleaning",
      meaningKh: "អេប៉ុង",
      example: "Wipe the counter with a damp sponge.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "scouring pad",
      meaning: "a rough pad used to scrub stuck-on food from pots and pans",
      meaningKh: "ក្រដាសដុស",
      example: "Use a scouring pad on the burnt pan.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "pot scrubber",
      meaning: "a brush or pad for scrubbing pots and pans",
      meaningKh: "ច្រាសដុសខ្ទាត់",
      example: "The pot scrubber is hanging by the sink.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "dish rack",
      meaning: "a rack where washed dishes are placed to dry",
      meaningKh: "រានជើងចាន",
      example: "Put the clean glasses on the dish rack.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "paper towel holder",
      meaning: "a stand or rod that holds a roll of paper towels",
      meaningKh: "ការកដាក់កោសក្រដាស",
      example: "The paper towel holder is mounted on the wall.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "dish towel",
      meaning: "a cloth towel used for drying dishes and hands in the kitchen",
      meaningKh: "ក្រណាត់ជូតចាន",
      example: "Hang the dish towel on the oven handle.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "trash compactor",
      meaning: "a machine that compresses garbage to save space",
      meaningKh: "ម៉ាស៊ីនបំពាក់សំណល់",
      example: "Empty the trash compactor when it is full.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "cabinet",
      meaning: "a cupboard with shelves or drawers for storing things",
      meaningKh: "ទូ",
      example: "The plates are in the upper cabinet.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "microwave oven",
      meaning: "an oven that cooks or heats food quickly using microwaves",
      meaningKh: "មីក្រូវ៉េវ",
      example: "Heat the soup in the microwave oven for two minutes.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "kitchen counter",
      meaning: "a flat work surface in the kitchen",
      meaningKh: "កាន់តុផ្ទះបាយ",
      example: "Chop the vegetables on the kitchen counter.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "cutting board",
      meaning: "a flat board used for cutting food",
      meaningKh: "ក្តារកាត់",
      example: "Wash the cutting board after cutting raw chicken.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "canister",
      meaning: "a container, often with a lid, for storing dry goods",
      meaningKh: "ធុងដាក់គ្រឿង",
      example: "She keeps flour in a canister on the counter.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "stove",
      meaning: "a kitchen appliance for cooking with burners on top (also called a range)",
      meaningKh: "ចង្ក្រាន",
      example: "Turn on the stove and boil the water.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "burner",
      meaning: "one of the circular parts on a stove where a pan is heated",
      meaningKh: "ភ្លើងចង្ក្រាន",
      example: "Use the front burner for the frying pan.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "oven",
      meaning: "a closed compartment used for baking or roasting food",
      meaningKh: "ទូអាំង",
      example: "Preheat the oven to 350 degrees.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "potholder",
      meaning: "a thick pad used to protect your hands from hot pots and pans",
      meaningKh: "ក្រដាសការពារដៃពីកម្តៅ",
      example: "Grab the hot pan with a potholder.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "toaster",
      meaning: "a small appliance that browns bread by heating it",
      meaningKh: "ម៉ាស៊ីនអាំងនំប៉័ង",
      example: "I like my toast dark from the toaster.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "spice rack",
      meaning: "a shelf or stand that holds spice jars",
      meaningKh: "រានជើងគ្រឿងទេស",
      example: "The spice rack is next to the stove.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "electric can opener",
      meaning: "a powered device that opens metal cans",
      meaningKh: "ម៉ាស៊ីនបើកកំប៉ុង (អគ្គិសនី)",
      example: "Use the electric can opener for the tomato sauce.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "cookbook",
      meaning: "a book of recipes and cooking instructions",
      meaningKh: "សៀវភៅធ្វើម្ហូប",
      example: "She found the recipe in an old cookbook.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "refrigerator",
      meaning: "an appliance that keeps food cold",
      meaningKh: "ទូទឹកកក",
      example: "Put the milk back in the refrigerator.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "freezer",
      meaning: "the compartment that keeps food frozen",
      meaningKh: "ទូបង្កក",
      example: "The ice cream is in the freezer.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "ice maker",
      meaning: "a device that makes ice cubes automatically",
      meaningKh: "ម៉ាស៊ីនធ្វើទឹកកក",
      example: "The refrigerator has a built-in ice maker.",
      partOfSpeech: "noun",
      level: Level.INTERMEDIATE,
    },
    {
      word: "ice tray",
      meaning: "a plastic mold used to freeze water into ice cubes",
      meaningKh: "សន្លឹកទឹកកក",
      example: "Fill the ice tray and put it in the freezer.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "refrigerator magnet",
      meaning: "a magnet used to hold notes or photos on a refrigerator door",
      meaningKh: "ស្ពៃទូទឹកកក",
      example: "She stuck the shopping list up with a refrigerator magnet.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "kitchen table",
      meaning: "a table in the kitchen used for eating or preparing food",
      meaningKh: "តុផ្ទះបាយ",
      example: "We ate breakfast at the kitchen table.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "placemat",
      meaning: "a mat placed under a plate on a table",
      meaningKh: "កំរាលធ្វើម្ហូប",
      example: "Set out a placemat for each guest.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "kitchen chair",
      meaning: "a chair used at the kitchen table",
      meaningKh: "កៅអីផ្ទះបាយ",
      example: "Pull up a kitchen chair and join us.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
    {
      word: "garbage pail",
      meaning: "a container for kitchen trash (also called a garbage can)",
      meaningKh: "ធុងសំណល់",
      example: "Empty the garbage pail when it smells.",
      partOfSpeech: "noun",
      level: Level.BEGINNER,
    },
  ];

  const allVocab = [...vocab, ...bedroomVocab, ...kitchenVocab, ...extraVocab];

  for (const v of allVocab) {
    await prisma.vocabulary.upsert({
      where: { word: v.word },
      update: v,
      create: v,
    });
  }

  // --- Lessons ---
  const grammar = await prisma.lesson.upsert({
    where: { slug: "present-simple-vs-present-continuous" },
    update: {},
    create: {
      title: "Present Simple vs. Present Continuous",
      slug: "present-simple-vs-present-continuous",
      type: LessonType.GRAMMAR,
      level: Level.BEGINNER,
      summary:
        "Learn when to use the present simple for habits and the present continuous for actions happening now.",
      content: `
## Present Simple
Use the **present simple** for habits, routines, and general truths.

- I **work** in a hospital.
- She **plays** tennis every weekend.
- The sun **rises** in the east.

## Present Continuous
Use the **present continuous** for actions happening right now or around now.

- I **am working** on a new project.
- They **are playing** outside.
- He **is studying** for his exam this week.

## Quick rule
- Habit / general fact → **present simple**
- Happening now / temporary → **present continuous**
`.trim(),
      highlight: [],
    },
  });

  for (const lesson of grammarLessons) {
    await prisma.lesson.upsert({
      where: { slug: lesson.slug },
      update: {
        title: lesson.title,
        type: lesson.type,
        level: lesson.level,
        summary: lesson.summary,
        content: lesson.content,
        highlight: lesson.highlight,
      },
      create: lesson,
    });
  }

  const reading = await prisma.lesson.upsert({
    where: { slug: "the-power-of-curiosity" },
    update: {},
    create: {
      title: "The Power of Curiosity",
      slug: "the-power-of-curiosity",
      type: LessonType.READING,
      level: Level.INTERMEDIATE,
      summary:
        "A short article about how curiosity drives learning and discovery.",
      content: `
Curiosity is one of the most powerful forces in human learning. When we are
**curious** about something, our brains release dopamine, which makes it easier
to remember new information. Researchers have found that **diligent** students
who ask many questions tend to learn faster than those who simply memorize.

In a recent study, participants were given a list of words. Those who explored
the meanings on their own retained the vocabulary far better. The lesson is
simple: stay **curious**, and learning becomes easier.
`.trim(),
      highlight: ["curious", "diligent", "curiosity"],
    },
  });

  const listening = await prisma.lesson.upsert({
    where: { slug: "ordering-coffee" },
    update: {},
    create: {
      title: "Ordering Coffee at a Café",
      slug: "ordering-coffee",
      type: LessonType.LISTENING,
      level: Level.BEGINNER,
      summary:
        "Practice a short dialogue between a customer and a barista.",
      content: "Listen to the dialogue and answer the comprehension questions.",
      audioUrl: "/audio/ordering-coffee.mp3",
      transcript: `
Barista: Hi there! What can I get for you today?
Customer: Hi, I'd like a medium latte, please.
Barista: Sure. Any milk preference?
Customer: Oat milk, please.
Barista: Got it. Anything else?
Customer: That's all. Thank you.
Barista: That will be four dollars fifty.
`.trim(),
      highlight: [],
    },
  });

  // --- Quizzes ---
  async function upsertQuiz(
    where: { skill: Skill; level: Level },
    data: Parameters<typeof prisma.quiz.create>[0]["data"],
  ) {
    const existing = await prisma.quiz.findFirst({ where });
    if (existing) return existing;
    return prisma.quiz.create({ data });
  }

  const vocabQuiz = await upsertQuiz(
    { skill: Skill.VOCABULARY, level: Level.BEGINNER },
    {
      title: "Beginner Vocabulary — Quick Check",
      description: "Multiple-choice questions on common adjectives.",
      skill: Skill.VOCABULARY,
      level: Level.BEGINNER,
      questions: {
        create: [
          {
            prompt: "What does 'curious' mean?",
            position: 0,
            answers: {
              create: [
                { text: "Eager to learn", isCorrect: true, position: 0 },
                { text: "Tired", isCorrect: false, position: 1 },
                { text: "Loud", isCorrect: false, position: 2 },
                { text: "Friendly", isCorrect: false, position: 3 },
              ],
            },
          },
          {
            prompt: "Choose the synonym for 'generous'.",
            position: 1,
            answers: {
              create: [
                { text: "Selfish", isCorrect: false, position: 0 },
                { text: "Giving", isCorrect: true, position: 1 },
                { text: "Quiet", isCorrect: false, position: 2 },
                { text: "Quick", isCorrect: false, position: 3 },
              ],
            },
          },
          {
            prompt: "What is the opposite of 'frequent'?",
            position: 2,
            answers: {
              create: [
                { text: "Often", isCorrect: false, position: 0 },
                { text: "Regular", isCorrect: false, position: 1 },
                { text: "Rare", isCorrect: true, position: 2 },
                { text: "Daily", isCorrect: false, position: 3 },
              ],
            },
          },
        ],
      },
    },
  );

  await upsertQuiz(
    { skill: Skill.VOCABULARY, level: Level.INTERMEDIATE },
    {
      title: "Intermediate Vocabulary — Quick Check",
      description: "Multiple-choice questions to expand your vocabulary.",
      skill: Skill.VOCABULARY,
      level: Level.INTERMEDIATE,
      questions: {
        create: [
          {
            prompt: "What does 'abundant' mean?",
            position: 0,
            answers: {
              create: [
                { text: "Plentiful", isCorrect: true, position: 0 },
                { text: "Scarce", isCorrect: false, position: 1 },
                { text: "Brief", isCorrect: false, position: 2 },
                { text: "Heavy", isCorrect: false, position: 3 },
              ],
            },
          },
          {
            prompt: "A 'diligent' person is someone who is…",
            position: 1,
            answers: {
              create: [
                { text: "Lazy", isCorrect: false, position: 0 },
                { text: "Hardworking", isCorrect: true, position: 1 },
                { text: "Forgetful", isCorrect: false, position: 2 },
                { text: "Cheerful", isCorrect: false, position: 3 },
              ],
            },
          },
          {
            prompt: "If someone is 'hesitant', they are…",
            position: 2,
            answers: {
              create: [
                { text: "Confident", isCorrect: false, position: 0 },
                { text: "Unsure", isCorrect: true, position: 1 },
                { text: "Angry", isCorrect: false, position: 2 },
                { text: "Excited", isCorrect: false, position: 3 },
              ],
            },
          },
        ],
      },
    },
  );

  await upsertQuiz(
    { skill: Skill.VOCABULARY, level: Level.ADVANCED },
    {
      title: "Advanced Vocabulary — Quick Check",
      description: "Multiple-choice questions on advanced vocabulary.",
      skill: Skill.VOCABULARY,
      level: Level.ADVANCED,
      questions: {
        create: [
          {
            prompt: "A 'benevolent' person is…",
            position: 0,
            answers: {
              create: [
                { text: "Kind and well-meaning", isCorrect: true, position: 0 },
                { text: "Greedy and selfish", isCorrect: false, position: 1 },
                { text: "Loud and rude", isCorrect: false, position: 2 },
                { text: "Quiet and shy", isCorrect: false, position: 3 },
              ],
            },
          },
          {
            prompt: "An 'eloquent' speaker is…",
            position: 1,
            answers: {
              create: [
                { text: "Confused and unclear", isCorrect: false, position: 0 },
                { text: "Boring and slow", isCorrect: false, position: 1 },
                { text: "Fluent and persuasive", isCorrect: true, position: 2 },
                { text: "Angry and harsh", isCorrect: false, position: 3 },
              ],
            },
          },
          {
            prompt: "Choose the closest meaning of 'sophisticated'.",
            position: 2,
            answers: {
              create: [
                { text: "Refined and complex", isCorrect: true, position: 0 },
                { text: "Simple and basic", isCorrect: false, position: 1 },
                { text: "Cheap and rough", isCorrect: false, position: 2 },
                { text: "Funny and silly", isCorrect: false, position: 3 },
              ],
            },
          },
        ],
      },
    },
  );

  const grammarQuiz = await prisma.quiz.create({
    data: {
      title: "Present Simple vs. Present Continuous — Practice",
      description: "Pick the correct verb form.",
      skill: Skill.GRAMMAR,
      level: Level.BEGINNER,
      lessonId: grammar.id,
      questions: {
        create: [
          {
            prompt: "She ____ to music every morning.",
            position: 0,
            answers: {
              create: [
                { text: "listens", isCorrect: true, position: 0 },
                { text: "is listening", isCorrect: false, position: 1 },
                { text: "listen", isCorrect: false, position: 2 },
                { text: "listening", isCorrect: false, position: 3 },
              ],
            },
          },
          {
            prompt: "Look! The cat ____ on the table.",
            position: 1,
            answers: {
              create: [
                { text: "sleeps", isCorrect: false, position: 0 },
                { text: "is sleeping", isCorrect: true, position: 1 },
                { text: "sleep", isCorrect: false, position: 2 },
                { text: "slept", isCorrect: false, position: 3 },
              ],
            },
          },
        ],
      },
    },
  });

  const listeningQuiz = await prisma.quiz.create({
    data: {
      title: "Ordering Coffee — Comprehension",
      description: "Answer the questions about the dialogue.",
      skill: Skill.LISTENING,
      level: Level.BEGINNER,
      lessonId: listening.id,
      questions: {
        create: [
          {
            prompt: "What size of latte does the customer order?",
            position: 0,
            answers: {
              create: [
                { text: "Small", isCorrect: false, position: 0 },
                { text: "Medium", isCorrect: true, position: 1 },
                { text: "Large", isCorrect: false, position: 2 },
                { text: "Extra large", isCorrect: false, position: 3 },
              ],
            },
          },
          {
            prompt: "Which milk does the customer choose?",
            position: 1,
            answers: {
              create: [
                { text: "Whole milk", isCorrect: false, position: 0 },
                { text: "Almond milk", isCorrect: false, position: 1 },
                { text: "Oat milk", isCorrect: true, position: 2 },
                { text: "Soy milk", isCorrect: false, position: 3 },
              ],
            },
          },
        ],
      },
    },
  });

  // --- A bit of demo progress so charts render something ---
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    await prisma.userProgress.create({
      data: {
        userId: demo.id,
        skill: i % 2 === 0 ? Skill.VOCABULARY : Skill.GRAMMAR,
        score: 60 + Math.floor(Math.random() * 35),
        minutes: 10 + Math.floor(Math.random() * 25),
        completedAt: day,
      },
    });
  }

  console.log("Seed complete:", {
    user: demo.email,
    vocabulary: allVocab.length,
    lessons: [grammar.slug, reading.slug, listening.slug],
    quizzes: [vocabQuiz.title, grammarQuiz.title, listeningQuiz.title],
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
