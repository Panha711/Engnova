import { Level } from "@prisma/client";
import type { VocabEntry } from "./types";

export const babyCareVocab: VocabEntry[] = [
  { word: "baby powder", meaning: "a fine powder used on a baby's skin", meaningKh: "ក្រម៉ៅទារក", example: "Sprinkle a little baby powder after the bath.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "baby lotion", meaning: "a gentle lotion for a baby's skin", meaningKh: "ឡូស្យុងទារក", example: "Rub baby lotion on dry skin.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "baby shampoo", meaning: "a mild shampoo for washing a baby's hair", meaningKh: "សាប៊ូកក់សក់ទារក", example: "Use baby shampoo at bath time.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "ointment", meaning: "a thick cream or salve put on the skin", meaningKh: "លាប់", example: "Apply ointment to the rash.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "formula", meaning: "powdered or liquid milk substitute for babies", meaningKh: "ទុន្ហទារក", example: "Mix the formula with warm water.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "baby food", meaning: "soft food made for babies", meaningKh: "អាហារទារក", example: "Spoon the baby food into a bowl.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "baby wipes", meaning: "moist disposable cloths for cleaning a baby", meaningKh: "កោសទារក", example: "Grab baby wipes from the diaper bag.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "cotton swabs", meaning: "small sticks with cotton on each end", meaningKh: "ថង់ច្រេស", example: "Use cotton swabs carefully near the ears.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "diaper pins", meaning: "safety pins used to fasten cloth diapers", meaningKh: "ខ្ទមទារក", example: "Cloth diapers may need diaper pins.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "disposable diapers", meaning: "throwaway diapers used once and discarded", meaningKh: "ទារកបោះចោល", example: "Buy a pack of disposable diapers.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "cloth diapers", meaning: "reusable fabric diapers", meaningKh: "ទារកក្រណាត់", example: "Wash the cloth diapers every day.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "liquid vitamins", meaning: "vitamins in liquid form for babies or children", meaningKh: "វីតាមីនរាវ", example: "Give liquid vitamins with a dropper.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "pacifier", meaning: "a rubber nipple given to a baby to suck on", meaningKh: "បឹងទារក", example: "The baby calmed down with a pacifier.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "bottle", meaning: "a container with a nipple for feeding a baby", meaningKh: "ដបទុន្ហ", example: "Warm the bottle before feeding.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "nipple", meaning: "the rubber tip on a baby bottle", meaningKh: "សបទុន្ហ", example: "Replace the nipple if it is worn.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "bib", meaning: "a cloth worn to protect clothes while eating", meaningKh: "ក្រម៉ង់ក", example: "Fasten the bib around the baby's neck.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "teething ring", meaning: "a ring a baby chews on when teeth are coming in", meaningKh: "ក្រវាល់ធ្មេញ", example: "Chill the teething ring in the fridge.", partOfSpeech: "noun", level: Level.BEGINNER },
];
