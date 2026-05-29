import { Level, LessonType } from "@prisma/client";
import type { GrammarLesson } from "./lessons";

/**
 * 25 intermediate (B1) grammar lessons, sourced from the
 * "Intermediate English Grammar (B1)" PDF outline.
 * Each lesson has a clear summary plus a markdown body
 * with rules, examples, and common-mistake warnings.
 */
export const intermediateB1Grammar: GrammarLesson[] = [
  {
    slug: "b1-present-perfect",
    title: "B1 Lesson 1: Present Perfect",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Connect the past to the present with have/has + past participle.",
    content: `
## Form
**have / has** + past participle (V3).

- I **have visited** Japan.
- She **has lived** in Phnom Penh for ten years.
- They **haven't finished** the project **yet**.
- **Has** he **arrived**?

## Use it for

### 1. Life experience (the time is unspecified)
- I **have eaten** sushi before.
- She **has never been** to Europe.

### 2. Past action with a result now
- He **has broken** his leg. *(it's still broken)*
- I **have lost** my keys. *(I still can't find them)*

### 3. Unfinished time (today, this week, this year)
- We **have studied** three lessons **this week**.
- I **have drunk** two coffees **today**.

### 4. Recent actions with *just*, *already*, *yet*
- I'**ve just** seen her.
- He **has already** left.
- They **haven't** called **yet**.

## Common signal words
*ever, never, just, already, yet, so far, recently, for, since*

> **Tip:** Use **for** + a period (*for two years*) and **since** + a starting point (*since 2020*).
`.trim(),
    highlight: ["have", "has", "past participle", "ever", "never", "just", "yet"],
  },
  {
    slug: "b1-present-perfect-vs-past-simple",
    title: "B1 Lesson 2: Present Perfect vs Past Simple",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Choose the right tense: finished time → past simple, connection to now → present perfect.",
    content: `
## The key question
Is the time period **finished** or **still open**?

| Past Simple | Present Perfect |
| --- | --- |
| Finished time (*yesterday, last year, in 2010, ago*) | Unfinished time (*today, this week, so far*) |
| Says **when** | Doesn't say when — or says *just / already / yet* |
| The action is in the past, no link to now | The action affects now |

## Compare

- I **saw** her **yesterday**. ✅ *(specific past time)*
- I **have seen** her **today**. ✅ *(today is still open)*
- I **saw** her. ❌ *(unless context gives a time)*

- He **lived** in Paris **for five years**. *(he no longer lives there)*
- He **has lived** in Paris **for five years**. *(he still lives there)*

- **Did** you **eat** lunch? *(at a specific lunchtime)*
- **Have** you **eaten** lunch? *(at any point today)*

## Watch out
- With **ago**, always use **past simple**: *I met her two years **ago**.* (never *have met*)
- With **when** + a specific time: past simple.
- With **since** / **for** (still true now): present perfect.
`.trim(),
    highlight: ["past simple", "present perfect", "for", "since", "ago", "yet"],
  },
  {
    slug: "b1-past-continuous",
    title: "B1 Lesson 3: Past Continuous",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Use was/were + verb-ing for actions in progress in the past.",
    content: `
## Form
**was / were** + verb-**ing**.

- I **was reading** at 9 p.m.
- They **were playing** football.
- She **wasn't sleeping**.
- **Were** you **working** yesterday?

## Use it for

### 1. An action in progress at a past moment
- At 8 a.m. I **was driving** to work.

### 2. A longer action interrupted by a shorter one
Use **past continuous** + **past simple** + *when / while*.

- I **was cooking** **when** the phone **rang**.
- **While** she **was studying**, the lights **went** out.

### 3. Two actions happening at the same time
- He **was reading** while she **was watching** TV.

### 4. Background description in a story
- The sun **was shining** and the birds **were singing**.

## Watch out
- **State verbs** (know, want, believe, love, like) usually stay in the simple form: *I **knew** him*, not *I was knowing him*.
- **When** is usually followed by past simple (the short event). **While** is usually followed by past continuous (the longer event).
`.trim(),
    highlight: ["was", "were", "verb-ing", "when", "while"],
  },
  {
    slug: "b1-future-forms",
    title: "B1 Lesson 4: Future Forms",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Will, be going to, present continuous, and present simple — four ways to talk about the future.",
    content: `
English doesn't have one single "future tense." You pick the form based on **why** you're talking about the future.

## 1. *will* — predictions and instant decisions
- It **will rain** later. *(prediction)*
- I**'ll have** the chicken, please. *(decision made now)*
- I **will help** you. *(offer / promise)*

## 2. *be going to* — plans and visible evidence
- We **are going to move** house next year. *(decided in advance)*
- Look at those clouds — it**'s going to rain**. *(evidence you can see now)*

## 3. Present continuous — fixed arrangements
For plans you've already arranged with someone (a meeting, a flight, a dinner).

- I**'m meeting** Sara at 7 p.m.
- We **are flying** to Tokyo on Friday.

## 4. Present simple — timetables and schedules
For things on a fixed schedule (trains, classes, films).

- The train **leaves** at 9:15.
- The film **starts** at 8 p.m.

## Quick decision guide

| You mean… | Use |
| --- | --- |
| I think / I predict | **will** |
| I just decided | **will** |
| I planned this already | **going to** |
| I can see it coming | **going to** |
| I arranged it with someone | **present continuous** |
| The schedule says so | **present simple** |
`.trim(),
    highlight: ["will", "going to", "present continuous", "present simple"],
  },
  {
    slug: "b1-first-conditional",
    title: "B1 Lesson 5: First Conditional",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Talk about real, possible future situations: If + present, will + verb.",
    content: `
## Form
**If** + present simple, **will** + base verb.

- **If** it **rains**, I **will stay** home.
- **If** you **study**, you **will pass**.
- You **will be** late **if** you **don't hurry**.

> The two halves can swap places. When *if* comes first, use a comma.

## Use it for
Real, **possible** future situations — things that might genuinely happen.

- **If** I **see** Maya, I**'ll tell** her.
- **If** the bus **is** late, we**'ll take** a taxi.

## Variations in the main clause
You don't have to use *will* — any future-meaning form works.

- **If** he **calls**, **tell** him I'm out. *(imperative)*
- **If** you **want**, you **can come**. *(modal)*
- **If** it **rains**, we**'re going to** stay in. *(going to)*

## Watch out
- **Never** use *will* in the *if*-clause: ❌ *If it will rain…* → ✅ *If it rains…*
- Use first conditional for **likely** futures, second conditional for **unlikely** ones (see Lesson 6).
`.trim(),
    highlight: ["if", "will", "first conditional", "present"],
  },
  {
    slug: "b1-second-conditional",
    title: "B1 Lesson 6: Second Conditional",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Imagine unreal or unlikely present/future situations: If + past, would + verb.",
    content: `
## Form
**If** + past simple, **would** + base verb.

- **If** I **had** more money, I **would travel** the world.
- She **would help** us **if** she **knew**.
- **If** I **were** you, I **wouldn't do** that.

## Use it for

### 1. Imaginary situations
- **If** I **were** a bird, I **would fly** everywhere.

### 2. Unlikely future situations
- **If** I **won** the lottery, I **would buy** a house. *(probably won't happen)*

### 3. Polite advice
- **If** I **were** you, I**'d apologise**.

## *Was* or *were*?
With *I / he / she / it*, classic English uses **were** in second conditionals — especially in advice.

- ✅ *If I **were** rich…*
- 🆗 *If I **was** rich…* *(informal — accepted but less formal)*

## First vs Second — what's the difference?

| | First conditional | Second conditional |
| --- | --- | --- |
| Situation | Real, possible | Unreal / unlikely |
| Example | If it **rains**, I **will stay** home. | If I **had** wings, I **would fly**. |
| Speaker thinks… | "This might really happen." | "This is just imagination." |

## Watch out
- Don't use *would* in the *if*-clause: ❌ *If I would have money…* → ✅ *If I had money…*
- *Could* and *might* can replace *would* to soften the result: *If I had time, I **might** join you.*
`.trim(),
    highlight: ["if", "would", "were", "second conditional", "past simple"],
  },
  {
    slug: "b1-passive-voice",
    title: "B1 Lesson 7: Passive Voice",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Focus on the action or the receiver, not the doer: be + past participle.",
    content: `
## Form
**be** (in any tense) + past participle (V3).

| Tense | Active | Passive |
| --- | --- | --- |
| Present simple | They **build** houses. | Houses **are built**. |
| Present continuous | They **are building** a house. | A house **is being built**. |
| Past simple | They **built** the house. | The house **was built**. |
| Present perfect | They **have built** the house. | The house **has been built**. |
| Future (will) | They **will build** a house. | A house **will be built**. |
| Modal | They **must build** it. | It **must be built**. |

## Use it for

### 1. When the doer is unknown or obvious
- My bike **was stolen** last night. *(we don't know who)*
- The new bridge **was opened** yesterday. *(everyone knows by the mayor)*

### 2. When the action is more important than the doer
- English **is spoken** all over the world.
- This book **was written** in 1925.

### 3. In formal / scientific / news writing
- The results **were analysed** carefully.
- Three people **were injured** in the accident.

## Showing the doer — *by*
Add **by** + agent only when it matters.

- The novel **was written by** George Orwell.
- The window **was broken by** a stone.

## Watch out
- The verb **be** changes tense — the past participle does not.
- Verbs without an object (arrive, go, happen) **cannot** be made passive.
- Don't overuse the passive; active sentences are usually clearer.
`.trim(),
    highlight: ["be", "past participle", "passive", "by"],
  },
  {
    slug: "b1-reported-speech",
    title: "B1 Lesson 8: Reported Speech",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Report what someone said: shift tenses, pronouns, and time words one step back.",
    content: `
## Tense shift (backshift)
When the reporting verb (*said*, *told*) is past, tenses usually move one step back.

| Direct speech | Reported speech |
| --- | --- |
| "I **am** tired." | He said he **was** tired. |
| "I **work** here." | She said she **worked** here. |
| "I **am working**." | He said he **was working**. |
| "I **worked** there." | She said she **had worked** there. |
| "I **have finished**." | He said he **had finished**. |
| "I **will help**." | She said she **would help**. |
| "I **can swim**." | He said he **could swim**. |
| "I **may come**." | She said she **might come**. |
| "I **must go**." | He said he **had to go**. |

> *Must, should, would, could, might, ought to* usually **don't change**.

## Pronouns and time
Pronouns and time expressions shift to match the new speaker / moment.

| Direct | Reported |
| --- | --- |
| I, me, my | he/she, him/her, his/her |
| now | then |
| today | that day |
| tomorrow | the next day |
| yesterday | the day before |
| this | that |
| here | there |

### Example
- Direct: *Maya said, "**I** will call **you tomorrow**."*
- Reported: *Maya said **she** would call **me the next day**.*

## Reported questions
- Use statement word order (no inversion, no *do/does*).
- Yes/no questions → use **if** or **whether**.
- Wh-questions → keep the wh-word.

- "**Where do** you live?" → She asked **where I lived**.
- "**Are** you ready?" → He asked **if I was ready**.

## *Say* vs *tell*
- **say** (+ that): *He **said** that he was tired.* (no person needed)
- **tell** + person: *He **told me** that he was tired.* (always with a person)

## Watch out
- If the original statement is **still true** or a **general fact**, you can keep the present tense: *She said the Earth **is** round.*
- No backshift after present reporting verbs: *She **says** she **is** busy.*
`.trim(),
    highlight: ["reported speech", "said", "told", "if", "whether", "backshift"],
  },
  {
    slug: "b1-relative-clauses",
    title: "B1 Lesson 9: Relative Clauses",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Add information to a noun with who, which, that, whose, where, and when.",
    content: `
## Relative pronouns

| Word | Used for |
| --- | --- |
| **who** | people |
| **which** | things / animals |
| **that** | people or things (less formal) |
| **whose** | possession |
| **where** | places |
| **when** | times |
| **why** | reasons |

### Examples
- The woman **who** called you is my aunt.
- The book **which / that** I bought is great.
- That's the man **whose** car was stolen.
- This is the café **where** we met.
- I remember the day **when** we first met.

## Defining vs non-defining

### Defining clauses — essential information
No commas. They tell us **which** person or thing.

- The student **who studied** passed the exam.

### Non-defining clauses — extra information
Use commas. They add detail you could remove without losing the main meaning.

- My brother, **who lives in Paris**, is a doctor.
- The Eiffel Tower, **which was built in 1889**, is in Paris.

> In non-defining clauses, you **cannot** use *that* — only *who* / *which*.

## Dropping the relative pronoun
In **defining** clauses, you can drop **who / which / that** when it's the object.

- The book *(that)* I read was great.
- The man *(who)* I met was kind.

> You **cannot** drop the pronoun when it's the subject of the clause: *The man **who lives** here is my uncle.*

## Common mistakes
- ❌ The man **who he** called me. → ✅ The man **who** called me.
- ❌ The book, **that** I bought, is great. → ✅ The book**, which** I bought, is great. *(non-defining → which, not that)*
`.trim(),
    highlight: ["who", "which", "that", "whose", "where", "when", "relative"],
  },
  {
    slug: "b1-modal-verbs",
    title: "B1 Lesson 10: Modal Verbs",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Express ability, possibility, obligation, and permission with can, could, may, might, must, should, would.",
    content: `
## How modals behave
- Always followed by the **base verb** (no *to*, no -s).
- Never take *do / does / did* in questions and negatives.
- Same form for every subject: *He **can** swim* (not *cans*).

## Common modals

### Ability — *can / could / be able to*
- I **can swim**.
- When I was a child, I **could climb** trees.
- I **was able to** finish on time. *(specific past achievement)*

### Possibility — *may / might / could*
- It **may rain** later.
- He **might be** at home.
- You **could be** right.

### Permission — *can / could / may*
- **Can** I leave early? *(informal)*
- **Could** I borrow your pen? *(polite)*
- **May** I come in? *(formal)*

### Obligation — *must / have to / should*
- You **must wear** a seatbelt. *(strong, often a rule)*
- I **have to work** on Saturday. *(external obligation)*
- You **should drink** more water. *(advice)*

### Prohibition — *mustn't*
- You **mustn't smoke** here.

### Absence of obligation — *don't have to / needn't*
- You **don't have to come** if you're tired.
- We **needn't worry**.

## *Must* vs *have to* — the key difference

| | Must | Have to |
| --- | --- | --- |
| Source | Speaker feels it's necessary | External rule / situation |
| Negative meaning | **mustn't** = prohibition | **don't have to** = not necessary |

- I **must call** my mum. *(I feel I should)*
- I **have to wear** a uniform. *(my school says so)*

## Past modals — quick look
- *can* → *could* (past ability) / *was able to* (specific achievement)
- *must* → *had to* (past obligation)
- *should have* + V3 → past advice / regret: *You **should have called** me.*
`.trim(),
    highlight: ["can", "could", "may", "might", "must", "should", "have to"],
  },
  {
    slug: "b1-gerunds-and-infinitives",
    title: "B1 Lesson 11: Gerunds and Infinitives",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Verb + verb: when to use the -ing form and when to use to + verb.",
    content: `
## Gerund (verb-**ing** used as a noun)

### Use after:
- **Verbs of liking / disliking:** enjoy, like, love, hate, don't mind
  - I enjoy **reading**.
- **Verbs of stopping / continuing / suggesting:** stop, finish, avoid, suggest, recommend, keep
  - She suggested **going** out.
- **Prepositions:**
  - He's good **at swimming**.
  - I'm tired **of waiting**.
- **As a subject:**
  - **Smoking** is bad for you.

## Infinitive (**to** + base verb)

### Use after:
- **Verbs of wanting / planning / deciding:** want, need, hope, plan, decide, agree, promise, refuse
  - I want **to leave**.
- **Adjectives:**
  - It's easy **to learn**.
  - I'm happy **to help**.
- **To explain purpose** ("in order to"):
  - I came **to see** you.

## Both forms, similar meaning
With *like, love, hate, start, begin, continue*, both forms are usually fine.

- I **like reading** / I **like to read**.
- It **started raining** / It **started to rain**.

## Both forms, **different** meaning
Some verbs change meaning depending on which form follows.

| Verb | + -ing | + to-infinitive |
| --- | --- | --- |
| **remember** | recall a past event | not forget to do |
| **forget** | forget a past event | not do what you should |
| **stop** | quit the activity | pause in order to do |
| **try** | experiment | make an effort |
| **regret** | be sorry about the past | be sorry to announce |

- I **remember meeting** her. *(I have that memory.)*
- I **remembered to call** her. *(I didn't forget.)*
- He **stopped smoking**. *(quit)*
- He **stopped to smoke**. *(paused to have a cigarette)*

## Watch out
After most prepositions and after **modal verbs**, the form is fixed:
- After preposition → **-ing**: *interested **in learning***
- After modal → **base verb**: *can **swim***, not *can to swim*
`.trim(),
    highlight: ["gerund", "infinitive", "-ing", "to", "remember", "stop"],
  },
  {
    slug: "b1-comparatives-and-superlatives",
    title: "B1 Lesson 12: Comparatives and Superlatives",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Compare two things, three or more, or talk about equal qualities.",
    content: `
## Comparatives — for two things
- Short adjectives: add **-er** → *bigger, faster, taller*
- Long adjectives: use **more** → *more beautiful, more expensive*
- Use **than** before the second thing.

- A train is **faster than** a bus.
- This phone is **more expensive than** that one.

## Superlatives — for three or more
- Short adjectives: **the** + **-est** → *the biggest, the fastest*
- Long adjectives: **the most** → *the most beautiful*

- Mount Everest is **the highest** mountain in the world.
- This is **the most interesting** book I've read.

## Spelling rules
- 1-syllable + consonant + vowel + consonant → double the consonant: big → **bigger**, hot → **hottest**
- Ends in *-e* → just add *-r* / *-st*: nice → **nicer**, **nicest**
- Ends in consonant + *y* → *y* becomes *i*: happy → **happier**, **happiest**

## Irregulars

| Adjective | Comparative | Superlative |
| --- | --- | --- |
| good | better | the best |
| bad | worse | the worst |
| far | farther / further | the farthest / the furthest |
| little | less | the least |
| much / many | more | the most |

## Equal comparisons — *as … as*
- She is **as tall as** her brother.
- It's **not as cold as** yesterday.

## *Less* and *the least*
- This book is **less interesting than** the other.
- That's **the least expensive** option.

## Watch out
- **Don't double up:** ❌ *more bigger* → ✅ *bigger*.
- Use **the** with superlatives: ❌ *Mount Everest is highest.* → ✅ *Mount Everest is **the** highest.*
- After comparatives, use *than*, not *that* or *then*.
`.trim(),
    highlight: ["comparative", "superlative", "than", "as", "more", "most", "better"],
  },
  {
    slug: "b1-quantifiers",
    title: "B1 Lesson 13: Quantifiers",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "How much? How many? Words that tell us about quantity.",
    content: `
## Match the quantifier to the noun

| | Countable | Uncountable | Both |
| --- | --- | --- | --- |
| **A lot** | many books | much water | a lot of / lots of |
| **A small amount** | a few books | a little water | some |
| **Almost none** | few books | little water | hardly any |
| **None** | no books | no water | no / not any |

## *Many* / *much*
- I have **many** friends. *(countable)*
- I don't have **much** time. *(uncountable)*
- **How many** people are coming?
- **How much** sugar do you want?

> In **positive** statements, *much* / *many* sound formal. Native speakers often prefer **a lot of**.

## *A few* / *a little* vs *few* / *little*

- I have **a few** friends. ✅ *(some — positive)*
- I have **few** friends. 😞 *(almost none — negative)*
- We have **a little** time. ✅ *(some)*
- We have **little** time. 😞 *(not enough)*

## *Some* / *any*
- **Some** in positives and offers / requests.
  - I have **some** money.
  - Would you like **some** coffee?
- **Any** in negatives and questions.
  - I don't have **any** money.
  - Do you have **any** questions?

## *All / most / some / none of*
Use **of** before *the / my / this / these / those / them*.

- **All of** my friends came.
- **Most of** the time, he is late.
- **None of** us knew the answer.

## *Each* / *every*
Both mean "all considered one by one" — use with **singular** nouns and verbs.

- **Each** student has a book.
- **Every** child loves stories.

> *Each* focuses on individuals; *every* focuses on the group as a whole.

## Watch out
- ❌ *much friends* → ✅ *many friends* / *a lot of friends*
- ❌ *I have any time.* → ✅ *I don't have any time.* / *I have some time.*
`.trim(),
    highlight: ["much", "many", "some", "any", "a few", "a little", "every", "each"],
  },
  {
    slug: "b1-articles",
    title: "B1 Lesson 14: Articles",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "When to say a, an, the, or no article at all.",
    content: `
## *a* / *an* — indefinite (one of many)
- Use before singular countable nouns when the listener doesn't know which one.
- **a** before a consonant **sound**, **an** before a vowel **sound**.

- I saw **a** dog.
- She is **an** engineer.
- He is **a** **u**niversity student. *(sounds like "you")*
- We waited **an** **h**our. *(silent h)*

## *the* — definite (specific or known)
- Use when both speaker and listener know which one.
- Use for unique things, superlatives, ordinals, and most names of rivers, oceans, ranges.

- **The** book on the table is mine.
- **The** sun is shining.
- He's **the** best player.
- **The** Nile, **the** Pacific, **the** Alps, **the** USA.

## No article (zero article)
- Plural / uncountable nouns talking in general.
  - **Books** are wonderful.
  - **Water** is essential.
- Most names of people, cities, countries (without *of* / plural).
  - **Maya** lives in **Cambodia**.
- Meals, languages, sports, days, months.
  - Let's have **lunch**.
  - She speaks **Khmer**.
  - We play **football** on **Saturdays**.

## Tricky pairs

| With *the* | Without |
| --- | --- |
| in **the** hospital *(as a visitor)* | in hospital *(as a patient — UK)* |
| go to **the** school *(visit it)* | go to school *(as a student)* |
| listen to **the** radio | watch TV |
| play **the** piano | play football |

## Common mistakes
- ❌ *I am teacher.* → ✅ *I am **a** teacher.*
- ❌ *The life is beautiful.* → ✅ *Life is beautiful.* *(general idea, no article)*
- ❌ *Sun is hot.* → ✅ ***The** sun is hot.* *(only one sun)*
`.trim(),
    highlight: ["a", "an", "the", "article", "zero article"],
  },
  {
    slug: "b1-prepositions",
    title: "B1 Lesson 15: Prepositions",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "in, on, at and other small words that show time, place, and direction.",
    content: `
## Prepositions of time

| Use | When | Example |
| --- | --- | --- |
| **at** | clock times, festivals, *night* | at 7 p.m., at noon, at Christmas, at night |
| **on** | days, dates | on Monday, on July 4th, on my birthday |
| **in** | months, years, seasons, parts of day | in May, in 2026, in summer, in the morning |

## Prepositions of place

| Use | When | Example |
| --- | --- | --- |
| **at** | a point / specific location | at the door, at the station, at home |
| **on** | surface / line | on the table, on the wall, on page 5 |
| **in** | enclosed space / area | in the box, in Paris, in the room |

## Movement

- **to** the shop, **into** the room, **out of** the house
- **across** the street, **through** the tunnel, **along** the river
- **up** the hill, **down** the stairs

## Dependent prepositions
Some adjectives, verbs, and nouns are followed by specific prepositions. Learn them as pairs.

### Verb + preposition
- listen **to** music
- depend **on** someone
- agree **with** someone / **on** a plan
- look **for** keys, look **at** a picture, look **after** a child

### Adjective + preposition
- afraid **of** spiders
- interested **in** history
- good **at** maths
- famous **for** chocolate
- married **to** someone
- different **from** the rest

### Noun + preposition
- a reason **for** something
- an increase **in** prices
- a solution **to** a problem

## Common mistakes
- ❌ *good in English* → ✅ *good **at** English*
- ❌ *afraid from dogs* → ✅ *afraid **of** dogs*
- ❌ *married with* → ✅ *married **to***
- ❌ *in Friday* → ✅ ***on** Friday*
`.trim(),
    highlight: ["in", "on", "at", "to", "from", "of", "preposition"],
  },
  {
    slug: "b1-phrasal-verbs",
    title: "B1 Lesson 16: Phrasal Verbs",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Two- or three-word verbs (verb + particle) whose meaning is often idiomatic.",
    content: `
## What is a phrasal verb?
A **verb + a particle** (preposition or adverb) whose combined meaning is often not literal.

- *give up* (= quit) — *I gave up smoking.*
- *look after* (= take care of) — *She looks after her grandma.*

## Common phrasal verbs by topic

### Daily routine
- **wake up**, **get up**, **get dressed**, **go out**, **stay in**, **eat out**
- I **woke up** at 6 and **got dressed**.

### Relationships
- **get on with** someone — have a good relationship
- **fall out with** someone — argue and stop being friends
- **break up with** someone — end a romantic relationship

### Travel
- **set off** — begin a journey
- **check in / out** — at a hotel
- **get on / off** a bus or train (but **get in / out of** a car)

### Studies / work
- **look up** a word — find it in a dictionary
- **hand in** homework — give it to the teacher
- **put off** a meeting — postpone
- **carry on** — continue
- **give up** — quit

## Separable vs inseparable

### Separable (transitive)
You can put the object **between** the verb and the particle.

- *turn off* the TV / *turn the TV off* / *turn it off*
- *pick up* the kids / *pick them up*

> If the object is a **pronoun** (it, them, him…), it **must** go in the middle: ✅ *Turn it off.* ❌ *Turn off it.*

### Inseparable
The verb and particle stay together.

- *look after* the children / *look after them* ✅
- *look the children after* ❌

## Tips for learning
- Don't try to memorise huge lists; learn them in **context** with example sentences.
- Pay attention to whether the verb is **literal** (*sit down*) or **idiomatic** (*give up*).
- Note any preposition that follows: *look forward **to**, run out **of**, get on **with***.
`.trim(),
    highlight: ["phrasal verb", "give up", "look after", "turn off", "separable"],
  },
  {
    slug: "b1-question-tags",
    title: "B1 Lesson 17: Question Tags",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Short questions at the end of statements: …isn't it? …doesn't she?",
    content: `
## What are question tags?
A short question added to the end of a statement to check or confirm something.

- You're tired, **aren't you?**
- He plays football, **doesn't he?**

## The rule: opposite + same auxiliary

1. **Positive statement → negative tag.** *Negative → positive.*
2. The tag uses the **same auxiliary** as the statement. If there's no auxiliary, use **do / does / did**.
3. The tag uses a **pronoun** that matches the subject.

### Examples

| Statement | Tag |
| --- | --- |
| You **are** Maya, | **aren't you?** |
| She **isn't** here, | **is she?** |
| You **like** coffee, | **don't you?** |
| He **plays** tennis, | **doesn't he?** |
| They **went** home, | **didn't they?** |
| You **have** finished, | **haven't you?** |
| She **can** drive, | **can't she?** |
| We **will** see you, | **won't we?** |

## Special cases
- **I am** → tag is **aren't I?**  → *I'm late, **aren't I?***
- **Let's…** → tag is **shall we?**  → *Let's go, **shall we?***
- **Imperatives** → tag is **will you? / won't you? / can you?**  → *Open the door, **will you?***
- **There is / are** → use **there** in the tag  → *There's milk in the fridge, **isn't there?***

## Intonation changes meaning
- **Falling tone** = you're confident, expecting agreement: *It's hot today, isn't it?* ↘
- **Rising tone** = you're genuinely asking: *You haven't seen my keys, have you?* ↗

## Common mistakes
- ❌ *You like coffee, don't it?* → ✅ *You like coffee, **don't you**?*
- ❌ *I'm right, am I not?* → ✅ *I'm right, **aren't I**?* *(spoken)*
`.trim(),
    highlight: ["question tag", "aren't", "isn't", "don't", "shall we", "aren't I"],
  },
  {
    slug: "b1-linking-words",
    title: "B1 Lesson 18: Linking Words",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Connect ideas smoothly with words like however, because, although, and so.",
    content: `
## Adding ideas
- **and** — *I like tea **and** coffee.*
- **also / too / as well** — *I like tea. I **also** like coffee. / I like coffee, **too**.*
- **in addition / moreover / furthermore** *(formal)* — *The plan is cheap. **Moreover**, it's quick.*

## Showing contrast
- **but** — *It's small **but** comfortable.*
- **however** *(stronger, often starts a sentence)* — *It rained. **However**, we enjoyed the day.*
- **although / even though** + clause — ***Although** it was raining, we went out.*
- **despite / in spite of** + noun / -ing — ***Despite** the rain, we went out. / **In spite of** raining, …*
- **on the other hand** — *Cars are convenient. **On the other hand**, they pollute.*

## Giving reasons
- **because** + clause — *I stayed home **because** it was raining.*
- **because of** + noun — *I stayed home **because of** the rain.*
- **since / as** = because *(more formal)* — ***Since** it was late, we left.*
- **due to** + noun *(formal)* — *The delay was **due to** traffic.*

## Showing results
- **so** — *It was raining, **so** I stayed home.*
- **therefore / as a result / consequently** *(formal)* — *He didn't study; **therefore**, he failed.*

## Showing purpose
- **to** + base verb — *I came **to see** you.*
- **so that** + clause — *I left early **so that** I wouldn't be late.*
- **in order to** *(formal)* — *We must save energy **in order to** protect the planet.*

## Sequencing
- **first(ly), then, after that, finally**
- ***First**, boil the water. **Then**, add the rice. **Finally**, cover the pot.*

## Watch out
- *Because* connects a **clause**; *because of* connects a **noun**.
- *Although* / *though* connect **clauses**; *despite* / *in spite of* connect **nouns** or **-ing** forms.
- *However* is **not** the same as *but*. *However* usually starts a sentence; *but* doesn't.
`.trim(),
    highlight: ["however", "although", "because", "so", "despite", "therefore"],
  },
  {
    slug: "b1-used-to",
    title: "B1 Lesson 19: Used To",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Talk about past habits that no longer happen — and don't confuse with be used to.",
    content: `
## *used to* + base verb — past habits or states
For things that were **regularly true in the past** but are **not true now**.

- I **used to smoke**, but I quit five years ago.
- She **used to live** in Paris.
- We **used to play** outside every day when we were kids.

## Form

| | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| Form | subject + **used to** + verb | subject + **didn't use to** + verb | **Did** … **use to** + verb? |
| Example | He **used to play** football. | He **didn't use to play** football. | **Did** he **use to play** football? |

> In negatives and questions, the form is **use to** (no *d*), because *did* already shows the past.

## Compare with *be used to* and *get used to*

These look similar but mean something completely different!

| Form | Meaning | Example |
| --- | --- | --- |
| **used to** + verb | past habit / state (not now) | *I **used to live** alone.* |
| **be used to** + noun / -ing | already accustomed | *I**'m used to living** alone.* |
| **get used to** + noun / -ing | becoming accustomed | *I**'m getting used to living** alone.* |

## *Used to* vs *would*
*Would* + base verb can also describe past habits, but **only for actions**, not for states.

- We **used to / would visit** Grandma every Sunday. ✅
- I **used to have** a bike. ✅
- I **would have** a bike. ❌ *(state — only "used to" works)*

## Watch out
- Don't use *used to* for things that happened **just once**: ❌ *I used to go to Bali in 2018.* → ✅ *I went to Bali in 2018.*
- The base verb after *used to* doesn't take *-ed* or *-s*: *He **used to play**, not played.*
`.trim(),
    highlight: ["used to", "be used to", "get used to", "would", "past habit"],
  },
  {
    slug: "b1-so-and-such",
    title: "B1 Lesson 20: So and Such",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Emphasise a quality — and trigger a result clause with that.",
    content: `
## *so* + adjective / adverb
- The film was **so good**.
- She runs **so quickly**.
- It was **so cold** that we stayed in.

## *such* + (a/an) + (adjective) + noun
- It was **such a beautiful day**.
- He's **such a kind person**.
- They're **such talented musicians**.

## Quick rule

| Pattern | Use |
| --- | --- |
| **so** + adjective | so + tired, so + happy |
| **so** + adverb | so + quickly, so + well |
| **so** + much / many / few / little + noun | so much rain, so many people |
| **such** + a/an + adjective + singular noun | such a nice day |
| **such** + adjective + plural / uncountable noun | such nice weather, such kind people |

## *so / such … that …*  → cause and result
- It was **so cold that** the lake froze.
- She was **such a good teacher that** everyone loved her.

## Watch out
- ❌ *It was **so a** nice day.* → ✅ *It was **such a** nice day.*
- ❌ *She is **such** tired.* → ✅ *She is **so** tired.*
- *So* sits before adjectives / adverbs; *such* sits before nouns (with or without an adjective).
`.trim(),
    highlight: ["so", "such", "so that", "such that"],
  },
  {
    slug: "b1-too-and-enough",
    title: "B1 Lesson 21: Too and Enough",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Say when there's more than needed (too) or the right amount (enough).",
    content: `
## *too* = more than is wanted/needed (negative)
**too** + adjective / adverb

- The coffee is **too hot**.
- He drives **too fast**.
- I'm **too tired** to go out.

**too much / too many** + noun
- There's **too much sugar** in this. *(uncountable)*
- There are **too many people** here. *(countable)*

## *enough* = the right amount (neutral / positive)

### *enough* AFTER an adjective / adverb
- The coffee is **hot enough**.
- He doesn't drive **fast enough**.
- I'm not **strong enough** to lift this.

### *enough* BEFORE a noun
- We have **enough time**.
- There aren't **enough chairs**.

## *too / enough* + *to* + verb
A very common pattern to express a result.

- He's **too young to drive**.
- She's **old enough to vote**.
- I don't have **enough money to buy** a car.

## Compare

| Sentence | Meaning |
| --- | --- |
| The soup is **too hot**. | I can't eat it — it's hotter than I want. |
| The soup is **hot enough**. | It's the right temperature. |
| The soup isn't **hot enough**. | It needs more heat. |

## Watch out
- ❌ *He is **enough strong**.* → ✅ *He is **strong enough**.* *(enough goes **after** adjectives)*
- ❌ *I'm too much tired.* → ✅ *I'm **too** tired.* *(too much only before nouns)*
- ❌ *too many sugar* → ✅ *too **much** sugar* *(sugar is uncountable)*
`.trim(),
    highlight: ["too", "too much", "too many", "enough"],
  },
  {
    slug: "b1-reflexive-pronouns",
    title: "B1 Lesson 22: Reflexive Pronouns",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Use myself, yourself, himself… when the subject and object are the same person.",
    content: `
## The forms

| Subject | Reflexive |
| --- | --- |
| I | **myself** |
| you (singular) | **yourself** |
| he | **himself** |
| she | **herself** |
| it | **itself** |
| we | **ourselves** |
| you (plural) | **yourselves** |
| they | **themselves** |

## When to use them

### 1. Subject and object are the same
- I cut **myself** while cooking.
- She taught **herself** Spanish.
- They blamed **themselves**.

### 2. For emphasis (= without help)
- I did it **myself**. *(no one helped me)*
- The president **himself** called me.

### 3. After certain expressions
- enjoy **yourself**, behave **yourself**, help **yourself**
- ***Help yourself*** *to some cake.*
- ***Enjoy yourselves*** *at the party.*

### 4. After *by* = alone
- I live **by myself**.
- She solved the puzzle **by herself**.

## When NOT to use them
- Don't use a reflexive when the subject and object are **different**.
  - ❌ *I gave the book to **myself**.* (if you gave it to someone else)
- After many everyday verbs (wash, shave, dress, relax) English usually leaves the reflexive out.
  - I **wash** every morning. *(not "wash myself")*
  - He **shaved** before work.
- *Each other* / *one another* — when two or more people do something **to each other**.
  - Maya and Sara hugged **each other**. *(not themselves)*

## Watch out
- ❌ *me and myself* / *I and myself* → ✅ just *myself*.
- ❌ *Myself went home.* → ✅ *I went home.*  *(reflexives are never subjects)*
`.trim(),
    highlight: ["myself", "yourself", "himself", "herself", "ourselves", "themselves"],
  },
  {
    slug: "b1-adverbs",
    title: "B1 Lesson 23: Adverbs",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Words that describe how, when, where, and how often — and where they go in a sentence.",
    content: `
## Types of adverbs

| Type | Asks… | Examples |
| --- | --- | --- |
| Manner | how? | quickly, carefully, well |
| Place | where? | here, there, everywhere |
| Time | when? | now, yesterday, soon |
| Frequency | how often? | always, often, never |
| Degree | how much? | very, quite, really |

## Forming adverbs from adjectives
- Most: add **-ly** → *quick → quickly, careful → carefully*
- *-y* → *-ily* → *happy → happily, easy → easily*
- *-le* → *-ly* → *gentle → gently, simple → simply*
- *-ic* → *-ically* → *automatic → automatically*

> Some words don't change: **fast, hard, late, early, high**. *He drives **fast**. She works **hard**.*

> **Hard** vs **hardly** are different words:
> - *He works **hard**.* (= with effort)
> - *He **hardly** works.* (= almost not at all)

## Word order

### Adverbs of frequency
Before the main verb, after **be**, after modal/auxiliary.

- I **always** drink coffee.
- She **is always** late.
- I have **never** been to Spain.
- You **should always** check.

### Adverbs of manner
Usually after the verb / object.

- She speaks English **fluently**.
- He drives **carefully**.

### Adverbs of time / place
Usually at the end (or beginning for emphasis).

- I'll see you **tomorrow**.
- **Yesterday**, we visited the museum.

### Multiple adverbs at the end
Usual order: **manner → place → time**.

- She sang **beautifully** ***at the concert*** **last night**.

## Watch out
- ❌ *She drives **careful**.* → ✅ *She drives **carefully**.*
- ❌ *I always am tired.* → ✅ *I **am always** tired.* *(frequency adverb after **be**)*
- *Good* is an adjective; *well* is its adverb: *She's a **good** singer. She sings **well**.*
`.trim(),
    highlight: ["adverb", "-ly", "always", "carefully", "well", "hard", "hardly"],
  },
  {
    slug: "b1-future-perfect",
    title: "B1 Lesson 24: Future Perfect",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Talk about an action that will be completed before a future moment: will have + past participle.",
    content: `
## Form
**will have** + past participle (V3).

| | Affirmative | Negative | Question |
| --- | --- | --- | --- |
| Form | subject + **will have** + V3 | subject + **won't have** + V3 | **Will** … **have** + V3 |
| Example | I **will have finished**. | I **won't have finished**. | **Will** you **have finished**? |

## Use it for
An action that will be **complete** before a specific time in the future.

- By 10 p.m., I **will have finished** my homework.
- By next year, she **will have lived** here for ten years.
- They **won't have arrived** by 8 a.m.
- **Will** you **have eaten** by the time I get home?

## Signal expressions
- **by** + a future time: *by Friday, by 2030, by next month*
- **by the time** + present clause: *By the time he arrives, I **will have left**.*
- **in** + a period: *In ten minutes, I **will have finished**.*

## Future perfect vs future simple

| Future simple (*will*) | Future perfect (*will have*) |
| --- | --- |
| Action happens at a future moment | Action is **completed** before a future moment |
| *At 8 p.m., I **will eat** dinner.* | *By 8 p.m., I **will have eaten** dinner.* |

## Future perfect continuous (quick note)
**will have been** + verb-ing — emphasises **how long**.

- By December, I **will have been working** here for five years.

## Watch out
- After **by the time**, use the **present** tense in the second clause, not future: ✅ *By the time you **arrive**, I **will have finished**.* ❌ *By the time you will arrive…*
- Don't drop the auxiliary *have*: ❌ *I **will finished**.* → ✅ *I **will have finished**.*
`.trim(),
    highlight: ["will have", "future perfect", "by", "by the time", "past participle"],
  },
  {
    slug: "b1-review-exercises",
    title: "B1 Lesson 25: Review Exercises",
    type: LessonType.GRAMMAR,
    level: Level.INTERMEDIATE,
    summary:
      "Practice prompts that bring together the 24 B1 lessons.",
    content: `
## How to use this review
Try writing **one sentence** for each task. Then say each one aloud — that's where the real practice happens. Check your work against the lesson noted in brackets.

## A. Tense control
1. A **present perfect** sentence about something you have done in your life. *(Lesson 1)*
2. A pair of sentences: one in **past simple**, one in **present perfect**, showing the difference. *(Lesson 2)*
3. A **past continuous** sentence with *when* or *while*. *(Lesson 3)*
4. A **future** sentence with *will*, and one with *be going to*. *(Lesson 4)*
5. A **future perfect** sentence using *by* + time. *(Lesson 24)*

## B. Conditionals
6. A **first conditional** about your next weekend. *(Lesson 5)*
7. A **second conditional** starting *"If I were…"* *(Lesson 6)*

## C. Voice and reporting
8. Rewrite an active sentence in the **passive voice**. *(Lesson 7)*
9. Report what a friend said yesterday using **reported speech**. *(Lesson 8)*

## D. Sentence richness
10. A sentence with a **relative clause** (*who / which / that*). *(Lesson 9)*
11. A sentence with a **modal verb** for advice. *(Lesson 10)*
12. A sentence using a **gerund** and another using an **infinitive**. *(Lesson 11)*
13. A sentence comparing two things and another using a **superlative**. *(Lesson 12)*

## E. Detail words
14. A sentence with **a few** and one with **a little**. *(Lesson 13)*
15. A short paragraph about your day using **articles** correctly. *(Lesson 14)*
16. Three sentences with **in / on / at** for time. *(Lesson 15)*
17. A sentence with a **phrasal verb** about your routine. *(Lesson 16)*

## F. Speaking patterns
18. A sentence with a **question tag**. *(Lesson 17)*
19. Two sentences linked with **however** and **because**. *(Lesson 18)*
20. A *"I **used to**…"* sentence about your childhood. *(Lesson 19)*
21. A sentence using **so / such**. *(Lesson 20)*
22. A sentence using **too** and one using **enough**. *(Lesson 21)*
23. A sentence using a **reflexive pronoun**. *(Lesson 22)*
24. A sentence using a frequency **adverb** in the correct position. *(Lesson 23)*

## Final challenge
Write a **short story (5–7 sentences)** that uses:
- one past simple
- one past continuous
- one present perfect
- one phrasal verb
- one linking word

Reading it back, can you spot all five? That's a B1-level paragraph.
`.trim(),
    highlight: ["review", "practice", "B1"],
  },
];
