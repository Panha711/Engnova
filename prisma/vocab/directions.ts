import { Level } from "@prisma/client";
import type { VocabEntry } from "./types";

export const directionsVocab: VocabEntry[] = [
  { word: "north", meaning: "the direction toward the top of a map", meaningKh: "ខាងជើង", example: "Canada is north of the United States.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "south", meaning: "the direction toward the bottom of a map", meaningKh: "ខាងត្បូង", example: "Mexico is south of the border.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "east", meaning: "the direction where the sun rises", meaningKh: "ខាងកើត", example: "Drive east on Highway 1.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "west", meaning: "the direction where the sun sets", meaningKh: "ខាងលិច", example: "The west side of the city is quieter.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "northeast", meaning: "the direction between north and east", meaningKh: "ឦសាន", example: "Boston is in the northeast of the country.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "northwest", meaning: "the direction between north and west", meaningKh: "ពាយព្យ", example: "Seattle is in the northwest.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "southeast", meaning: "the direction between south and east", meaningKh: "អាគ្នេយ៍", example: "Cambodia is in southeast Asia.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "southwest", meaning: "the direction between south and west", meaningKh: "និរតី", example: "Arizona is in the southwest.", partOfSpeech: "noun", level: Level.BEGINNER },
];
