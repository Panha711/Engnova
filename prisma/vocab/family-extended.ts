import { Level } from "@prisma/client";
import type { VocabEntry } from "./types";

export const familyExtendedVocab: VocabEntry[] = [
  { word: "aunt", meaning: "the sister of your mother or father", meaningKh: "មីង", example: "My aunt lives in the next town.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "uncle", meaning: "the brother of your mother or father", meaningKh: "ពូ", example: "My uncle is a doctor.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "niece", meaning: "the daughter of your brother or sister", meaningKh: "ក្មួយស្រី", example: "I bought a gift for my niece.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "nephew", meaning: "the son of your brother or sister", meaningKh: "ក្មួយប្រុស", example: "My nephew just started school.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "cousin", meaning: "the child of your aunt or uncle", meaningKh: "បងប្អូនជីដូនមួយ", example: "My cousin came to visit last weekend.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "mother-in-law", meaning: "the mother of your spouse", meaningKh: "ម្តាយក្មេក", example: "My mother-in-law cooks delicious meals.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "father-in-law", meaning: "the father of your spouse", meaningKh: "ឪពុកក្មេក", example: "My father-in-law gave us good advice.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "son-in-law", meaning: "the husband of your daughter", meaningKh: "កូនប្រសារប្រុស", example: "Her son-in-law works at the bank.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "daughter-in-law", meaning: "the wife of your son", meaningKh: "កូនប្រសារស្រី", example: "His daughter-in-law is a teacher.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "brother-in-law", meaning: "the brother of your spouse, or the husband of your sibling", meaningKh: "បងថ្លៃប្រុស", example: "My brother-in-law drove us to the airport.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "sister-in-law", meaning: "the sister of your spouse, or the wife of your sibling", meaningKh: "បងថ្លៃស្រី", example: "My sister-in-law helped plan the party.", partOfSpeech: "noun", level: Level.BEGINNER },
];
