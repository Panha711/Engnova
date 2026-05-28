import { Level, LessonType } from "@prisma/client";

export type GrammarLesson = {
  slug: string;
  title: string;
  type: LessonType;
  level: Level;
  summary: string;
  content: string;
  highlight: string[];
};

export const grammarLessons: GrammarLesson[] = [
  {
    slug: "basic-sentence-structure",
    title: "Basic Sentence Structure",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary:
      "Learn the three core English sentence patterns: SV, SVO, and SVC.",
    content: `
## Subject + Verb (SV)
The simplest English sentence has just a **subject** and a **verb**.

- She **runs**.
- Birds **fly**.
- The baby **cries**.

## Subject + Verb + Object (SVO)
The most common English sentence pattern. An **object** receives the action.

- He **eats** an **apple**.
- I **read** a **book**.
- We **watch** a **movie**.

## Subject + Verb + Complement (SVC)
A **complement** describes or renames the subject. The verb is usually a form of *be*, *seem*, or *become*.

- She **is** happy.
- The soup **smells** good.
- He **became** a teacher.

## Quick rule
- Action that stops at the verb → **SV**
- Action that lands on something → **SVO**
- Describes what the subject is → **SVC**
`.trim(),
    highlight: ["subject", "verb", "object", "complement"],
  },
  {
    slug: "parts-of-speech",
    title: "Parts of Speech",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary:
      "The eight building blocks of English: nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions, and interjections.",
    content: `
## 1. Nouns
A **noun** names a person, place, thing, or idea.

- The **cat** is on the **table**.
- **Cambodia** is in Asia.
- **Love** is patient.

## 2. Pronouns
A **pronoun** replaces a noun.

- **He** is my friend. *(replaces "Dara")*
- **It** is raining.
- **They** are students.

## 3. Verbs
A **verb** expresses an action or a state of being.

- She **runs** fast.
- I **am** tired.
- We **learn** English.

## 4. Adjectives
An **adjective** describes a noun.

- It is a **beautiful** day.
- I have a **red** car.
- She is **kind**.

## 5. Adverbs
An **adverb** describes a verb, adjective, or another adverb.

- She runs **quickly**.
- He speaks English **very** well.
- The car is **extremely** fast.

## 6. Prepositions
A **preposition** shows the relationship between a noun and another word.

- The book is **on** the table.
- We arrived **at** noon.
- I'm going **to** the market.

## 7. Conjunctions
A **conjunction** connects words, phrases, or clauses.

- I like tea **and** coffee.
- I'm tired, **but** I'm happy.
- We'll stay home **if** it rains.

## 8. Interjections
An **interjection** expresses emotion or surprise.

- **Wow!** That's amazing.
- **Oh no**, I forgot my keys.
- **Hooray!** We won.
`.trim(),
    highlight: [
      "noun",
      "pronoun",
      "verb",
      "adjective",
      "adverb",
      "preposition",
      "conjunction",
      "interjection",
    ],
  },
  {
    slug: "english-tenses",
    title: "The 12 English Tenses — Full Reference",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "All 12 English tenses with signal words, forms, and examples in affirmative, negative, and question forms.",
    content: `
English has 12 tenses grouped into three time periods (present, past, future), each with four aspects (simple, continuous, perfect, perfect continuous). Each tense has its own **signal words** — these are time expressions that hint which tense to use.

## Present tenses

### 1. Present Simple
For habits, repeated actions, general truths, and timetables.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **Subject + base verb** (he/she/it: + **s**) | I **work**. He **works**. | I **don't work**. He **doesn't work**. | **Do** I work? **Does** he work? |

**Signal words:** every day, always, often, usually, sometimes, seldom, never, first … then.

### 2. Present Continuous
For actions happening **right now** or around now, and for fixed future plans.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **am/is/are + verb-ing** | I **am working**. He **is working**. | I **am not working**. He **isn't working**. | **Am** I working? **Is** he working? |

**Signal words:** now, at the moment, Look!, Listen!.

### 3. Present Perfect
For past actions with a result in the present, or actions that started in the past and continue now.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **have/has + past participle** | I **have worked**. He **has gone**. | I **haven't worked**. He **hasn't gone**. | **Have** I worked? **Has** he gone? |

**Signal words:** just, yet, never, ever, already, so far, up to now, since, for, recently.

### 4. Present Perfect Continuous
For actions that began in the past and have just stopped — emphasises **how long**.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **have/has + been + verb-ing** | I **have been working**. He **has been working**. | I **haven't been working**. He **hasn't been working**. | **Have** I been working? **Has** he been working? |

**Signal words:** all day, the whole day, how long, since, for.

## Past tenses

### 5. Past Simple
For finished actions in the past, usually with a specific time.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **regular: verb + ed** / **irregular: 2nd column** | I **worked**. He **went**. | I **didn't work**. He **didn't go**. | **Did** I work? **Did** he go? |

**Signal words:** yesterday, last week, … ago, in 1990.

### 6. Past Continuous
For an action in progress in the past, often interrupted by another action.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **was/were + verb-ing** | I **was working**. He **was working**. | I **wasn't working**. He **wasn't working**. | **Was** I working? **Was** he working? |

**Signal word:** while.

### 7. Past Perfect
For an action that was completed before another past action — the "past of the present perfect."

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **had + past participle** | I **had worked**. He **had gone**. | I **hadn't worked**. He **hadn't gone**. | **Had** I worked? **Had** he gone? |

**Signal words:** already, just, never.

### 8. Past Perfect Continuous
How long something **had been** happening before another past event.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **had + been + verb-ing** | I **had been working**. He **had been working**. | I **hadn't been working**. He **hadn't been working**. | **Had** I been working? **Had** he been working? |

**Signal words:** how long, since, for.

## Future tenses

### 9. Will-Future
For predictions, spontaneous decisions, and the main clause of First Conditional sentences.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **will + base verb** | I'**ll work**. He'**ll go**. | I **won't work**. He **won't go**. | **Will** I work? **Will** he go? |

### 10. Going-to-Future
For plans you have already decided on, or predictions based on present evidence.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **am/is/are + going to + base verb** | I**'m going to work**. He'**s going to go**. | I**'m not going to work**. He'**s not going to go**. | **Am** I going to work? **Is** he going to go? |

### 11. Future Continuous
An action will be in progress at a certain time in the future.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **will + be + verb-ing** | I**'ll be working**. He**'ll be working**. | I **won't be working**. He **won't be working**. | **Will** I be working? **Will** he be working? |

### 12. Future Perfect
Something will already have happened before a certain time in the future.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **will + have + past participle** | I**'ll have worked**. He**'ll have gone**. | I **won't have worked**. He **won't have gone**. | **Will** I have worked? **Will** he have gone? |

### Future Perfect Continuous
Emphasises how long something **will have been** happening by a future point.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **will + have + been + verb-ing** | I**'ll have been working**. He**'ll have been working**. | I **won't have been working**. He **won't have been working**. | **Will** I have been working? **Will** he have been working? |

## Tips for picking the right tense
- Look for **signal words** — they often tell you the tense immediately.
- Ask: is the action *finished*, *still happening*, or *expected*?
- For **how long** something has been going on → use a perfect continuous tense.
- For a finished action with a clear past time → use **past simple**, not present perfect.
`.trim(),
    highlight: [
      "present simple",
      "present continuous",
      "present perfect",
      "past simple",
      "past continuous",
      "past perfect",
      "future simple",
      "future continuous",
      "future perfect",
    ],
  },
  {
    slug: "modal-verbs",
    title: "Modal Verbs",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Modal verbs — can, could, may, might, must, should, would — express ability, possibility, necessity, and permission.",
    content: `
Modal verbs are special helping verbs. They never change form (no -s, -ed, or -ing), and the verb that follows is always in the **base form**.

## Ability — can / could
Use **can** for present ability and **could** for past ability.
- I **can swim**.
- She **could read** at age four.

## Possibility — may / might
Use **may** or **might** for things that are possible but not certain.
- It **may rain** tomorrow.
- He **might be** late.

## Permission — can / may / could
Use these to ask for or give permission. **May** is the most formal.
- **Can I go** outside?
- **May I come in?**
- You **could leave** early today.

## Necessity / obligation — must / have to
Use **must** for strong necessity or rules.
- You **must wear** a helmet.
- We **must pay** taxes.

## Advice — should / ought to
Use **should** for advice or suggestions.
- You **should drink** more water.
- He **should apologize**.

## Quick rule
After a modal verb, always use the **base form** of the next verb. Never use *to*:
- ✅ I can **swim**.
- ❌ I can **to swim**.
`.trim(),
    highlight: ["modal verb", "can", "could", "may", "might", "must", "should", "would"],
  },
  {
    slug: "intensifiers",
    title: "Intensifiers",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary:
      "Make adjectives and adverbs stronger or weaker with words like very, absolutely, and quite.",
    content: `
**Intensifiers** are adverbs that strengthen the meaning of another word.

## Very
The most common intensifier — works with most adjectives.
- She is **very kind**.
- This soup is **very hot**.

## Absolutely
Used with **extreme** adjectives like *beautiful*, *amazing*, *terrible*, *impossible*. Do not use *absolutely* with regular adjectives.
- It is **absolutely beautiful**.
- The food was **absolutely delicious**.
- ❌ It is *absolutely* hot. → use **very hot**

## Quite
Means *fairly* or *somewhat*. Can soften a statement.
- The movie was **quite interesting**.
- It's **quite cold** today.

## Other useful intensifiers
- **Really** — She is **really tired**.
- **Extremely** — It's **extremely difficult**.
- **Too** *(negative — more than wanted)* — The coffee is **too hot**.

## Quick rule
- Regular adjective → **very** / **really**
- Extreme adjective → **absolutely**
- Softer / moderate → **quite** / **fairly**
`.trim(),
    highlight: ["intensifier", "very", "absolutely", "quite", "really", "extremely"],
  },
  {
    slug: "conditional-sentences",
    title: "Conditional Sentences",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "If-clauses for real, unreal, and imagined situations — zero, first, second, and third conditionals.",
    content: `
A **conditional sentence** has two parts: an **if-clause** (the condition) and a **main clause** (the result).

## Zero Conditional — general truths
**If + present simple, present simple**
Use for facts and things that are always true.
- If you **heat** water to 100°C, it **boils**.
- If it **rains**, the ground **gets** wet.

## First Conditional — real future
**If + present simple, will + verb**
Use for likely or possible future situations.
- If it **rains**, I **will stay** home.
- If you **study**, you **will pass** the exam.

## Second Conditional — imagined / unlikely
**If + past simple, would + verb**
Use for unreal or hypothetical present/future situations.
- If I **were** rich, I **would travel** the world.
- If she **knew**, she **would tell** you.

> Note: In careful English, use **were** (not *was*) for *I/he/she/it* in the second conditional.

## Third Conditional — past regret / impossible past
**If + past perfect, would have + past participle**
Use for things that did not happen in the past.
- If I **had studied**, I **would have passed** the exam.
- If she **had called**, I **would have come**.

## Quick rule
- Always true → **zero**
- Possibly real future → **first**
- Imagined present/future → **second**
- Imagined past → **third**
`.trim(),
    highlight: [
      "conditional",
      "zero conditional",
      "first conditional",
      "second conditional",
      "third conditional",
      "if",
    ],
  },
  {
    slug: "prepositions",
    title: "Prepositions of Place, Time, and Direction",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary:
      "When to use in, on, at, to, and towards — the most common preposition patterns.",
    content: `
## Prepositions of place — in / on / at

- **In** — inside something *(a country, a room, a box)*
  - The keys are **in** the drawer.
  - She lives **in** Phnom Penh.
- **On** — on a surface
  - The cat is **on** the table.
  - The picture is **on** the wall.
- **At** — at a point or specific location
  - I'll meet you **at** the station.
  - He is **at** home.

## Prepositions of time — at / in / on

- **At** — for clock times
  - I will meet you **at** 5 o'clock.
  - We eat **at** noon.
- **In** — for months, years, seasons, and parts of the day
  - She was born **in** 1995.
  - We travel **in** the summer.
  - I study **in** the evening.
- **On** — for days and dates
  - The party is **on** Saturday.
  - He arrives **on** March 5th.

## Prepositions of direction — to / towards / into / onto

- **To** — toward a destination
  - He is going **to** the market.
  - She walked **to** school.
- **Towards** — in the direction of (not necessarily arriving)
  - He walked **towards** the door.
- **Into** — entering an enclosed space
  - She walked **into** the room.
- **Onto** — onto a surface
  - The cat jumped **onto** the bed.

## Quick rule
- **at** for points (specific time / place)
- **on** for surfaces or days
- **in** for enclosed spaces or longer time periods
`.trim(),
    highlight: ["preposition", "in", "on", "at", "to", "towards"],
  },
  {
    slug: "formal-informal-language",
    title: "Formal and Informal Language",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Recognize when to use professional language and when casual English fits.",
    content: `
## Formal language
Used in professional settings: business emails, academic writing, formal speeches, and conversations with strangers or superiors.

- **I regret to inform you that I cannot attend the meeting.**
- I would like to **request** more information.
- Please **accept** my apologies for the delay.

Common formal features:
- Full forms instead of contractions: *I am* / *do not* / *cannot*
- Polite phrases: *Would you mind…*, *I would appreciate…*, *Please find attached…*
- Precise, longer vocabulary: *purchase* (not *buy*), *commence* (not *start*), *require* (not *need*)

## Informal language
Used with friends and family, in text messages, and in casual conversation.

- **I can't come to the meeting.**
- **Hey, what's up?**
- **Wanna grab lunch?**

Common informal features:
- Contractions: *I'm*, *don't*, *can't*, *we're*
- Slang and idioms: *cool*, *hang out*, *no big deal*
- Shorter, common vocabulary

## Quick comparison

| Formal | Informal |
| --- | --- |
| I would like to request… | Can I have… |
| Could you please… | Can you… |
| I apologize. | Sorry. |
| I do not understand. | I don't get it. |

## Quick rule
- Writing to a stranger, boss, or professor → **formal**
- Writing to a friend or family member → **informal**
- Email at work → usually **semi-formal** *(polite but with contractions)*
`.trim(),
    highlight: ["formal", "informal", "contraction"],
  },
  {
    slug: "common-mistakes",
    title: "Common English Mistakes",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Tense slips, wrong prepositions, and other errors learners often make.",
    content: `
## 1. Wrong past participle
The past tense of *go* is **went**. The past participle (used with *have*) is **gone** — never *went*.
- ❌ I **have went** to the store.
- ✅ I **have gone** to the store.

## 2. Wrong preposition with adjectives
Many adjectives take a fixed preposition. Memorize them.
- ❌ I am **good in** playing tennis.
- ✅ I am **good at** playing tennis.

Other common pairs:
- **interested in** (not *of*)
- **afraid of** (not *from*)
- **married to** (not *with*)
- **different from** (not *than*)

## 3. Confusing your / you're
- **your** = belonging to you → *Is this your book?*
- **you're** = you are → *You're late.*

## 4. Confusing its / it's
- **its** = belonging to it → *The dog wagged its tail.*
- **it's** = it is → *It's raining.*

## 5. Double negatives
Avoid using two negatives in the same clause.
- ❌ I **don't know nothing**.
- ✅ I **don't know anything**.

## 6. Wrong subject-verb agreement
The verb must match the subject in number.
- ❌ She **go** to school every day.
- ✅ She **goes** to school every day.

## 7. Missing articles
English often needs *a*, *an*, or *the* where other languages don't.
- ❌ I am **teacher**.
- ✅ I am **a teacher**.
`.trim(),
    highlight: [
      "past participle",
      "preposition",
      "your",
      "you're",
      "its",
      "it's",
      "double negative",
      "agreement",
      "article",
    ],
  },
  {
    slug: "pronunciation-and-stress",
    title: "Pronunciation and Word Stress",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Silent letters and stress patterns that change a word's meaning.",
    content: `
## Silent letters
Many English words have letters you write but don't pronounce.

- **Thumb** — the *b* is silent → *thum*
- **Knee** — the *k* is silent → *nee*
- **Hour** — the *h* is silent → *our*
- **Lamb** — the *b* is silent → *lam*
- **Write** — the *w* is silent → *rite*
- **Listen** — the *t* is silent → *li-sen*

Tip: silent letters often appear at the start of a word *(know, knife, gnome)* or before another consonant *(comb, doubt)*.

## Word stress
In English, most multi-syllable words have one syllable that is stressed (louder, longer, clearer). The stress can **change the meaning** of a word.

- **'record** (noun) — *I bought a new* **'rec**·*ord*. *(a vinyl disc)*
- *re·***'cord** (verb) — *Please* **re·'cord** *the meeting.* *(to capture audio)*

Other noun/verb pairs that change with stress:
- **'present** *(noun, gift)* vs **pre'sent** *(verb, to give)*
- **'object** *(noun, a thing)* vs **ob'ject** *(verb, to disagree)*
- **'export** *(noun)* vs **ex'port** *(verb)*

## General rules
- Two-syllable **nouns** usually stress the first syllable: **'doc**·tor, **'win**·dow.
- Two-syllable **verbs** usually stress the second syllable: re·**'lax**, en·**'joy**.
- The stressed syllable sounds **longer and louder** — practice exaggerating it.

## Quick rule
When learning a new word, learn **three** things:
1. The spelling
2. The meaning
3. The stress pattern
`.trim(),
    highlight: ["silent letter", "stress", "syllable", "pronunciation"],
  },
  {
    slug: "conditional-forms",
    title: "Conditional Forms (would, would have, would be doing)",
    type: LessonType.GRAMMAR,
    level: Level.ADVANCED,
    summary:
      "The four forms of conditional verbs: simple, progressive, perfect, and perfect progressive.",
    content: `
Conditional forms are the verb shapes used in the **result clause** of conditional sentences. They use **would** as the auxiliary. Each has four shapes, matching the same simple / continuous / perfect / perfect-continuous pattern as the regular tenses.

> Need to review the *if-clauses* themselves (First, Second, Third, Zero)? See the **Conditional Sentences** lesson.

## 1. Conditional Simple
For something that **might happen**. Used in the main clause of **Second Conditional** sentences.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **would + base verb** | I **would work**. He **would go**. | I **wouldn't work**. He **wouldn't go**. | **Would** I work? **Would** he go? |

- If I had more time, I **would learn** the piano.
- She **would help** us if she could.

## 2. Conditional Progressive
For something that **might be happening** — emphasises the **length** of the action.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **would + be + verb-ing** | I **would be working**. He **would be working**. | I **wouldn't be working**. He **wouldn't be working**. | **Would** I be working? **Would** he be working? |

- If I lived in Paris, I **would be speaking** French every day.
- He **would be sleeping** now if he weren't on a flight.

## 3. Conditional Perfect
For something that **might have happened in the past**. Used in the main clause of **Third Conditional** sentences.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **would + have + past participle** | I **would have worked**. He **would have gone**. | I **wouldn't have worked**. He **wouldn't have gone**. | **Would** I have worked? **Would** he have gone? |

- If I had studied, I **would have passed** the exam.
- She **would have called** you if she had known.

## 4. Conditional Perfect Progressive
For something that **might have been happening** in the past — emphasises the **length** of that action.

| Form | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| **would + have + been + verb-ing** | I **would have been working**. He **would have been working**. | I **wouldn't have been working**. He **wouldn't have been working**. | **Would** I have been working? **Would** he have been working? |

- If you had arrived at noon, I **would have been working** for three hours.
- They **would have been driving** all night if they had taken the long route.

## Quick rule
| If you mean… | Use this |
| --- | --- |
| Might happen (now/future) | **would + verb** |
| Might be happening (now/future, ongoing) | **would be + verb-ing** |
| Might have happened (past) | **would have + past participle** |
| Might have been happening (past, ongoing) | **would have been + verb-ing** |
`.trim(),
    highlight: [
      "conditional",
      "would",
      "would have",
      "would be",
      "would have been",
    ],
  },
];
