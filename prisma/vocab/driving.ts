import { Level } from "@prisma/client";
import type { VocabEntry } from "./types";

export const drivingVocab: VocabEntry[] = [
  { word: "driver's license", meaning: "an official document allowing you to drive (UK: licence)", meaningKh: "ប័ណ្ណបើកបរ", example: "Show your driver's license.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "car insurance", meaning: "a contract that pays for damage or injury from driving", meaningKh: "ធានារ៉ាប់រងរថយន្ត", example: "Car insurance is required by law.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "seatbelt", meaning: "a strap that keeps you safe in a car", meaningKh: "ខ្សែសុវត្ថិភាព", example: "Fasten your seatbelt.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "gas station", meaning: "a place to buy fuel for vehicles (UK: petrol station)", meaningKh: "ស្ថានីយប្រេង", example: "Stop at the gas station.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "car engine", meaning: "the motor that makes a car move", meaningKh: "ម៉ាស៊ីនរថយន្ត", example: "The car engine would not start.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "turn signal", meaning: "a light showing which way a car will turn (UK: indicator)", meaningKh: "ភ្លើងបញ្ជាក់ទិស", example: "Use your turn signal.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "steering wheel", meaning: "the wheel the driver turns to control direction", meaningKh: "ដងគ្រប់ចង្កៀង", example: "Hold the steering wheel with both hands.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "fuel", meaning: "substance such as gas or diesel that powers a vehicle", meaningKh: "ប្រេងឥន្ធនៈ", example: "The car is low on fuel.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "gasoline", meaning: "liquid fuel for cars (UK: petrol)", meaningKh: "សាំង", example: "Gasoline prices rose.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "diesel", meaning: "fuel used in some trucks and cars", meaningKh: "ម៉ាស៊ូត", example: "This van runs on diesel.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "motor oil", meaning: "oil that keeps a car engine running smoothly", meaningKh: "ប្រេងម៉ាស៊ីន", example: "Check the motor oil level.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "auto repair shop", meaning: "a place where cars are fixed (UK: garage)", meaningKh: "ហាងជួសជុលរថយន្ត", example: "Take it to an auto repair shop.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "flat tire", meaning: "a tire with no air (UK: flat tyre)", meaningKh: "កង់រហះ", example: "We had a flat tire on the highway.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "windshield wipers", meaning: "blades that clear rain from the front window", meaningKh: "អង្រួងលាងកញ្ចក់", example: "Turn on the windshield wipers.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "pedestrian crossing", meaning: "a marked place where people can cross the road safely", meaningKh: "ផ្លូវឆ្លងថ្មើជើង", example: "Stop at the pedestrian crossing.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "traffic lights", meaning: "lights that control traffic at intersections", meaningKh: "ភ្លើងចរាចរណ៍", example: "Wait for the traffic lights.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "trunk", meaning: "the storage area at the back of a car (UK: boot)", meaningKh: "បញ្ជររថយន្ត", example: "Put the bags in the trunk.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "hood", meaning: "the metal cover over the engine at the front (UK: bonnet)", meaningKh: "គម្របម៉ាស៊ីន", example: "Open the hood to check the oil.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "headlight", meaning: "a light at the front of a vehicle", meaningKh: "ភ្លើងមុខ", example: "Turn on your headlights at night.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "wheel", meaning: "the round metal part a tire fits on", meaningKh: "កង់", example: "One wheel was damaged.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "tire", meaning: "the rubber outer part of a wheel (UK: tyre)", meaningKh: "សំបកកង់", example: "The tire needs more air.", partOfSpeech: "noun", level: Level.BEGINNER },
];
