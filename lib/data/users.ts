export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  joinedAt: string;
}

export interface Student extends User {
  role: 'student';
  classId: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  progress: {
    wordsLearned: number;
    accuracy: number;
    streak: number;
    pkWins: number;
  };
}

export interface Teacher extends User {
  role: 'teacher';
  specialization: string[];
  classIds: string[];
}

export const studentsData: Student[] = [
  {
    id: "s1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    joinedAt: "2024-01-15",
    classId: "c1",
    level: "advanced",
    progress: {
      wordsLearned: 250,
      accuracy: 85,
      streak: 7,
      pkWins: 12
    }
  },
  {
    id: "s2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    joinedAt: "2024-01-16",
    classId: "c2",
    level: "beginner",
    progress: {
      wordsLearned: 120,
      accuracy: 75,
      streak: 4,
      pkWins: 5
    }
  },
  // Add more students as needed...
];

export const teachersData: Teacher[] = [
  {
    id: "t1",
    name: "Dr. Sarah Wilson",
    email: "sarah@example.com",
    role: "teacher",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    joinedAt: "2023-12-01",
    specialization: ["TOEFL", "IELTS", "Business English"],
    classIds: ["c1"]
  },
  {
    id: "t2",
    name: "Prof. Michael Brown",
    email: "michael@example.com",
    role: "teacher",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    joinedAt: "2023-12-01",
    specialization: ["General English", "Conversation"],
    classIds: ["c2"]
  },
  // Add more teachers as needed...
];