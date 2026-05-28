import { Level } from "@prisma/client";
import type { VocabEntry } from "./types";

export const foodAdjectivesVocab: VocabEntry[] = [
  { word: "sweet", meaning: "having a taste like sugar", meaningKh: "ផ្អែម", example: "The cake is too sweet.", partOfSpeech: "adjective", level: Level.BEGINNER },
  { word: "savory", meaning: "salty or spicy rather than sweet (UK: savoury)", meaningKh: "មិនផ្អែម", example: "Savory snacks include chips.", partOfSpeech: "adjective", level: Level.BEGINNER },
  { word: "tasty", meaning: "having a good flavor", meaningKh: "ឆ្ងាញ់", example: "This soup is really tasty.", partOfSpeech: "adjective", level: Level.BEGINNER },
  { word: "chilled", meaning: "cooled; served cold (also iced)", meaningKh: "ត្រជាក់", example: "Serve the wine chilled.", partOfSpeech: "adjective", level: Level.BEGINNER },
  { word: "salty", meaning: "containing a lot of salt", meaningKh: "អំបិល", example: "The soup tastes salty.", partOfSpeech: "adjective", level: Level.BEGINNER },
  { word: "bitter", meaning: "having a sharp, unpleasant taste", meaningKh: "ជូរ", example: "Dark coffee can taste bitter.", partOfSpeech: "adjective", level: Level.BEGINNER },
  { word: "spicy", meaning: "having a hot, peppery flavor (also hot)", meaningKh: "ហឹរ", example: "Thai food is often spicy.", partOfSpeech: "adjective", level: Level.BEGINNER },
  { word: "fresh", meaning: "recently made or picked; not stale", meaningKh: "ស្រស់", example: "Use fresh herbs in the salad.", partOfSpeech: "adjective", level: Level.BEGINNER },
  { word: "gone off", meaning: "spoiled and no longer safe to eat (also off)", meaningKh: "រលួយ", example: "Throw away milk that has gone off.", partOfSpeech: "adjective", level: Level.INTERMEDIATE },
  { word: "strong", meaning: "having an intense flavor or smell", meaningKh: "ខ្លាំង", example: "The cheese has a strong smell.", partOfSpeech: "adjective", level: Level.BEGINNER },
  { word: "sour", meaning: "having an acidic taste like lemon", meaningKh: "ជូរ", example: "Sour candy makes you pucker.", partOfSpeech: "adjective", level: Level.BEGINNER },
  { word: "carbonated", meaning: "having bubbles from gas (also sparkling)", meaningKh: "មានពពុះ", example: "Carbonated water fizzes.", partOfSpeech: "adjective", level: Level.INTERMEDIATE },
  { word: "still", meaning: "not carbonated; without bubbles (non-carbonated)", meaningKh: "គ្មានពពុះ", example: "Still water has no fizz.", partOfSpeech: "adjective", level: Level.INTERMEDIATE },
  { word: "delicious", meaning: "very pleasant to taste", meaningKh: "ឆ្ងាញ់ណាស់", example: "The meal was delicious.", partOfSpeech: "adjective", level: Level.BEGINNER },
  { word: "disgusting", meaning: "extremely unpleasant to taste or smell", meaningKh: "អាក្រក់", example: "The spoiled food smelled disgusting.", partOfSpeech: "adjective", level: Level.BEGINNER },
];

export const eatingVerbsVocab: VocabEntry[] = [
  { word: "eat", meaning: "to put food in your mouth and swallow it", meaningKh: "ញ៉ាំ", example: "We eat dinner at six.", partOfSpeech: "verb", level: Level.BEGINNER },
  { word: "dine", meaning: "to eat dinner, especially in a formal setting", meaningKh: "ញ៉ាំល្ងាច", example: "They dined at a fine restaurant.", partOfSpeech: "verb", level: Level.INTERMEDIATE },
  { word: "chew", meaning: "to crush food with your teeth before swallowing", meaningKh: "ខាំ", example: "Chew your food slowly.", partOfSpeech: "verb", level: Level.BEGINNER },
  { word: "taste", meaning: "to try food to check its flavor", meaningKh: "ភ្លក់", example: "Taste the sauce and add salt.", partOfSpeech: "verb", level: Level.BEGINNER },
  { word: "nibble", meaning: "to eat small bites gently", meaningKh: "ញ៉ាំតិចៗ", example: "She nibbled on a cracker.", partOfSpeech: "verb", level: Level.INTERMEDIATE },
  { word: "bite", meaning: "to cut into something with your teeth", meaningKh: "ខាំ", example: "Take a big bite of the apple.", partOfSpeech: "verb", level: Level.BEGINNER },
  { word: "swallow", meaning: "to make food go down your throat", meaningKh: "យកចូល", example: "Chew well before you swallow.", partOfSpeech: "verb", level: Level.BEGINNER },
  { word: "drink", meaning: "to take liquid into your mouth and swallow", meaningKh: "ផឹក", example: "Drink water after exercise.", partOfSpeech: "verb", level: Level.BEGINNER },
  { word: "sip", meaning: "to drink a small amount slowly", meaningKh: "ផឹកតិចៗ", example: "Sip your tea while it is hot.", partOfSpeech: "verb", level: Level.BEGINNER },
  { word: "gulp", meaning: "to swallow liquid quickly in large amounts", meaningKh: "ផឹកយកចូល", example: "He gulped water after the run.", partOfSpeech: "verb", level: Level.BEGINNER },
];
