import { Skill } from './skill.model';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface OtherUser {
  id: number;
  name: string;
}

export interface Rating {
  score: number;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  description: string | null;
  role: string;
  created_at: string;
  skills?: Skill[];
  ratings?: Rating[];
}
