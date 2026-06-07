export type StageType = "shortform" | "microlearning" | "apply" | "deepdive";

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface Mission {
  tool: string;
  url: string;
  checklist: string[];
}

export interface Chapter {
  time: string;
  title: string;
}

export interface Reference {
  title: string;
  url: string;
}

export interface Stage {
  type: StageType;
  title: string;
  videoUrl?: string;
  duration?: number;
  cta?: string;
  summary?: string;
  quiz?: QuizQuestion[];
  mission?: Mission;
  chapters?: Chapter[];
  references?: Reference[];
}

export interface Course {
  courseId: string;
  title: string;
  description: string;
  thumbnail: string;
  estimatedMinutes: number;
  stages: Stage[];
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface Progress {
  completedStages: number[];
  lastStage: number;
  completedAt?: string;
}
