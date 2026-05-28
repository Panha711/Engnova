import { Level } from "@prisma/client";
import type { VocabEntry } from "./types";

export const placeSettingVocab: VocabEntry[] = [
  { word: "salad plate", meaning: "a small plate for serving salad", meaningKh: "ចានសម្រាប់សាឡាត់", example: "Set the salad plate to the left of the dinner plate.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "bread-and-butter plate", meaning: "a small plate for bread and butter", meaningKh: "ចានសម្រាប់នំប៉័ងនិងប៊ឺ", example: "Place a roll on the bread-and-butter plate.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "dinner plate", meaning: "a large plate for the main meal", meaningKh: "ចានអាហារពេលល្ងាច", example: "Serve the rice on the dinner plate.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "soup bowl", meaning: "a deep bowl for serving soup", meaningKh: "ចានស៊ុប", example: "Ladle the soup into the soup bowl.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "water glass", meaning: "a glass for drinking water at meals", meaningKh: "កែវទឹក", example: "Fill each water glass before the meal.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "wine glass", meaning: "a glass with a stem for drinking wine", meaningKh: "កែវស្រា", example: "Pour the red wine into the wine glass.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "saucer", meaning: "a small dish placed under a cup", meaningKh: "ចានពែង", example: "Set the cup on the saucer.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "salad fork", meaning: "a small fork used for eating salad", meaningKh: "សមសាឡាត់", example: "Use the salad fork for the first course.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "dinner fork", meaning: "a regular-size fork used for the main course", meaningKh: "សមអាហារ", example: "The dinner fork goes to the left of the plate.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "knife", meaning: "a tool with a sharp blade used to cut food", meaningKh: "កាំបិត", example: "Cut the steak with a knife.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "teaspoon", meaning: "a small spoon used for stirring tea or eating dessert", meaningKh: "ស្លាបព្រាកាហ្វេ", example: "Stir the sugar with a teaspoon.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "soup spoon", meaning: "a round spoon used for eating soup", meaningKh: "ស្លាបព្រាស៊ុប", example: "Eat the soup with a soup spoon.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "butter knife", meaning: "a small knife used for spreading butter", meaningKh: "កាំបិតប៊ឺ", example: "Spread butter on the bread with a butter knife.", partOfSpeech: "noun", level: Level.BEGINNER },
];
