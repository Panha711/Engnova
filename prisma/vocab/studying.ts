import { Level } from "@prisma/client";
import type { VocabEntry } from "./types";

export const studyingVocab: VocabEntry[] = [
  { word: "school", meaning: "a place where children go to be educated", meaningKh: "សាលា", example: "The children walk to school.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "college", meaning: "a school for higher education (US; UK: university)", meaningKh: "មហាវិទ្យាល័យ", example: "She applied to three colleges.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "library", meaning: "a building or room with books to read or borrow", meaningKh: "បណ្ណាល័យ", example: "Study quietly in the library.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "classroom", meaning: "a room where students have lessons", meaningKh: "បន្ទប់រៀន", example: "The classroom has thirty desks.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "laboratory", meaning: "a room for scientific experiments (also called a lab)", meaningKh: "បន្ទប់ពិសោធន៍", example: "Wear a lab coat in the laboratory.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "class", meaning: "a group of students taught together", meaningKh: "ថ្នាក់រៀន", example: "Math class starts at nine.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "exam", meaning: "a formal test of knowledge", meaningKh: "ប្រឡង", example: "The final exam is next week.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "essay", meaning: "a short piece of writing on a subject", meaningKh: "អត្ថបទ", example: "Write a five-page essay on climate change.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "homework", meaning: "schoolwork done at home", meaningKh: "កិច្ចការផ្ទះ", example: "Finish your homework before dinner.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "exercise book", meaning: "a notebook for school writing", meaningKh: "សៀវភៅរឹង", example: "Copy the notes into your exercise book.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "textbook", meaning: "a book used for study in a subject", meaningKh: "សៀវភៅសិក្សា", example: "Bring your textbook to class.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "thesis", meaning: "a long paper written for a university degree", meaningKh: "នីតិបទ", example: "She is researching her master's thesis.", partOfSpeech: "noun", level: Level.ADVANCED },
  { word: "lecture", meaning: "a talk given to students to teach a topic", meaningKh: "បញ្ជាក់", example: "The lecture lasted ninety minutes.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "test", meaning: "a set of questions to check what you have learned", meaningKh: "តេស្ត", example: "We have a spelling test on Friday.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "diploma", meaning: "a certificate showing you finished a course (UK: qualification)", meaningKh: "វិញ្ញាបនបត្រ", example: "He received his high school diploma.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "degree", meaning: "a qualification earned at university", meaningKh: "ថ្នាក់ឧត្តម", example: "She has a degree in biology.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "teacher", meaning: "a person who teaches students", meaningKh: "គ្រូ", example: "The teacher explained the lesson clearly.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "professor", meaning: "a senior university teacher (also called a lecturer)", meaningKh: "សាស្ត្រាចារ្យ", example: "The professor gave a guest lecture.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "student", meaning: "a person who is studying at school or university", meaningKh: "សិស្ស", example: "Every student needs a library card.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "graduate", meaning: "a person who has completed a degree", meaningKh: "បរិញ្ញាបត្រ", example: "Graduates wore caps and gowns.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
];
