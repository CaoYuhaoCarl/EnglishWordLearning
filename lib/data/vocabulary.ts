export interface Word {
  id: string;
  word: string;
  meaning: string;
  pronunciation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  examples: string[];
  category: string;
}

export const vocabularyData: Word[] = [
  {
    id: "w1",
    word: "happy",
    meaning: "feeling or showing pleasure or contentment",
    pronunciation: "/ˈhæpi/",
    difficulty: "easy",
    examples: [
      "The children were happy playing in the park",
      "We had a happy celebration"
    ],
    category: "emotions"
  },
  {
    id: "w2",
    word: "friend",
    meaning: "a person with whom one has a bond of mutual affection",
    pronunciation: "/frend/",
    difficulty: "easy",
    examples: [
      "She's my best friend",
      "We've been friends since childhood"
    ],
    category: "relationships"
  },
  {
    id: "w3",
    word: "house",
    meaning: "a building for human habitation",
    pronunciation: "/haʊs/",
    difficulty: "easy",
    examples: [
      "They live in a big house",
      "The house has a beautiful garden"
    ],
    category: "places"
  },
  {
    id: "w4",
    word: "food",
    meaning: "any nutritious substance eaten to maintain life and growth",
    pronunciation: "/fuːd/",
    difficulty: "easy",
    examples: [
      "The food was delicious",
      "We need food and water to survive"
    ],
    category: "daily life"
  },
  {
    id: "w5",
    word: "work",
    meaning: "activity involving mental or physical effort done to achieve a purpose",
    pronunciation: "/wɜːk/",
    difficulty: "easy",
    examples: [
      "I have to work tomorrow",
      "She enjoys her work"
    ],
    category: "daily life"
  },
  {
    id: "w6",
    word: "time",
    meaning: "the indefinite continued progress of existence",
    pronunciation: "/taɪm/",
    difficulty: "easy",
    examples: [
      "What time is it?",
      "Time flies when you're having fun"
    ],
    category: "concepts"
  },
  {
    id: "w7",
    word: "book",
    meaning: "a written or printed work consisting of pages",
    pronunciation: "/bʊk/",
    difficulty: "easy",
    examples: [
      "I love reading books",
      "She wrote a book about her experiences"
    ],
    category: "objects"
  },
  {
    id: "w8",
    word: "water",
    meaning: "a colorless, transparent liquid essential for life",
    pronunciation: "/ˈwɔːtər/",
    difficulty: "easy",
    examples: [
      "Drink plenty of water",
      "The water in the lake is clear"
    ],
    category: "nature"
  },
  {
    id: "w9",
    word: "family",
    meaning: "a group of people who are related to each other",
    pronunciation: "/ˈfæmɪli/",
    difficulty: "easy",
    examples: [
      "Family is important",
      "We had a family dinner"
    ],
    category: "relationships"
  },
  {
    id: "w10",
    word: "school",
    meaning: "an institution for educating children",
    pronunciation: "/skuːl/",
    difficulty: "easy",
    examples: [
      "The children go to school",
      "I learned a lot at school"
    ],
    category: "places"
  },
  {
    id: "w11",
    word: "sleep",
    meaning: "a natural state of rest for the mind and body",
    pronunciation: "/sliːp/",
    difficulty: "easy",
    examples: [
      "I need to sleep",
      "She's sleeping peacefully"
    ],
    category: "daily life"
  },
  {
    id: "w12",
    word: "play",
    meaning: "engage in activity for enjoyment and recreation",
    pronunciation: "/pleɪ/",
    difficulty: "easy",
    examples: [
      "The kids play in the garden",
      "Let's play a game"
    ],
    category: "activities"
  }
];