import { Level } from "@prisma/client";
import type { VocabEntry } from "./types";

export const apartmentBuildingVocab: VocabEntry[] = [
  { word: "lobby", meaning: "an entrance area inside a building", meaningKh: "បន្ទប់ទទួលភ្ញៀវ", example: "Wait for me in the lobby.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "buzzer", meaning: "a button that makes a sound to signal someone", meaningKh: "កញ្ចុចហៅ", example: "Press the buzzer for the apartment.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "mailbox", meaning: "a box where letters are delivered or stored", meaningKh: "ប្រអប់សំបុត្រ", example: "Check the mailbox after lunch.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "elevator", meaning: "a machine that lifts people and things between floors", meaningKh: "ជណ្តើរយន្ត", example: "Take the elevator to the tenth floor.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "doorman", meaning: "a person who opens the door of a building for visitors", meaningKh: "អ្នកយាមទ្វារ", example: "The doorman greeted us warmly.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "smoke detector", meaning: "a device that warns of smoke or fire", meaningKh: "ឧបករណ៍រកផ្សែង", example: "Test the smoke detector every month.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "peephole", meaning: "a small hole in a door to see who is outside", meaningKh: "រន្ធមើល", example: "Look through the peephole before opening.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "door chain", meaning: "a short chain on a door for extra security", meaningKh: "ខ្សែសង្វាក់ទ្វារ", example: "Use the door chain at night.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "dead-bolt lock", meaning: "a strong lock with a heavy bolt", meaningKh: "សោឆ្នុក", example: "Turn the dead-bolt lock before bed.", partOfSpeech: "noun", level: Level.ADVANCED },
  { word: "air conditioner", meaning: "a machine that cools the air in a room", meaningKh: "ម៉ាស៊ីនត្រជាក់", example: "Turn on the air conditioner.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "fire alarm", meaning: "a system that warns people of a fire", meaningKh: "ឧបករណ៍ប្រកាសភ្លើងឆេះ", example: "Leave the building when the fire alarm rings.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "garbage chute", meaning: "a tube in a building for sending trash to a lower floor", meaningKh: "បំពង់ចោលសំរាម", example: "Drop the bag in the garbage chute.", partOfSpeech: "noun", level: Level.ADVANCED },
  { word: "laundry room", meaning: "a room where clothes are washed and dried", meaningKh: "បន្ទប់បោកអ៊ុត", example: "Take your clothes to the laundry room.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "superintendent", meaning: "a person in charge of an apartment building", meaningKh: "អ្នកគ្រប់គ្រងអគារ", example: "Call the superintendent about the leak.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "storage room", meaning: "a room for keeping extra things", meaningKh: "បន្ទប់រក្សាទុក", example: "Put the boxes in the storage room.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "parking garage", meaning: "a building where cars are parked", meaningKh: "ឃ្លាំងចត", example: "Park your car in the parking garage.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "parking lot", meaning: "an open area for parking cars", meaningKh: "ទីលានចតរថយន្ត", example: "The parking lot is full.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "balcony", meaning: "a small outdoor area on the side of a building", meaningKh: "យ៉រ", example: "We sat on the balcony to watch the sunset.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "terrace", meaning: "an outdoor space at ground or roof level", meaningKh: "ដាម", example: "Have coffee on the terrace.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "swimming pool", meaning: "a large pool of water for swimming", meaningKh: "អាងហែលទឹក", example: "The hotel has a rooftop swimming pool.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "whirlpool", meaning: "a small heated pool with bubbling water (also called a hot tub)", meaningKh: "អាងទឹកក្តៅ", example: "Relax in the whirlpool after the gym.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
];
