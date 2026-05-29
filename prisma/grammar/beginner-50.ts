import { Level, LessonType } from "@prisma/client";
import type { GrammarLesson } from "./lessons";

/**
 * 52 short beginner grammar lessons, sourced from the
 * "Full Beginner Grammar Course (50+ Lessons)" PDF.
 * Each lesson is concise — title, summary, and a small markdown body.
 */
export const beginnerGrammar50: GrammarLesson[] = [
  {
    slug: "be-verb",
    title: "Lesson 1: Be Verb",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Use am, is, are to describe people and things.",
    content: `
## The verb *to be*

| Subject | Form |
| --- | --- |
| I | **am** |
| You / We / They | **are** |
| He / She / It | **is** |

### Examples
- I **am** a student.
- She **is** happy.
- They **are** at school.
`.trim(),
    highlight: ["am", "is", "are"],
  },
  {
    slug: "subject-pronouns",
    title: "Lesson 2: Subject Pronouns",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "I, you, he, she, it, we, they — the words that do the action.",
    content: `
## Subject pronouns
These pronouns replace the subject (the doer) of a sentence.

- **I** — the speaker
- **You** — the listener
- **He / She / It** — one person or thing
- **We / They** — more than one

### Examples
- **I** like tea.
- **He** plays football.
- **They** are friends.
`.trim(),
    highlight: ["I", "you", "he", "she", "it", "we", "they"],
  },
  {
    slug: "possessive-adjectives",
    title: "Lesson 3: Possessive Adjectives",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "My, your, his, her, our, their — words that show ownership.",
    content: `
## Possessive adjectives
Each subject pronoun has a matching possessive adjective.

| Pronoun | Possessive |
| --- | --- |
| I | **my** |
| You | **your** |
| He | **his** |
| She | **her** |
| It | **its** |
| We | **our** |
| They | **their** |

### Examples
- This is **my** book.
- **Her** dog is friendly.
- **Our** house is small.
`.trim(),
    highlight: ["my", "your", "his", "her", "our", "their"],
  },
  {
    slug: "articles-a-an-the",
    title: "Lesson 4: Articles",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Use a, an, and the before nouns.",
    content: `
## Indefinite: *a* / *an*
Use **a** before a consonant sound, **an** before a vowel sound.

- **a** cat, **a** book, **a** university (sounds like "you")
- **an** apple, **an** hour (silent h)

## Definite: *the*
Use **the** when both speaker and listener know which thing.

- **The** book on the table is mine.
- I saw **the** moon last night.
`.trim(),
    highlight: ["a", "an", "the"],
  },
  {
    slug: "singular-and-plural-nouns",
    title: "Lesson 5: Singular and Plural Nouns",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "How nouns change when there is more than one.",
    content: `
## Regular plurals
Add **-s** to most nouns.

- cat → **cats**
- book → **books**

Add **-es** after *s, x, ch, sh, o*.

- bus → **buses**
- box → **boxes**

## Irregular plurals
Some nouns change form.

- child → **children**
- man → **men**
- foot → **feet**
- mouse → **mice**
`.trim(),
    highlight: ["cats", "children", "men", "feet"],
  },
  {
    slug: "present-simple",
    title: "Lesson 6: Present Simple",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Talk about habits, routines, and facts.",
    content: `
## Present simple
Use it for things that are **always** or **usually** true.

- I **work** every day.
- She **studies** English.
- The sun **rises** in the east.

### Spelling tip
With **he / she / it**, add **-s** to the verb.

- I work → He **works**
- I study → She **studies** (y → ies)
`.trim(),
    highlight: ["work", "studies", "rises"],
  },
  {
    slug: "present-continuous",
    title: "Lesson 7: Present Continuous",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Talk about what is happening right now.",
    content: `
## Form
**am / is / are** + verb-**ing**

- I **am eating**.
- She **is reading** a book.
- They **are playing** football.

## Use it for
- Right now: *He is sleeping.*
- A temporary situation: *I am living in Phnom Penh this month.*
`.trim(),
    highlight: ["am", "is", "are", "reading", "playing"],
  },
  {
    slug: "past-simple",
    title: "Lesson 8: Past Simple",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Talk about finished actions in the past.",
    content: `
## Regular verbs
Add **-ed**.

- watch → **watched**
- play → **played**
- study → **studied**

## Irregular verbs
Learn each form.

- go → **went**
- eat → **ate**
- see → **saw**
- have → **had**

### Examples
- They **watched** a movie yesterday.
- She **went** to Siem Reap last week.
`.trim(),
    highlight: ["watched", "went", "ate", "saw"],
  },
  {
    slug: "future-tense-will",
    title: "Lesson 9: Future Tense",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Use will to talk about the future.",
    content: `
## Form
**will** + verb (no -s, no -ing).

- I **will travel** tomorrow.
- She **will help** you.
- We **will not** (won't) be late.

## Use it for
- Quick decisions: *I'll have tea, please.*
- Predictions: *It will rain tonight.*
- Promises: *I will call you.*
`.trim(),
    highlight: ["will", "won't"],
  },
  {
    slug: "question-forms-basic",
    title: "Lesson 10: Question Forms",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "How to ask basic questions in English.",
    content: `
## With *be*
Move the verb to the front.

- You are happy. → **Are** you happy?
- She is a doctor. → **Is** she a doctor?

## With other verbs
Use **do / does / did**.

- You like coffee. → **Do** you like coffee?
- He plays football. → **Does** he play football?
- They went home. → **Did** they go home?

## Wh-questions
- **What** is your name?
- **Where** do you live?
`.trim(),
    highlight: ["Do", "Does", "Did", "What", "Where"],
  },
  {
    slug: "negative-sentences-basic",
    title: "Lesson 11: Negative Sentences",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Use not, don't, doesn't, didn't to say no.",
    content: `
## With *be*
Add **not** after the verb.

- She **is not** (isn't) happy.
- They **are not** (aren't) here.

## With other verbs
Use **do not / does not / did not**.

- I **do not** (don't) like coffee.
- He **does not** (doesn't) eat meat.
- We **did not** (didn't) go.
`.trim(),
    highlight: ["not", "don't", "doesn't", "didn't"],
  },
  {
    slug: "countable-nouns",
    title: "Lesson 12: Countable Nouns",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Nouns you can count one by one.",
    content: `
## Countable nouns
You can put a number in front of them.

- **one** apple, **two** apples
- **a** chair, **three** chairs
- **a** book, **many** books

They have singular and plural forms.
`.trim(),
    highlight: ["apple", "chair", "book"],
  },
  {
    slug: "uncountable-nouns",
    title: "Lesson 13: Uncountable Nouns",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Nouns you cannot count one by one.",
    content: `
## Uncountable nouns
No plural form. You can't say "*two waters*."

- water, rice, sugar, milk
- information, music, advice

Use **some / a lot of** or a quantity word.

- **some** water
- **a glass of** water
- **a kilo of** rice
`.trim(),
    highlight: ["water", "rice", "sugar", "information"],
  },
  {
    slug: "some-and-any",
    title: "Lesson 14: Some and Any",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Use some in positive sentences, any in questions and negatives.",
    content: `
## Some
Use in positive sentences.

- I have **some** money.
- She bought **some** apples.

## Any
Use in questions and negatives.

- Do you have **any** money?
- I don't have **any** apples.
`.trim(),
    highlight: ["some", "any"],
  },
  {
    slug: "much-and-many",
    title: "Lesson 15: Much and Many",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Use many with countable nouns, much with uncountable.",
    content: `
## Many — for things you can count
- **many** students
- **many** books
- How **many** friends do you have?

## Much — for things you can't count
- **much** water
- **much** time
- How **much** sugar?
`.trim(),
    highlight: ["many", "much"],
  },
  {
    slug: "there-is-there-are",
    title: "Lesson 16: There is / There are",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Say that something exists in a place.",
    content: `
## Singular: *there is*
- **There is** a cat on the roof.
- **There is** a book on the table.

## Plural: *there are*
- **There are** three cats here.
- **There are** people in the room.

## Negative & question
- **There isn't** a problem.
- **Is there** a bank near here?
`.trim(),
    highlight: ["there is", "there are"],
  },
  {
    slug: "basic-prepositions",
    title: "Lesson 17: Prepositions",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Small words that show place and time: in, on, under, behind.",
    content: `
## Place
- **in** the room
- **on** the table
- **under** the bed
- **behind** the door
- **next to** the window

## Time
- **at** 7 o'clock
- **on** Monday
- **in** July
- **in** 2026
`.trim(),
    highlight: ["in", "on", "under", "behind", "at"],
  },
  {
    slug: "adjectives-basic",
    title: "Lesson 18: Adjectives",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Words that describe nouns: beautiful, small, fast.",
    content: `
## Adjectives describe nouns
They usually come **before** the noun.

- a **beautiful** flower
- a **small** car
- a **fast** train

After *be*, they describe the subject.

- The flower is **beautiful**.
- The car is **small**.
`.trim(),
    highlight: ["beautiful", "small", "fast"],
  },
  {
    slug: "comparative-adjectives",
    title: "Lesson 19: Comparative Adjectives",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Compare two things: bigger, smaller, faster.",
    content: `
## Short adjectives — add *-er*
- big → **bigger**
- small → **smaller**
- fast → **faster**

## Long adjectives — use *more*
- beautiful → **more beautiful**
- expensive → **more expensive**

### Examples
- A truck is **bigger than** a car.
- This phone is **more expensive than** that one.
`.trim(),
    highlight: ["bigger", "smaller", "faster", "more"],
  },
  {
    slug: "superlative-adjectives",
    title: "Lesson 20: Superlative Adjectives",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Compare three or more: the biggest, the best.",
    content: `
## Short adjectives — *the …-est*
- big → **the biggest**
- small → **the smallest**
- fast → **the fastest**

## Long adjectives — *the most …*
- beautiful → **the most beautiful**
- expensive → **the most expensive**

## Irregular
- good → **the best**
- bad → **the worst**
`.trim(),
    highlight: ["biggest", "best", "most"],
  },
  {
    slug: "adverbs-basic",
    title: "Lesson 21: Adverbs",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Words that describe how an action is done.",
    content: `
## Forming adverbs
Add **-ly** to most adjectives.

- slow → **slowly**
- quick → **quickly**
- careful → **carefully**

### Examples
- She walks **slowly**.
- He drives **carefully**.
- They speak English **fluently**.
`.trim(),
    highlight: ["slowly", "quickly", "carefully"],
  },
  {
    slug: "frequency-adverbs",
    title: "Lesson 22: Frequency Adverbs",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Words that say how often: always, usually, sometimes.",
    content: `
## Common frequency adverbs (most → least)
- **always** (100%)
- **usually**
- **often**
- **sometimes**
- **rarely / seldom**
- **never** (0%)

They go **before** the main verb, **after** *be*.

- She **always** drinks tea in the morning.
- I am **never** late.
`.trim(),
    highlight: ["always", "usually", "sometimes", "never"],
  },
  {
    slug: "can-and-cant",
    title: "Lesson 23: Can / Can't",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Talk about ability or permission.",
    content: `
## Can (ability / permission)
**can** + verb (no -s, no -ing).

- I **can** swim.
- She **can** speak Khmer.
- **Can** I sit here? *(permission)*

## Can't
- I **can't** drive.
- He **can't** come tonight.
`.trim(),
    highlight: ["can", "can't"],
  },
  {
    slug: "must-and-mustnt",
    title: "Lesson 24: Must / Mustn't",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Strong necessity and prohibition.",
    content: `
## Must — strong obligation
- You **must** study.
- We **must** be on time.

## Mustn't — strong prohibition
- You **mustn't** smoke here.
- Children **mustn't** play with fire.
`.trim(),
    highlight: ["must", "mustn't"],
  },
  {
    slug: "have-to",
    title: "Lesson 25: Have to",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Talk about necessity from rules or outside force.",
    content: `
## Form
**have to** + verb. With *he/she/it*, use **has to**.

- I **have to** work today.
- She **has to** finish her homework.

## Negative
**don't have to / doesn't have to** = not necessary.

- You **don't have to** come if you're tired.
`.trim(),
    highlight: ["have to", "has to", "don't have to"],
  },
  {
    slug: "should-and-shouldnt",
    title: "Lesson 26: Should / Shouldn't",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Give advice and recommendations.",
    content: `
## Should — advice
- You **should** sleep early.
- We **should** call him.

## Shouldn't — advice not to
- You **shouldn't** eat so much sugar.
- He **shouldn't** drive when tired.
`.trim(),
    highlight: ["should", "shouldn't"],
  },
  {
    slug: "object-pronouns",
    title: "Lesson 27: Object Pronouns",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Pronouns that receive the action: me, him, her, them.",
    content: `
## Object pronouns
| Subject | Object |
| --- | --- |
| I | **me** |
| You | **you** |
| He | **him** |
| She | **her** |
| It | **it** |
| We | **us** |
| They | **them** |

### Examples
- She called **me** yesterday.
- I saw **him** at the market.
- Please help **them**.
`.trim(),
    highlight: ["me", "him", "her", "us", "them"],
  },
  {
    slug: "possessive-pronouns",
    title: "Lesson 28: Possessive Pronouns",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Stand-alone words for ownership: mine, yours, theirs.",
    content: `
## Possessive pronouns
| Person | Word |
| --- | --- |
| I | **mine** |
| You | **yours** |
| He | **his** |
| She | **hers** |
| We | **ours** |
| They | **theirs** |

### Examples
- This book is **mine**.
- Is this pen **yours**?
- The red car is **theirs**.
`.trim(),
    highlight: ["mine", "yours", "his", "hers", "ours", "theirs"],
  },
  {
    slug: "imperatives",
    title: "Lesson 29: Imperatives",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Give commands, instructions, and invitations.",
    content: `
## Form
Just use the base verb. No subject.

- **Open** the door.
- **Sit** down, please.
- **Don't** run.

### Used for
- Commands: *Stop!*
- Instructions: *Press the button.*
- Invitations: *Come in.*
`.trim(),
    highlight: ["Open", "Sit", "Don't"],
  },
  {
    slug: "conjunctions-and-but-because",
    title: "Lesson 30: Conjunctions",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Words that join ideas: and, but, because.",
    content: `
## And — adds information
- I like tea **and** coffee.

## But — shows contrast
- She is tired **but** happy.

## Because — gives a reason
- I stayed home **because** it was raining.

## Or — shows a choice
- Tea **or** coffee?
`.trim(),
    highlight: ["and", "but", "because", "or"],
  },
  {
    slug: "time-expressions",
    title: "Lesson 31: Time Expressions",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Words that say when: today, tomorrow, yesterday.",
    content: `
## Common time words
- **today**, **tonight**
- **tomorrow**, the day after tomorrow
- **yesterday**, the day before yesterday
- **last** week / month / year
- **next** week / month / year
- **now**, soon, later

### Examples
- I will see you **tomorrow**.
- She came **yesterday**.
- We met **last week**.
`.trim(),
    highlight: ["today", "tomorrow", "yesterday"],
  },
  {
    slug: "days-of-the-week",
    title: "Lesson 32: Days of the Week",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Monday to Sunday — always capitalized in English.",
    content: `
## The seven days
1. **Monday**
2. **Tuesday**
3. **Wednesday**
4. **Thursday**
5. **Friday**
6. **Saturday**
7. **Sunday**

Use **on** before a day: *I work **on Monday**.*
`.trim(),
    highlight: ["Monday", "Sunday"],
  },
  {
    slug: "months-of-the-year",
    title: "Lesson 33: Months of the Year",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "January to December — always capitalized.",
    content: `
`.trim(),
    highlight: ["January", "December"],
  },
  {
    slug: "telling-time",
    title: "Lesson 34: Telling Time",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "How to say what time it is.",
    content: `
## On the hour
- It is **7 o'clock**.
- It is **noon** (12 PM) / **midnight** (12 AM).

## Past and to
- 7:15 → **a quarter past seven** / seven fifteen
- 7:30 → **half past seven** / seven thirty
- 7:45 → **a quarter to eight** / seven forty-five

## AM / PM
- 7 AM = morning
- 7 PM = evening
`.trim(),
    highlight: ["o'clock", "past", "to", "AM", "PM"],
  },
  {
    slug: "numbers",
    title: "Lesson 35: Numbers",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Cardinal numbers from one to a million.",
    content: `
## 1 – 12
one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve

## 13 – 19 (add *-teen*)
thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen

## 20+ (add *-ty*)
twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety

## Big numbers
- **100** — one hundred
- **1,000** — one thousand
- **1,000,000** — one million
`.trim(),
    highlight: ["one", "two", "three", "twenty", "hundred"],
  },
  {
    slug: "dates",
    title: "Lesson 36: Dates",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Write and say dates correctly.",
    content: `
## Writing dates
- **July 10th, 2026** (US)
- **10 July 2026** (UK)

## Ordinal numbers
- 1st (first), 2nd (second), 3rd (third)
- 4th (fourth), 5th (fifth), …, 10th (tenth)
- 21st, 22nd, 23rd, 24th, …, 31st

### Examples
- My birthday is **March 15th**.
- The meeting is **on the 3rd of April**.
`.trim(),
    highlight: ["1st", "2nd", "3rd", "10th"],
  },
  {
    slug: "directions",
    title: "Lesson 37: Directions",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Tell someone how to get somewhere.",
    content: `
## Common direction phrases
- **Go straight** / **go ahead**
- **Turn left** / **turn right**
- **Take the second street on the right**
- **It's on your left** / **on your right**
- **next to**, **across from**, **between**

### Example
- Go straight for two blocks, then turn left. The bank is on your right.
`.trim(),
    highlight: ["straight", "left", "right", "turn"],
  },
  {
    slug: "question-words-wh",
    title: "Lesson 38: Question Words",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Wh-words: who, what, where, when, why, how.",
    content: `
## Wh-words and what they ask
| Word | Asks about |
| --- | --- |
| **Who** | a person |
| **What** | a thing |
| **Where** | a place |
| **When** | a time |
| **Why** | a reason |
| **How** | a way / manner |

### Examples
- **Who** called you?
- **What** is your name?
- **Where** do you live?
- **Why** are you sad?
`.trim(),
    highlight: ["Who", "What", "Where", "When", "Why", "How"],
  },
  {
    slug: "like-love-hate",
    title: "Lesson 39: Like / Love / Hate",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Express what you enjoy and what you don't.",
    content: `
## Strength of feeling
- **love** ❤️ — really enjoy
- **like** 🙂 — enjoy
- **don't like** 🙁 — don't enjoy
- **hate** 😠 — dislike strongly

## Form
- like / love / hate + **noun**: *I love **music**.*
- like / love / hate + **verb-ing**: *I love **dancing**.*
- like / love / hate + **to-verb**: *I love **to dance**.*
`.trim(),
    highlight: ["love", "like", "hate"],
  },
  {
    slug: "gerunds",
    title: "Lesson 40: Gerunds",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Use verb-ing as a noun.",
    content: `
## What is a gerund?
A **gerund** is a verb that ends in **-ing** but acts like a noun.

### As a subject
- **Swimming** is fun.
- **Reading** improves your English.

### After certain verbs
- I enjoy **cooking**.
- She loves **singing**.

### After prepositions
- I am good **at drawing**.
- Thanks **for helping** me.
`.trim(),
    highlight: ["Swimming", "Reading", "cooking", "drawing"],
  },
  {
    slug: "infinitives",
    title: "Lesson 41: Infinitives",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Use to + verb after many verbs and adjectives.",
    content: `
## Form
**to** + base verb.

- I want **to eat**.
- She decided **to leave**.
- It's nice **to meet** you.

## Common verbs followed by infinitives
- want, need, hope, plan
- decide, agree, promise
- learn, try, forget
`.trim(),
    highlight: ["to eat", "to leave", "to meet"],
  },
  {
    slug: "present-perfect",
    title: "Lesson 42: Present Perfect",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Connect a past action to now: have/has + past participle.",
    content: `
## Form
**have / has** + past participle.

- I **have finished** my homework.
- She **has lived** here for ten years.

## Use it for
- Life experience: *I **have visited** Japan.*
- Recently completed: *He **has just arrived**.*
- Unfinished time: *We **have** **worked** here since 2020.*
`.trim(),
    highlight: ["have", "has", "finished", "lived"],
  },
  {
    slug: "past-simple-vs-present-perfect",
    title: "Lesson 43: Simple Past vs Present Perfect",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "When to say I went and when to say I have gone.",
    content: `
## Past Simple — finished time
Use with words like *yesterday, last week, in 2020*.

- I **went** to Bali last year.

## Present Perfect — connection to now
Use when the time is not finished, or when "when" doesn't matter.

- I **have gone** to Bali. *(at some point in my life)*
- She **has just left**. *(it affects right now)*

### Compare
- I **saw** that movie yesterday. *(finished day)*
- I **have seen** that movie. *(some time in my life)*
`.trim(),
    highlight: ["went", "have gone", "saw", "have seen"],
  },
  {
    slug: "future-plans-going-to",
    title: "Lesson 44: Future Plans",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Use be going to for plans and intentions.",
    content: `
## Form
**am / is / are** + **going to** + verb.

- I **am going to travel** next month.
- She **is going to study** medicine.
- We **are going to move** house.

## *Going to* vs *will*
- **Going to** = a plan already decided.
- **Will** = a decision made now.

> I'm thirsty. → I'**ll** get water. (decided now)
> I'**m going to** buy water at the shop. (already planned)
`.trim(),
    highlight: ["going to", "travel", "study"],
  },
  {
    slug: "conditionals-zero-first",
    title: "Lesson 45: Conditionals",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Talk about results that depend on conditions.",
    content: `
## Zero conditional — always true
**If** + present, … present.

- **If** it rains, the streets get wet.
- **If** you heat water, it boils.

## First conditional — possible future
**If** + present, … *will* + verb.

- **If** it rains, I **will stay** home.
- **If** you study, you **will pass**.
`.trim(),
    highlight: ["If", "will"],
  },
  {
    slug: "passive-voice-basic",
    title: "Lesson 46: Passive Voice",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Use when the doer is unknown or less important.",
    content: `
## Form
**be** + past participle.

- The cake **was made** by Anna.
- This house **was built** in 1990.
- English **is spoken** here.

## Active vs Passive
- Active: *Anna **made** the cake.*
- Passive: *The cake **was made** by Anna.*
`.trim(),
    highlight: ["was made", "was built", "is spoken"],
  },
  {
    slug: "reported-speech-basic",
    title: "Lesson 47: Reported Speech",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Report what someone else said.",
    content: `
## Direct → Reported
Tenses usually shift one step into the past.

| Direct speech | Reported speech |
| --- | --- |
| "I am tired." | She said she **was** tired. |
| "I work here." | He said he **worked** here. |
| "I will call." | She said she **would** call. |

Pronouns may also change to fit the new speaker.
`.trim(),
    highlight: ["said", "was", "worked", "would"],
  },
  {
    slug: "relative-clauses-basic",
    title: "Lesson 48: Relative Clauses",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Use who, which, that to give extra information.",
    content: `
## Relative pronouns
- **who** → for people
- **which** → for things
- **that** → for people or things (less formal)

### Examples
- The man **who** called me is my uncle.
- The book **which** I bought is great.
- This is the phone **that** I want.
`.trim(),
    highlight: ["who", "which", "that"],
  },
  {
    slug: "basic-phrasal-verbs",
    title: "Lesson 49: Basic Phrasal Verbs",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Two-word verbs you hear every day.",
    content: `
## Common phrasal verbs
- **wake up** — stop sleeping
- **sit down** — go from standing to sitting
- **stand up** — go from sitting to standing
- **turn on / turn off** — start / stop a device
- **put on / take off** — clothes
- **look for** — search
- **give up** — stop trying

### Examples
- I **wake up** at six every day.
- Please **sit down**.
- **Turn off** the light.
`.trim(),
    highlight: ["wake up", "sit down", "turn on", "turn off"],
  },
  {
    slug: "beginner-common-mistakes",
    title: "Lesson 50: Common Mistakes",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Frequent mistakes to watch out for.",
    content: `
## Forgetting *-s* with he/she/it
- ❌ He go to school.
- ✅ He **goes** to school.

## Double subjects
- ❌ My brother he is a doctor.
- ✅ My brother is a doctor.

## *Make* vs *do*
- **do** homework / the dishes
- **make** dinner / a mistake

## Wrong article
- ❌ I am student.
- ✅ I am **a** student.
`.trim(),
    highlight: ["goes", "a", "make", "do"],
  },
  {
    slug: "everyday-conversation",
    title: "Lesson 51: Everyday Conversation",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Useful phrases for daily interactions.",
    content: `
## Greetings
- Hello / Hi
- Good morning / afternoon / evening
- **How are you?** — I'm fine, thank you.

## Introductions
- What's your name? — I'm Dara.
- Nice to meet you.

## Polite phrases
- Please / Thank you / You're welcome
- Excuse me / Sorry

## Saying goodbye
- Goodbye / Bye
- See you later / See you tomorrow
`.trim(),
    highlight: ["Hello", "How are you", "Please", "Thank you"],
  },
  {
    slug: "review-exercises",
    title: "Lesson 52: Review Exercises",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary: "Bring all the lessons together with practice.",
    content: `
## Mini practice
Try to write **one sentence** for each:

1. A present simple sentence about your daily life.
2. A present continuous sentence about right now.
3. A past simple sentence about yesterday.
4. A future sentence with *will* or *going to*.
5. A question with *what*, *where*, or *when*.
6. A negative sentence with *don't* or *doesn't*.
7. A sentence with a comparative adjective.
8. A sentence with *should* giving advice.
9. A sentence with a phrasal verb.
10. A polite greeting.

Saying these out loud is great speaking practice — try it every day.
`.trim(),
    highlight: ["present simple", "past simple", "future"],
  },
  {
    slug: "v1-v2-v3-verb-forms",
    title: "V1, V2, V3 — Verb Forms",
    type: LessonType.GRAMMAR,
    level: Level.BEGINNER,
    summary:
      "Base form, past simple, and past participle of the 53 most useful English verbs.",
    content: `
## Why three forms?
Most English verbs have three main forms.

- **V1** — **Base form**, used in present simple and after *to*: *I **eat**, to **eat***
- **V2** — **Past simple**, used for finished past actions: *I **ate** lunch*
- **V3** — **Past participle**, used after *have / has / had* and in the passive: *I have **eaten** / it was **eaten***

> Tip: **Regular** verbs add **-ed** for both V2 and V3 (work → worked → worked). The verbs below are mostly **irregular** — you just have to learn them.

## The 53 most useful verbs

| V1 (Base) | V2 (Past Simple) | V3 (Past Participle) |
| --- | --- | --- |
| be | was / were | been |
| begin | began | begun |
| break | broke | broken |
| bring | brought | brought |
| build | built | built |
| buy | bought | bought |
| choose | chose | chosen |
| come | came | come |
| cut | cut | cut |
| do | did | done |
| drink | drank | drunk |
| drive | drove | driven |
| eat | ate | eaten |
| fall | fell | fallen |
| feel | felt | felt |
| find | found | found |
| fly | flew | flown |
| forget | forgot | forgotten |
| get | got | gotten |
| give | gave | given |
| go | went | gone |
| have | had | had |
| hear | heard | heard |
| keep | kept | kept |
| know | knew | known |
| learn | learned | learned |
| leave | left | left |
| lose | lost | lost |
| make | made | made |
| meet | met | met |
| pay | paid | paid |
| put | put | put |
| read | read | read |
| ride | rode | ridden |
| run | ran | run |
| say | said | said |
| see | saw | seen |
| sell | sold | sold |
| send | sent | sent |
| sing | sang | sung |
| sit | sat | sat |
| sleep | slept | slept |
| speak | spoke | spoken |
| stand | stood | stood |
| swim | swam | swum |
| take | took | taken |
| teach | taught | taught |
| tell | told | told |
| think | thought | thought |
| understand | understood | understood |
| wake | woke | woken |
| wear | wore | worn |
| win | won | won |
| write | wrote | written |

## Patterns to spot
A few patterns repeat — once you see them, the list shrinks.

- **Same V2 and V3:** *bring → brought → brought*, *buy → bought → bought*, *teach → taught → taught*, *think → thought → thought*
- **All three the same:** *cut, put, hit, let, set, shut, read* (pronounced differently!)
- **Vowel change i → a → u:** *begin → began → begun*, *drink → drank → drunk*, *sing → sang → sung*, *swim → swam → swum*
- **Ends in -en for V3:** *eat → ate → eaten*, *give → gave → given*, *take → took → taken*, *write → wrote → written*

> *Read* is a special trap: the spelling stays the same, but **read** (V2 / V3) is pronounced like *red*.

## Where each form goes
| Tense | Form to use | Example |
| --- | --- | --- |
| Present simple | V1 (+s for he/she/it) | *She **eats** rice.* |
| Past simple | V2 | *She **ate** rice.* |
| Present perfect | have/has + V3 | *She **has eaten** rice.* |
| Past perfect | had + V3 | *She **had eaten** before I arrived.* |
| Passive | be + V3 | *Rice **is eaten** every day.* |
`.trim(),
    highlight: [
      "V1",
      "V2",
      "V3",
      "past simple",
      "past participle",
      "irregular",
    ],
  },
];
