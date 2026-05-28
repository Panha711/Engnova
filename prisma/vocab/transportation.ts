import { Level } from "@prisma/client";
import type { VocabEntry } from "./types";

export const transportationVocab: VocabEntry[] = [
  { word: "airplane", meaning: "a vehicle that flies and carries passengers (UK: aeroplane)", meaningKh: "យន្តហោះ", example: "The airplane landed on time.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "tail", meaning: "the back part of an airplane", meaningKh: "ចុងរូបយន្តហោះ", example: "The airline logo is on the tail.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "cockpit", meaning: "the front area where pilots control an airplane", meaningKh: "បន្ទប់គ្រប់គ្រងយន្តហោះ", example: "Only crew enter the cockpit.", partOfSpeech: "noun", level: Level.ADVANCED },
  { word: "wing", meaning: "the flat part on each side of an airplane that provides lift", meaningKh: "ស្លាប", example: "Ice formed on the wing.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "airplane engine", meaning: "the motor that powers an airplane", meaningKh: "ម៉ាស៊ីនយន្តហោះ", example: "The airplane engine roared.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "helicopter", meaning: "an aircraft with blades on top that can hover", meaningKh: "ឧទ្ធម្ភាគចក្រ", example: "A helicopter flew over the city.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "hot air balloon", meaning: "a large balloon lifted by heated air", meaningKh: "ប៉េងប៉ោងខ្យល់ក្តៅ", example: "We rode in a hot air balloon.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "car", meaning: "a road vehicle with four wheels for a small number of people", meaningKh: "រថយន្ត", example: "He drives a red car.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "taxi", meaning: "a car with a driver that you pay to take you somewhere", meaningKh: "តាក់ស៊ី", example: "Take a taxi to the hotel.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "bus", meaning: "a large road vehicle that carries many passengers", meaningKh: "ឡានក្រុង", example: "The bus stops at the corner.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "coach", meaning: "a comfortable bus for long distances", meaningKh: "ឡានក្រុងដំណើរកម្សាន្ត", example: "We traveled by coach.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "motorcycle", meaning: "a two-wheeled motor vehicle (UK: motorbike)", meaningKh: "ម៉ូតូ", example: "Wear a helmet on a motorcycle.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "bicycle", meaning: "a vehicle with two wheels that you pedal (also bike)", meaningKh: "កង់", example: "She rides her bicycle to school.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "moped", meaning: "a small motorcycle with pedals or a low-powered engine", meaningKh: "ម៉ូតូតូច", example: "He rented a moped.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "truck", meaning: "a large vehicle for carrying goods (UK: lorry)", meaningKh: "ឡានដឹកទំនិញ", example: "The truck delivered furniture.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "van", meaning: "a medium-sized vehicle used for carrying goods or people", meaningKh: "ឡានធុនតូច", example: "The van is full of boxes.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "train", meaning: "a line of connected vehicles that run on rails", meaningKh: "រថភ្លើង", example: "The train leaves at six.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "tram", meaning: "a passenger vehicle that runs on rails in a city", meaningKh: "រទេះរថភ្លើង", example: "Take the tram downtown.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "boat", meaning: "a small vessel for traveling on water", meaningKh: "ទូក", example: "They crossed the lake in a boat.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "ferry", meaning: "a boat that carries passengers and vehicles across water", meaningKh: "ទូកចម្លង", example: "We took the ferry to the island.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "yacht", meaning: "a large boat used for pleasure sailing", meaningKh: "ទូកយ៉ាត", example: "They sailed on a luxury yacht.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "ship", meaning: "a very large boat for carrying people or cargo", meaningKh: "កប៉ាល់", example: "The ship crossed the ocean.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "camel", meaning: "an animal used for transport in deserts", meaningKh: "ធ្មង់", example: "Tourists rode a camel.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "horse", meaning: "a large animal that people ride or use to pull carts", meaningKh: "សេះ", example: "Children learned to ride a horse.", partOfSpeech: "noun", level: Level.BEGINNER },
];
