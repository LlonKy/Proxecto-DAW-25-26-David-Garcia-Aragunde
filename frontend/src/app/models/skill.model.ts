import { Category } from './category.model';
export type { Category };

export interface Skill {
  id: number;
  name: string;
  description: string;
  type: 'offering' | 'seeking';
  category_id: number;
  user_id: number;
  created_at?: string;
  category?: Category;
  user?: {
    id: number;
    name: string;
    photo?: string;
  };
}

export interface SkillInput {
  name: string;
  description?: string;
  type: 'offering' | 'seeking';
  category_id: number;
}