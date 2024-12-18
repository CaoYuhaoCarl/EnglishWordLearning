export interface Class {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  teacherId: string;
  schedule: {
    day: string;
    time: string;
  }[];
  maxStudents: number;
}

export const classesData: Class[] = [
  {
    id: "c1",
    name: "English Masters A1",
    level: "advanced",
    teacherId: "t1",
    schedule: [
      { day: "Monday", time: "09:00" },
      { day: "Wednesday", time: "09:00" }
    ],
    maxStudents: 20
  },
  {
    id: "c2",
    name: "English Basics B1",
    level: "beginner",
    teacherId: "t2",
    schedule: [
      { day: "Tuesday", time: "14:00" },
      { day: "Thursday", time: "14:00" }
    ],
    maxStudents: 15
  },
  // Add more classes as needed...
];