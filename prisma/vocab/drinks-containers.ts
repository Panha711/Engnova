import { Level } from "@prisma/client";
import type { VocabEntry } from "./types";

export const drinksVocab: VocabEntry[] = [
  { word: "coffee", meaning: "a hot drink made from roasted coffee beans", meaningKh: "កាហ្វេ", example: "I need coffee every morning.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "tea", meaning: "a hot drink made by steeping leaves in water", meaningKh: "តែ", example: "Green tea is healthy.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "hot chocolate", meaning: "a warm sweet drink made with cocoa", meaningKh: "សូកូឡាក្តៅ", example: "Hot chocolate warms you up.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "herbal tea", meaning: "a drink made from herbs rather than tea leaves", meaningKh: "តែបន្លែ", example: "Chamomile herbal tea helps you relax.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "juice", meaning: "a drink made from fruit or vegetables", meaningKh: "ទឹកផ្លែ", example: "Fresh orange juice at breakfast.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "water", meaning: "a clear liquid essential for life", meaningKh: "ទឹក", example: "Drink plenty of water.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "iced tea", meaning: "cold tea served with ice", meaningKh: "តែទឹកកក", example: "Iced tea is popular in summer.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "lemonade", meaning: "a sweet drink made from lemons", meaningKh: "ទឹកក្រូចឆ្មា", example: "Homemade lemonade is refreshing.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "orangeade", meaning: "a sweet drink flavored with oranges", meaningKh: "ទឹកក្រូចពណ៌", example: "The kids drank orangeade.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "cola", meaning: "a sweet carbonated soft drink", meaningKh: "កូឡា", example: "Cola is served with ice.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "beer", meaning: "an alcoholic drink made from fermented grains", meaningKh: "ស្រាបៀរ", example: "Beer is served cold.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "wine", meaning: "an alcoholic drink made from grapes", meaningKh: "ស្រាទំពាំងបាយជូ", example: "Red wine pairs with steak.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "milkshake", meaning: "a thick drink made from milk and ice cream", meaningKh: "មីកហ្វេ", example: "Chocolate milkshake for dessert.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "smoothie", meaning: "a thick blended drink of fruit and yogurt", meaningKh: "ស្មូធី", example: "Blend a banana smoothie.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "sports drink", meaning: "a drink that replaces fluids and electrolytes after exercise", meaningKh: "ទឹកកីឡា", example: "Athletes drink sports drinks after games.", partOfSpeech: "noun", level: Level.BEGINNER },
];

export const containersVocab: VocabEntry[] = [
  { word: "bottle", meaning: "a container with a narrow neck for liquids", meaningKh: "ដប", example: "Recycle the plastic bottle.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "paper bag", meaning: "a bag made of paper for carrying goods", meaningKh: "ថង់ក្រដាស", example: "Pack groceries in a paper bag.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "drinking glass", meaning: "a container for drinking (also called a glass)", meaningKh: "កែវ", example: "Fill the drinking glass with water.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "carton", meaning: "a cardboard container for milk or juice", meaningKh: "ក្រដាសទឹកដោះគោ", example: "Open the milk carton carefully.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "jar", meaning: "a glass or ceramic container with a lid", meaningKh: "ដបកញ្ចក់", example: "Store jam in a jar.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "packet", meaning: "a small sealed package of food", meaningKh: "កញ្ចប់", example: "Tear open the packet of seeds.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "box", meaning: "a container usually made of cardboard", meaningKh: "ប្រអប់", example: "Cereal comes in a box.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "tin can", meaning: "a metal container for preserved food (UK: tin)", meaningKh: "កំប៉ុង", example: "Open the tin can with a opener.", partOfSpeech: "noun", level: Level.BEGINNER },
  { word: "thermos flask", meaning: "an insulated bottle that keeps drinks hot (UK: flask)", meaningKh: "ដបទឹកក្តៅ", example: "Pour coffee from the thermos flask.", partOfSpeech: "noun", level: Level.INTERMEDIATE },
  { word: "bowl", meaning: "a round deep dish for food or liquids", meaningKh: "ចាន", example: "Serve soup in a bowl.", partOfSpeech: "noun", level: Level.BEGINNER },
];
