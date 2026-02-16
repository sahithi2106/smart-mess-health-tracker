
export type Gender = 'male' | 'female' | 'other';
export type ExerciseLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'athlete';
export type Goal = 'maintain' | 'lose' | 'gain' | 'healthy';
export type FoodType = 'veg' | 'non-veg' | 'vegan';

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  exerciseLevel: ExerciseLevel;
  foodType: FoodType;
  goal: Goal;
  role: 'student' | 'admin';
}

export interface MessStatus {
  occupancy: number;
  capacity: number;
  isOpen: boolean;
  entryAllowed: boolean;
}

export interface CrowdData {
  time: string;
  density: number;
}

export interface FoodRecommendation {
  meal: string;
  calories: string;
  reason: string;
}

export interface WeightLog {
  date: string;
  weight: number;
}
