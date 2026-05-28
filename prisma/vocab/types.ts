import type { Level } from "@prisma/client";

export type VocabEntry = {
  word: string;
  meaning: string;
  meaningKh: string;
  example: string;
  partOfSpeech: string;
  level: Level;
};
